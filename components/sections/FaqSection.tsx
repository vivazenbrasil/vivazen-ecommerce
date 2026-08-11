'use client'

import SectionHeading from '@/components/ui/SectionHeading'
import { faq, site } from '@/lib/site'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'

export default function FaqSection() {
  const [aberta, setAberta] = useState<number | null>(0)

  return (
    <section id="faq" className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-6">
        <SectionHeading
          eyebrow="Dúvidas Frequentes"
          titulo="Perguntas que sempre recebemos"
          descricao="Se a sua dúvida não estiver aqui, chama no WhatsApp — a gente responde."
        />

        <div className="mt-14 space-y-3">
          {faq.map((item, index) => {
            const estaAberta = aberta === index
            return (
              <div
                key={item.pergunta}
                className="border-sand overflow-hidden rounded-xl border"
              >
                <h3>
                  <button
                    type="button"
                    onClick={() => setAberta(estaAberta ? null : index)}
                    aria-expanded={estaAberta}
                    aria-controls={`faq-resposta-${index}`}
                    className="bg-cream/50 hover:bg-cream text-forest flex w-full items-center justify-between gap-4 p-5 text-left font-semibold transition-colors"
                  >
                    <span>{item.pergunta}</span>
                    <ChevronDown
                      className={`text-clay h-5 w-5 shrink-0 transition-transform duration-300 ${
                        estaAberta ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                </h3>
                <div
                  id={`faq-resposta-${index}`}
                  role="region"
                  hidden={!estaAberta}
                  className="grid"
                >
                  <p className="p-5 pt-0 leading-relaxed text-stone-600">
                    {item.resposta}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        <p className="mt-10 text-center text-stone-600">
          Ainda com dúvida?{' '}
          <a
            href={`https://wa.me/${site.contato.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-clay hover:text-forest font-semibold underline decoration-2 underline-offset-4 transition-colors"
          >
            Fale com a gente no WhatsApp
          </a>
        </p>
      </div>
    </section>
  )
}
