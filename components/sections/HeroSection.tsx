import CtaButton from '@/components/ui/CtaButton'
import { ofertasPublicadas, produto } from '@/lib/site'
import livitHero from '@/public/hero-livit.jpg'
import { Check, Leaf } from 'lucide-react'
import Image from 'next/image'

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden">
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

          <p className="mt-6 max-w-md text-lg leading-relaxed text-balance text-stone-600 md:max-w-lg">
            Fórmula com <span className="whitespace-nowrap">L-Triptofano</span>,{' '}
            <span className="whitespace-nowrap">L-Teanina</span>, Magnésio,
            Inositol e vitaminas B3 e D3 — com a quantidade de cada ativo declarada
            na tabela nutricional.
          </p>

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
            PREÇO NO HERO — leia antes de mexer. Só aparece enquanto não houver
            oferta publicada; com os kits no ar o preço passa a morar só na seção
            de ofertas.

            É que o preço avulso e o dos kits são valores diferentes do mesmo
            produto, e mostrar os dois a dois cliques de distância faz o visitante
            achar que foi cobrado a mais em um dos caminhos. Desconfiança de preço
            não se resolve, a pessoa só fecha a aba. A troca é automática.
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
            <CtaButton origem="hero" className="mt-8">
              Ver os kits e preços
            </CtaButton>
          ) : (
            <CtaButton origem="hero" comAviso className="mt-8" />
          )}
        </div>
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
