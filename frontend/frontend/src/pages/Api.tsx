
import { MainNav } from "@/components/main-nav";
import { Footer } from "@/components/footer";
import { PageHeader } from "@/components/page-header";
import { ApiEndpointCard } from "@/components/api-endpoint-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Api() {
  return (
    <div className="flex flex-col min-h-screen">
      <MainNav />
      <main className="flex-1 py-8 bg-gray-50">
        <div className="container-lg">
          <PageHeader
            title="Documentação da API"
            description="Integre o CoPlateDB em suas aplicações com nossa API robusta e flexível."
          >
            <Button asChild>
              <a href="/register">Obter chave de API</a>
            </Button>
          </PageHeader>
          
          <div className="grid grid-cols-1 lg:grid-cols-7 gap-8">
            <div className="lg:col-span-5">
              <Tabs defaultValue="overview">
                <div className="bg-white rounded-md p-4 mb-6">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="overview">Visão Geral</TabsTrigger>
                    <TabsTrigger value="auth">Autenticação</TabsTrigger>
                    <TabsTrigger value="endpoints">Endpoints</TabsTrigger>
                    <TabsTrigger value="examples">Exemplos</TabsTrigger>
                  </TabsList>
                </div>
                
                <TabsContent value="overview" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Introdução à API</CardTitle>
                      <CardDescription>
                        A API do CoPlateDB permite que desenvolvedores acessem nossa base de dados de imagens de placas veiculares e utilizem nossos serviços de processamento.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p>Nossa API REST oferece as seguintes funcionalidades principais:</p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>Acesso a imagens de placas veiculares anonimizadas</li>
                        <li>Conversão de imagens de placas em formato JSON estruturado</li>
                        <li>Extração de caracteres de placas veiculares</li>
                        <li>Verificação e validação de placas</li>
                      </ul>
                      
                      <h3 className="text-lg font-medium mt-6">Base URL</h3>
                      <code className="bg-muted p-2 rounded block">
                        https://api.coplatedb.org/v1
                      </code>
                      
                      <h3 className="text-lg font-medium mt-6">Formatos de Resposta</h3>
                      <p>Todas as respostas são retornadas no formato JSON.</p>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="auth" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Autenticação</CardTitle>
                      <CardDescription>
                        A API utiliza autenticação por token para todas as requisições.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <h3 className="text-lg font-medium">Token de API</h3>
                      <p>
                        Para utilizar a API, você precisa incluir seu token de API no cabeçalho de cada requisição:
                      </p>
                      <code className="bg-muted p-2 rounded block">
                        Authorization: Bearer {"{seu-token-aqui}"}
                      </code>
                      
                      <h3 className="text-lg font-medium mt-6">Obter um Token</h3>
                      <p>
                        Para obter um token de API, você precisa se registrar no CoPlateDB. Após o registro, você poderá gerar e gerenciar suas chaves de API no painel do desenvolvedor.
                      </p>
                      <div className="flex gap-4 mt-4">
                        <Button asChild>
                          <Link to="/register">Registrar-se</Link>
                        </Button>
                        <Button variant="outline" asChild>
                          <Link to="/login">Entrar</Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="endpoints" className="space-y-6">
                  <ApiEndpointCard
                    method="GET"
                    endpoint="/images"
                    title="Listar Imagens"
                    description="Recupera uma lista paginada de imagens disponíveis na coleção."
                  >
                    <h3 className="text-base font-medium">Parâmetros</h3>
                    <div className="mt-2 space-y-2">
                      <div>
                        <code className="text-sm bg-muted px-1 py-0.5 rounded">page</code>
                        <span className="ml-2">Número da página (padrão: 1)</span>
                      </div>
                      <div>
                        <code className="text-sm bg-muted px-1 py-0.5 rounded">limit</code>
                        <span className="ml-2">Resultados por página (padrão: 20, máx: 100)</span>
                      </div>
                      <div>
                        <code className="text-sm bg-muted px-1 py-0.5 rounded">status</code>
                        <span className="ml-2">Filtro por status: approved, pending, rejected</span>
                      </div>
                    </div>
                  </ApiEndpointCard>
                  
                  <ApiEndpointCard
                    method="GET"
                    endpoint="/images/{id}"
                    title="Detalhar Imagem"
                    description="Recupera detalhes de uma imagem específica pelo seu ID."
                  />
                  
                  <ApiEndpointCard
                    method="POST"
                    endpoint="/images/upload"
                    title="Enviar Imagem"
                    description="Envia uma nova imagem para a coleção."
                  >
                    <h3 className="text-base font-medium">Corpo da Requisição</h3>
                    <pre className="bg-muted p-2 rounded mt-2 overflow-auto">
                      {JSON.stringify({
                        image: "base64_encoded_string",
                        location: "São Paulo, SP",
                        date: "2023-09-10",
                        vehicleType: "car",
                        description: "Opcional: descrição da imagem"
                      }, null, 2)}
                    </pre>
                  </ApiEndpointCard>
                  
                  <ApiEndpointCard
                    method="POST"
                    endpoint="/process"
                    title="Processar Imagem"
                    description="Processa uma imagem de placa veicular e retorna o texto reconhecido em formato estruturado."
                  >
                    <h3 className="text-base font-medium">Corpo da Requisição</h3>
                    <pre className="bg-muted p-2 rounded mt-2 overflow-auto">
                      {JSON.stringify({
                        image: "base64_encoded_string",
                        options: {
                          anonymize: true,
                          format: "json"
                        }
                      }, null, 2)}
                    </pre>
                    
                    <h3 className="text-base font-medium mt-4">Resposta</h3>
                    <pre className="bg-muted p-2 rounded mt-2 overflow-auto">
                      {JSON.stringify({
                        success: true,
                        data: {
                          plate: "XXX-0000",
                          confidence: 0.95,
                          regionCode: "SP",
                          country: "BR",
                          anonymizedImage: "base64_encoded_string"
                        }
                      }, null, 2)}
                    </pre>
                  </ApiEndpointCard>
                </TabsContent>
                
                <TabsContent value="examples" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Exemplos de Código</CardTitle>
                      <CardDescription>
                        Exemplos práticos de como utilizar a API em diferentes linguagens.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <h3 className="text-lg font-medium mb-2">cURL</h3>
                      <pre className="bg-muted p-2 rounded overflow-auto">
                        {`curl -X POST https://api.coplatedb.org/v1/process \\
  -H "Authorization: Bearer your_api_token" \\
  -H "Content-Type: application/json" \\
  -d '{
    "image": "base64_encoded_image_data",
    "options": {
      "anonymize": true,
      "format": "json"
    }
  }'`}
                      </pre>
                      
                      <h3 className="text-lg font-medium mt-6 mb-2">Python</h3>
                      <pre className="bg-muted p-2 rounded overflow-auto">
                        {`import requests
import base64

# Carregar a imagem como base64
with open('plate_image.jpg', 'rb') as image_file:
    encoded_image = base64.b64encode(image_file.read()).decode('utf-8')

# Definir a URL e cabeçalhos
url = "https://api.coplatedb.org/v1/process"
headers = {
    "Authorization": "Bearer your_api_token",
    "Content-Type": "application/json"
}

# Dados da requisição
data = {
    "image": encoded_image,
    "options": {
        "anonymize": True,
        "format": "json"
    }
}

# Enviar a solicitação
response = requests.post(url, headers=headers, json=data)
result = response.json()

print(result)`}
                      </pre>
                      
                      <h3 className="text-lg font-medium mt-6 mb-2">JavaScript</h3>
                      <pre className="bg-muted p-2 rounded overflow-auto">
                        {`async function processPlateImage(imageBase64) {
  const response = await fetch('https://api.coplatedb.org/v1/process', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer your_api_token',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      image: imageBase64,
      options: {
        anonymize: true,
        format: 'json'
      }
    })
  });

  const data = await response.json();
  return data;
}

// Exemplo de uso
const fileInput = document.getElementById('fileInput');
fileInput.addEventListener('change', async (e) => {
  const file = e.target.files[0];
  
  if (file) {
    const reader = new FileReader();
    reader.onload = async (event) => {
      const base64Image = event.target.result.split(',')[1];
      try {
        const result = await processPlateImage(base64Image);
        console.log(result);
      } catch (error) {
        console.error('Error processing image:', error);
      }
    };
    reader.readAsDataURL(file);
  }
});`}
                      </pre>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
            
            <div className="lg:col-span-2">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>Limites de Uso</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-1">Plano Gratuito</h3>
                    <ul className="text-sm text-muted-foreground space-y-2">
                      <li>500 requisições/mês</li>
                      <li>Taxa de 10 req/min</li>
                      <li>Acesso limitado à coleção</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-1">Plano Pesquisador</h3>
                    <ul className="text-sm text-muted-foreground space-y-2">
                      <li>5.000 requisições/mês</li>
                      <li>Taxa de 30 req/min</li>
                      <li>Acesso completo à coleção</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-1">Plano Enterprise</h3>
                    <ul className="text-sm text-muted-foreground space-y-2">
                      <li>Volume ilimitado</li>
                      <li>Taxa personalizada</li>
                      <li>Suporte dedicado</li>
                    </ul>
                  </div>
                  
                  <Button className="w-full mt-4">
                    Comparar Planos
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
