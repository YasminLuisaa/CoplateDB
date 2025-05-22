import cv2
import numpy as np
import uuid
import os


def resize_image(image, max_width=1200):
    """Redimensiona a imagem para uma largura máxima mantendo a proporção"""
    h, w = image.shape[:2]
    if w > max_width:
        scale = max_width / w
        return cv2.resize(image, (int(w * scale), int(h * scale)))
    return image


def process_original(image):
    """Processa a imagem usando o método original (sem modificações)"""
    return image.copy()


def process_rotation(image, angle=8):
    """Aplica rotação à imagem para melhorar a detecção de placas em ângulos"""
    h, w = image.shape[:2]
    center = (w // 2, h // 2)
    M = cv2.getRotationMatrix2D(center, angle, 1.0)
    return cv2.warpAffine(
        image, M, (w, h), flags=cv2.INTER_CUBIC, borderMode=cv2.BORDER_CONSTANT)


def process_perspective(image):
    """Aplica correção de perspectiva à imagem"""
    h, w = image.shape[:2]
    # Pontos de origem simulados (em caso real, seriam detectados)
    pts1 = np.float32([[w*0.1, h*0.1], [w*0.9, h*0.1],
                      [w*0.1, h*0.9], [w*0.9, h*0.9]])
    pts2 = np.float32([[0, 0], [w, 0], [0, h], [w, h]])
    M = cv2.getPerspectiveTransform(pts1, pts2)
    return cv2.warpPerspective(image, M, (w, h))


def process_enhanced(image):
    """Melhora a imagem para destacar o texto"""
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    blurred = cv2.GaussianBlur(gray, (5, 5), 0)
    thresh = cv2.adaptiveThreshold(
        blurred, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C,
        cv2.THRESH_BINARY_INV, 11, 2)
    return thresh


def process_image(image, method="original"):
    """Processa a imagem usando o método especificado"""
    if method == "original":
        return process_original(image)
    elif method == "rotation":
        return process_rotation(image)
    elif method == "perspective":
        return process_perspective(image)
    elif method == "enhanced":
        enhanced = process_enhanced(image)
        # Converter para BGR para manter consistência com outros métodos
        return cv2.cvtColor(enhanced, cv2.COLOR_GRAY2BGR)
    else:
        raise ValueError(f"Método de processamento desconhecido: {method}")


def save_processed_image(image, method, output_dir):
    """Salva a imagem processada e retorna o caminho"""
    unique_id = str(uuid.uuid4())
    filename = f"{unique_id}_{method}.jpg"
    output_path = os.path.join(output_dir, filename)
    cv2.imwrite(output_path, image)
    return filename


def prepare_for_ocr(image, method):
    """Prepara a imagem para o OCR com base no método usado"""
    if method == "enhanced":
        # Para imagens binárias, converter para escala de cinza
        return cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    else:
        # Para outros métodos, usar RGB
        return cv2.cvtColor(image, cv2.COLOR_BGR2RGB) 