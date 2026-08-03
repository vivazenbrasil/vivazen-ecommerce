import Link from 'next/link';
import { useState } from 'react';

interface ProductCardProps {
  id: number;
  nome: string;
  sub: string;
  desc: string;
  preco: number;
  precoDe: number;
  emoji: string;
  tag: string;
  capsulas: string;
}

export default function ProductCard({ id, nome, sub, desc, preco, precoDe, emoji, tag, capsulas }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="bg-f4ede0 rounded-md overflow-hidden transition-transform duration-300 ease-in-out"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        transform: isHovered ? 'translateY(-6px)' : 'translateY(0)',
        boxShadow: isHovered ? '0 24px 48px rgba(61,74,38,.12)' : 'none',
      }}
    >
      <div className="bg-gradient-to-br from-e0d4bc to-ccc0a0 h-70 flex items-center justify-center text-8xl relative">
        {emoji}
        <span className="absolute top-4 left-4 bg-b8962e text-white text-xs font-semibold tracking-wider uppercase px-2.5 py-1 rounded-sm">
          {tag}
        </span>
      </div>

      <div className="p-6">
        <div className="text-xs tracking-wider uppercase text-b8962e font-semibold mb-1.5">
          {sub}
        </div>
        <div className="text-2xl font-semibold text-3d4a26 mb-1">
          {nome}
        </div>
        <div className="text-sm text-7a7a6a mb-2">
          {capsulas}
        </div>
        <p className="text-sm text-7a7a6a leading-relaxed mb-5">
          {desc}
        </p>

        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs text-7a7a6a line-through">R$ {precoDe.toFixed(2).replace('.', ',')}</div>
            <div className="text-2xl font-semibold text-3d4a26">R$ {preco.toFixed(2).replace('.', ',')}</div>
          </div>
          <div className="flex gap-2">
            <Link href={`/produtos/${id}`} className="bg-transparent text-3d4a26 border border-3d4a26 px-3.5 py-2.5 rounded-sm text-xs font-semibold tracking-wider uppercase no-underline inline-block transition-colors hover:bg-3d4a26 hover:text-f4ede0">
              Ver
            </Link>
            <button className="bg-3d4a26 text-f4ede0 border-none px-4 py-2.5 rounded-sm text-xs font-semibold tracking-wider uppercase cursor-pointer font-sans transition-colors hover:bg-green-800">
              Comprar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}