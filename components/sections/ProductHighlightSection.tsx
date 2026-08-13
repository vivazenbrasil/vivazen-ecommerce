import CtaButton from '@/components/ui/CtaButton'
import { produto } from '@/lib/site'
import livit_box from '@/public/livit_box.webp'
import Image from 'next/image'

const motivos = [
  {
    titulo: 'Fórmula limpa e completa',
    texto:
      'Seis ativos que trabalham juntos: L-Triptofano, L-Teanina, Magnésio, Inositol e vitaminas B3 e D3. Sem corantes artificiais e sem açúcar.',
  },
  {
    titulo: 'Relaxa sem derrubar',
    texto:
      'A L-Teanina promove calma mantendo você lúcido. É apoio ao equilíbrio, não um sedativo — você não acorda com sensação de ressaca.',
  },
  {
    titulo: 'Feito para o uso diário',
    texto:
      'Cápsulas práticas, fáceis de engolir e sem sabor residual. Cabem na rotina de quem tem pressa.',
  },
  {
    titulo: 'Embalagem sustentável',
    texto:
      'Material reciclável e envio em embalagem discreta, sem identificação do conteúdo por fora.',
  },
]

export default function ProductHighlightSection() {
  return (
    <section id="produto" className="py-20 md:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 lg:grid-cols-2 lg:gap-16">
        <div className="flex justify-center lg:order-2">
          <div className="relative aspect-3/4 w-full max-w-sm overflow-hidden rounded-[2rem] border-4 border-white shadow-2xl">
            <Image
              src={livit_box}
              alt={`Caixa do suplemento ${produto.nome}`}
              fill
              sizes="(max-width: 1024px) 90vw, 384px"
              className="object-cover"
            />
          </div>
        </div>

        <div className="lg:order-1">
          <span className="text-clay block text-xs font-semibold tracking-[0.25em] uppercase">
            Por que o {produto.nome}
          </span>
          <h2 className="font-display text-forest mt-4 text-4xl leading-tight italic md:text-5xl">
            Não é mais um pote
            <br className="hidden md:block" /> na sua prateleira
          </h2>

          <ol className="mt-10 space-y-7">
            {motivos.map((motivo, i) => (
              <li key={motivo.titulo} className="flex gap-4">
                <span className="bg-clay/12 text-clay font-display flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-lg font-semibold">
                  {i + 1}
                </span>
                <div>
                  <h3 className="text-forest text-lg font-semibold">
                    {motivo.titulo}
                  </h3>
                  <p className="mt-1.5 leading-relaxed text-stone-600">
                    {motivo.texto}
                  </p>
                </div>
              </li>
            ))}
          </ol>

          <CtaButton className="mt-10" tamanho="md">
            Quero o meu {produto.nome}
          </CtaButton>
        </div>
      </div>
    </section>
  )
}
