import CtaButton from '@/components/ui/CtaButton'
import { produto } from '@/lib/site'
import livitCaixa from '@/public/produto-caixa.webp'
import Image from 'next/image'

const motivos = [
  {
    titulo: 'Fórmula limpa e completa',
    texto:
      'Seis ativos que trabalham juntos: L-Triptofano, L-Teanina, Magnésio, Inositol e vitaminas B3 e D3. Sem corantes artificiais e sem açúcar.',
  },
  {
    titulo: 'A dose está declarada',
    texto:
      'A quantidade de cada ativo aparece na tabela nutricional publicada nesta página. Você vê exatamente quanto está levando, sem "composto exclusivo" escondendo quantidade.',
  },
  {
    titulo: 'Feito para o uso diário',
    texto:
      'Cápsulas práticas, fáceis de engolir e sem sabor residual. Cabem na rotina de quem tem pressa.',
  },
  {
    titulo: 'Embalagem sustentável',
    texto:
      'Material reciclável e envio em embalagem discreta, sem identificação do conteúdo por fora.',
  },
]

export default function ProductHighlightSection() {
  return (
    <section id="produto" className="py-20 md:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 lg:grid-cols-2 lg:gap-16">
        {/*
          Sem moldura, sem borda branca e sem recorte: a arte nova tem fundo
          transparente de verdade (60% dos pixels), então o produto flutua sobre
          o creme da página. A versão anterior tinha fundo próprio e precisava
          da moldura para o fundo não brigar com o da seção.

          `drop-shadow` e não `shadow`: o primeiro segue o contorno recortado da
          embalagem, o segundo desenharia um retângulo em volta da imagem toda,
          incluindo a área transparente — que é justamente o que denuncia um PNG
          mal aplicado.
        */}
        <div className="flex justify-center lg:order-2">
          <Image
            src={livitCaixa}
            alt={`Caixa e pote do suplemento ${produto.nome}`}
            sizes="(max-width: 1024px) 90vw, 480px"
            className="h-auto w-full max-w-md drop-shadow-2xl"
          />
        </div>

        <div className="lg:order-1">
          <span className="text-clay block text-xs font-semibold tracking-[0.25em] uppercase">
            Por que o {produto.nome}
          </span>
          <h2 className="font-display text-forest mt-4 text-4xl leading-tight italic md:text-5xl">
            Não é mais um pote
            <br className="hidden md:block" /> na sua prateleira
          </h2>

          <ol className="mt-10 space-y-7">
            {motivos.map((motivo, i) => (
              <li key={motivo.titulo} className="flex gap-4">
                <span className="bg-clay/12 text-clay font-display flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-lg font-semibold">
                  {i + 1}
                </span>
                <div>
                  <h3 className="text-forest text-lg font-semibold">
                    {motivo.titulo}
                  </h3>
                  <p className="mt-1.5 leading-relaxed text-stone-600">
                    {motivo.texto}
                  </p>
                </div>
              </li>
            ))}
          </ol>

          <CtaButton origem="produto" className="mt-10" tamanho="md">
            Quero o meu {produto.nome}
          </CtaButton>
        </div>
      </div>
    </section>
  )
}
