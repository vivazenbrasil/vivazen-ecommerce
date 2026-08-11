import { produto } from '@/lib/site'
import { Lock, ShoppingBag } from 'lucide-react'

interface CtaButtonProps {
  children?: React.ReactNode
  /** 'escuro' = fundo verde (padrão). 'claro' = fundo creme, para seções escuras. */
  variante?: 'escuro' | 'claro'
  /** Mostra o aviso de que o checkout acontece na Braip */
  comAviso?: boolean
  tamanho?: 'md' | 'lg'
  className?: string
}

export default function CtaButton({
  children = 'Comprar agora',
  variante = 'escuro',
  comAviso = false,
  tamanho = 'lg',
  className = '',
}: CtaButtonProps) {
  const cores =
    variante === 'claro'
      ? 'bg-cream text-forest hover:bg-white'
      : 'bg-forest text-white hover:bg-forest-soft'

  const medidas = tamanho === 'lg' ? 'px-9 py-4 text-lg' : 'px-7 py-3 text-base'

  return (
    <div className={className}>
      <a
        href={produto.checkoutUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center gap-2.5 rounded-full font-semibold shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl focus-visible:ring-4 focus-visible:ring-clay/40 focus-visible:outline-none ${cores} ${medidas}`}
      >
        <ShoppingBag className="h-5 w-5 shrink-0" />
        {children}
      </a>

      {comAviso && (
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
