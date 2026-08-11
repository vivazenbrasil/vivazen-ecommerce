import type { ReactNode } from 'react'

interface LegalPageProps {
  titulo: string
  atualizadoEm: string
  children: ReactNode
}

/**
 * Casca das páginas institucionais (privacidade, termos, trocas e devoluções).
 *
 * Serve para as três não divergirem de cabeçalho e espaçamento com o tempo.
 * Os textos foram revisados juridicamente — se alterar o conteúdo de qualquer
 * uma delas, atualize a data em `atualizadoEm` na página correspondente.
 */
export default function LegalPage({ titulo, atualizadoEm, children }: LegalPageProps) {
  return (
    <div className="mx-auto max-w-3xl px-6 py-20 md:py-28">
      <h1 className="font-display text-forest text-4xl italic md:text-5xl">
        {titulo}
      </h1>
      <p className="mt-4 text-sm text-stone-500">
        Última atualização: {atualizadoEm}
      </p>

      <div className="mt-12 space-y-8">{children}</div>
    </div>
  )
}

export function LegalSection({
  titulo,
  children,
}: {
  titulo: string
  children: ReactNode
}) {
  return (
    <section>
      <h2 className="text-forest text-xl font-semibold">{titulo}</h2>
      <div className="mt-3 space-y-3 leading-relaxed text-stone-600">{children}</div>
    </section>
  )
}
