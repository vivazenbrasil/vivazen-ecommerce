import { site } from '@/lib/site'
import type { MetadataRoute } from 'next'


export default function sitemap(): MetadataRoute.Sitemap {
  const rotas = [
    '/',
    '/sobre',
    '/politica-de-privacidade',
    '/termos-de-uso',
    '/trocas-e-devolucoes',
  ]

  return rotas.map((rota) => ({
    url: new URL(rota, site.url).toString(),
  }))
}
