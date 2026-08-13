import CtaButton from '@/components/ui/CtaButton'
import { produto } from '@/lib/site'
import livit from '@/public/livit.webp'
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

          {/* Preço — só renderiza se estiver preenchido em lib/site.ts */}
          {produto.preco && (
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

          <CtaButton comAviso className="mt-8" />
        </div>

        <div className="flex justify-center lg:justify-end">
          <div className="relative aspect-square w-full max-w-md overflow-hidden rounded-[2rem] border-4 border-white shadow-2xl">
            <Image
              src={livit}
              alt={`Embalagem do suplemento ${produto.nome} da VivaZen`}
              fill
              priority
              sizes="(max-width: 1024px) 90vw, 448px"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
