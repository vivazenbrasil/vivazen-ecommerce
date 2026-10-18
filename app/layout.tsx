import Footer from '@/components/layout/Footer'
import Header from '@/components/layout/Header'
import PromoBar from '@/components/layout/PromoBar'
import WhatsAppFloat from '@/components/layout/WhatsAppFloat'
import { Analytics } from '@vercel/analytics/next'
import { faixaDePrecoDosKits, produto, site } from '@/lib/site'
import type { Metadata } from 'next'
import { Fraunces, Geist } from 'next/font/google'
import './globals.css'
import MetaPixelConsent from "@/components/MetaPixelConsent";
import { Suspense } from "react";

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
  display: 'swap',
})

const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-fraunces',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.nome} — ${produto.promessa}`,
    template: `%s | ${site.nome}`,
  },
  description: site.descricao,
  keywords: [
    'suplemento natural',
    'produtos naturais',
    'l-triptofano',
    'l-teanina',
    'magnésio',
    'inositol',
    produto.nome,
    site.nome,
  ],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: site.url,
    siteName: site.nome,
    title: `${site.nome} — ${produto.promessa}`,
    description: site.descricao,
    /*
      og-image.jpg existe só para o preview de quando compartilham o link no
      WhatsApp/Instagram/Facebook, e é 1200x630 de verdade. Antes estava a
      livit.jpeg, 1448x1086 declarada como 1200x630, e o WhatsApp cortava o
      produto pela metade.

      Trocou a arte, mantenha as três: 1200x630, JPEG (o robô do WhatsApp não é
      confiável com WebP) e abaixo de 300 KB — acima disso ele não mostra
      preview nenhum.
    */
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: `${produto.nome} — ${site.nome}`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${site.nome} — ${produto.promessa}`,
    description: site.descricao,
    images: ['/og-image.jpg'],
  },
  robots: { index: true, follow: true },
}

/*
  JSON-LD: é como o Google entende QUEM é esta empresa, e não só o que a página
  diz. `legalName`, `taxID` e `address` são o que distingue esta VivaZen das
  outras que existem no Brasil — o CNPJ é único e não há como confundir.

  `sameAs` sai de `site.redesSociais`; array vazio, campo não emitido, porque
  schema com campo vazio é pior que schema sem o campo. As ofertas saem de
  `ofertasPublicadas`, então preço no schema e preço na tela não divergem.
*/
const faixa = faixaDePrecoDosKits()

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${site.url}/#organization`,
      name: site.nome,
      legalName: site.empresa.razaoSocial,
      taxID: site.empresa.cnpj,
      url: site.url,
      logo: `${site.url}/logo.webp`,
      description: site.descricao,
      email: site.contato.email,
      telephone: `+${site.contato.whatsapp}`,
      address: {
        '@type': 'PostalAddress',
        streetAddress: site.empresa.endereco,
        addressCountry: 'BR',
      },
      ...(site.redesSociais.length > 0 && { sameAs: site.redesSociais }),
    },
    {
      '@type': 'Product',
      name: produto.nome,
      category: produto.categoria,
      description: site.descricao,
      image: `${site.url}/og-image.jpg`,
      brand: { '@type': 'Brand', name: site.nome },
      ...(faixa && {
        offers: {
          '@type': 'AggregateOffer',
          priceCurrency: 'BRL',
          lowPrice: faixa.min,
          highPrice: faixa.max,
        },
      }),
    },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className={`${geist.variable} ${fraunces.variable}`}>
      <body className="bg-cream font-sans text-stone-700 selection:bg-clay/25 flex min-h-screen flex-col antialiased">
        <a
          href="#conteudo"
          className="bg-forest sr-only rounded-br-lg px-4 py-2 text-white focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:z-100"
        >
          Ir para o conteúdo
        </a>
        <PromoBar />
        <Header />
        <main id="conteudo" className="flex-1">
          {children}
        </main>
        <Footer />
        <WhatsAppFloat />

        {/*
          Vercel Analytics no lugar do GA4 porque é sem cookie: o site não grava
          nada no navegador de quem visita, então segue sem banner de
          consentimento e com exposição mínima à LGPD. Em troca não conversa com
          Google Ads nem com a Meta e não monta público de remarketing — no dia
          que houver campanha paga o GTM entra AO LADO deste, não no lugar.

          Por último no body de propósito: script de terceiro não deve competir
          com o conteúdo pelo carregamento.
        */}
        <Analytics />
        <Suspense fallback={null}>
          <MetaPixelConsent />
        </Suspense>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  )
}
