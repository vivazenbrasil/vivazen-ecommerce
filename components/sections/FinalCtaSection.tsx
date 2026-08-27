import CtaButton from '@/components/ui/CtaButton'
import { garantia, produto } from '@/lib/site'
import { CreditCard, ShieldCheck, Truck } from 'lucide-react'

export default function FinalCtaSection() {
  const reforcos = [
    {
      icone: ShieldCheck,
      texto:
        garantia.dias > 0
          ? `${garantia.dias} dias de garantia`
          : 'Garantia de satisfação',
    },
    { icone: Truck, texto: 'Envio com rastreio' },
    { icone: CreditCard, texto: 'Pagamento seguro' },
  ]

  return (
    <section className="bg-forest text-cream relative overflow-hidden py-20 md:py-28">
      <div
        aria-hidden="true"
        className="bg-clay/12 pointer-events-none absolute -bottom-32 -left-32 h-96 w-96 rounded-full blur-3xl"
      />

      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <span className="text-clay-soft block text-xs font-semibold tracking-[0.25em] uppercase">
          Comece hoje
        </span>
        <h2 className="font-display text-cream mt-4 text-4xl leading-tight italic md:text-5xl">
          Seu equilíbrio começa
          <br className="hidden sm:block" /> com uma decisão
        </h2>
        <p className="text-cream/80 mx-auto mt-6 max-w-xl text-lg leading-relaxed">
          Leve o {produto.nome} para a sua rotina e sinta a diferença de um sono
          melhor e dias mais leves.
        </p>

        {produto.preco && (
          <p className="font-display text-cream mt-8 text-4xl">
            {produto.preco}
            {produto.precoParcelado && (
              <span className="text-cream/70 mt-1.5 block text-base">
                {produto.precoParcelado}
              </span>
            )}
          </p>
        )}

        <CtaButton origem="cta-final" variante="claro" comAviso className="mt-9 flex flex-col items-center">
          Comprar o {produto.nome}
        </CtaButton>

        <ul className="text-cream/70 mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm">
          {reforcos.map((item) => (
            <li key={item.texto} className="flex items-center gap-2">
              <item.icone className="text-clay-soft h-4 w-4 shrink-0" />
              {item.texto}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
