import React from "react";

interface PlateImageProps {
  text: string;
  className?: string;
}

export const PlateImage: React.FC<PlateImageProps> = ({ text, className }) => {
  return (
    <svg
      width="420"
      height="140"
      viewBox="0 0 420 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ filter: "drop-shadow(0 8px 24px rgba(0,0,0,0.22))" }}
    >
      {/* Contorno azul padrão Mercosul */}
      <rect x="4" y="4" width="412" height="132" rx="14" fill="#fff" stroke="#2563eb" strokeWidth="8" />
      {/* Faixa azul superior */}
      <rect x="16" y="16" width="388" height="32" rx="6" fill="#1751a6" />
      {/* Texto BRASIL */}
      <text
        x="210"
        y="38"
        textAnchor="middle"
        fontFamily="'Arial Black', Arial, sans-serif"
        fontSize="22"
        fill="#fff"
        fontWeight="bold"
        letterSpacing="2"
      >
        BRASIL
      </text>
      {/* Bandeira do Brasil corrigida */}
      <g>
        <rect x="362" y="22" width="32" height="20" rx="2" fill="#3eae3a" stroke="#1751a6" strokeWidth="1" />
        <polygon points="378,32 394,32 386,40" fill="#f7d117" />
        <circle cx="386" cy="32" r="6" fill="#1751a6" />
      </g>
      {/* Estrelas Mercosul */}
      <g fill="#fff">
        <circle cx="32" cy="28" r="1.2" />
        <circle cx="38" cy="22" r="0.8" />
        <circle cx="40" cy="30" r="0.7" />
        <circle cx="36" cy="26" r="0.6" />
        <circle cx="44" cy="24" r="0.5" />
      </g>
      {/* Texto MERCOSUL */}
      <text x="32" y="44" fontFamily="'Arial', sans-serif" fontSize="10" fill="#fff" fontWeight="bold">
        MERCOSUL
      </text>
      {/* QR code simulado */}
      <rect x="16" y="54" width="18" height="18" fill="#eee" stroke="#bbb" strokeWidth="1" />
      <rect x="20" y="58" width="3" height="3" fill="#333" />
      <rect x="27" y="58" width="3" height="3" fill="#333" />
      <rect x="20" y="65" width="3" height="3" fill="#333" />
      <rect x="27" y="65" width="3" height="3" fill="#333" />
      {/* Sigla BR à esquerda */}
      <text
        x="22"
        y="120"
        fontFamily="'Arial Black', Arial, sans-serif"
        fontSize="18"
        fill="#111"
        fontWeight="bold"
      >
        BR
      </text>
      {/* Texto da placa padrão Mercosul */}
      <text
        x="210"
        y="110"
        textAnchor="middle"
        dominantBaseline="middle"
        fontFamily="'Arial Black', Arial, 'Consolas', monospace"
        fontSize="56"
        fill="#111"
        letterSpacing="16"
        fontWeight="bold"
      >
        {text}
      </text>
    </svg>
  );
};
