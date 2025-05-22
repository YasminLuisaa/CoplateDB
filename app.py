from flask import Flask, render_template, request, jsonify, send_from_directory
import os
import uuid
import re
import cv2
import numpy as np
import easyocr
import time
from werkzeug.utils import secure_filename

print("Iniciando aplicação...")

# Inicializar a aplicação Flask
app = Flask(__name__, static_folder='static', template_folder='templates')

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

# Verificar arquivos importantes
template_path = os.path.join(os.path.dirname(
    os.path.abspath(__file__)), 'templates', 'index.html')
if os.path.exists(template_path):
    print(f"Arquivo template encontrado: {template_path}")
else:
    print(f"ALERTA: Arquivo template NÃO encontrado: {template_path}")

js_path = os.path.join(os.path.dirname(
    os.path.abspath(__file__)), 'static', 'js', 'main.js')
if os.path.exists(js_path):
    print(f"Arquivo JavaScript encontrado: {js_path}")
else:
    print(f"ALERTA: Arquivo JavaScript NÃO encontrado: {js_path}")

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
        processed_path = os.path.join(
            app.config['PROCESSED_FOLDER'], f"{unique_id}_{method}.jpg")
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
            # Tentar encontrar sequências que possam ser parte de uma placa
            for (bbox, text, prob) in results:
                clean_text = clean_plate_text(text)
                if len(clean_text) >= 5:  # Exigir pelo menos 5 caracteres
                    plates.append({
                        "text": clean_text,
                        "confidence": prob,
                        "bbox": bbox
                    })

                    # Atualizar o texto detectado e confiança se for o texto com maior confiança
                    if not detected_text or prob > confidence_sum:
                        detected_text = clean_text
                        confidence_sum = prob

        # Calcular confiança (0-100%)
        confidence = int(confidence_sum * 100) if plates else 0

        return {
            "method": method,
            "text": detected_text if detected_text else "",
            "confidence": confidence,
            "processing_time": processing_time,
            "processed_image_path": os.path.basename(processed_path)
        }

    except Exception as e:
        print(f"Erro ao processar imagem com método {method}: {str(e)}")
        return {
            "method": method,
            "text": "",
            "confidence": 0,
            "processing_time": 0,
            "processed_image_path": "",
            "error": f"Erro ao processar: {str(e)}"
        }


@app.route('/')
def index():
    """Rota para a página inicial"""
    try:
        print("Tentando renderizar a página inicial...")
        return render_template('index.html')
    except Exception as e:
        print(f"Erro ao renderizar template: {e}")
        # Verificar se o arquivo index.html existe no diretório templates
        template_path = os.path.join(os.path.dirname(
            os.path.abspath(__file__)), 'templates', 'index.html')
        if not os.path.exists(template_path):
            return f"Arquivo index.html não encontrado em {template_path}. Por favor, certifique-se de que o arquivo foi movido para a pasta templates."
        return f"Erro ao renderizar página: {e}"


@app.route('/static/<path:path>')
def serve_static(path):
    """Servir arquivos estáticos"""
    print(f"Servindo arquivo estático: {path}")
    return send_from_directory('static', path)


@app.route('/uploads/<filename>')
def uploaded_file(filename):
    """Servir arquivos enviados"""
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)


@app.route('/processed/<filename>')
def processed_file(filename):
    """Servir arquivos processados"""
    return send_from_directory(app.config['PROCESSED_FOLDER'], filename)


