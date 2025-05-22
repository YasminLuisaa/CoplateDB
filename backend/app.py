from flask import Flask, request, jsonify, send_from_directory
import os
import uuid
import re
import cv2
import numpy as np
import easyocr
import time
from werkzeug.utils import secure_filename
from flask_cors import CORS

print("Iniciando API de detecção de placas...")

# Inicializar a aplicação Flask
app = Flask(__name__, static_folder='static')
CORS(app)  # Habilitar CORS para integração com o frontend React

# Configurações
UPLOAD_FOLDER = os.path.join(os.path.dirname(
    os.path.abspath(__file__)), 'uploads')
PROCESSED_FOLDER = os.path.join(os.path.dirname(
    os.path.abspath(__file__)), 'processed')
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}
MAX_CONTENT_LENGTH = 16 * 1024 * 1024  # 16MB

# Criar diretórios se não existirem
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(PROCESSED_FOLDER, exist_ok=True)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['PROCESSED_FOLDER'] = PROCESSED_FOLDER
app.config['MAX_CONTENT_LENGTH'] = MAX_CONTENT_LENGTH

print("Configurações inicializadas")
print(f"Diretório de uploads: {UPLOAD_FOLDER}")
print(f"Diretório de processados: {PROCESSED_FOLDER}")

print("Inicializando EasyOCR... (pode demorar um pouco)")

# Inicializar o EasyOCR (demora um pouco para carregar)
try:
    # Configurar para usar GPU se disponível
    reader = easyocr.Reader(['pt'], gpu=False)
    print("EasyOCR inicializado com sucesso!")
except Exception as e:
    print(f"Erro ao inicializar EasyOCR: {e}")
    # Definir reader como None para tratamento de erro posterior
    reader = None

# Padrão para validar placas Mercosul
# Formato: 3 letras, 1 número, 1 letra, 2 números (por exemplo: ABC1D23)
MERCOSUL_PATTERN = re.compile(r'^[A-Z]{3}[0-9][A-Z][0-9]{2}$')


def allowed_file(filename):
    """Verifica se o arquivo tem uma extensão permitida"""
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


def validate_mercosul_plate(text):
    """Valida se o texto está no formato de placa Mercosul"""
    # Remover espaços e padronizar para uppercase
    text = ''.join(text.split()).upper()

    # Verificar se corresponde ao padrão da placa Mercosul
    return MERCOSUL_PATTERN.match(text) is not None


def clean_plate_text(text):
    """Limpa o texto para extrair apenas caracteres de placa válidos"""
    # Remover espaços e outros caracteres não alfanuméricos
    text = re.sub(r'[^A-Za-z0-9]', '', text)
    return text.upper()


