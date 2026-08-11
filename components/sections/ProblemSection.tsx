import SectionHeading from '@/components/ui/SectionHeading'
import { produto } from '@/lib/site'
import { BatteryLow, BrainCircuit, CloudRain, MoonStar } from 'lucide-react'

const dores = [
  {
    icone: MoonStar,
    titulo: 'Vira e mexe na cama',
    texto: 'Cansado o dia inteiro, mas o sono não vem quando a cabeça encosta no travesseiro.',
  },
  {
    icone: CloudRain,
    titulo: 'Ansiedade de fundo',
    texto: 'Aquela tensão constante no peito, mesmo quando nada de errado está acontecendo.',
  },
  {
    icone: BatteryLow,
    titulo: 'Acorda já sem energia',
    texto: 'Dormiu as oito horas e ainda assim levanta como se tivesse dormido três.',
  },
  {
    icone: BrainCircuit,
    titulo: 'Difícil se concentrar',
    texto: 'A mente pula de assunto em assunto e as tarefas simples levam o dobro do tempo.',
  },
]

export default function ProblemSection() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Você reconhece isso?"
          titulo="O corpo cobra o preço do dia a dia"
          descricao="Rotina acelerada, cobrança constante e pouco descanso deixam marcas. Se algum destes pontos parece familiar, o problema raramente é falta de força de vontade."
        />

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {dores.map((dor) => (
            <div
              key={dor.titulo}
              className="border-sand rounded-2xl border bg-white p-7"
            >
              <dor.icone className="text-clay h-7 w-7" />
              <h3 className="text-forest mt-5 font-semibold">{dor.titulo}</h3>
              <p className="mt-2 text-sm leading-relaxed text-stone-600">
                {dor.texto}
              </p>
            </div>
          ))}
        </div>

        <p className="text-forest mx-auto mt-14 max-w-2xl text-center text-lg leading-relaxed">
          O <strong className="font-semibold">{produto.nome}</strong> foi formulado
          justamente para dar ao seu corpo os nutrientes que a rotina consome —
          para que o equilíbrio volte a ser o seu estado natural.
        </p>
      </div>
    </section>
  )
}
