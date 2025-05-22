/**
 * Serviço para comunicação com a API de backend
 */

// URL base da API (pode ser configurada via variável de ambiente no futuro)
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Tipos de dados
export interface ProcessingOptions {
  use_original?: boolean;
  use_perspective?: boolean;
  use_rotation?: boolean;
  use_enhanced?: boolean;
  use_all_methods?: boolean;
}

export interface DetectionResult {
  success: boolean;
  methods: Record<string, ProcessedMethod>;
  best_result: {
    method: string;
    text: string;
    confidence: number;
  };
  original_image: string;
  error?: string;
}

export interface ProcessedMethod {
  method: string;
  text: string;
  confidence: number;
  processing_time: number;
  processed_image_path: string;
  error: string;
}

export interface SystemStatus {
  success: boolean;
  components: {
    api: boolean;
    ocr: boolean;
    upload_dir: boolean;
    processed_dir: boolean;
  };
  version: string;
}

/**
 * Classe principal de serviço da API
 */
export class ApiService {
  private baseUrl: string;

  constructor(baseUrl = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  /**
   * Envia uma imagem para detecção de placa
   */
  async detectPlate(
    imageFile: File,
    options: ProcessingOptions = {}
  ): Promise<DetectionResult> {
    try {
      const formData = new FormData();
      formData.append('image', imageFile);

      // Adicionar opções de processamento
      Object.entries(options).forEach(([key, value]) => {
        formData.append(key, value.toString());
      });

      const response = await fetch(`${this.baseUrl}/api/detect`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erro ao processar a imagem');
      }

      return response.json();
    } catch (error) {
      console.error('Erro na detecção de placa:', error);
      return {
        success: false,
        methods: {},
        best_result: { method: '', text: '', confidence: 0 },
        original_image: '',
        error: error instanceof Error ? error.message : 'Erro desconhecido',
      };
    }
  }

  /**
   * Obtém lista de imagens processadas
   */
  async getImages(): Promise<string[]> {
    try {
      const response = await fetch(`${this.baseUrl}/api/images`);
      if (!response.ok) {
        throw new Error('Falha ao obter lista de imagens');
      }
      const data = await response.json();
      return data.success ? data.images : [];
    } catch (error) {
      console.error('Erro ao obter imagens:', error);
      return [];
    }
  }

  /**
   * Verifica o status do sistema
   */
  async checkSystem(): Promise<SystemStatus> {
    try {
      const response = await fetch(`${this.baseUrl}/api/check-system`);
      if (!response.ok) {
        throw new Error('Falha ao verificar status do sistema');
      }
      return response.json();
    } catch (error) {
      console.error('Erro ao verificar sistema:', error);
      return {
        success: false,
        components: {
          api: false,
          ocr: false,
          upload_dir: false,
          processed_dir: false,
        },
        version: 'unknown',
      };
    }
  }

  /**
   * Constrói URL completa para uma imagem processada
   */
  getProcessedImageUrl(filename: string): string {
    return `${this.baseUrl}/processed/${filename}`;
  }

  /**
   * Constrói URL completa para uma imagem original
   */
  getUploadedImageUrl(filename: string): string {
    return `${this.baseUrl}/uploads/${filename}`;
  }
}

// Exporta uma instância padrão do serviço para uso em toda a aplicação
export default new ApiService(); 