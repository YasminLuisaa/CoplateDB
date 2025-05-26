import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MainNav } from "@/components/main-nav";
import { Footer } from "@/components/footer";
import { PageHeader } from "@/components/page-header";
import { ImageUpload } from "@/components/image-upload";
import { useToast } from "@/components/ui/use-toast";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import apiService, { DetectionResult, ProcessedMethod } from "@/services/api";

// Componente KeyboardShortcut
const KeyboardShortcut = ({ keys, description }: { keys: string[]; description: string }) => (
  <div className="flex justify-between items-center py-2">
    <span className="text-gray-700">{description}</span>
    <div className="flex gap-1">
      {keys.map((key, index) => (
        <span
          key={index}
          className="px-2 py-1 bg-blue-100 text-blue-800 rounded border border-blue-200 text-sm font-mono"
        >
          {key}
        </span>
      ))}
    </div>
  </div>
);

export default function Upload() {
  const [files, setFiles] = useState<File[]>([]);
  const [location, setLocation] = useState("");
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [description, setDescription] = useState("");
  const [vehicleType, setVehicleType] = useState("car");
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Opções de processamento
  const [useOriginal, setUseOriginal] = useState(true);
  const [usePerspective, setUsePerspective] = useState(false);
  const [useRotation, setUseRotation] = useState(false);
  const [useEnhanced, setUseEnhanced] = useState(false);
  const [useAllMethods, setUseAllMethods] = useState(false);
  
  // Resultados da detecção
  const [detectionResult, setDetectionResult] = useState<DetectionResult | null>(null);
  const [selectedTab, setSelectedTab] = useState("result");
  
  const { toast } = useToast();

  // Quando useAllMethods muda, atualiza as outras opções
  const handleUseAllMethodsChange = (checked: boolean) => {
    setUseAllMethods(checked);
    if (checked) {
      setUseOriginal(true);
      setUsePerspective(true);
      setUseRotation(true);
      setUseEnhanced(true);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (files.length === 0) {
      toast({
        title: "Nenhum arquivo selecionado",
        description: "Por favor, selecione pelo menos uma imagem para upload.",
        variant: "destructive",
      });
      return;
    }
    
    setIsProcessing(true);
    
    try {
      // Enviar apenas a primeira imagem para processamento
      const imageFile = files[0];
      
      // Preparar opções de processamento
      const options = {
        use_original: useOriginal,
        use_perspective: usePerspective,
        use_rotation: useRotation,
        use_enhanced: useEnhanced,
        use_all_methods: useAllMethods
      };
      
      // Chamar a API
      const result = await apiService.detectPlate(imageFile, options);
      
      if (result.success) {
        setDetectionResult(result);
        setSelectedTab("result");
        toast({
          title: "Processamento concluído",
          description: `Placa detectada: ${result.best_result.text}`,
        });
      } else {
        toast({
          title: "Falha no processamento",
          description: result.error || "Ocorreu um erro ao processar a imagem.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Erro ao processar imagem:", error);
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao se comunicar com o servidor.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  // Event listener para atalhos de teclado
  const handleKeyboardShortcuts = useCallback((e: KeyboardEvent) => {
    // Ctrl + O: Selecionar arquivo
    if (e.ctrlKey && e.key.toLowerCase() === 'o') {
      e.preventDefault();
      document.querySelector<HTMLInputElement>('input[type="file"]')?.click();
    }
    
    // Alt + D: Iniciar detecção
    if (e.altKey && e.key.toLowerCase() === 'd') {
      e.preventDefault();
      if (files.length > 0) {
        handleSubmit(new Event('submit') as any);
      }
    }
    
    // Alt + R: Limpar formulário
    if (e.altKey && e.key.toLowerCase() === 'r') {
      e.preventDefault();
      setFiles([]);
      setDetectionResult(null);
    }
    
    // Alt + H: Mostrar histórico
    if (e.altKey && e.key.toLowerCase() === 'h') {
      e.preventDefault();
      setSelectedTab('history');
    }
  }, [files, handleSubmit, setDetectionResult, setSelectedTab]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyboardShortcuts);
    return () => window.removeEventListener('keydown', handleKeyboardShortcuts);
  }, [handleKeyboardShortcuts]);

  // Renderiza os resultados dos métodos
  const renderMethodResults = () => {
    if (!detectionResult) return null;
    
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        {Object.entries(detectionResult.methods).map(([method, data]) => (
          <Card key={method} className={method === detectionResult.best_result.method ? "border-primary" : ""}>
            <CardHeader className="py-3">
              <div className="flex justify-between items-center">
                <CardTitle className="text-base capitalize">{method}</CardTitle>
                {method === detectionResult.best_result.method && (
                  <span className="bg-primary text-white text-xs px-2 py-1 rounded-full">Melhor</span>
                )}
              </div>
            </CardHeader>
            <CardContent className="py-3">
              <div className="aspect-video bg-muted rounded-md overflow-hidden mb-3">
                <img 
                  src={apiService.getProcessedImageUrl(data.processed_image_path)} 
                  alt={`Placa processada com método ${method}`}
                  className="w-full h-full object-contain"
                />
              </div>
              
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium">Texto Detectado:</p>
                  <p className="font-mono text-xl">{data.text || "Não detectado"}</p>
                </div>
                
                <div>
                  <p className="text-sm font-medium">Confiança:</p>
                  <div className="w-full bg-muted rounded-full h-2.5 mt-1">
                    <div 
                      className="bg-primary h-2.5 rounded-full" 
                      style={{ width: `${data.confidence}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-right mt-1">{data.confidence}%</p>
                </div>
                
                <div>
                  <p className="text-sm font-medium">Tempo de Processamento:</p>
                  <p className="text-sm">{data.processing_time} ms</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col min-h-screen">
      <MainNav />
      <main className="flex-1 py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <PageHeader
            title="Detecção de Placas"
            description="Faça o upload de imagens para detectar placas veiculares."
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">              <Card>
                <CardHeader>
                  <CardTitle>Carregar Imagem</CardTitle>
                  <CardDescription>
                    Selecione uma imagem contendo uma placa veicular no padrão Mercosul.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ImageUpload 
                    onChange={setFiles} 
                    className="mb-6"
                    maxFiles={1}
                    multiple={false}
                  />
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-sm font-medium">Opções de Processamento</h3>
                      
                      <div className="space-y-4">
                        <div className="flex items-center justify-between space-x-2">
                          <Label htmlFor="useAllMethods" className="flex-1">
                            Usar todos os métodos de processamento
                            <span className="block text-xs text-muted-foreground mt-1">
                              Aplica todos os algoritmos e seleciona o melhor resultado
                            </span>
                          </Label>
                          <Switch
                            id="useAllMethods"
                            checked={useAllMethods}
                            onCheckedChange={handleUseAllMethodsChange}
                          />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div className="flex items-center space-x-2">
                            <Switch
                              id="useOriginal"
                              checked={useOriginal}
                              onCheckedChange={setUseOriginal}
                              disabled={useAllMethods}
                            />
                            <Label htmlFor="useOriginal">Original</Label>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <Switch
                              id="usePerspective"
                              checked={usePerspective}
                              onCheckedChange={setUsePerspective}
                              disabled={useAllMethods}
                            />
                            <Label htmlFor="usePerspective">Perspectiva</Label>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <Switch
                              id="useRotation"
                              checked={useRotation}
                              onCheckedChange={setUseRotation}
                              disabled={useAllMethods}
                            />
                            <Label htmlFor="useRotation">Rotação</Label>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <Switch
                              id="useEnhanced"
                              checked={useEnhanced}
                              onCheckedChange={setUseEnhanced}
                              disabled={useAllMethods}
                            />
                            <Label htmlFor="useEnhanced">Aprimorado</Label>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isProcessing || files.length === 0}
                    >
                      {isProcessing
                        ? "Processando..."
                        : "Detectar Placa"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
              
              {detectionResult && (
                <Card className="mt-8">
                  <CardHeader>
                    <CardTitle>Resultados</CardTitle>
                    <CardDescription>
                      Veja os resultados dos métodos de processamento aplicados.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Tabs value={selectedTab} onValueChange={setSelectedTab}>
                      <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="result">Melhor Resultado</TabsTrigger>
                        <TabsTrigger value="comparison">Comparação</TabsTrigger>
                        <TabsTrigger value="original">Imagem Original</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="result" className="pt-4">
                        {detectionResult.best_result.method !== "none" ? (
                          <div className="space-y-6">
                            <div className="aspect-video bg-muted rounded-md overflow-hidden">
                              <img 
                                src={apiService.getProcessedImageUrl(
                                  detectionResult.methods[detectionResult.best_result.method].processed_image_path
                                )} 
                                alt="Melhor resultado de processamento"
                                className="w-full h-full object-contain"
                              />
                            </div>
                            
                            <div className="grid grid-cols-2 gap-6">
                              <div>
                                <h3 className="text-lg font-medium">Placa Detectada</h3>
                                <p className="font-mono text-3xl mt-2">{detectionResult.best_result.text}</p>
                              </div>
                              
                              <div>
                                <h3 className="text-lg font-medium">Método</h3>
                                <p className="capitalize mt-2">{detectionResult.best_result.method}</p>
                                
                                <h3 className="text-lg font-medium mt-4">Confiança</h3>
                                <div className="w-full bg-muted rounded-full h-2.5 mt-2">
                                  <div 
                                    className="bg-primary h-2.5 rounded-full" 
                                    style={{ width: `${detectionResult.best_result.confidence}%` }}
                                  ></div>
                                </div>
                                <p className="text-sm text-right mt-1">{detectionResult.best_result.confidence}%</p>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="text-center py-12">
                            <p className="text-muted-foreground">Nenhuma placa detectada com confiança suficiente.</p>
                          </div>
                        )}
                      </TabsContent>
                      
                      <TabsContent value="comparison" className="pt-4">
                        {renderMethodResults()}
                      </TabsContent>
                      
                      <TabsContent value="original" className="pt-4">
                        <div className="aspect-video bg-muted rounded-md overflow-hidden">
                          <img 
                            src={apiService.getUploadedImageUrl(detectionResult.original_image)} 
                            alt="Imagem original"
                            className="w-full h-full object-contain"
                          />
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              )}
            </div>
            
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>
                    <div className="flex items-center justify-between">
                      <span>Atalhos de Teclado</span>
                      <span className="text-sm text-blue-600 bg-blue-100 px-2 py-1 rounded">Rápido Acesso</span>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <KeyboardShortcut keys={["Ctrl", "O"]} description="Selecionar arquivo" />
                  <KeyboardShortcut keys={["Alt", "D"]} description="Iniciar detecção" />
                  <KeyboardShortcut keys={["Alt", "R"]} description="Limpar formulário" />
                  <KeyboardShortcut keys={["Alt", "H"]} description="Mostrar histórico" />
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