def process_image(image_path, method="original"):
    """Processa a imagem usando diferentes métodos"""
    # Verificar se o EasyOCR foi inicializado
    if reader is None:
        return {
            "method": method,
            "text": "",
            "confidence": 0,
            "processing_time": 0,
            "processed_image_path": "",
            "error": "EasyOCR não foi inicializado corretamente"
        }

    try:
        image = cv2.imread(image_path)
        if image is None:
            return {
                "method": method,
                "text": "",
                "confidence": 0,
                "processing_time": 0,
                "processed_image_path": "",
                "error": "Erro ao carregar a imagem"
            }

        # Dimensionar a imagem para um tamanho processável, se necessário
        h, w = image.shape[:2]
        if w > 1200:
            scale = 1200 / w
            image = cv2.resize(image, (int(w * scale), int(h * scale)))

        # Métodos de processamento
        if method == "original":
            # Usar a imagem original
            processed = image.copy()

        elif method == "rotation":
            # Aplicar rotações para lidar com placas em ângulos variados
            angle = 8  # Experimentar com ângulos diferentes em um cenário real
            h, w = image.shape[:2]
            center = (w // 2, h // 2)
            M = cv2.getRotationMatrix2D(center, angle, 1.0)
            processed = cv2.warpAffine(
                image, M, (w, h), flags=cv2.INTER_CUBIC, borderMode=cv2.BORDER_CONSTANT)

        elif method == "perspective":
            # Simular correção de perspectiva (em cenário real, detectaríamos os contornos)
            h, w = image.shape[:2]
            # Pontos de origem simulados (em caso real, seriam detectados)
            pts1 = np.float32([[w*0.1, h*0.1], [w*0.9, h*0.1],
                              [w*0.1, h*0.9], [w*0.9, h*0.9]])
            pts2 = np.float32([[0, 0], [w, 0], [0, h], [w, h]])
            M = cv2.getPerspectiveTransform(pts1, pts2)
            processed = cv2.warpPerspective(image, M, (w, h))

        elif method == "enhanced":
            # Melhorar a imagem para destacar o texto
            gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
            blurred = cv2.GaussianBlur(gray, (5, 5), 0)
            thresh = cv2.adaptiveThreshold(blurred, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C,
                                           cv2.THRESH_BINARY_INV, 11, 2)
            processed = thresh

        # Converter para RGB se estiver usando o método "enhanced" (que produz imagem em escala de cinza)
        if method == "enhanced":
            processed = cv2.cvtColor(processed, cv2.COLOR_GRAY2BGR)

        # Salvar a imagem processada
        unique_id = str(uuid.uuid4())
        processed_file = f"{unique_id}_{method}.jpg"
        processed_path = os.path.join(
            app.config['PROCESSED_FOLDER'], processed_file)
        cv2.imwrite(processed_path, processed)

        # Usar OCR para detectar texto
        start_time = time.time()

        if method == "enhanced":
            # Para imagens binárias, converter para escala de cinza para o OCR
            ocr_image = cv2.cvtColor(processed, cv2.COLOR_BGR2GRAY)
        else:
            # Para outros métodos, usar a imagem processada diretamente
            ocr_image = cv2.cvtColor(processed, cv2.COLOR_BGR2RGB)

        results = reader.readtext(ocr_image)

        processing_time = int((time.time() - start_time) * 1000)  # tempo em ms

        # Processar os resultados do OCR
        plates = []
        confidence_sum = 0
        detected_text = ""

        for (bbox, text, prob) in results:
            clean_text = clean_plate_text(text)

            # Se encontrar algo que parece uma placa
            if len(clean_text) >= 6:  # Placas Mercosul têm 7 caracteres, mas permitimos uma margem de erro
                # Verificar se corresponde ao padrão da placa Mercosul
                if validate_mercosul_plate(clean_text):
                    plates.append({
                        "text": clean_text,
                        "confidence": prob,
                        "bbox": bbox
                    })

                    # Atualizar o texto detectado e confiança se for a placa com maior confiança
                    if not detected_text or prob > confidence_sum:
                        detected_text = clean_text
                        confidence_sum = prob

        # Se nenhuma placa válida foi encontrada, tenta extrair algo que pareça uma placa
        if not plates:
            best_text = ""
            best_confidence = 0

            for (bbox, text, prob) in results:
                clean_text = clean_plate_text(text)

                # Se tem mais de 6 caracteres, considere como um possível candidato
                if len(clean_text) >= 6 and prob > best_confidence:
                    best_text = clean_text
                    best_confidence = prob

            detected_text = best_text
            confidence_sum = best_confidence

        return {
            "method": method,
            "text": detected_text,
            "confidence": round(confidence_sum * 100, 2) if confidence_sum else 0,
            "processing_time": processing_time,
            "processed_image_path": processed_file,
            "error": "" if detected_text else "Nenhuma placa detectada"
        }

    except Exception as e:
        print(f"Erro no processamento [{method}]: {str(e)}")
        return {
            "method": method,
            "text": "",
            "confidence": 0,
            "processing_time": 0,
            "processed_image_path": "",
            "error": f"Erro no processamento: {str(e)}"
        }


# Rotas API
@app.route('/api/detect', methods=['POST'])
def detect_plate():
    # Verificar se há um arquivo na requisição
    if 'image' not in request.files:
        return jsonify({
            "success": False,
            "error": "Nenhum arquivo enviado"
        }), 400

    file = request.files['image']

    # Verificar se o arquivo tem um nome
    if file.filename == '':
        return jsonify({
            "success": False,
            "error": "Nenhum arquivo selecionado"
        }), 400

    # Verificar se o arquivo é permitido
    if not allowed_file(file.filename):
        return jsonify({
            "success": False,
            "error": "Tipo de arquivo não permitido. Apenas PNG, JPG e JPEG são suportados."
        }), 400

    try:
        # Salvar o arquivo
        filename = secure_filename(file.filename)
        unique_id = str(uuid.uuid4())
        saved_filename = f"{unique_id}_{filename}"
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], saved_filename)
        file.save(file_path)

        # Obter configurações
        use_original = request.form.get(
            'use_original', 'true').lower() == 'true'
        use_perspective = request.form.get(
            'use_perspective', 'false').lower() == 'true'
        use_rotation = request.form.get(
            'use_rotation', 'false').lower() == 'true'
        use_enhanced = request.form.get(
            'use_enhanced', 'false').lower() == 'true'
        use_all_methods = request.form.get(
            'use_all_methods', 'false').lower() == 'true'

        if use_all_methods:
            use_original = use_perspective = use_rotation = use_enhanced = True

        # Processar imagem com os métodos selecionados
        results = {}
        best_result = {
            "method": "none",
            "text": "",
            "confidence": 0
        }

        if use_original:
            results["original"] = process_image(file_path, "original")
            if results["original"]["confidence"] > best_result["confidence"] and results["original"]["text"]:
                best_result = {
                    "method": "original",
                    "text": results["original"]["text"],
                    "confidence": results["original"]["confidence"]
                }

        if use_rotation:
            results["rotation"] = process_image(file_path, "rotation")
            if results["rotation"]["confidence"] > best_result["confidence"] and results["rotation"]["text"]:
                best_result = {
                    "method": "rotation",
                    "text": results["rotation"]["text"],
                    "confidence": results["rotation"]["confidence"]
                }

        if use_perspective:
            results["perspective"] = process_image(file_path, "perspective")
            if results["perspective"]["confidence"] > best_result["confidence"] and results["perspective"]["text"]:
                best_result = {
                    "method": "perspective",
                    "text": results["perspective"]["text"],
                    "confidence": results["perspective"]["confidence"]
                }

        if use_enhanced:
            results["enhanced"] = process_image(file_path, "enhanced")
            if results["enhanced"]["confidence"] > best_result["confidence"] and results["enhanced"]["text"]:
                best_result = {
                    "method": "enhanced",
                    "text": results["enhanced"]["text"],
                    "confidence": results["enhanced"]["confidence"]
                }

        return jsonify({
            "success": True,
            "methods": results,
            "best_result": best_result,
            "original_image": saved_filename
        })

    except Exception as e:
        return jsonify({
            "success": False,
            "error": f"Erro ao processar imagem: {str(e)}"
        }), 500