@app.route('/api/detect', methods=['POST'])
def detect_plate():
    """API para detectar placas em imagens"""
    try:
        print("Iniciando detecção de placa...")
        # Verificar se o EasyOCR foi inicializado
        if reader is None:
            return jsonify({
                "success": False,
                "error": "O sistema EasyOCR não foi inicializado corretamente. Verifique a instalação."
            }), 500

        # Verificar se o arquivo foi enviado
        if 'image' not in request.files:
            return jsonify({
                "success": False,
                "error": "Nenhum arquivo enviado"
            }), 400

        file = request.files['image']

        # Verificar se o arquivo tem nome
        if file.filename == '':
            return jsonify({
                "success": False,
                "error": "Nenhum arquivo selecionado"
            }), 400

        # Verificar se é um arquivo permitido
        if not allowed_file(file.filename):
            return jsonify({
                "success": False,
                "error": "Formato de arquivo não permitido. Use apenas PNG, JPG ou JPEG."
            }), 400

        # Obter as opções de processamento
        use_all_methods = request.form.get(
            'use_all_methods', 'false').lower() == 'true'
        use_perspective = request.form.get(
            'use_perspective', 'false').lower() == 'true'
        use_rotation = request.form.get(
            'use_rotation', 'false').lower() == 'true'
        use_enhanced = request.form.get(
            'use_enhanced', 'false').lower() == 'true'

        print(
            f"Opções de processamento: all={use_all_methods}, perspective={use_perspective}, rotation={use_rotation}, enhanced={use_enhanced}")

        # Salvar o arquivo enviado
        filename = secure_filename(file.filename)
        unique_filename = f"{str(uuid.uuid4())}_{filename}"
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], unique_filename)
        file.save(file_path)

        # Verificar se o arquivo foi salvo corretamente
        if not os.path.exists(file_path):
            return jsonify({
                "success": False,
                "error": f"Erro ao salvar o arquivo em {file_path}"
            }), 500

        # Usar os métodos selecionados
        methods = ["original"]
        if use_all_methods or use_rotation:
            methods.append("rotation")
        if use_all_methods or use_perspective:
            methods.append("perspective")
        if use_all_methods or use_enhanced:
            methods.append("enhanced")

        print(f"Processando imagem {file_path} com métodos: {methods}")

        # Processar a imagem com cada método
        results = {}
        for method in methods:
            result = process_image(file_path, method)
            results[method] = result
            print(f"Resultado do método {method}: {result}")

        # Verificar se houve resultados
        if not results or all("error" in result for result in results.values()):
            return jsonify({
                "success": False,
                "error": "Falha no processamento de imagem com todos os métodos"
            }), 500

        # Encontrar o melhor resultado baseado na confiança
        valid_methods = [m for m in results if "error" not in results[m]]
        if not valid_methods:
            return jsonify({
                "success": False,
                "error": "Nenhum método de processamento válido encontrado"
            }), 500

        best_method = max(
            valid_methods, key=lambda m: results[m]["confidence"])
        best_result = results[best_method]

        # Construir a resposta
        response = {
            "success": True,
            "original_image": unique_filename,
            "methods": results,
            "best_result": {
                "method": best_method,
                "text": best_result["text"],
                "confidence": best_result["confidence"]
            }
        }

        print("Detecção concluída com sucesso!")
        return jsonify(response)

    except Exception as e:
        print(f"Erro na API de detecção: {str(e)}")
        return jsonify({
            "success": False,
            "error": f"Erro no servidor: {str(e)}"
        }), 500


@app.route('/check-system', methods=['GET'])
def check_system():
    """Rota para verificar o status do sistema"""
    import flask
    status = {
        "flask_version": flask.__version__,
        "opencv_version": cv2.__version__,
        "numpy_version": np.__version__,
        "easyocr_loaded": reader is not None,
        "uploads_dir": os.path.exists(UPLOAD_FOLDER),
        "processed_dir": os.path.exists(PROCESSED_FOLDER),
        "template_dir": os.path.exists(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'templates')),
        "index_file": os.path.exists(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'templates', 'index.html')),
        "static_dir": os.path.exists(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'static')),
        "js_file": os.path.exists(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'static', 'js', 'main.js'))
    }

    return jsonify(status)


if __name__ == '__main__':
    # Verificar se o template existe
    template_path = os.path.join(os.path.dirname(
        os.path.abspath(__file__)), 'templates', 'index.html')
    if not os.path.exists(template_path):
        print(
            f"ALERTA: Arquivo de template index.html não encontrado em {template_path}")
        print("Execute o setup.py para configurar os diretórios corretamente ou mova o arquivo HTML para a pasta templates/")

    # Verificar se o arquivo JavaScript existe
    js_path = os.path.join(os.path.dirname(
        os.path.abspath(__file__)), 'static', 'js', 'main.js')
    if not os.path.exists(js_path):
        print(
            f"ALERTA: Arquivo JavaScript main.js não encontrado em {js_path}")
        print("Execute o setup.py ou crie o diretório static/js/ e mova o arquivo main.js para esta pasta.")

    print("Iniciando servidor Flask na porta 5000...")
    print("Acesse http://localhost:1000 no seu navegador")
    try:
        app.run(debug=True, host='0.0.0.0', port=1000)
    except Exception as e:
        print(f"ERRO ao iniciar o servidor Flask: {str(e)}")

# Configura��o para produ��o (Render)
if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=False)
