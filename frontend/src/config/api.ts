const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const api = {
  baseURL: API_BASE_URL,
  endpoints: {
    uploadImage: '/api/detect-plate',
    getDetections: '/api/detections',
    getStatistics: '/api/statistics',
    searchPlate: '/api/search'
  }
};

// Função helper para fazer requests
export const apiRequest = async (endpoint: string, options: RequestInit = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};

// Função específica para upload de imagens
export const uploadImage = async (file: File) => {
  const formData = new FormData();
  formData.append('image', file);

  const response = await fetch(`${API_BASE_URL}${api.endpoints.uploadImage}`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}; 