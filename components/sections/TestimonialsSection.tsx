import SectionHeading from '@/components/ui/SectionHeading'
import { depoimentos } from '@/lib/site'
import { Quote, Star } from 'lucide-react'

export default function TestimonialsSection() {
  // Sem depoimentos reais cadastrados, a seção não renderiza.
  // Nunca inventar avaliação de cliente — ver aviso em lib/site.ts.
  if (depoimentos.length === 0) return null

  return (
    <section id="depoimentos" className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Depoimentos"
          titulo="Quem já usa, conta"
        />

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {depoimentos.map((dep) => (
            <figure
              key={`${dep.nome}-${dep.local}`}
              className="border-sand flex flex-col rounded-2xl border bg-white p-7"
            >
              <Quote className="text-clay/40 h-7 w-7" />
              <blockquote className="mt-4 flex-1 leading-relaxed text-stone-600">
                {dep.texto}
              </blockquote>

              <div className="border-sand/60 mt-6 border-t pt-5">
                <div className="flex gap-0.5" aria-label={`Nota ${dep.nota} de 5`}>
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star
                      key={i}
                      className={
                        i < dep.nota
                          ? 'fill-clay text-clay h-4 w-4'
                          : 'h-4 w-4 text-stone-300'
                      }
                    />
                  ))}
                </div>
                <figcaption className="text-forest mt-2.5 font-semibold">
                  {dep.nome}
                  <span className="block text-sm font-normal text-stone-500">
                    {dep.local}
                  </span>
                </figcaption>
              </div>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
