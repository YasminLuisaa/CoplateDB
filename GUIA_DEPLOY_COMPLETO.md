# 🚀 Guia Completo de Deploy Gratuito

Este guia mostra como fazer o deploy completo do seu sistema de detecção de placas Mercosul gratuitamente.

## 📋 Arquitetura do Deploy

- **Frontend**: Vercel (React + Vite)
- **Backend**: Render (Flask + Python)
- **Banco de Dados**: Supabase (PostgreSQL)
- **Armazenamento**: Cloudinary (imagens)

## 🗄️ 1. Configuração do Banco de Dados (Supabase)

### Passo 1: Criar conta no Supabase
1. Acesse [https://supabase.com](https://supabase.com)
2. Clique em "Start your project"
3. Faça login com GitHub
4. Crie um novo projeto

### Passo 2: Criar tabela de detecções
```sql
CREATE TABLE detections (
  id SERIAL PRIMARY KEY,
  plate_text VARCHAR(10) NOT NULL,
  confidence DECIMAL(5,4) NOT NULL,
  image_path TEXT,
  detected_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  processed BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para melhor performance
CREATE INDEX idx_detections_plate_text ON detections(plate_text);
CREATE INDEX idx_detections_detected_at ON detections(detected_at);
```

### Passo 3: Configurar RLS (Row Level Security)
```sql
-- Habilitar RLS
ALTER TABLE detections ENABLE ROW LEVEL SECURITY;

-- Permitir operações para usuários autenticados
CREATE POLICY "Permitir todas operações" ON detections
  FOR ALL USING (true);
```

### Passo 4: Obter credenciais
- Vá em Settings → API
- Copie:
  - Project URL
  - anon/public key

## 🔧 2. Deploy do Backend (Render)

### Passo 1: Preparar repositório
1. Faça commit de todas as alterações
2. Push para GitHub

### Passo 2: Configurar Render
1. Acesse [https://render.com](https://render.com)
2. Conecte sua conta GitHub
3. Clique em "New Web Service"
4. Selecione seu repositório
5. Configure:
   - **Build Command**: `pip install --upgrade pip && pip install -r backend/requirements.txt && cd backend && python setup.py`
   - **Start Command**: `cd backend && gunicorn app:app --bind 0.0.0.0:$PORT`
   - **Environment**: Python 3

### Passo 3: Variáveis de ambiente no Render
```
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
FLASK_ENV=production
FRONTEND_URL=https://your-app.vercel.app
```

## 🌐 3. Deploy do Frontend (Vercel)

### Passo 1: Configurar variáveis de ambiente
No painel do Vercel, adicione:
```
VITE_API_URL=https://your-backend.onrender.com
```

### Passo 2: Atualizar código do frontend
Crie o arquivo `frontend/src/config/api.ts`:
```typescript
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
```

### Passo 3: Deploy
1. Conecte seu repositório ao Vercel
2. Configure o Root Directory como `frontend`
3. Deploy automático acontecerá

## 🔄 4. Integração Completa

### Atualizar app.py com banco de dados
```python
from database import DatabaseManager
import os

# Inicializar banco
db = DatabaseManager()

@app.route('/api/detect-plate', methods=['POST'])
def detect_plate():
    try:
        # ... código de detecção existente ...
        
        # Salvar no banco de dados
        if confidence > 0.7:  # Só salva se confiança > 70%
            db.create_detection_record(
                plate_text=plate_text,
                confidence=confidence,
                image_path=processed_path
            )
        
        return jsonify({
            'success': True,
            'plate_text': plate_text,
            'confidence': confidence,
            'image_url': processed_url
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/detections', methods=['GET'])
def get_detections():
    try:
        limit = request.args.get('limit', 50, type=int)
        detections = db.get_all_detections(limit)
        return jsonify(detections)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/statistics', methods=['GET'])
def get_statistics():
    try:
        stats = db.get_statistics()
        return jsonify(stats)
    except Exception as e:
        return jsonify({'error': str(e)}), 500
```

## 📱 5. Adicionar Dashboard no Frontend

Crie `frontend/src/components/Dashboard.tsx`:
```tsx
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Detection {
  id: number;
  plate_text: string;
  confidence: number;
  detected_at: string;
}

export function Dashboard() {
  const [detections, setDetections] = useState<Detection[]>([]);
  const [stats, setStats] = useState({
    total_detections: 0,
    average_confidence: 0
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [detectionsRes, statsRes] = await Promise.all([
        fetch(`${import.meta.env.VITE_API_URL}/api/detections`),
        fetch(`${import.meta.env.VITE_API_URL}/api/statistics`)
      ]);

      const detectionsData = await detectionsRes.json();
      const statsData = await statsRes.json();

      setDetections(detectionsData);
      setStats(statsData);
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Total de Detecções</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.total_detections}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Confiança Média</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.average_confidence}%</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Últimas Detecções</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {detections.map((detection) => (
              <div key={detection.id} className="flex justify-between items-center p-3 border rounded">
                <span className="font-mono text-lg">{detection.plate_text}</span>
                <span className="text-sm text-gray-500">
                  {new Date(detection.detected_at).toLocaleDateString('pt-BR')}
                </span>
                <span className="text-sm bg-green-100 px-2 py-1 rounded">
                  {(detection.confidence * 100).toFixed(1)}%
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
```

## ✅ 6. Checklist Final

### Backend (Render)
- [ ] Variáveis de ambiente configuradas
- [ ] Build command correto
- [ ] Start command correto
- [ ] Banco de dados conectado

### Frontend (Vercel)
- [ ] VITE_API_URL configurado
- [ ] Build funcionando
- [ ] CORS configurado no backend

### Banco de Dados (Supabase)
- [ ] Tabela `detections` criada
- [ ] RLS configurado
- [ ] Credenciais copiadas

## 🔧 Troubleshooting

### Erro de CORS
```python
# Em app.py, configure CORS para produção
from flask_cors import CORS

CORS(app, origins=[
    "http://localhost:5173",  # Desenvolvimento
    "https://your-app.vercel.app"  # Produção
])
```

### Erro de Build no Render
- Verifique se o `requirements.txt` está correto
- Confirme o Python version (3.11 recomendado)
- Verifique logs de build

### Frontend não conecta com Backend
- Confirme VITE_API_URL
- Teste endpoints manualmente
- Verifique HTTPS vs HTTP

## 💰 Custos Estimados

**TOTALMENTE GRATUITO** com os limites:
- Vercel: 100GB bandwidth/mês
- Render: 750 horas/mês (suficiente para 24/7)
- Supabase: 500MB database, 2GB transfer

## 🎯 Próximos Passos

1. Configurar monitoramento com Sentry (gratuito)
2. Adicionar cache com Redis (Upstash gratuito)
3. Implementar autenticação
4. Configurar backup automático 