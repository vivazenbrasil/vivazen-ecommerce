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
 * As três fotos são normalizadas no arquivo, e são duas regras e não uma:
 *
 * 1. Moldura de 700px nas três. Com `h-full w-auto` isso mantém os frascos na
 *    mesma escala (1 pote estreito, 3 potes largos). Esticadas para preencher a
 *    largura do card, o frasco único ficaria do tamanho do trio.
 * 2. Base dos frascos em y=675 nas três, com 24px de branco abaixo. O container
 *    alinha as IMAGENS pela base, e os originais tinham 26px, 7px e 50px — o
 *    trio flutuava uns 11px acima dos outros na tela.
 *
 * Trocou foto, refaça as duas medições. A segunda é invisível no arquivo e só
 * aparece com as três lado a lado.
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
  // Some inteira enquanto nenhuma oferta tiver preço E link em lib/site.ts. Card
  // de promoção sem preço, ou com botão que não leva a lugar nenhum, custa mais
  // confiança do que a promoção gera — e o hero volta a mostrar o preço avulso
  // nesse caso, então a página nunca fica sem preço nenhum.
  if (ofertasPublicadas.length === 0) return null

  return (
    /*
      Alinhamento do clique "Ver os kits e preços": somam-se três medidas quando o
      navegador pula para cá — a margem de rolagem, o padding de topo e o
      cabeçalho fixo de 73px que cobre o começo da tela.

      Com `scroll-mt-24` (96px) e `py-20` o título caía 135px abaixo do cabeçalho
      e a grade só começava a 574px, 68% da altura da tela: clicava em "ver os
      kits" e via um vazio, com os cards espiando na borda de baixo.

      Mexeu no cabeçalho ou nesses paddings, meça de novo — o resultado só
      aparece somando os três.
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
                O grupo tem nome (`group/card`) e isso não é detalhe: o CtaButton
                lá embaixo também é grupo e está DENTRO deste card. Com os dois
                anônimos, o `group-hover` do botão responderia ao hover do card
                inteiro e o brilho disparava de qualquer canto. Criou outro grupo
                aqui dentro, nomeia também.

                `hover:z-20` é por causa do card do meio, que fica por cima dos
                vizinhos: sem isso um card lateral sobe por baixo do destaque e a
                sombra sai cortada.
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
                  "Você economiza" e "Frete grátis" dividem a MESMA linha. Em dois
                  parágrafos empilhados eles só apareciam juntos no card de 3
                  frascos e engordavam ele bem além dos outros, que já são maiores
                  por design (`md:-my-4 md:py-11`). Lado a lado a altura extra
                  some, e quando quebram, quebram como bloco (`flex-wrap`).
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
          Colados nas ofertas de propósito, e não numa seção própria mais abaixo:
          isso é objeção de última hora e só trabalha no instante em que a pessoa
          está olhando o preço. Longe dali vira enfeite que ninguém lê.
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
