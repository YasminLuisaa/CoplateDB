import React, { useState } from 'react';
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
    return (
      <div className="flex flex-col min-h-screen">
        <MainNav />
        <main className="flex-1 py-16 flex items-center justify-center bg-gray-50">
          <Card className="max-w-md w-full mx-4">
            <CardHeader>
              <CardTitle>Acesso Restrito</CardTitle>
              <CardDescription>Faça login para contribuir com imagens.</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" onClick={() => navigate('/login')}>
                Fazer Login
              </Button>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  if (success) {
    return (
      <div className="flex flex-col min-h-screen">
        <MainNav />
        <main className="flex-1 py-16 flex items-center justify-center bg-gray-50">
          <Card className="max-w-md w-full mx-4 text-center">
            <CardContent className="pt-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Contribuição Enviada!</h2>
              <p className="text-gray-600 mb-4">Suas imagens foram enviadas com sucesso e passarão por validação.</p>
              <Button onClick={() => {
                setSuccess(false);
                setFiles([]);
                setCpf('');
                setObservacoes('');
              }}>
                Enviar mais imagens
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