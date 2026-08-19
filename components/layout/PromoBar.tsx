import { ofertaComFreteGratis } from '@/lib/site'
import { Truck } from 'lucide-react'

/**
 * Faixa fina no topo do site, acima do cabeçalho, anunciando o kit com frete
 * grátis e apontando para a seção de ofertas.
 *
 * Some sozinha quando nenhum kit publicado tem `freteGratis: true` em
 * lib/site.ts — mesma lógica das outras seções que dependem de dado
 * preenchido: nunca anunciar uma vantagem que a página não consegue cumprir.
 */
export default function PromoBar() {
  if (!ofertaComFreteGratis) return null

  return (
    /*
      Âncora nativa de propósito, e não <Link> do Next — por isso a regra do
      ESLint está silenciada abaixo em vez de "corrigida".

      É <a> que faz o navegador tratar /#ofertas como o mesmo documento quando
      já estamos na home, e aí vale o `scroll-behavior: smooth` do
      globals.css: a página desliza até a seção. O <Link> faz a rolagem por conta própria e
      chega lá seco. Fora da home, o <a> navega para a home e cai na seção do
      mesmo jeito.

      A regra não reclama do CtaButton porque lá o href é variável, e ela só
      enxerga literal. O comportamento é o mesmo nos dois.
    */
    // eslint-disable-next-line @next/next/no-html-link-for-pages
    <a
      href="/#ofertas"
      className="pulso-suave bg-clay hover:bg-clay-soft flex items-center justify-center gap-2 px-4 py-2.5 text-center text-sm font-semibold text-white transition-colors"
    >
      <Truck className="h-4 w-4 shrink-0" strokeWidth={2.5} />
      Frete grátis na compra do kit com {ofertaComFreteGratis.frascos} frascos
      — Aproveite!
    </a>
  )
}
