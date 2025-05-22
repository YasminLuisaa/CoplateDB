
import { useState } from "react";
import { MainNav } from "@/components/main-nav";
import { Footer } from "@/components/footer";
import { PageHeader } from "@/components/page-header";
import { ImageCard } from "@/components/image-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Filter, Search } from "lucide-react";

export default function Collection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  
  // Mock data for demonstration
  const images = [
    {
      id: 1,
      title: "Placa SP-124578",
      imageUrl: "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
      date: new Date(2023, 5, 15),
      location: "São Paulo, SP",
      status: "approved",
    },
    {
      id: 2,
      title: "Placa RJ-AB3452",
      imageUrl: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
      date: new Date(2023, 6, 22),
      location: "Rio de Janeiro, RJ",
      status: "pending",
    },
    {
      id: 3,
      title: "Placa MG-98H765",
      imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
      date: new Date(2023, 7, 3),
      location: "Belo Horizonte, MG",
      status: "approved",
    },
    {
      id: 4,
      title: "Placa PR-12G456",
      imageUrl: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
      date: new Date(2023, 8, 12),
      location: "Curitiba, PR",
      status: "rejected",
    },
    {
      id: 5,
      title: "Placa DF-XY7890",
      imageUrl: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
      date: new Date(2023, 9, 5),
      location: "Brasília, DF",
      status: "approved",
    },
    {
      id: 6,
      title: "Placa RS-756TGH",
      imageUrl: "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
      date: new Date(2023, 9, 18),
      location: "Porto Alegre, RS",
      status: "pending",
    },
  ];
  
  const filteredImages = images.filter(image => {
    // Apply status filter
    if (statusFilter !== "all" && image.status !== statusFilter) {
      return false;
    }
    
    // Apply search filter if there's a query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        image.title.toLowerCase().includes(query) ||
        image.location.toLowerCase().includes(query)
      );
    }
    
    return true;
  });

  return (
    <div className="flex flex-col min-h-screen">
      <MainNav />
      <main className="flex-1 py-8 bg-gray-50">
        <div className="container-lg">
          <PageHeader
            title="Coleção de Imagens"
            description="Explore nossa coleção de imagens de placas veiculares anonimizadas."
          >
            <Button asChild>
              <a href="/upload">Contribuir com imagens</a>
            </Button>
          </PageHeader>
          
          <div className="mb-8 flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por título, localização..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
              />
            </div>
            
            <div className="flex gap-2 items-center">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="approved">Aprovados</SelectItem>
                  <SelectItem value="pending">Pendentes</SelectItem>
                  <SelectItem value="rejected">Rejeitados</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {filteredImages.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
                {filteredImages.map((image) => (
                  <ImageCard
                    key={image.id}
                    imageUrl={image.imageUrl}
                    title={image.title}
                    date={image.date}
                    location={image.location}
                    status={image.status as any}
                  />
                ))}
              </div>
              
              <Pagination className="my-8">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious href="#" />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#" isActive>1</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">2</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">3</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext href="#" />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </>
          ) : (
            <div className="text-center py-12 bg-white rounded-md">
              <h3 className="text-lg font-medium">Nenhuma imagem encontrada</h3>
              <p className="text-muted-foreground mt-1">
                Tente ajustar seus filtros ou termos de pesquisa.
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
