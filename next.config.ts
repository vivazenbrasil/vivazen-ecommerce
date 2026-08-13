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
  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }]
  },
}

export default nextConfig
