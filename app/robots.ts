import { site } from '@/lib/site'
import type { MetadataRoute } from 'next'

/**
 * Gera o /robots.txt.
 *
 * ATENÇÃO: `robots.txt` NÃO é mecanismo de segurança — é um índice público, e é o
 * primeiro arquivo que scanner automatizado lê. Nunca liste aqui um caminho que
 * você quer esconder: escrever `Disallow: /admin` anuncia que existe um /admin.
 * Página que não pode ser vista precisa de senha, não de um pedido ao robô.
 *
 * Como o site é todo público, a única linha que faz trabalho de verdade aqui é a
 * do sitemap: é ela que diz ao buscador onde está a lista de páginas.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: `${site.url}/sitemap.xml`,
  }
}
