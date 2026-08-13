import SectionHeading from '@/components/ui/SectionHeading'
import { produto } from '@/lib/site'
import { Clock, Droplets, PackageCheck, Repeat, Sparkles } from 'lucide-react'

const icones = [Droplets, Clock, Repeat]

export default function HowToUseSection() {
  const { passos, prazoResultado, armazenamento } = produto.modoDeUso

  return (
    <section id="modo-de-uso" className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Modo de Uso"
          titulo="Simples de encaixar na rotina"
          descricao={`Três passos e pronto. Sem preparo, sem medida, sem complicação.`}
        />

        <ol className="mt-16 grid gap-8 md:grid-cols-3">
          {passos.map((passo, i) => {
            const Icone = icones[i] ?? Sparkles
            return (
              <li key={passo.titulo} className="relative">
                {/* Conector entre os passos no desktop */}
                {i < passos.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="bg-sand absolute top-7 left-[calc(50%+2.5rem)] hidden h-px w-[calc(100%-5rem)] md:block"
                  />
                )}
                <div className="text-center">
                  <div className="bg-cream text-forest relative z-10 mx-auto flex h-14 w-14 items-center justify-center rounded-full">
                    <Icone className="h-6 w-6" />
                  </div>
                  <span className="text-clay mt-5 block text-xs font-semibold tracking-[0.2em] uppercase">
                    Passo {i + 1}
                  </span>
                  <h3 className="text-forest mt-2 text-xl font-semibold">
                    {passo.titulo}
                  </h3>
                  <p className="mt-2.5 leading-relaxed text-stone-600">
                    {passo.texto || (
                      <span className="text-clay italic">
                        [falta preencher] Em lib/site.ts — deve bater com o
                        rótulo aprovado
                      </span>
                    )}
                  </p>
                </div>
              </li>
            )
          })}
        </ol>

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {prazoResultado && (
            <div className="bg-cream flex gap-4 rounded-2xl p-6">
              <Sparkles className="text-clay h-6 w-6 shrink-0" />
              <div>
                <h4 className="text-forest font-semibold">
                  Quando esperar resultados
                </h4>
                <p className="mt-1.5 leading-relaxed text-stone-600">
                  {prazoResultado}
                </p>
              </div>
            </div>
          )}

          <div className="bg-cream flex gap-4 rounded-2xl p-6">
            <PackageCheck className="text-clay h-6 w-6 shrink-0" />
            <div>
              <h4 className="text-forest font-semibold">Como armazenar</h4>
              <p className="mt-1.5 leading-relaxed text-stone-600">
                {armazenamento}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
