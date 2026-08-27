import SectionHeading from '@/components/ui/SectionHeading'
import { depoimentos, depoimentosEmVideo } from '@/lib/site'
import { Quote, Star } from 'lucide-react'

export default function TestimonialsSection() {
  // Sem nenhum depoimento real cadastrado — nem em vídeo, nem em texto — a
  // seção não renderiza. Nunca inventar avaliação de cliente: ver o aviso em
  // lib/site.ts.
  if (depoimentos.length === 0 && depoimentosEmVideo.length === 0) return null

  return (
    <section id="depoimentos" className="py-15 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Depoimentos"
          titulo="Quem já usa, conta"
          descricao={
            depoimentosEmVideo.length > 0
              ? 'Um pouco sobre como o livit fez diferença na vida de uma das nossas clientes.'
              : undefined
          }
        />

        {depoimentosEmVideo.length > 0 && (
          /*
            `flex flex-wrap justify-center` em vez de grade de colunas fixas: com
            um depoimento só, uma grade de três colunas deixaria o vídeo encostado
            na esquerda com dois buracos ao lado. Assim, um centraliza, dois ficam
            lado a lado e três preenchem a linha, sem mexer no código.
          */
          <div className="mt-14 flex flex-wrap justify-center gap-8">
            {depoimentosEmVideo.map((dep) => (
              <figure key={dep.video} className="w-full max-w-xs">
                <div className="overflow-hidden rounded-[2rem] border-4 border-white shadow-2xl">
                  <video
                    src={dep.video}
                    poster={dep.capa}
                    controls
                    preload="metadata"
                    playsInline
                    className="bg-forest aspect-576/1024 h-auto w-full"
                  >
                    Seu navegador não consegue exibir vídeo.{' '}
                    <a href={dep.video}>Baixe o arquivo aqui.</a>
                  </video>
                </div>

                <figcaption className="text-forest mt-5 text-center font-semibold">
                  {dep.nome}
                  {dep.local && (
                    <span className="block text-sm font-normal text-stone-500">
                      {dep.local}
                    </span>
                  )}
                </figcaption>
              </figure>
            ))}
          </div>
        )}

        {depoimentos.length > 0 && (
          <div className="mt-12 grid gap-6 md:grid-cols-3">
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
                  <div
                    className="flex gap-0.5"
                    aria-label={`Nota ${dep.nota} de 5`}
                  >
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
        )}
      </div>
    </section>
  )
}
