import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { MainNav } from '@/components/main-nav';
import { Footer } from '@/components/footer';
import { PageHeader } from '@/components/page-header';
import { ImageUpload } from '@/components/image-upload';
import { useToast } from '@/components/ui/use-toast';
import { Textarea } from "@/components/ui/textarea";
import { Check, Upload } from 'lucide-react';

// Componente de confetes
const Confetti = () => {
  const [confettiPieces, setConfettiPieces] = useState<Array<{
    id: number;
    left: number;
    animationDelay: number;
    animationDuration: number;
    color: string;
  }>>([]);

  useEffect(() => {
    const pieces = Array.from({ length: 50 }, (_, index) => ({
      id: index,
      left: Math.random() * 100,
      animationDelay: Math.random() * 3,
      animationDuration: Math.random() * 3 + 2,
      color: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7', '#a55eea'][Math.floor(Math.random() * 6)]
    }));
    setConfettiPieces(pieces);

    const timer = setTimeout(() => {
      setConfettiPieces([]);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  if (confettiPieces.length === 0) return null;
  return (
    <>
      <style>
        {`
          @keyframes confetti-fall {
            0% {
              transform: translateY(-100vh) rotate(0deg);
              opacity: 1;
            }
            100% {
              transform: translateY(100vh) rotate(720deg);
              opacity: 0;
            }
          }
        `}
      </style>
      <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
        {confettiPieces.map((piece) => (
          <div
            key={piece.id}
            className="absolute w-2 h-2 opacity-80"
            style={{
              left: `${piece.left}%`,
              backgroundColor: piece.color,
              animation: `confetti-fall ${piece.animationDuration}s ${piece.animationDelay}s linear forwards`,
            }}
          />
        ))}
      </div>
    </>
  );
};

const UploadContribuicao = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [files, setFiles] = useState<File[]>([]);
  const [cpf, setCpf] = useState('');
  const [observacoes, setObservacoes] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Verificar autenticação
  const isLoggedIn = Boolean(localStorage.getItem('token'));
  const userName = localStorage.getItem('userName') || 'Usuário';
  const userEmail = localStorage.getItem('userEmail') || 'email@exemplo.com';

  // Redirecionar para login se não estiver logado
  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login?redirect=/upload-contribuicao');
    }
  }, [isLoggedIn, navigate]);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (files.length === 0 || !cpf) {
      toast({
        title: 'Campos obrigatórios',
        description: 'Selecione pelo menos uma imagem e informe o CPF.',
        variant: 'destructive'
      });
      return;
    }

    setIsLoading(true);
    
    // Capturar data/hora do envio
    const agora = new Date();
    const dadosEnvio = {
      cpf,
      observacoes,
      dataEnvio: agora.toISOString(),
      userName,
      userEmail,
      arquivos: files
    };
    
    try {
      // Simular envio
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Dados enviados:', dadosEnvio);
      
      setSuccess(true);
      toast({
        title: 'Contribuição enviada',
        description: 'Suas imagens foram enviadas com sucesso.',
      });
    } catch (error) {
      toast({
        title: 'Erro ao enviar',
        description: 'Ocorreu um erro ao enviar as imagens.',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!isLoggedIn) {
    return null; // O useEffect já fará o redirecionamento
  }
  if (success) {
    return (
      <div className="flex flex-col min-h-screen">
        <MainNav />
        <Confetti />
        <main className="flex-1 py-16 flex items-center justify-center bg-gray-50">
          <Card className="max-w-md w-full mx-4 text-center">
            <CardContent className="pt-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Contribuição Enviada!</h2>
              <p className="text-gray-600 mb-4">Obrigada por ter colaborado com o nosso banco de dados!</p>
              <Button onClick={() => {
                setSuccess(false);
                setFiles([]);
                setCpf('');
                setObservacoes('');
              }}>
                Enviar outra imagem
              </Button>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <MainNav />
      <main className="flex-1 py-8 bg-gray-50">
        <div className="container max-w-4xl">
          <PageHeader
            title="Contribuir com Imagens"
            description="Ajude a expandir nossa base de dados com novas imagens de placas veiculares."
          />
          
          <Card>
            <CardHeader>
              <CardTitle>Upload de Imagens</CardTitle>
              <CardDescription>
                Envie imagens de placas veiculares para contribuir com nossa base de dados.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label>Imagens de Placas</Label>                  <ImageUpload
                    onChange={(files) => setFiles(files)}
                    multiple={true}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cpf">CPF *</Label>
                  <Input
                    id="cpf"
                    type="text"
                    value={cpf}
                    onChange={(e) => {
                      const valor = e.target.value.replace(/\D/g, '');
                      const cpfFormatado = valor.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
                      setCpf(cpfFormatado);
                    }}
                    placeholder="000.000.000-00"
                    maxLength={14}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="observacoes">Observações (opcional)</Label>
                  <Textarea
                    id="observacoes"
                    value={observacoes}
                    onChange={(e) => setObservacoes(e.target.value)}
                    placeholder="Informações adicionais sobre as imagens..."
                    className="resize-none"
                    rows={3}
                  />
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Upload className="w-4 h-4 mr-2" />
                      Enviar Contribuição
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default UploadContribuicao;