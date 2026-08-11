import type { ReactNode } from 'react'

interface SectionHeadingProps {
  eyebrow?: string
  titulo: ReactNode
  descricao?: ReactNode
  /** Centraliza o bloco. Padrão: true */
  centro?: boolean
  /** Usa as cores claras (para fundos escuros) */
  claro?: boolean
}

export default function SectionHeading({
  eyebrow,
  titulo,
  descricao,
  centro = true,
  claro = false,
}: SectionHeadingProps) {
  return (
    <div className={centro ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}>
      {eyebrow && (
        <span
          className={`block text-xs font-semibold tracking-[0.25em] uppercase ${
            claro ? 'text-clay-soft' : 'text-clay'
          }`}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className={`font-display mt-4 text-4xl leading-tight italic md:text-5xl ${
          claro ? 'text-cream' : 'text-forest'
        }`}
      >
        {titulo}
      </h2>
      {descricao && (
        <p
          className={`mt-5 text-lg leading-relaxed ${
            claro ? 'text-cream/80' : 'text-stone-600'
          }`}
        >
          {descricao}
        </p>
      )}
    </div>
  )
}
