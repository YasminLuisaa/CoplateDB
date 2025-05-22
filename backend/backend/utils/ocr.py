import re
import time
import easyocr

# Padrão para validar placas Mercosul
# Formato: 3 letras, 1 número, 1 letra, 2 números (por exemplo: ABC1D23)
MERCOSUL_PATTERN = re.compile(r'^[A-Z]{3}[0-9][A-Z][0-9]{2}$')

# Inicializar o EasyOCR (será carregado na primeira chamada)
reader = None


def initialize_ocr(lang_list=['pt'], gpu=False):
    """Inicializa o leitor EasyOCR com as configurações especificadas"""
    global reader
    try:
        reader = easyocr.Reader(lang_list, gpu=gpu)
        return True
    except Exception as e:
        print(f"Erro ao inicializar EasyOCR: {e}")
        return False


def get_reader():
    """Obtém a instância do leitor, inicializando se necessário"""
    global reader
    if reader is None:
        initialize_ocr()
    return reader


def clean_plate_text(text):
    """Limpa o texto para extrair apenas caracteres de placa válidos"""
    # Remover espaços e outros caracteres não alfanuméricos
    text = re.sub(r'[^A-Za-z0-9]', '', text)
    return text.upper()


def validate_mercosul_plate(text):
    """Valida se o texto está no formato de placa Mercosul"""
    # Remover espaços e padronizar para uppercase
    text = ''.join(text.split()).upper()

    # Verificar se corresponde ao padrão da placa Mercosul
    return MERCOSUL_PATTERN.match(text) is not None


def detect_plate_text(image):
    """Detecta texto de placa na imagem usando OCR"""
    ocr_reader = get_reader()
    if ocr_reader is None:
        return {
            "text": "",
            "confidence": 0,
            "processing_time": 0,
            "error": "EasyOCR não inicializado"
        }

    start_time = time.time()
    
    # Executar OCR na imagem
    try:
        results = ocr_reader.readtext(image)
        processing_time = int((time.time() - start_time) * 1000)  # tempo em ms
    except Exception as e:
        return {
            "text": "",
            "confidence": 0,
            "processing_time": 0,
            "error": f"Erro durante OCR: {str(e)}"
        }

    # Processar os resultados
    plates = []
    for (bbox, text, prob) in results:
        clean_text = clean_plate_text(text)
        
        # Se encontrar algo que parece uma placa
        if len(clean_text) >= 6:  # Placas Mercosul têm 7 caracteres
            # Verificar se corresponde ao padrão da placa Mercosul
            if validate_mercosul_plate(clean_text):
                plates.append({
                    "text": clean_text,
                    "confidence": prob,
                    "bbox": bbox
                })

    # Se encontrou placas válidas, retorna a de maior confiança
    if plates:
        best_plate = max(plates, key=lambda x: x["confidence"])
        return {
            "text": best_plate["text"],
            "confidence": round(best_plate["confidence"] * 100, 2),
            "processing_time": processing_time,
            "error": ""
        }
    
    # Se não encontrou placas válidas, tenta encontrar algo que pareça uma placa
    best_text = ""
    best_confidence = 0
    
    for (bbox, text, prob) in results:
        clean_text = clean_plate_text(text)
        
        # Se tem pelo menos 6 caracteres (permitindo uma tolerância)
        if len(clean_text) >= 6 and prob > best_confidence:
            best_text = clean_text
            best_confidence = prob
    
    return {
        "text": best_text,
        "confidence": round(best_confidence * 100, 2) if best_confidence else 0,
        "processing_time": processing_time,
        "error": "" if best_text else "Nenhuma placa detectada"
    } 