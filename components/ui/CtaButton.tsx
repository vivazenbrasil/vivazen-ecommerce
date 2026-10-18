'use client'

/*
  Client Component só por causa da medição: o `track` do Vercel Analytics roda no
  navegador e precisa de onClick. Custo baixo — o componente não tem estado nem
  efeito — e compensa porque todo botão de compra do site passa por aqui, então
  um arquivo só instrumenta hero, kits, vídeo, produto, CTA final e /sobre.
*/

import { destinoDoCta } from '@/lib/site'
import { track } from '@vercel/analytics'
import { Lock, ShoppingBag } from 'lucide-react'

interface CtaButtonProps {
  children?: React.ReactNode
  /**
   * Sem valor, usa `destinoDoCta` — a seção de kits, ou o checkout se não houver
   * kit publicado. Os cards passam o link do kit específico.
   *
   * Seção nova não escreve `<a href={checkout}>` solto: passar por aqui é o que
   * mantém um ponto único para plugar rastreamento de conversão.
   */
  href?: string
  /** 'escuro' = fundo verde (padrão). 'claro' = fundo creme, para seções escuras. */
  variante?: 'escuro' | 'claro'
  /** Mostra o aviso de que o checkout acontece na Braip */
  comAviso?: boolean
  tamanho?: 'md' | 'lg'
  /**
   * De onde partiu o clique (`hero`, `kit-3-frascos`, `video`, `final`...). Sem
   * isso o painel mostra um número somado e não dá para saber qual seção vende
   * e qual é decoração.
   */
  origem?: string
  /** Ocupa a largura toda do container — usado nos cards de oferta. */
  bloco?: boolean
  className?: string
}

export default function CtaButton({
  children = 'Comprar agora',
  href = destinoDoCta,
  variante = 'escuro',
  comAviso = false,
  tamanho = 'lg',
  origem,
  bloco = false,
  className = '',
}: CtaButtonProps) {
  const cores =
    variante === 'claro'
      ? 'bg-cream text-forest hover:bg-white'
      : 'bg-forest text-white hover:bg-forest-soft'

  // Branco na variante escura; na clara precisa ser escuro, senão é branco
  // sobre creme e não aparece.
  const brilho =
    variante === 'claro' ? 'via-forest/15' : 'via-white/45'

  const medidas = tamanho === 'lg' ? 'px-9 py-4 text-lg' : 'px-7 py-3 text-base'

  /*
    Testa "http" e não "#": desde que o destino padrão virou `/#ofertas`, link
    interno pode começar com barra, com `#` ou com os dois. Só sai do site quem
    tem endereço absoluto, que hoje é só o checkout da Braip.

    Disso dependem o target="_blank" e o aviso de que o pagamento acontece na
    Braip — que seria mentira num clique que apenas rola a página.
  */
  const externo = href.startsWith('http')

  return (
    <div className={className}>
      {/*
        Dois pesos diferentes para "reduzir movimento", e a diferença é de propósito.

        Subir no hover, afundar no clique e o ícone crescer são mudanças de ESTADO:
        valem para todo mundo, e o `motion-reduce:transition-none` só tira o
        percurso animado. Quem se incomoda com movimento se incomoda com o
        trajeto, não com o resultado.

        Já o brilho em loop roda para todos, SEM `motion-safe:` — decisão do dono
        do site, não esquecimento. É o que chama atenção para o botão de compra, e
        a máquina de quem toca o projeto roda com "reduzir movimento" ligado, então
        na prática o efeito nunca existiria. Mudou a decisão, devolve o prefixo.

        `active:` pesa mais do que parece: no celular não há hover, e o afundar é
        a única resposta visual entre o toque e a página trocar.
      */}
      <a
        href={href}
        onClick={() =>
          track('cta_clique', {
            origem: origem ?? 'nao-informada',
            // "saiu" separa quem foi para a Braip de quem só rolou a página
            // até os kits. São intenções bem diferentes.
            saiu: externo,
          })
        }
        target={externo ? '_blank' : undefined}
        rel={externo ? 'noopener noreferrer' : undefined}
        className={`group/cta relative overflow-hidden ${
          bloco ? 'flex w-full justify-center' : 'inline-flex'
        } items-center gap-2.5 rounded-full font-semibold shadow-lg transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl active:translate-y-0 active:scale-[0.98] motion-reduce:transition-none focus-visible:ring-4 focus-visible:ring-clay/40 focus-visible:outline-none ${cores} ${medidas}`}
      >
        {/*
          Faixa inclinada que entra pela esquerda, atravessa e some pela direita a
          cada 3s. `brilho-cta` é CSS na mão no globals.css e não utilitária do
          Tailwind: na versão com `--animate-*` dentro do `@theme` o build da
          Vercel apagava a animação e o brilho ficava parado em produção.

          `w-1/3` porque em loop uma faixa larga chapa o botão inteiro de claro a
          cada volta em vez de parecer reflexo. Quem recorta a faixa no formato
          arredondado é o `overflow-hidden` do link.
        */}
        <span
          aria-hidden="true"
          className={`brilho-cta pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent to-transparent ${brilho}`}
        />

        <ShoppingBag className="relative h-5 w-5 shrink-0 transition-transform duration-300 group-hover/cta:-rotate-6 group-hover/cta:scale-110 motion-reduce:transition-none" />
        <span className="relative">{children}</span>
      </a>

      {comAviso && externo && (
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
