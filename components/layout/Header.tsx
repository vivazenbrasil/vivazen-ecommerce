'use client'

import { Leaf } from 'lucide-react'
import Link from 'next/link'

export default function Header() {
  return (
    <header className="flex items-center justify-between p-6 max-w-6xl mx-auto w-full">
      <Link
        href="/"
        className="flex items-center gap-2 text-green-700 hover:opacity-90 transition"
      >
        <Leaf className="w-8 h-8" />
        <span className="text-2xl font-bold tracking-tighter">VivaZen</span>
      </Link>
      <nav className="hidden md:flex">
        <Link href="/sobre" className="text-stone-600 hover:text-green-700 px-4 py-2 font-medium transition-colors">A Empresa</Link>
        <Link href="/#produto" className="text-stone-600 hover:text-green-700 px-4 py-2 font-medium transition-colors">O Produto</Link>
      </nav>
    </header>
  )
}