import { AlertTriangle } from 'lucide-react'
import type { ReactNode } from 'react'

interface LegalPageProps {
  titulo: string
  atualizadoEm: string
  children: ReactNode
}

/**
 * Casca das páginas institucionais.
 * O bloco de aviso serve de lembrete durante o desenvolvimento — remova-o
 * depois que um advogado revisar os textos.
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

      <div className="border-clay/25 bg-clay/5 mt-8 flex gap-3 rounded-xl border p-5">
        <AlertTriangle className="text-clay mt-0.5 h-4 w-4 shrink-0" />
        <p className="text-sm leading-relaxed text-stone-600">
          <strong className="text-forest">Modelo-base para revisão.</strong> Este
          texto cobre o essencial exigido pelo CDC e pela LGPD, mas precisa ser
          revisado por um advogado e ter os dados da empresa preenchidos antes de
          entrar no ar. Remova este aviso depois da revisão.
        </p>
      </div>

      <div className="legal-prose mt-12 space-y-8">{children}</div>
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
