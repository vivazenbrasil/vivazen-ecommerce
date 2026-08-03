import vivazen_caixa from '@/public/vivazen_caixa.jpeg';
import { ArrowRight } from "lucide-react";
import Image from "next/image";

interface ProductHighlightSectionProps {
  linktreeUrl: string;
}

export default function ProductHighlightSection({ linktreeUrl }: ProductHighlightSectionProps) {
  return (
    <section id="produto" className="flex max-w-6xl flex-col-reverse items-center gap-12 px-6 py-20 md:flex-row md:py-32 mx-auto">
      <div className="flex-1 w-full flex justify-center">
        <div className="relative w-full max-w-sm aspect-3/4 rounded-3xl overflow-hidden shadow-xl border-4 border-white">
          <Image src={vivazen_caixa} alt="Detalhes do Produto VivaZen" fill className="object-cover" />
        </div>
      </div>
      
      <div className="flex-1 space-y-6">
        <h2 className="text-3xl md:text-4xl font-bold text-stone-900">
          Por que escolher nosso produto?
        </h2>
        <p className="text-lg text-stone-600 leading-relaxed">
          Desenvolvido com ingredientes 100% naturais, nosso produto inicial é o resultado 
          de uma busca incansável para entregar o melhor da natureza diretamente para você.
        </p>
        <ul className="space-y-6 py-4">
          <li className="flex items-center gap-4 text-stone-800 font-medium text-lg">
            <span className="flex items-center justify-center w-10 h-10 rounded-full bg-green-100 text-green-700 font-bold">1</span> Fórmula 100% Natural e Limpa
          </li>
          <li className="flex items-center gap-4 text-stone-800 font-medium text-lg">
            <span className="flex items-center justify-center w-10 h-10 rounded-full bg-green-100 text-green-700 font-bold">2</span> Focado no seu bem-estar diário
          </li>
          <li className="flex items-center gap-4 text-stone-800 font-medium text-lg">
            <span className="flex items-center justify-center w-10 h-10 rounded-full bg-green-100 text-green-700 font-bold">3</span> Embalagem Sustentável
          </li>
        </ul>
        <a href={linktreeUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-green-700 font-bold text-lg hover:text-green-800 transition-colors group mt-2">
          Adquira através dos nossos parceiros 
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </a>
      </div>
    </section>
  );
}