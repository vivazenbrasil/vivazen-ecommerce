import type { NextConfig } from 'next'

/**
 * Headers de segurança.
 *
 * O site é estático e não tem login, formulário nem banco — então o risco aqui
 * não é roubo de dado, é uso indevido da página. Cada header abaixo fecha uma
 * porta específica:
 *
 * O par frame-ancestors + X-Frame-Options impede que a página seja carregada
 * dentro de um iframe em outro domínio. Sem isso, alguém enquadra o site e
 * sobrepõe um botão de compra falso apontando para outro checkout — golpe comum
 * com produto vendido por plataforma de afiliado. Os dois estão aqui porque o
 * X-Frame-Options está obsoleto mas ainda é o que navegador antigo entende, e o
 * frame-ancestors é o que os atuais respeitam.
 *
 * Um CSP completo (script-src e afins) NÃO está aqui de propósito: o Next injeta
 * script inline para hidratar a página, então um CSP restritivo exigiria nonce
 * por requisição — o que obriga a ter middleware e tira o site do estático. Para
 * uma landing sem entrada de dado, o custo não se paga. Se um dia entrar
 * formulário ou pagamento nesta origem, aí vale reabrir essa conta.
 *
 * O HSTS não está aqui porque a Vercel já envia o dela (max-age de 2 anos);
 * declarar de novo só duplicaria o header.
 */
const securityHeaders = [
  { key: 'Content-Security-Policy', value: "frame-ancestors 'none'" },
  { key: 'X-Frame-Options', value: 'DENY' },
  // Impede o navegador de "adivinhar" um tipo de conteúdo diferente do que o
  // servidor declarou — é o que transforma um upload inofensivo em script.
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  // Ao clicar num link para fora (o checkout da Braip, por exemplo), manda só o
  // domínio de origem em vez da URL completa.
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  // O site não usa nenhuma dessas APIs. Negar explicitamente evita que um script
  // de terceiro, se algum dia entrar aqui, consiga pedir acesso.
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), payment=()',
  },
]

const nextConfig: NextConfig = {
  images: {
    /*
      Lista de qualidades que o otimizador aceita. A partir do Next 16 ela é
      obrigatória: qualquer `quality` que não esteja aqui é ignorado em silêncio
      e a imagem sai no padrão, que é 75. Foi o que aconteceu com a foto do
      hero — o `quality={90}` estava escrito no componente e a URL servida
      continuava saindo com `q=75`.

      O 75 precisa continuar na lista porque é o que todas as outras imagens do
      site usam; declarar só o 90 quebraria as demais.
    */
    qualities: [75, 90],
  },

  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }]
  },
}

export default nextConfig