@app.route('/api/images', methods=['GET'])
def list_images():
    try:
        images = []
        for filename in os.listdir(app.config['UPLOADS_FOLDER']):
            if allowed_file(filename):
                images.append(filename)

        return jsonify({
            "success": True,
            "images": images
        })
    except Exception as e:
        return jsonify({
            "success": False,
            "error": f"Erro ao listar imagens: {str(e)}"
        }), 500


@app.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)


@app.route('/processed/<filename>')
def processed_file(filename):
    return send_from_directory(app.config['PROCESSED_FOLDER'], filename)


@app.route('/api/check-system', methods=['GET'])
def check_system():
    """Verifica se os componentes do sistema estão funcionando corretamente"""
    components = {
        "api": True,
        "ocr": reader is not None,
        "upload_dir": os.path.exists(UPLOAD_FOLDER) and os.access(UPLOAD_FOLDER, os.W_OK),
        "processed_dir": os.path.exists(PROCESSED_FOLDER) and os.access(PROCESSED_FOLDER, os.W_OK)
    }

    return jsonify({
        "success": True,
        "components": components,
        "version": "1.0.0"
    })


# Endpoint para servir arquivos estáticos do React em produção
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve_react(path):
    if path and os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)
    return send_from_directory(app.static_folder, 'index.html')


if __name__ == '__main__':
    app.run(debug=True)
