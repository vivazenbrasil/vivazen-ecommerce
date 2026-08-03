import vivazen_caixa from '@/public/vivazen_caixa.jpeg';
import { ShoppingBag } from "lucide-react";
import Image from "next/image";

interface HeroSectionProps {
  linktreeUrl: string;
}

export default function HeroSection({ linktreeUrl }: HeroSectionProps) {
  return (
    <section className="max-w-6xl mx-auto px-6 py-16 flex flex-col md:flex-row items-center gap-12">
      <div className="flex-1 space-y-6">
        <span className="text-green-700 font-semibold tracking-wide uppercase text-sm">Novo Lançamento</span>
        <h1 className="text-5xl md:text-6xl font-bold leading-tight text-stone-900">
          A natureza em sua forma mais pura.
        </h1>
        <p className="text-lg md:text-xl text-stone-600 leading-relaxed">
          Conheça o nosso primeiro produto exclusivo, focado em trazer equilíbrio, saúde e bem-estar para o seu dia a dia de forma 100% natural.
        </p>
        <div className="pt-4">
          <a href={linktreeUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-green-700 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-green-800 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1">
            <ShoppingBag className="w-5 h-5" />
            Onde Comprar
          </a>
        </div>
      </div>
      <div className="flex flex-1 w-full justify-center">
        <div className="relative w-full max-w-md aspect-square rounded-3xl overflow-hidden shadow-xl border-4 border-white">
          <Image src={vivazen_caixa} alt="Produto Principal VivaZen" fill className="object-cover" priority />
        </div>
      </div>
    </section>
  );
}