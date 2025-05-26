type PlateProps = {
  text?: string;
};

export function MercosulPlate({ text = "ABC1D34" }: PlateProps) {
  return (
    <div className="w-[400px] h-[140px] bg-white rounded-lg border-4 border-[#003399] relative shadow-xl">
      {/* Faixa azul superior */}
      <div className="absolute top-0 left-0 w-full h-[30px] bg-[#003399] rounded-t-sm flex items-center justify-between px-3">
        {/* Logo MERCOSUL à esquerda */}
        <div className="text-white text-xs font-bold">MERCOSUL</div>
        
        {/* BRASIL no centro */}
        <div className="text-white text-sm font-bold tracking-wider">BRASIL</div>
        
        {/* Bandeira do Brasil à direita */}
        <div className="w-[24px] h-[16px] bg-green-500 rounded-sm flex items-center justify-center relative overflow-hidden">
          {/* Losango amarelo */}
          <div className="w-[10px] h-[10px] bg-yellow-400 transform rotate-45 flex items-center justify-center">
            {/* Círculo azul */}
            <div className="w-[6px] h-[6px] bg-blue-600 rounded-full transform -rotate-45"></div>
          </div>
        </div>
      </div>

      {/* BR no canto inferior esquerdo */}
      <div className="absolute bottom-[8px] left-[15px] text-lg font-bold text-gray-800">
        BR
      </div>

      {/* Texto da placa */}
      <div className="flex justify-center items-center h-full pt-2">
        <div className="text-6xl font-black tracking-[0.1em] font-mono text-black">{text}</div>
      </div>

      {/* QR Code placeholder abaixo do MERCOSUL */}
      <div className="absolute top-[32px] left-[15px] w-[16px] h-[16px] bg-black">
        <div className="w-full h-full grid grid-cols-4 gap-[1px] p-[1px]">
          <div className="bg-white"></div>
          <div className="bg-black"></div>
          <div className="bg-white"></div>
          <div className="bg-black"></div>
          <div className="bg-black"></div>
          <div className="bg-white"></div>
          <div className="bg-black"></div>
          <div className="bg-white"></div>
          <div className="bg-white"></div>
          <div className="bg-black"></div>
          <div className="bg-white"></div>
          <div className="bg-black"></div>
          <div className="bg-black"></div>
          <div className="bg-white"></div>
          <div className="bg-black"></div>
          <div className="bg-white"></div>
        </div>
      </div>

      {/* Efeito de brilho */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/20 to-transparent pointer-events-none rounded-lg" />
    </div>
  );
}