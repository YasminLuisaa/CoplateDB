from flask import Flask, request, jsonify
import os
import tempfile
import re
from werkzeug.utils import secure_filename
from flask_cors import CORS

# Inicializar a aplicação Flask
app = Flask(__name__)
CORS(app)

# Configurações
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}
MAX_CONTENT_LENGTH = 16 * 1024 * 1024  # 16MB

app.config['MAX_CONTENT_LENGTH'] = MAX_CONTENT_LENGTH

# Cache global para o OCR
reader = None

def init_ocr():
    """Inicializa o OCR apenas quando necessário"""
    global reader
    if reader is None:
        try:
            # Import apenas quando necessário
            import easyocr
            reader = easyocr.Reader(['pt'], gpu=False, verbose=False)
            return True
        except Exception as e:
            print(f"Erro ao inicializar EasyOCR: {e}")
            return False
    return True

# Padrão para validar placas Mercosul
MERCOSUL_PATTERN = re.compile(r'^[A-Z]{3}[0-9][A-Z][0-9]{2}$')

def allowed_file(filename):
    """Verifica se o arquivo tem uma extensão permitida"""
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def validate_mercosul_plate(text):
    """Valida se o texto está no formato de placa Mercosul"""
    text = ''.join(text.split()).upper()
    return MERCOSUL_PATTERN.match(text) is not None

def clean_plate_text(text):
    """Limpa o texto para extrair apenas caracteres de placa válidos"""
    text = re.sub(r'[^A-Za-z0-9]', '', text)
    return text.upper()

def process_image_simple(image_path):
    """Versão otimizada para Vercel"""
    if not init_ocr():
        return {
            "text": "",
            "confidence": 0,
            "error": "OCR não disponível"
        }
    
    try:
        import cv2
        import time
        
        # Carregar imagem
        image = cv2.imread(image_path)
        if image is None:
            return {
                "text": "",
                "confidence": 0,
                "error": "Erro ao carregar imagem"
            }
        
        # Redimensionar para economizar processamento
        h, w = image.shape[:2]
        if w > 600:  # Ainda menor para Vercel
            scale = 600 / w
            image = cv2.resize(image, (int(w * scale), int(h * scale)))
        
        # OCR
        start_time = time.time()
        ocr_image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
        results = reader.readtext(ocr_image)
        processing_time = int((time.time() - start_time) * 1000)
        
        # Liberar memória
        del image, ocr_image
        
        # Processar resultados
        best_text = ""
        best_confidence = 0
        
        for (bbox, text, prob) in results:
            clean_text = clean_plate_text(text)
            
            if len(clean_text) >= 6:
                if validate_mercosul_plate(clean_text):
                    if prob > best_confidence:
                        best_text = clean_text
                        best_confidence = prob
        
        # Se não encontrou placa válida
        if not best_text:
            for (bbox, text, prob) in results:
                clean_text = clean_plate_text(text)
                if len(clean_text) >= 6 and prob > best_confidence:
                    best_text = clean_text
                    best_confidence = prob
        
        return {
            "text": best_text,
            "confidence": round(best_confidence * 100, 2),
            "processing_time": processing_time,
            "error": "" if best_text else "Nenhuma placa detectada"
        }
        
    except Exception as e:
        return {
            "text": "",
            "confidence": 0,
            "error": f"Erro no processamento: {str(e)}"
        }

# Rotas
@app.route('/')
def home():
    return jsonify({
        "message": "CoPlateDB API - Detecção de Placas Veiculares",
        "status": "online",
        "platform": "Vercel",
        "version": "1.0.0",
        "endpoints": [
            "/api/detect - POST - Detectar placa em imagem",
            "/api/health - GET - Verificar status do sistema"
        ]
    })

@app.route('/api/health')
def health_check():
    return jsonify({
        "status": "healthy",
        "service": "CoPlateDB Backend",
        "platform": "Vercel",
        "ocr_available": reader is not None
    })

@app.route('/api/detect', methods=['POST'])
def detect_plate():
    if 'image' not in request.files:
        return jsonify({
            "success": False,
            "error": "Nenhum arquivo enviado"
        }), 400

    file = request.files['image']
    
    if file.filename == '':
        return jsonify({
            "success": False,
            "error": "Nenhum arquivo selecionado"
        }), 400

    if not allowed_file(file.filename):
        return jsonify({
            "success": False,
            "error": "Tipo de arquivo não permitido"
        }), 400

    try:
        # Usar arquivo temporário
        with tempfile.NamedTemporaryFile(delete=False, suffix='.jpg') as temp_file:
            file.save(temp_file.name)
            
            # Processar imagem
            result = process_image_simple(temp_file.name)
            
            # Limpar arquivo temporário
            os.unlink(temp_file.name)
            
            return jsonify({
                "success": True,
                "result": result,
                "platform": "Vercel"
            })
            
    except Exception as e:
        return jsonify({
            "success": False,
            "error": f"Erro ao processar: {str(e)}"
        }), 500

# Para Vercel, não precisa do if __name__ == '__main__'
# O Vercel usa WSGI automaticamente