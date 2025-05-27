import os
from typing import Dict, List
import requests
from datetime import datetime


class DatabaseManager:
    def __init__(self):
        self.supabase_url = os.getenv('SUPABASE_URL')
        self.supabase_key = os.getenv('SUPABASE_ANON_KEY')
        self.headers = {
            'apikey': self.supabase_key,
            'Authorization': f'Bearer {self.supabase_key}',
            'Content-Type': 'application/json'
        }

    def create_detection_record(self, plate_text: str, confidence: float,
                                image_path: str) -> Dict:
        """Salva um registro de detecção de placa no banco"""
        data = {
            'plate_text': plate_text,
            'confidence': confidence,
            'image_path': image_path,
            'detected_at': datetime.now().isoformat(),
            'processed': True
        }

        response = requests.post(
            f'{self.supabase_url}/rest/v1/detections',
            headers=self.headers,
            json=data
        )

        if response.status_code == 201:
            return response.json()
        else:
            raise Exception(f"Erro ao salvar no banco: {response.text}")

    def get_all_detections(self, limit: int = 50) -> List[Dict]:
        """Recupera todas as detecções do banco"""
        url = (f'{self.supabase_url}/rest/v1/detections'
               f'?order=detected_at.desc&limit={limit}')
        response = requests.get(url, headers=self.headers)

        if response.status_code == 200:
            return response.json()
        else:
            raise Exception(f"Erro ao buscar dados: {response.text}")

    def search_by_plate(self, plate_text: str) -> List[Dict]:
        """Busca detecções por texto da placa"""
        url = (f'{self.supabase_url}/rest/v1/detections'
               f'?plate_text=ilike.%{plate_text}%')
        response = requests.get(url, headers=self.headers)

        if response.status_code == 200:
            return response.json()
        else:
            raise Exception(f"Erro na busca: {response.text}")

    def get_statistics(self) -> Dict:
        """Retorna estatísticas das detecções"""
        # Total de detecções
        total_url = f'{self.supabase_url}/rest/v1/detections?select=count'
        total_response = requests.get(total_url, headers=self.headers)

        # Média de confiança
        confidence_url = (f'{self.supabase_url}/rest/v1/detections'
                          f'?select=confidence')
        avg_response = requests.get(confidence_url, headers=self.headers)

        if (total_response.status_code == 200 and
                avg_response.status_code == 200):
            detections = avg_response.json()
            total = len(detections)
            if total > 0:
                confidence_sum = sum(d['confidence'] for d in detections)
                avg_confidence = confidence_sum / total
            else:
                avg_confidence = 0

            return {
                'total_detections': total,
                'average_confidence': round(avg_confidence, 2),
                'last_updated': datetime.now().isoformat()
            }

        return {'error': 'Erro ao buscar estatísticas'} 