import { site } from '@/lib/site'
import type { MetadataRoute } from 'next'

/**
 * Gera o /sitemap.xml.
 *
 * A lista é escrita na mão porque são cinco páginas fixas e não existe rota
 * dinâmica no projeto. **Ao criar uma página nova em `app/`, acrescente ela
 * aqui** — nada avisa se você esquecer, o sitemap só fica incompleto em silêncio.
 *
 * Note o que NÃO está aqui, tudo de propósito:
 *
 * `changeFrequency` e `priority` — o Google declara publicamente que ignora os
 * dois. Preencher só dá a impressão de estar controlando algo que não é lido.
 *
 * `lastModified` — a forma óbvia de preencher seria `new Date()`, que marca
 * TODAS as páginas como alteradas em cada deploy, mesmo quando só uma imagem
 * mudou. O buscador usa esse campo apenas enquanto ele é confiável; enchê-lo de
 * data falsa ensina o Google a desprezá-lo. Melhor não declarar do que mentir.
 * Se um dia quiser data de verdade, ela tem que vir do conteúdo — por exemplo do
 * `atualizadoEm` das páginas legais — e não do momento do build.
 */
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
