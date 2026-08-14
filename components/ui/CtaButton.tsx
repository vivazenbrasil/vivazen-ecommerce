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

  /*
    O brilho que atravessa o botão no hover. Na variante escura ele é branco;
    na clara precisa ser escuro, senão seria branco sobre creme e não apareceria.
  */
  const brilho =
    variante === 'claro' ? 'via-forest/10' : 'via-white/25'

  const medidas = tamanho === 'lg' ? 'px-9 py-4 text-lg' : 'px-7 py-3 text-base'

  /*
    Link que começa com "#" é âncora da própria página (o hero apontando para a
    seção de ofertas, por exemplo). Nesse caso não pode abrir em aba nova, e o
    aviso da Braip não faz sentido porque ninguém está saindo do site ainda.
  */
  const interno = href.startsWith('#')

  return (
    <div className={className}>
      {/*
        Dois pesos diferentes para "reduzir movimento", e a diferença é
        proposital:

        Subir no hover, afundar no clique e o ícone crescer são MUDANÇAS DE
        ESTADO. Elas valem para todo mundo; o que o `motion-reduce:transition-none`
        faz é tirar o percurso animado, então com a preferência ligada o botão
        troca de estado na hora. Quem se incomoda com movimento se incomoda com
        o trajeto, não com o resultado.

        O brilho que atravessa o botão é ANIMAÇÃO — meio segundo de algo se
        deslocando sozinho na tela. Esse fica atrás de `motion-safe:` e some
        por completo para quem pediu menos movimento.

        `active:` importa mais do que parece: no celular não existe hover, e o
        afundar é a única resposta visual entre o toque e a página trocar.
      */}
      <a
        href={href}
        target={interno ? undefined : '_blank'}
        rel={interno ? undefined : 'noopener noreferrer'}
        className={`group/cta relative overflow-hidden ${
          bloco ? 'flex w-full justify-center' : 'inline-flex'
        } items-center gap-2.5 rounded-full font-semibold shadow-lg transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl active:translate-y-0 active:scale-[0.98] motion-reduce:transition-none focus-visible:ring-4 focus-visible:ring-clay/40 focus-visible:outline-none ${cores} ${medidas}`}
      >
        {/*
          O brilho: uma faixa em diagonal que começa fora do botão, à esquerda,
          e atravessa até sair do outro lado quando o cursor entra. `skew-x-12`
          é o que dá a inclinação de reflexo em vez de uma barra reta.
        */}
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute inset-y-0 -left-full w-1/2 skew-x-12 bg-gradient-to-r from-transparent to-transparent ${brilho} motion-safe:transition-transform motion-safe:duration-700 motion-safe:ease-out motion-safe:group-hover/cta:translate-x-[400%]`}
        />

        <ShoppingBag className="relative h-5 w-5 shrink-0 transition-transform duration-300 group-hover/cta:-rotate-6 group-hover/cta:scale-110 motion-reduce:transition-none" />
        <span className="relative">{children}</span>
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
