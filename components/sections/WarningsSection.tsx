import { produto } from '@/lib/site'
import { AlertTriangle, Info } from 'lucide-react'

export default function WarningsSection() {
  return (
    <section id="advertencias" className="py-16">
      <div className="mx-auto max-w-4xl px-6">
        <div className="border-clay/25 bg-clay/5 rounded-2xl border p-7 md:p-9">
          <h2 className="text-forest flex items-center gap-2.5 text-xl font-semibold">
            <AlertTriangle className="text-clay h-5 w-5 shrink-0" />
            Advertências e contraindicações
          </h2>

          <ul className="mt-6 space-y-3.5">
            {produto.contraindicacoes.map((item) => (
              <li
                key={item}
                className={`flex gap-3 leading-relaxed text-stone-700 ${
                  item.startsWith('ALÉRGICOS') ? 'font-bold' : ''
                }`}
              >
                <span className="bg-clay mt-2 h-1.5 w-1.5 shrink-0 rounded-full" />
                {item}
              </li>
            ))}
          </ul>

          <div className="border-clay/20 mt-7 flex gap-3 border-t pt-6">
            <Info className="text-clay mt-0.5 h-4 w-4 shrink-0" />
            <p className="text-sm leading-relaxed text-stone-600">
              {produto.avisoAnvisa}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
