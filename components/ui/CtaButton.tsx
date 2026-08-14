import { produto } from '@/lib/site'
import { Lock, ShoppingBag } from 'lucide-react'

interface CtaButtonProps {
  children?: React.ReactNode
  /**
   * Destino do clique. O padrão é o checkout do produto avulso; a seção de
   * ofertas passa o link do kit correspondente.
   *
   * Todo CTA do site continua passando por este componente de propósito — é o
   * ponto único para plugar rastreamento de conversão no dia que fizer sentido.
   * Não escreva `<a href={checkout}>` solto em uma seção nova.
   */
  href?: string
  /** 'escuro' = fundo verde (padrão). 'claro' = fundo creme, para seções escuras. */
  variante?: 'escuro' | 'claro'
  /** Mostra o aviso de que o checkout acontece na Braip */
  comAviso?: boolean
  tamanho?: 'md' | 'lg'
  /** Ocupa a largura toda do container — usado nos cards de oferta. */
  bloco?: boolean
  className?: string
}

export default function CtaButton({
  children = 'Comprar agora',
  href = produto.checkoutUrl,
  variante = 'escuro',
  comAviso = false,
  tamanho = 'lg',
  bloco = false,
  className = '',
}: CtaButtonProps) {
  const cores =
    variante === 'claro'
      ? 'bg-cream text-forest hover:bg-white'
      : 'bg-forest text-white hover:bg-forest-soft'

  const medidas = tamanho === 'lg' ? 'px-9 py-4 text-lg' : 'px-7 py-3 text-base'

  /*
    Link que começa com "#" é âncora da própria página (o hero apontando para a
    seção de ofertas, por exemplo). Nesse caso não pode abrir em aba nova, e o
    aviso da Braip não faz sentido porque ninguém está saindo do site ainda.
  */
  const interno = href.startsWith('#')

  return (
    <div className={className}>
      <a
        href={href}
        target={interno ? undefined : '_blank'}
        rel={interno ? undefined : 'noopener noreferrer'}
        className={`${
          bloco ? 'flex w-full justify-center' : 'inline-flex'
        } items-center gap-2.5 rounded-full font-semibold shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl focus-visible:ring-4 focus-visible:ring-clay/40 focus-visible:outline-none ${cores} ${medidas}`}
      >
        <ShoppingBag className="h-5 w-5 shrink-0" />
        {children}
      </a>

      {comAviso && !interno && (
        <p
          className={`mt-4 flex items-center gap-1.5 text-xs ${
            variante === 'claro' ? 'text-cream/70' : 'text-stone-500'
          }`}
        >
          <Lock className="h-3.5 w-3.5 shrink-0" />
          Você será direcionado ao checkout seguro da Braip para finalizar a compra.
        </p>
      )}
    </div>
  )
}
