import React, { useState, useEffect } from 'react';

interface NavigationItem {
  id: string;
  label: string;
}

interface DotNavigationProps {
  items: NavigationItem[];
}

export const DotNavigation: React.FC<DotNavigationProps> = ({ items }) => {
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    // Definir seção inicial
    if (items.length > 0 && !activeSection) {
      setActiveSection(items[0].id);
    }
  }, [items, activeSection]);useEffect(() => {
    const handleScroll = () => {
      const sections = items.map(item => ({
        id: item.id,
        element: document.getElementById(item.id),
      })).filter(section => section.element); // Filtrar elementos que existem

      if (sections.length === 0) return;

      // Obter posição atual do scroll
      const scrollTop = window.scrollY;
      const viewportHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Verificar se estamos muito próximos do final da página (últimos 50px)
      if (scrollTop + viewportHeight >= documentHeight - 50) {
        setActiveSection(sections[sections.length - 1].id);
        return;
      }

      // Encontrar a seção que está mais visível no centro da viewport
      let activeSection = '';
      let maxVisibility = 0;
      const viewportCenter = scrollTop + viewportHeight / 2;

      for (const section of sections) {
        const element = section.element!;
        const rect = element.getBoundingClientRect();
        const elementTop = scrollTop + rect.top;
        const elementBottom = elementTop + rect.height;
        
        // Calcular quanto da seção está visível
        const visibleTop = Math.max(elementTop, scrollTop);
        const visibleBottom = Math.min(elementBottom, scrollTop + viewportHeight);
        const visibleHeight = Math.max(0, visibleBottom - visibleTop);
        
        // Priorizar seções que estão no centro da viewport
        const distanceFromCenter = Math.abs((elementTop + elementBottom) / 2 - viewportCenter);
        const centerBonus = Math.max(0, 1 - distanceFromCenter / viewportHeight);
        
        // Combinar visibilidade com proximidade ao centro
        const visibility = visibleHeight + (centerBonus * 200);
        
        if (visibility > maxVisibility) {
          maxVisibility = visibility;
          activeSection = section.id;
        }
      }

      // Se não encontramos nenhuma seção visível, usar a primeira
      if (!activeSection && sections.length > 0) {
        activeSection = sections[0].id;
      }      setActiveSection(activeSection);
    };// Adicionar listener de scroll com throttling melhorado
    let ticking = false;
    const handleScrollThrottled = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    // Adicionar listeners
    window.addEventListener('scroll', handleScrollThrottled, { passive: true });
    window.addEventListener('resize', handleScrollThrottled, { passive: true });
    
    // Executar inicialização após um delay para garantir que o DOM esteja pronto
    const initTimer = setTimeout(() => {
      handleScroll();
    }, 200);

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScrollThrottled);
      window.removeEventListener('resize', handleScrollThrottled);
      clearTimeout(initTimer);
    };
  }, [items]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop - 100; // Offset para compensar header fixo
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-40 hidden xl:block">
      <nav className="flex flex-col space-y-3 bg-white/90 backdrop-blur-sm rounded-full p-4 shadow-lg border border-gray-200">
        {items.map((item) => (
          <div
            key={item.id}
            className="group relative cursor-pointer"
            onClick={() => scrollToSection(item.id)}
          >
            {/* Dot indicator */}
            <div
              className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${
                activeSection === item.id
                  ? 'bg-blue-600 border-blue-600 scale-125 shadow-md'
                  : 'bg-transparent border-gray-400 hover:border-blue-500 hover:scale-110'
              }`}
            />
            
            {/* Label tooltip */}
            <div className="absolute right-full mr-6 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
              <div className="bg-gray-900 text-white text-sm px-3 py-2 rounded-lg whitespace-nowrap shadow-xl border border-gray-700">
                {item.label}
                {/* Arrow pointing to the dot */}
                <div className="absolute left-full top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-[6px] border-l-gray-900 border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent"></div>
              </div>
            </div>
          </div>
        ))}
      </nav>      {/* Progress indicator */}
      <div className="absolute -left-1 top-0 w-1 bg-gray-200 rounded-full h-full">
        <div 
          className="bg-blue-600 rounded-full transition-all duration-500 ease-out w-full"
          style={{
            height: `${(() => {
              const activeIndex = items.findIndex(item => item.id === activeSection);
              if (activeIndex === -1) return 0;
              
              // Calcular progresso baseado na posição atual
              const progress = ((activeIndex + 1) / items.length) * 100;
              return Math.min(100, Math.max(0, progress));
            })()}%`
          }}
        />
      </div>
    </div>
  );
};
