import CtaButton from '@/components/ui/CtaButton'
import SectionHeading from '@/components/ui/SectionHeading'
import {
  economiaDoKit,
  formasDePagamento,
  ofertasPublicadas,
  produto,
} from '@/lib/site'
import umFrasco from '@/public/kit-1-frasco.webp'
import doisFrascos from '@/public/kit-2-frascos.webp'
import tresFrascos from '@/public/kit-3-frascos.webp'
import { Check, Lock, ShieldCheck, Truck } from 'lucide-react'
import Image, { type StaticImageData } from 'next/image'

/**
 * As três fotos são normalizadas no arquivo, e são DUAS regras, não uma:
 *
 * 1. Mesma altura de moldura — 700px nas três. Renderizadas com altura fixa e
 *    largura automática (`h-full w-auto`), isso mantém os frascos na mesma
 *    escala: 1 pote aparece estreito, 3 potes largos. Se fossem esticadas para
 *    preencher a largura do card, o frasco único ficaria do tamanho do trio e o
 *    kit maior pareceria levar menos produto.
 *
 * 2. Mesma linha de base — a base dos frascos fica em y=675 nas três, com 24px
 *    de branco abaixo. Sem isso o alinhamento não acontece, mesmo com as
 *    molduras iguais: o container alinha as IMAGENS pela base, e as fotos
 *    originais tinham 26px, 7px e 50px de branco embaixo dos frascos. O trio
 *    flutuava uns 11px acima dos outros dois na tela.
 *
 * Ao trocar qualquer foto, refaça as duas medições — a segunda é invisível no
 * arquivo e só aparece quando as três estão lado a lado.
 */
const imagens: Record<number, StaticImageData> = {
  1: umFrasco,
  2: doisFrascos,
  3: tresFrascos,
}

const reforcos = [
  { icone: ShieldCheck, texto: `${produto.categoria} com garantia de satisfação` },
  { icone: Truck, texto: 'Frete e prazo calculados no checkout' },
  { icone: Lock, texto: 'Pagamento processado pela Braip' },
]

