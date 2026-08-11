import { garantia, site } from '@/lib/site'
import { ShieldCheck } from 'lucide-react'

export default function GuaranteeSection() {
  return (
    <section id="garantia" className="py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-6">
        <div className="bg-forest text-cream relative overflow-hidden rounded-[2rem] px-8 py-14 md:px-14">
          <div
            aria-hidden="true"
            className="bg-clay/15 pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full blur-3xl"
          />

          <div className="relative grid items-center gap-10 md:grid-cols-[auto_1fr] md:gap-12">
            {/* Selo */}
            <div className="border-clay-soft/40 mx-auto flex h-36 w-36 shrink-0 flex-col items-center justify-center rounded-full border-2 text-center">
              <ShieldCheck className="text-clay-soft h-9 w-9" />
              {garantia.dias > 0 ? (
                <>
                  <span className="font-display text-cream mt-1 text-4xl leading-none">
                    {garantia.dias}
                  </span>
                  <span className="text-cream/70 text-xs tracking-widest uppercase">
                    dias
                  </span>
                </>
              ) : (
                <span className="text-clay-soft mt-2 px-3 text-[10px] leading-tight italic">
                  ⚠️ definir garantia.dias
                </span>
              )}
            </div>

            <div>
              <span className="text-clay-soft block text-xs font-semibold tracking-[0.25em] uppercase">
                Garantia
              </span>
              <h2 className="font-display text-cream mt-4 text-3xl leading-tight italic md:text-4xl">
                {garantia.titulo}
              </h2>

              <p className="text-cream/80 mt-5 leading-relaxed">
                {garantia.dias > 0 ? (
                  <>
                    Experimente por {garantia.dias} dias. Se você não sentir
                    diferença, devolvemos o valor integral da sua compra — sem
                    burocracia e sem precisar justificar.
                  </>
                ) : (
                  'Experimente sem risco. Se você não sentir diferença, devolvemos o valor integral da sua compra — sem burocracia.'
                )}
              </p>

              <div className="border-cream/15 mt-8 border-t pt-7">
                <h3 className="text-cream text-sm font-semibold tracking-wide uppercase">
                  Como solicitar
                </h3>
                <ol className="mt-4 space-y-3">
                  {garantia.comoSolicitar.map((passo, i) => (
                    <li key={passo} className="text-cream/80 flex gap-3 leading-relaxed">
                      <span className="bg-clay/25 text-cream flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold">
                        {i + 1}
                      </span>
                      {passo}
                    </li>
                  ))}
                </ol>
              </div>

              <p className="text-cream/55 mt-7 text-xs leading-relaxed">
                {garantia.avisoCdc} Dúvidas sobre reembolso? Fale com a gente pelo
                WhatsApp {site.contato.whatsappExibicao}.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
