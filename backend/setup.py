import os
import sys

def setup_directories():
    """
    Configura os diretórios necessários para a aplicação.
    """
    # Diretório atual
    base_dir = os.path.dirname(os.path.abspath(__file__))
    
    # Diretórios necessários
    dirs = [
        os.path.join(base_dir, 'uploads'),
        os.path.join(base_dir, 'processed'),
        os.path.join(base_dir, 'static')
    ]
    
    # Criar diretórios se não existirem
    for directory in dirs:
        if not os.path.exists(directory):
            os.makedirs(directory)
            print(f"✓ Diretório criado: {directory}")
        else:
            print(f"✓ Diretório já existe: {directory}")
    
    print("\nDiretórios configurados com sucesso!")

def check_requirements():
    """
    Verifica se as dependências necessárias estão instaladas.
    """
    try:
        import cv2
        print(f"✓ OpenCV: {cv2.__version__}")
    except ImportError:
        print("✗ OpenCV não está instalado")
        print("  Instale com: pip install opencv-python")
        return False
    
    try:
        import easyocr
        print(f"✓ EasyOCR instalado")
    except ImportError:
        print("✗ EasyOCR não está instalado")
        print("  Instale com: pip install easyocr")
        return False
    
    try:
        import numpy
        print(f"✓ NumPy: {numpy.__version__}")
    except ImportError:
        print("✗ NumPy não está instalado")
        print("  Instale com: pip install numpy")
        return False
    
    try:
        import flask
        print(f"✓ Flask: {flask.__version__}")
    except ImportError:
        print("✗ Flask não está instalado")
        print("  Instale com: pip install flask")
        return False
    
    try:
        import flask_cors
        print(f"✓ Flask-CORS instalado")
    except ImportError:
        print("✗ Flask-CORS não está instalado")
        print("  Instale com: pip install flask-cors")
        return False
    
    return True

def setup_production_mode():
    """
    Configura a aplicação para execução em modo de produção.
    """
    # Criar diretório static se não existir
    base_dir = os.path.dirname(os.path.abspath(__file__))
    static_dir = os.path.join(base_dir, 'static')
    
    if not os.path.exists(static_dir):
        os.makedirs(static_dir)
        print(f"✓ Diretório static criado: {static_dir}")
    
    # Verificar se já tem arquivos do frontend
    if not os.listdir(static_dir):
        print("\n⚠️ AVISO: O diretório 'static' está vazio.")
        print("Para executar em modo de produção, você precisa construir o frontend React:")
        print("1. Navegue até o diretório 'frontend': cd ../frontend")
        print("2. Execute o comando de build: npm run build")
        print("3. Copie o conteúdo da pasta 'frontend/dist' para 'backend/static'")

def main():
    """Função principal do script de configuração"""
    print("\n=======================================")
    print("  Configuração do Sistema de Detecção de Placas")
    print("=======================================\n")
    
    # Verificar dependências
    print("Verificando dependências...")
    if not check_requirements():
        print("\n❌ Algumas dependências não estão instaladas.")
        print("Por favor, instale-as e execute este script novamente.")
        return
    
    print("\n✓ Todas as dependências instaladas!\n")
    
    # Configurar diretórios
    print("Configurando diretórios...\n")
    setup_directories()
    
    # Verificar configuração para produção
    print("\nVerificando configuração para produção...")
    setup_production_mode()
    
    print("\n=======================================")
    print("  Configuração concluída com sucesso!")
    print("=======================================\n")
    print("Você pode iniciar o servidor com:")
    print("  python app.py")

if __name__ == "__main__":
    main() 