import { Heart, Smile, Trees } from 'lucide-react'
import Image from 'next/image'

export default function Sobre() {
  return    <div className="bg-white font-jost">
      {/* HERO */}
      <section className="bg-zen-light px-6 py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-green-900 mb-4">
          Nossa História
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          A VivaZen nasceu do sonho de levar mais saúde e bem-estar para a vida das pessoas através do poder da natureza.
        </p>
      </section>

      {/* CONTEÚDO */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* LADO ESQUERDO (TEXTO) */}
          <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
            <p>
              Acreditamos que a natureza oferece tudo o que precisamos para uma vida equilibrada e saudável. Nossa jornada começou com uma pequena horta orgânica, onde cultivávamos ervas e plantas com métodos sustentáveis, sem o uso de agrotóxicos. A paixão por compartilhar os benefícios desses ingredientes puros nos levou a criar a VivaZen.
            </p>
            <p>
              Hoje, selecionamos cuidadosamente cada produto, garantindo que eles venham de fontes responsáveis e que mantenham a pureza e a potência de seus ingredientes. Nossa missão é simples: oferecer produtos naturais de alta qualidade que promovam o bem-estar do corpo e da mente, de forma acessível e transparente.
            </p>
          </div>

          {/* LADO DIREITO (IMAGEM) */}
          <div className="relative h-80 w-full md:h-96 md:w-96 bg-white rounded-2xl overflow-hidden shadow-sm">
            <Image 
              src="/sobre.jpeg" 
              alt="marca-vivazen" 
              fill
              className="object-cover" 
              sizes="(max-width: 768px) 100vw, 384px"
              priority
            />
          </div>
        </div>
        
        <h2 className="text-3xl font-bold text-green-900 mt-16 mb-8 text-center">Nossos Valores</h2>

        {/* VALORES */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-8 text-center">
          <div className="flex flex-col items-center">
            <div className="bg-green-100 text-green-800 rounded-full p-4 mb-4">
              <Trees className="h-8 w-8" />
            </div>
            <h3 className="font-semibold text-xl text-gray-800 mb-2">Qualidade</h3>
            <p className="text-gray-600">
              Ingredientes puros e processos que garantem a máxima eficácia dos nossos produtos.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-green-100 text-green-800 rounded-full p-4 mb-4">
              <Heart className="h-8 w-8" />
            </div>
            <h3 className="font-semibold text-xl text-gray-800 mb-2">Cuidado</h3>
            <p className="text-gray-600">
              Cada produto é pensado e selecionado com o carinho que você merece.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-green-100 text-green-800 rounded-full p-4 mb-4">
              <Smile className="h-8 w-8"/>
            </div>
            <h3 className="font-semibold text-xl text-gray-800 mb-2">Bem-estar</h3>
            <p className="text-gray-600">
              Promovemos um estilo de vida mais saudável e feliz para nossos clientes.
            </p>
          </div>
        </div>
      </section>
    </div>

}