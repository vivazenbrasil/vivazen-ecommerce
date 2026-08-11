import { Leaf, Sprout, HeartHandshake } from 'lucide-react'
import Link from 'next/link'

const pilares = [
  {
    icone: Sprout,
    titulo: 'Ingredientes selecionados',
    texto:
      'Cada ativo da fórmula é escolhido por função, não por volume. Trabalhamos com fornecedores auditados e lotes rastreáveis.',
  },
  {
    icone: Leaf,
    titulo: 'Transparência total',
    texto:
      'Publicamos a tabela nutricional completa e explicamos o papel de cada componente. Você sabe exatamente o que está tomando.',
  },
  {
    icone: HeartHandshake,
    titulo: 'Atendimento de gente',
    texto:
      'Quem responde o WhatsApp é a nossa equipe, não um robô. Antes, durante e depois da compra.',
  },
]

export default function AboutSection() {
  return (
    <section id="sobre" className="bg-forest text-cream py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-clay-soft block text-xs font-semibold tracking-[0.25em] uppercase">
            Quem Somos
          </span>
          <h2 className="font-display text-cream mt-4 text-4xl leading-tight italic md:text-5xl">
            A VivaZen nasceu para reconectar
            <br className="hidden md:block" /> pessoas e natureza
          </h2>
          <p className="text-cream/80 mt-6 text-lg leading-relaxed">
            Acreditamos que a verdadeira saúde vem do equilíbrio. Nossas soluções
            são cuidadosamente pensadas e desenvolvidas com ingredientes
            selecionados para melhorar a sua qualidade de vida e respeitar o meio
            ambiente.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {pilares.map((pilar) => (
            <div
              key={pilar.titulo}
              className="border-cream/15 bg-cream/5 rounded-2xl border p-7"
            >
              <pilar.icone className="text-clay-soft h-8 w-8" />
              <h3 className="text-cream mt-5 text-lg font-semibold">
                {pilar.titulo}
              </h3>
              <p className="text-cream/75 mt-2.5 leading-relaxed">{pilar.texto}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/sobre"
            className="text-clay-soft hover:text-cream border-clay-soft/40 hover:border-cream inline-flex items-center gap-2 border-b pb-1 font-semibold transition-colors"
          >
            Conheça a nossa história completa
          </Link>
        </div>
      </div>
    </section>
  )
}
