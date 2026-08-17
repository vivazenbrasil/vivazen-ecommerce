import CtaButton from '@/components/ui/CtaButton'
import { ofertasPublicadas, produto } from '@/lib/site'
import livitHero from '@/public/livit-hero.jpeg'
import { Check, Leaf } from 'lucide-react'
import Image from 'next/image'

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Brilho decorativo de fundo */}
      <div
        aria-hidden="true"
        className="bg-cream-deep pointer-events-none absolute -top-40 -right-40 h-[32rem] w-[32rem] rounded-full opacity-60 blur-3xl"
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 py-16 md:py-24 lg:grid-cols-2 lg:gap-16">
        <div>
          <span className="text-clay flex items-center gap-2 text-xs font-semibold tracking-[0.25em] uppercase">
            <Leaf className="h-4 w-4" />
            {produto.categoria}
          </span>

          <h1 className="font-display text-forest mt-5 text-5xl leading-[1.05] italic md:text-6xl xl:text-7xl">
            {produto.nome}
          </h1>

          <p className="text-forest-soft mt-4 max-w-md text-xl font-medium text-balance md:max-w-lg md:text-2xl">
            {produto.promessa}
          </p>

          {/*
            Este parágrafo carrega só o que a promessa acima NÃO diz: os ativos e
            o diferencial. Antes ele repetia sono/foco e ficava com 190 caracteres
            — o que num celular virava 4 linhas bem irregulares (93/95/69/34%).

            text-balance, e não text-pretty: medindo as linhas reais em 320/375/
            390/430px, o `pretty` deixava a última linha com 34% da medida em
            375px (irregularidade de 61%). O `balance` cai para 16%. Os dois
            parágrafos ficam em no máximo 4 linhas, dentro do limite de 6 que o
            Chrome exige para aplicar o balance.

            whitespace-nowrap nos nomes com hífen: por padrão a linha pode quebrar
            depois de um hífen já existente, o que deixava o "L-" sozinho na borda.
          */}
          <p className="mt-6 max-w-md text-lg leading-relaxed text-balance text-stone-600 md:max-w-lg">
            Fórmula com <span className="whitespace-nowrap">L-Triptofano</span>,{' '}
            <span className="whitespace-nowrap">L-Teanina</span>, Magnésio e
            vitaminas B3 e D3 — para relaxar sem sedação e sem dependência.
          </p>

          {/* Selos */}
          <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-3">
            {produto.selos.map((selo) => (
              <li
                key={selo}
                className="text-forest flex items-center gap-1.5 text-sm font-medium"
              >
                <Check className="text-clay h-4 w-4 shrink-0" strokeWidth={3} />
                {selo}
              </li>
            ))}
          </ul>

          {/*
            PREÇO NO HERO — leia antes de mexer.

            Ele só aparece enquanto NÃO existe nenhuma oferta publicada. A partir
            do momento em que os kits têm preço e link em lib/site.ts, o preço
            sai daqui e passa a morar só na seção de ofertas, logo abaixo.

            O motivo é que o preço avulso e o preço dos kits são valores
            diferentes do mesmo produto. Mostrar os dois com dois cliques de
            distância faz o visitante achar que foi cobrado a mais em um dos
            caminhos — e desconfiança de preço é o tipo de dúvida que não se
            resolve, a pessoa só fecha a aba.

            Enquanto não houver kit configurado, nada muda: o hero segue
            mostrando o preço, como sempre mostrou. A troca é automática.
          */}
          {ofertasPublicadas.length === 0 && produto.preco && (
            <div className="border-sand mt-8 border-t pt-6">
              <div className="flex flex-wrap items-baseline gap-x-3">
                <span className="font-display text-forest text-4xl">
                  {produto.preco}
                </span>
                {produto.precoParcelado && (
                  <span className="text-stone-500">{produto.precoParcelado}</span>
                )}
              </div>
              {(produto.quantidade || produto.duracao) && (
                <p className="mt-1.5 text-sm text-stone-500">
                  {[produto.quantidade, produto.duracao].filter(Boolean).join(' · ')}
                </p>
              )}
            </div>
          )}

          {/*
            Com kits no ar, o botão do hero leva para a seção de ofertas em vez
            de jogar direto na Braip: quem acabou de chegar ainda não sabe que
            existe kit com desconto, e mandar para o checkout do frasco avulso
            entrega a venda menor. Sem kits, ele continua indo direto ao
            checkout, que é o único destino que existe.
          */}
          {ofertasPublicadas.length > 0 ? (
            <CtaButton className="mt-8">Ver os kits e preços</CtaButton>
          ) : (
            <CtaButton comAviso className="mt-8" />
          )}
        </div>

        {/*
          A moldura é 3/4 porque é a proporção nativa do arquivo (960x1280).
          Antes era quadrada, o que fazia sentido com a foto anterior, do pote
          sozinho. Com uma foto de pessoa, o quadrado cortaria a luz do alto e
          parte do enquadramento — e a composição é metade do valor de uma foto
          dessas. Se trocar a imagem, confira a proporção do arquivo novo.

          `quality={90}` não é capricho e vale conhecer: o next/image reencoda
          toda imagem antes de servir, e o padrão dele é 75. Sem essa linha, o
          arquivo poderia ser perfeito que o visitante receberia uma versão
          recomprimida a 75 mesmo assim. É o ajuste que mais muda a nitidez
          percebida aqui, mais do que qualquer coisa feita no arquivo.
        */}
        <div className="flex justify-center lg:justify-end">
          <div className="relative aspect-3/4 w-full max-w-md overflow-hidden rounded-[2rem] border-4 border-white shadow-2xl">
            <Image
              src={livitHero}
              alt={`Mulher segurando a caixa do suplemento ${produto.nome} da VivaZen`}
              fill
              priority
              quality={90}
              sizes="(max-width: 1024px) 90vw, 448px"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
