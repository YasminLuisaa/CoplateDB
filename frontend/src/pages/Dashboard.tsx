
import { useState } from "react";
import { MainNav } from "@/components/main-nav";
import { Footer } from "@/components/footer";
import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatsCard } from "@/components/stats-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ResponsiveContainer, LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { Database, Image, Upload, Search, User, ArrowDown, Check, AlertTriangle, Plus } from "lucide-react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [userStats] = useState({
    uploads: 27,
    contribution: "91%",
    collections: 3,
    apiCalls: 182,
    verifications: 48,
    lastActive: "Hoje",
  });

  // Mock data for charts
  const activityData = [
    { name: "Jan", uploads: 4, validations: 9 },
    { name: "Fev", uploads: 2, validations: 12 },
    { name: "Mar", uploads: 7, validations: 10 },
    { name: "Abr", uploads: 3, validations: 5 },
    { name: "Mai", uploads: 5, validations: 14 },
    { name: "Jun", uploads: 6, validations: 8 },
  ];

  const qualityData = [
    { name: "Alta", value: 67 },
    { name: "Média", value: 28 },
    { name: "Baixa", value: 5 },
  ];

  const formatShare = (value: number) => `${value}%`;

  return (
    <div className="flex flex-col min-h-screen">
      <MainNav />      <main className="flex-1 py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <PageHeader
            title="Dashboard"
            description="Gerencie suas contribuições e acompanhe suas estatísticas."
          >
            <Button asChild>
              <Link to="/upload">Nova Contribuição</Link>
            </Button>
          </PageHeader>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatsCard
              title="Total de Uploads"
              value={userStats.uploads.toString()}
              icon={<Upload className="h-4 w-4" />}
            />
            <StatsCard
              title="Taxa de Aprovação"
              value={userStats.contribution}
              icon={<Image className="h-4 w-4" />}
            />
            <StatsCard
              title="Validações"
              value={userStats.verifications.toString()}
              icon={<Search className="h-4 w-4" />}
            />
            <StatsCard
              title="Chamadas de API"
              value={userStats.apiCalls.toString()}
              icon={<Database className="h-4 w-4" />}
            />
          </div>

          <Tabs defaultValue="activity" className="mb-8">
            <TabsList>
              <TabsTrigger value="activity">Atividade Recente</TabsTrigger>
              <TabsTrigger value="quality">Qualidade</TabsTrigger>
              <TabsTrigger value="collections">Coleções</TabsTrigger>
            </TabsList>
            <TabsContent value="activity">
              <Card>
                <CardHeader>
                  <CardTitle>Atividade dos Últimos 6 Meses</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={activityData}
                        margin={{
                          top: 5,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line 
                          type="monotone" 
                          dataKey="uploads" 
                          stroke="#0EA5E9" 
                          activeDot={{ r: 8 }} 
                        />
                        <Line 
                          type="monotone" 
                          dataKey="validations" 
                          stroke="#F97316" 
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="quality">
              <Card>
                <CardHeader>
                  <CardTitle>Distribuição por Qualidade</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={qualityData}
                        margin={{
                          top: 5,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis tickFormatter={formatShare} />
                        <Tooltip formatter={formatShare} />
                        <Legend />
                        <Bar dataKey="value" name="Proporção" fill="#0EA5E9" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="collections">
              <Card>
                <CardHeader>
                  <CardTitle>Suas Coleções</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border rounded-md p-4 flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">Placas Urbanas</h3>
                        <p className="text-sm text-muted-foreground">12 imagens • Última atualização: 3 dias atrás</p>
                      </div>
                      <Button variant="outline" size="sm">Gerenciar</Button>
                    </div>
                    <div className="border rounded-md p-4 flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">Placas Especiais</h3>
                        <p className="text-sm text-muted-foreground">8 imagens • Última atualização: 1 semana atrás</p>
                      </div>
                      <Button variant="outline" size="sm">Gerenciar</Button>
                    </div>
                    <div className="border rounded-md p-4 flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">Veículos de Carga</h3>
                        <p className="text-sm text-muted-foreground">7 imagens • Última atualização: 2 semanas atrás</p>
                      </div>
                      <Button variant="outline" size="sm">Gerenciar</Button>
                    </div>
                  </div>
                  <Button className="w-full mt-4" variant="outline">
                    <Plus className="h-4 w-4 mr-2" />
                    Criar Nova Coleção
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Atividade Recente</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 pb-3 border-b">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <Upload className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Você enviou 3 novas imagens</p>
                      <p className="text-xs text-muted-foreground">Hoje, 10:45</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 pb-3 border-b">
                    <div className="bg-green-100 p-2 rounded-full">
                      <Check className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">2 imagens foram aprovadas</p>
                      <p className="text-xs text-muted-foreground">Ontem, 15:32</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 pb-3 border-b">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <Search className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Você validou 5 imagens</p>
                      <p className="text-xs text-muted-foreground">Há 2 dias, 09:15</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-yellow-100 p-2 rounded-full">
                      <AlertTriangle className="h-4 w-4 text-yellow-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">1 imagem precisa de revisão</p>
                      <p className="text-xs text-muted-foreground">Há 3 dias, 14:22</p>
                    </div>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="mt-4 mx-auto flex">
                  Ver todas as atividades
                  <ArrowDown className="h-4 w-4 ml-1" />
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Seu Perfil</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center mb-4">
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-2">
                    <User className="h-10 w-10 text-primary" />
                  </div>
                  <h3 className="font-medium">João Silva</h3>
                  <p className="text-sm text-muted-foreground">Pesquisador</p>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Membro desde</span>
                    <span>Março 2023</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Nível</span>
                    <span>Contribuidor Pro</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Última atividade</span>
                    <span>{userStats.lastActive}</span>
                  </div>
                </div>

                <Button variant="outline" className="w-full">
                  Editar Perfil
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
