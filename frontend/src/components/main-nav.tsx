
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { Logo } from "@/components/logo";
import { cn } from "@/lib/utils";
import { title } from "process";

const items = [


  { title: "Início", href: "/" },
  { title: "Coleção", href: "/collection" },
  { title: "Upload", href: "/upload" },
  { title: "Dashboard", href: "/dashboard" },
  { title: "API", href: "/api" },
  { title: "Sobre", href: "/about" },
];

export function MainNav({ className }: { className?: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={cn("bg-white border-b border-gray-100 sticky top-0 z-50", className)}>
      <div className="container-lg flex justify-between items-center h-16">
        <Link to="/" className="flex items-center gap-2">
          <Logo />
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {items.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className="text-muted-foreground font-medium text-sm hover:text-brand-blue transition-colors"
            >
              {item.title}
            </Link>
          ))}
          
          <div className="flex gap-2">
            <Button variant="outline" asChild>
              <Link to="/login">Entrar</Link>
            </Button>
            <Button asChild>
              <Link to="/register">Cadastrar</Link>
            </Button>
          </div>
        </nav>
        
        {/* Mobile Navigation */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="sm">
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <div className="flex flex-col gap-6 mt-8">
              {items.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className="text-foreground font-medium text-lg"
                  onClick={() => setIsOpen(false)}
                >
                  {item.title}
                </Link>
              ))}
              <div className="flex flex-col gap-3 mt-4">
                <Button variant="outline" asChild>
                  <Link to="/login" onClick={() => setIsOpen(false)}>
                    Entrar
                  </Link>
                </Button>
                <Button asChild onClick={() => setIsOpen(false)}>
                  <Link to="/register">Cadastrar</Link>
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}
