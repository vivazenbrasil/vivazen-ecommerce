import Image from "next/image";
import { Leaf } from "lucide-react";
import { Fraunces } from "next/font/google";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
});

export default function Sobre() {
  return (
    <main className={`${fraunces.variable} bg-[#eaf0e1] overflow-hidden`}>
      {/* HERO */}
      <section className="relative">
        <div className="max-w-7xl mx-auto px-6 py-24 lg:py-32">

          <div className="grid lg:grid-cols-2 items-center">

            {/* TEXTO */}
            <div className="z-20 max-w-xl">

              <span className="flex items-center gap-2 uppercase tracking-[0.25em] text-[#B2794A] font-semibold text-sm mb-5">
                <Leaf size={18} />
                Nossa História
              </span>

              <h1 className="font-[family-name:var(--font-fraunces)] italic text-[#1E3A2B] text-5xl md:text-6xl xl:text-7xl leading-none">
                Da terra para
                <br />
                o seu bem-estar
              </h1>

              <p className="mt-8 text-lg text-stone-600 leading-8">
                A VivaZen nasceu do sonho de levar mais saúde e equilíbrio
                para a vida das pessoas através do poder da natureza.
              </p>
            </div>

            {/* IMAGEM */}
            <div className="relative h-[650px] hidden lg:block">

              <div className="absolute right-[-220px] top-1/2 -translate-y-1/2 w-[900px] h-[900px]">

                <Image
                  src="/image_capsules.png"
                  alt="Vivazen"
                  fill
                  priority
                  className="object-contain object-right"
                />

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* JORNADA */}

      <section className="py-24 bg-[#eaf0e1]">

        <div className="max-w-5xl mx-auto px-6">

          <div className="text-center mb-20">

            <span className="uppercase tracking-[0.3em] text-[#B2794A] font-semibold">
              Nossa Jornada
            </span>

            <h2 className="font-[family-name:var(--font-fraunces)] italic text-5xl text-[#1E3A2B] mt-4">
              Crescendo com a natureza
            </h2>

          </div>

          <div className="relative max-w-3xl mx-auto">

            {/* Linha */}
            <div className="absolute left-[7px] top-5 bottom-5 w-[2px] bg-[#DDD0C2]" />

            {/* Origem */}

            <div className="relative pl-12 pb-20">

              <div className="absolute left-0 top-2 w-4 h-4 rounded-full bg-[#B2794A]" />

              <h3 className="uppercase tracking-widest text-[#B2794A] font-semibold mb-4">
                Origem
              </h3>

              <p className="text-lg text-stone-600 leading-9">
                Nossa jornada começou com uma pequena horta orgânica, onde
                cultivávamos ervas e plantas com métodos sustentáveis,
                sem o uso de agrotóxicos. A paixão por compartilhar os
                benefícios desses ingredientes puros nos levou à criação
                da VivaZen.
              </p>

            </div>

            {/* Hoje */}

            <div className="relative pl-12">

              <div className="absolute left-0 top-2 w-4 h-4 rounded-full bg-[#1E3A2B]" />

              <h3 className="uppercase tracking-widest text-[#1E3A2B] font-semibold mb-4">
                Hoje
              </h3>

              <p className="text-lg text-stone-600 leading-9">
                Selecionamos cuidadosamente cada produto, garantindo que
                venham de fontes responsáveis e mantenham a pureza de seus
                ingredientes. Nossa missão é oferecer produtos naturais de
                alta qualidade que promovam o bem-estar de forma acessível
                e transparente.
              </p>

            </div>

          </div>

        </div>

      </section>
    </main>
  );
}