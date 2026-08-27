'use client'

/*
  Este arquivo virou Client Component só por causa da medição: `track` do
  Vercel Analytics roda no navegador e precisa de um onClick. O custo é o
  componente ir para o pacote JavaScript, o que aqui é pequeno — ele não tem
  estado, efeito nem dependência de servidor.

  Valeu a pena porque TODO botão de compra do site passa por aqui. Um lugar
  só instrumenta o hero, os kits, o vídeo, a seção do produto, o CTA final e
  a página /sobre de uma vez.
*/

import { destinoDoCta } from '@/lib/site'
import { track } from '@vercel/analytics'
import { Lock, ShoppingBag } from 'lucide-react'

interface CtaButtonProps {
  children?: React.ReactNode
  /**
   * Destino do clique. Sem valor, usa `destinoDoCta` do lib/site.ts — a seção
   * de kits, ou o checkout se não houver kit publicado. Os cards de kit passam
   * o link de checkout daquele kit específico.
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
  /**
   * De onde partiu o clique, para separar os eventos no painel: `hero`,
   * `kit-3-frascos`, `video`, `produto`, `final`, `sobre`, `cabecalho`.
   *
   * Sem isso o painel mostra só um número somado e não dá para saber qual
   * seção gera clique e qual é decoração.
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

  /*
    O brilho que atravessa o botão no hover. Na variante escura ele é branco;
    na clara precisa ser escuro, senão seria branco sobre creme e não apareceria.
  */
  const brilho =
    variante === 'claro' ? 'via-forest/15' : 'via-white/45'

  const medidas = tamanho === 'lg' ? 'px-9 py-4 text-lg' : 'px-7 py-3 text-base'

  /*
    O teste é por "http", e não por "#". Depois que o destino padrão virou
    `/#ofertas`, um link interno pode começar com barra, com `#` ou com os dois
    — só sai do site quem tem endereço absoluto, que hoje é apenas o checkout
    da Braip.

    Disso dependem duas coisas: abrir em aba nova, que só faz sentido ao sair do
    site, e mostrar o aviso de que o pagamento acontece na Braip, que seria
    mentira num clique que apenas rola a página.
  */
  const externo = href.startsWith('http')

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

        O brilho em loop roda para todo mundo, SEM o prefixo `motion-safe:`, e
        isso é uma escolha consciente e não esquecimento. A prática comum seria
        desligá-lo para quem marcou "reduzir movimento" no sistema, já que é
        animação infinita. Aqui ele fica ligado por decisão do dono do site: é
        o elemento que chama atenção para o botão de compra, e a máquina de
        quem toca o projeto roda com essa preferência ligada — na prática o
        efeito nunca existiria. Se um dia a decisão mudar, basta devolver o
        prefixo nesta linha.

        `active:` importa mais do que parece: no celular não existe hover, e o
        afundar é a única resposta visual entre o toque e a página trocar.
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
          O brilho em loop: uma faixa inclinada que entra pela esquerda,
          atravessa e some pela direita, a cada 3 segundos.

          A classe `brilho-cta` é CSS escrito na mão no globals.css, e NÃO uma
          utilitária do Tailwind. Isso não é preferência de estilo: na versão
          anterior, feita com `--animate-*` dentro do `@theme`, o build da
          Vercel apagava a animação e o brilho aparecia parado sobre o botão em
          produção. O comentário no globals.css explica o porquê.

          `w-1/3` e não mais metade: em loop, uma faixa larga demais chapa o
          botão inteiro de claro a cada volta em vez de parecer um reflexo
          passando. O `overflow-hidden` no link é o que recorta a faixa dentro
          do formato arredondado.
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