export default function OffersSection() {
  /*
    A seção inteira some enquanto nenhuma oferta tiver preço E link de checkout
    preenchidos em lib/site.ts.

    Isso não é preciosismo: um card de promoção sem preço, ou com botão que não
    leva a lugar nenhum, custa mais confiança do que a promoção inteira gera. E
    enquanto esta seção estiver fora do ar o hero volta a mostrar o preço avulso
    sozinho, então a página nunca fica sem preço nenhum.
  */
  if (ofertasPublicadas.length === 0) return null

  return (
    /*
      ALINHAMENTO DO CLIQUE "Ver os kits e preços"

      Três medidas se somam quando o navegador pula para cá, e é fácil errar
      olhando só uma: a margem de rolagem, o padding de topo da seção, e o
      cabeçalho fixo de 73px que cobre o começo da tela.

      Com `scroll-mt-24` (96px) e `py-20`, o título caía 135px abaixo do
      cabeçalho e a grade de cards só começava a 574px — 68% da altura da tela.
      O visitante clicava em "ver os kits" e via um vazio, com os cards
      espiando na borda de baixo.

      Agora a margem de rolagem é pequena o bastante para o cabeçalho cobrir a
      folga, e o padding de topo foi reduzido (o hero acima já dá respiro). O
      padding de baixo continua grande, porque ali a seção precisa se separar
      da próxima.

      Se mexer na altura do cabeçalho ou nesses paddings, meça de novo: o
      resultado só aparece somando os três.
    */
    <section
      id="ofertas"
      className="bg-cream scroll-mt-8 pt-14 pb-20 md:scroll-mt-0 md:pt-16 md:pb-28"
    >
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Escolha o seu kit"
          titulo="Quanto mais tempo de uso, melhor o preço"
          descricao={`O ${produto.nome} funciona por constância: o próprio modo de uso pede no mínimo 30 dias seguidos. Por isso os kits maiores saem com desconto — é o que a maioria escolhe.`}
        />

        {/*
          Sem `items-center`: os cards precisam esticar até a mesma altura para
          os botões alinharem na base (o `mt-auto` do CtaButton depende disso).
          Nem todo card tem preço cortado e selo de economia, então centralizar
          deixava o card de 1 frasco flutuando mais curto que os outros dois.
        */}
        <div className="mt-16 grid gap-8 md:grid-cols-3 md:gap-6">
          {ofertasPublicadas.map((oferta) => {
            const imagem = imagens[oferta.frascos]
            const economia = economiaDoKit(oferta)

            return (
              /*
                O grupo tem nome (`group/card`) e não é detalhe: o CtaButton lá
                embaixo também é um grupo, e ele está DENTRO deste card. Com os
                dois grupos anônimos, o `group-hover` do botão responderia ao
                hover do card inteiro — passar o mouse em qualquer canto
                dispararia o brilho do botão. Com nome, cada um responde só ao
                seu. Se criar outro grupo aqui dentro, nomeie também.

                `hover:z-20` importa por causa do card do meio, que fica por
                cima dos vizinhos: sem isso, ao passar o mouse num card lateral
                ele subiria por baixo do destaque e a sombra ficaria cortada.

                O card cresce 4% e sobe 8px em 500ms, com `ease-[cubic-bezier]`
                em vez do `ease-out` padrão. Essa curva é o que dá a sensação de
                crescimento em vez de salto: ela arranca devagar, ganha corpo no
                meio e desacelera no fim, então o olho acompanha o card
                inflando. Com `ease-out` puro o movimento nasce na velocidade
                máxima e o card parecia simplesmente aparecer maior.

                4% e 8px continuam sendo valores pequenos de propósito: o card
                ocupa um terço da largura, então passar de 5% começa a empurrar
                visualmente os vizinhos e a parecer defeito.

                Sobre "reduzir movimento": o zoom e a subida acontecem para todo
                mundo, e o que muda é o `motion-reduce:transition-none` — com a
                preferência ligada, o card troca de estado na hora, sem percurso
                animado. A distinção é essa: o que passa mal é com o movimento
                percorrido, não com o estado final. Animação de verdade, como o
                brilho que atravessa o botão, essa continua desligada.
              */
              <div
                key={oferta.id}
                className={`group/card relative flex flex-col rounded-3xl bg-white p-7 text-center transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:z-20 hover:-translate-y-2 hover:scale-[1.04] hover:shadow-2xl motion-reduce:transition-none ${
                  oferta.destaque
                    ? 'ring-clay z-10 shadow-2xl ring-2 md:-my-4 md:py-11'
                    : 'border-sand/70 hover:border-clay/50 border shadow-sm'
                }`}
              >
                {oferta.selo && (
                  <span className="bg-clay absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide text-white uppercase shadow-md transition-shadow duration-300 group-hover/card:shadow-lg">
                    {oferta.selo}
                  </span>
                )}

                {imagem && (
                  <div className="flex h-44 items-end justify-center md:h-48">
                    {/*
                      `origin-bottom` faz a foto crescer a partir da base, como
                      se os frascos se aproximassem. Crescendo pelo centro eles
                      pareceriam flutuar, e a linha de apoio dos três cards
                      deixaria de bater.

                      Só 4% aqui porque este zoom SOMA com os 3% do card: o
                      resultado na tela é perto de 7% na foto contra 3% no card.
                      Essa diferença é o que dá sensação de profundidade — a
                      foto vem um pouco mais à frente que a moldura. Subir esse
                      número faz os frascos furarem o topo do card.
                    */}
                    <Image
                      src={imagem}
                      alt={`Kit com ${oferta.frascos} ${
                        oferta.frascos === 1 ? 'frasco' : 'frascos'
                      } de ${produto.nome}`}
                      sizes="(max-width: 768px) 60vw, 260px"
                      className="h-full w-auto origin-bottom transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/card:scale-104 motion-reduce:transition-none"
                    />
                  </div>
                )}

                <h3 className="text-forest group-hover/card:text-clay mt-6 text-xl font-semibold transition-colors duration-300">
                  {oferta.titulo}
                </h3>
                <p className="mt-1.5 text-sm text-stone-500">{oferta.subtitulo}</p>

                <div className="mt-6">
                  {/* Só aparece se o valor cortado existir de verdade — ver o
                      aviso sobre o art. 37 do CDC em lib/site.ts. */}
                  {oferta.precoDe && (
                    <p className="text-sm text-stone-400 line-through">
                      de {oferta.precoDe}
                    </p>
                  )}
                  <p className="font-display text-forest mt-1 text-4xl">
                    {oferta.precoPor}
                  </p>
                  {oferta.precoParcelado && (
                    <p className="mt-1.5 text-sm text-stone-500">
                      ou {oferta.precoParcelado}
                    </p>
                  )}
                </div>

                {/*
                  "Você economiza" e "Frete grátis" (este último decidido em
                  lib/site.ts, campo `freteGratis` de cada kit — precisa
                  também estar configurado no checkout da Braip, senão o site
                  promete o que o checkout não cumpre) dividem a MESMA linha.

                  Empilhados em dois parágrafos, os dois juntos só apareciam
                  no card de 3 frascos e engordavam ele bem mais que os outros
                  dois — que já ficam maiores por design (`md:-my-4 md:py-11`
                  logo acima). Lado a lado, a altura extra some quando cabem
                  numa linha só, e nos raros casos em que quebram, quebram
                  como um bloco (`flex-wrap`), sem depender de qual dos dois
                  veio primeiro.
                */}
                {(economia || oferta.freteGratis) && (
                  <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
                    {economia && (
                      <p className="bg-cream text-forest rounded-full px-4 py-1.5 text-sm font-semibold">
                        Você economiza {economia}
                      </p>
                    )}
                    {oferta.freteGratis && (
                      <p className="bg-cream text-forest flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-semibold">
                        <Truck className="h-4 w-4 shrink-0" strokeWidth={2.5} />
                        Frete grátis
                      </p>
                    )}
                  </div>
                )}

                {/* mt-auto empurra o botão para a base: os cards têm alturas de
                    texto diferentes e sem isso os botões ficariam desalinhados. */}
                <CtaButton
                  href={oferta.checkoutUrl}
                  origem={`kit-${oferta.id}`}
                  bloco
                  tamanho={oferta.destaque ? 'lg' : 'md'}
                  className="mt-auto pt-7"
                >
                  Quero este kit
                </CtaButton>
              </div>
            )
          })}
        </div>

        {/*
          Formas de pagamento e reforços ficam AQUI, colados nas ofertas, e não
          numa seção própria mais abaixo. Essa informação é objeção de última
          hora — ela só trabalha no instante em que a pessoa está olhando o
          preço. Isolada num bloco distante, vira enfeite que ninguém lê.
        */}
        <div className="border-sand mt-14 rounded-3xl border border-dashed p-7">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            <span className="text-forest text-sm font-semibold">
              Formas de pagamento
            </span>
            {formasDePagamento.map((forma) => (
              <span
                key={forma}
                className="flex items-center gap-1.5 text-sm text-stone-600"
              >
                <Check className="text-clay h-4 w-4 shrink-0" strokeWidth={3} />
                {forma}
              </span>
            ))}
          </div>

          <ul className="border-sand/60 mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 border-t pt-6">
            {reforcos.map((reforco) => (
              <li
                key={reforco.texto}
                className="flex items-center gap-2 text-sm text-stone-500"
              >
                <reforco.icone className="text-clay h-4 w-4 shrink-0" />
                {reforco.texto}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
