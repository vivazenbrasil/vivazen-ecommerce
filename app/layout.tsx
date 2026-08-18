import Footer from '@/components/layout/Footer'
import Header from '@/components/layout/Header'
import PromoBar from '@/components/layout/PromoBar'
import WhatsAppFloat from '@/components/layout/WhatsAppFloat'
import { produto, site } from '@/lib/site'
import type { Metadata } from 'next'
import { Fraunces, Geist } from 'next/font/google'
import './globals.css'

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
    'sono e ansiedade',
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
      og-image.jpg existe só para isso: é a imagem do preview quando alguém
      compartilha o link no WhatsApp, no Instagram ou no Facebook.

      Ela é 1200x630 de verdade. Antes aqui estava a livit.jpeg, que é 1448x1086
      (quase quadrada) declarada como 1200x630 — o WhatsApp cortava o produto
      pela metade. Se trocar a arte, mantenha as três coisas: 1200x630, JPEG (o
      robô do WhatsApp não é confiável com WebP) e abaixo de 300 KB, que é o
      limite acima do qual ele simplesmente não mostra preview nenhum.
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

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${site.url}/#organization`,
      name: site.nome,
      url: site.url,
      description: site.descricao,
      email: site.contato.email,
      telephone: `+${site.contato.whatsapp}`,
    },
    {
      '@type': 'Product',
      name: produto.nome,
      category: produto.categoria,
      description: site.descricao,
      image: `${site.url}/og-image.jpg`,
      brand: { '@type': 'Brand', name: site.nome },
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  )
}
