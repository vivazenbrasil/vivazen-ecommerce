'use client'

import { destinoDoCta, site } from '@/lib/site'
import { track } from '@vercel/analytics'
import { Leaf, Menu, X } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const links = [
  { href: '/#produto', label: 'O Produto' },
  { href: '/#modo-de-uso', label: 'Modo de Uso' },
  { href: '/#entrega', label: 'Entrega' },
  { href: '/#faq', label: 'Dúvidas' },
  { href: '/sobre', label: 'A Empresa' },
]

export default function Header() {
  const [aberto, setAberto] = useState(false)

  // Trava o scroll do body enquanto o menu mobile está aberto. Mexer no style
  // direto é feio, mas é uma linha e não vale uma lib de scroll lock só por isso.
  useEffect(() => {
    document.body.style.overflow = aberto ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [aberto])

  useEffect(() => {
    if (!aberto) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setAberto(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [aberto])

  return (
    <header className="bg-cream/85 border-sand/60 sticky top-0 z-50 w-full border-b backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="text-forest flex items-center gap-2 transition hover:opacity-80"
          onClick={() => setAberto(false)}
        >
          <Leaf className="h-7 w-7" />
          <span className="text-2xl font-bold tracking-tighter">{site.nome}</span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-forest rounded-full px-3 py-2 text-sm font-medium text-stone-600 transition-colors"
            >
              {link.label}
            </Link>
          ))}
          {/*
            Leva para a seção de kits, não para a Braip: antes ia direto ao checkout
            do frasco avulso, ou seja, o botão mais visível do site entregando a
            menor das três vendas. Sem `target="_blank"` porque não sai mais do site.
          */}
          <a
            href={destinoDoCta}
            onClick={() => track('cta_clique', { origem: 'cabecalho', saiu: false })}
            className="bg-forest hover:bg-forest-soft ml-3 rounded-full px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:shadow-md"
          >
            Comprar agora
          </a>
        </nav>

        <button
          type="button"
          onClick={() => setAberto((v) => !v)}
          className="text-forest hover:bg-sand/40 -mr-2 rounded-lg p-2 transition-colors lg:hidden"
          aria-label={aberto ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={aberto}
          aria-controls="menu-mobile"
        >
          {aberto ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {aberto && (
        <div
          id="menu-mobile"
          className="bg-cream border-sand/60 absolute inset-x-0 top-full border-b shadow-lg lg:hidden"
        >
          <nav className="flex flex-col px-6 py-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setAberto(false)}
                className="border-sand/50 hover:text-forest border-b py-3.5 font-medium text-stone-700 transition-colors last:border-0"
              >
                {link.label}
              </Link>
            ))}
            <a
              href={destinoDoCta}
              onClick={() => {
                track('cta_clique', { origem: 'cabecalho-mobile', saiu: false })
                setAberto(false)
              }}
              className="bg-forest hover:bg-forest-soft mt-4 mb-2 rounded-full px-6 py-3.5 text-center font-semibold text-white transition-colors"
            >
              Comprar agora
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}
