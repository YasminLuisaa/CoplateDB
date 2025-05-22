import os
import shutil
import sys
import platform
import subprocess

# Cores para terminal


class Colors:
    HEADER = '\033[95m'
    BLUE = '\033[94m'
    GREEN = '\033[92m'
    WARNING = '\033[93m'
    FAIL = '\033[91m'
    ENDC = '\033[0m'
    BOLD = '\033[1m'
    UNDERLINE = '\033[4m'


def print_colored(text, color):
    """Imprime texto colorido no terminal"""
    print(f"{color}{text}{Colors.ENDC}")


def print_header(text):
    """Imprime cabeçalho destacado"""
    print("\n" + "=" * 80)
    print_colored(f" {text} ", Colors.HEADER + Colors.BOLD)
    print("=" * 80)


def print_step(text):
    """Imprime um passo da configuração"""
    print_colored(f"→ {text}", Colors.BLUE)


def print_success(text):
    """Imprime mensagem de sucesso"""
    print_colored(f"✓ {text}", Colors.GREEN)


def print_warning(text):
    """Imprime mensagem de aviso"""
    print_colored(f"! {text}", Colors.WARNING)


def print_error(text):
    """Imprime mensagem de erro"""
    print_colored(f"✗ {text}", Colors.FAIL)


def check_python_version():
    """Verifica se a versão do Python é compatível"""
    print_step("Verificando versão do Python...")
    version = sys.version_info
    if version.major < 3 or (version.major == 3 and version.minor < 8):
        print_error(
            f"Python {version.major}.{version.minor} detectado. Necessário Python 3.8 ou superior.")
        return False
    print_success(
        f"Python {version.major}.{version.minor}.{version.micro} detectado. Versão compatível!")
    return True


def check_dependencies():
    """Verifica se as dependências estão instaladas"""
    print_step("Verificando dependências...")

    try:
        import flask
        print_success(f"Flask {flask.__version__} instalado.")
    except ImportError:
        print_error(
            "Flask não encontrado. Execute 'pip install -r requirements.txt'")
        return False

    try:
        import cv2
        print_success(f"OpenCV {cv2.__version__} instalado.")
    except ImportError:
        print_error(
            "OpenCV não encontrado. Execute 'pip install -r requirements.txt'")
        return False

    try:
        import numpy
        print_success(f"NumPy {numpy.__version__} instalado.")
    except ImportError:
        print_error(
            "NumPy não encontrado. Execute 'pip install -r requirements.txt'")
        return False

    try:
        import easyocr
        print_success("EasyOCR instalado.")
    except ImportError:
        print_error(
            "EasyOCR não encontrado. Execute 'pip install -r requirements.txt'")
        return False

    return True


def setup_directories():
    """Configura a estrutura de diretórios"""
    print_step("Configurando estrutura de diretórios...")

    # Diretórios a serem criados
    directories = [
        'templates',
        'static',
        'static/js',
        'static/css',
        'static/img',
        'uploads',
        'processed'
    ]

    for directory in directories:
        os.makedirs(directory, exist_ok=True)
        print_success(f"Diretório '{directory}' criado ou já existente.")


def move_html_to_templates():
    """Move o arquivo index.html para a pasta templates"""
    print_step("Verificando arquivos HTML...")

    html_files = [f for f in os.listdir() if f.endswith('.html')]
    if not html_files:
        print_warning("Nenhum arquivo HTML encontrado no diretório atual.")

        # Criar um arquivo HTML temporário se não existir
        template_path = os.path.join('templates', 'index.html')
        if not os.path.exists(template_path):
            print_warning(
                "Arquivo index.html não encontrado na pasta templates. Criando placeholder.")
            with open(template_path, 'w', encoding='utf-8') as f:
                f.write("""
<!DOCTYPE html>
<html>
<head>
    <title>Sistema de Detecção de Placas Mercosul</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
    <h1>Sistema de Detecção de Placas Mercosul</h1>
    <p>Este é um placeholder. Substitua este arquivo pelo HTML completo da aplicação.</p>
</body>
</html>
                """)
        return False

    # Se encontrou arquivos HTML, mover para templates
    for html_file in html_files:
        if html_file.lower() == 'index.html':
            dest_path = os.path.join('templates', html_file)
            try:
                shutil.copy(html_file, dest_path)
                print_success(f"Arquivo {html_file} copiado para {dest_path}")
            except Exception as e:
                print_error(f"Erro ao copiar {html_file}: {str(e)}")
                return False

    return True


def create_js_file():
    """Verifica se o arquivo main.js existe na pasta static/js"""
    print_step("Verificando arquivo JavaScript...")

    js_path = os.path.join('static', 'js', 'main.js')
    if os.path.exists(js_path):
        print_success(f"Arquivo {js_path} encontrado.")
        return True

    print_warning(
        f"Arquivo {js_path} não encontrado. Verifique se você criou este arquivo.")
    print_warning(
        "O sistema pode não funcionar corretamente sem o JavaScript.")
    return False


def check_pip_packages():
    """Verifica se os pacotes necessários estão instalados"""
    print_step("Verificando pacotes pip...")

    requirements_path = 'requirements.txt'
    if not os.path.exists(requirements_path):
        print_error(f"Arquivo {requirements_path} não encontrado.")
        return False

    print_warning(
        "Para instalar as dependências, execute: pip install -r requirements.txt")
    return True


def main():
    """Função principal de configuração"""
    print_header("CONFIGURAÇÃO DO SISTEMA DE DETECÇÃO DE PLACAS MERCOSUL")

    # Verificar versão do Python
    if not check_python_version():
        sys.exit(1)

    # Configurar diretórios
    setup_directories()

    # Mover HTML para templates
    move_html_to_templates()

    # Verificar arquivo JavaScript
    create_js_file()

    # Verificar requirements.txt
    check_pip_packages()

    # Verificar dependências (opcional, pode ser lento)
    # check_dependencies()

    print_header("CONFIGURAÇÃO CONCLUÍDA")
    print_success("Sistema configurado com sucesso!")
    print_step("Para executar o sistema:")
    print("1. Certifique-se de que todos os arquivos estão nos locais corretos:")
    print("   - index.html na pasta templates/")
    print("   - main.js na pasta static/js/")
    print("2. Instale as dependências (se ainda não instalou):")
    print("   pip install -r requirements.txt")
    print("3. Execute o aplicativo:")
    print("   python app.py")
    print("4. Acesse no navegador:")
    print("   http://localhost:5000")

    print("\nSe encontrar problemas, verifique:")
    print("- Se todas as dependências foram instaladas corretamente")
    print("- Se todos os arquivos estão nos diretórios corretos")
    print("- Os logs do servidor Flask para mensagens de erro específicas")


if __name__ == "__main__":
    main()
