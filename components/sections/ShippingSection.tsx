import SectionHeading from '@/components/ui/SectionHeading'
import { entrega } from '@/lib/site'
import { Box, MapPin, PackageSearch, Truck, type LucideIcon } from 'lucide-react'

// Tipo explícito de propósito: `entrega` é `as const`, e sem anotar `texto:
// string` o TS conclui que campo preenchido nunca é falso, estreita para `never`
// no ramo do `||` e o acesso a `aviso` quebra o build.
const cards: {
  icone: LucideIcon
  titulo: string
  texto: string
  aviso: string
}[] = [
  {
    icone: Truck,
    titulo: 'Postagem rápida',
    texto: entrega.prazoPostagem,
    aviso: 'Preencher `entrega.prazoPostagem` em lib/site.ts',
  },
  {
    icone: PackageSearch,
    titulo: 'Rastreio do começo ao fim',
    texto: entrega.rastreio,
    aviso: 'Preencher `entrega.rastreio` em lib/site.ts',
  },
  {
    icone: Box,
    titulo: 'Embalagem discreta',
    texto: entrega.embalagem,
    aviso: 'Preencher `entrega.embalagem` em lib/site.ts',
  },
]

export default function ShippingSection() {
  const prazosPreenchidos = entrega.prazos.filter((p) => p.prazo)

  return (
    <section id="entrega" className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Entrega e Frete"
          titulo="Como o pedido chega até você"
          descricao={`Enviamos por ${entrega.transportadora}. O valor exato do frete e o prazo para o seu CEP aparecem no checkout, antes de você confirmar a compra.`}
        />

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {cards.map((card) => (
            <div key={card.titulo} className="bg-cream rounded-2xl p-7">
              <card.icone className="text-clay h-7 w-7" />
              <h3 className="text-forest mt-5 text-lg font-semibold">
                {card.titulo}
              </h3>
              <p className="mt-2.5 leading-relaxed text-stone-600">
                {card.texto || (
                  <span className="text-clay italic">
                    [falta preencher] {card.aviso}
                  </span>
                )}
              </p>
            </div>
          ))}
        </div>

        {/*
          Só aparece com pelo menos um prazo preenchido em `entrega.prazos`.
          Prometer prazo sem ter o número é pior do que não falar de prazo, e o
          checkout da Braip já calcula o real para o CEP do cliente. Para religar
          basta preencher os prazos, nada mais muda aqui.
        */}
        {prazosPreenchidos.length > 0 && (
          <div className="border-sand mt-12 overflow-hidden rounded-2xl border">
            <div className="bg-cream border-sand text-forest flex items-center gap-2 border-b px-6 py-4 font-semibold">
              <MapPin className="text-clay h-4 w-4" />
              Prazo médio por região
            </div>

            <ul className="divide-sand/60 divide-y">
              {prazosPreenchidos.map((item) => (
                <li
                  key={item.regiao}
                  className="flex items-center justify-between px-6 py-4"
                >
                  <span className="text-stone-700">{item.regiao}</span>
                  <span className="text-forest font-medium">{item.prazo}</span>
                </li>
              ))}
            </ul>

            <p className="border-sand/60 border-t px-6 py-4 text-xs leading-relaxed text-stone-500">
              Prazos contados em dias úteis após a postagem e válidos para
              capitais e regiões metropolitanas. Cidades do interior podem ter
              prazo adicional.
            </p>
          </div>
        )}

        {entrega.freteGratisAcima && (
          <p className="bg-forest text-cream mt-6 rounded-2xl px-6 py-4 text-center font-medium">
            Frete grátis em compras acima de {entrega.freteGratisAcima}
          </p>
        )}
      </div>
    </section>
  )
}
