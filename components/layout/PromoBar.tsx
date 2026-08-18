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
