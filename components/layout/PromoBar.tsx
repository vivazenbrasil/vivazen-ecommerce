import { ofertaComFreteGratis } from '@/lib/site'
import { Truck } from 'lucide-react'

// Faixa no topo anunciando o kit com frete grátis. Some sozinha quando nenhum
// kit publicado tem `freteGratis: true` — mesma regra do resto do site: não
// anunciar vantagem que a página não consegue cumprir.
export default function PromoBar() {
  if (!ofertaComFreteGratis) return null

  return (
    /*
      Âncora nativa de propósito, e não <Link> do Next — daí a regra do ESLint
      estar silenciada em vez de "corrigida". É o <a> que faz o navegador tratar
      /#ofertas como o mesmo documento na home, e aí vale o `scroll-behavior:
      smooth` do globals.css; o <Link> rola por conta própria e chega seco.

      A regra não reclama do CtaButton porque lá o href é variável e ela só
      enxerga literal — o comportamento é o mesmo nos dois.
    */
    // eslint-disable-next-line @next/next/no-html-link-for-pages
    <a
      href="/#ofertas"
      className="bg-clay hover:bg-clay-soft block px-4 py-2.5 text-center text-sm font-semibold text-white transition-colors"
    >
      {/*
        O pulso fica NESTE span e não na barra. A barra ocupa a largura toda, e um
        `scale(1.03)` nela deixa o elemento uns 57px mais largo que a janela num
        monitor comum — o navegador responde com uma barra de rolagem horizontal
        que aparece e some a cada volta. Aplicado no conteúdo, que é estreito e
        centralizado, ainda fica melhor: o texto respira em vez de a faixa esticar.
      */}
      <span className="pulso-suave inline-flex items-center justify-center gap-2">
        <Truck className="h-4 w-4 shrink-0" strokeWidth={2.5} />
        Frete grátis na compra do kit com {ofertaComFreteGratis.frascos}{' '}
        frascos — Aproveite!
      </span>
    </a>
  )
}
