import { Leaf } from 'lucide-react'
import Link from 'next/link'

export const metadata = {
  title: 'Página não encontrada',
  robots: { index: false, follow: false },
}

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center px-6 py-24 text-center md:py-36">
      <Leaf className="text-clay h-10 w-10" />

      <p className="text-clay-soft mt-6 block text-xs font-semibold tracking-[0.25em] uppercase">
        Erro 404
      </p>

      <h1 className="font-display text-forest mt-4 text-4xl italic md:text-5xl">
        Essa página não existe
      </h1>

      <p className="mt-6 text-lg leading-relaxed text-stone-600">
        O link que você seguiu pode estar errado ou a página pode ter mudado
        de endereço.
      </p>

      <Link
        href="/"
        className="bg-forest hover:bg-forest-soft mt-10 inline-flex items-center gap-2.5 rounded-full px-9 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl active:translate-y-0 active:scale-[0.98] motion-reduce:transition-none"
      >
        Voltar para a página inicial
      </Link>
    </div>
  )
}
