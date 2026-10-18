import CtaButton from '@/components/ui/CtaButton'
import SectionHeading from '@/components/ui/SectionHeading'
import { produto } from '@/lib/site'

export default function VideoSection() {
  return (
    <section id="video" className="bg-cream-deep py-16 md:py-20">

      <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 lg:grid-cols-2 lg:gap-16">
        <div className="flex justify-center lg:justify-start">
          <SectionHeading
            centro={false}
            eyebrow="Conheça o produto"
            titulo={`Veja o ${produto.nome} por dentro`}
            descricao="Aperte o play: em pouco mais de um minuto você entende para que serve, o que tem na fórmula e como encaixar na sua rotina."
          />
        </div>

        <div className="mx-auto w-full max-w-xs sm:max-w-sm">
          <div className="overflow-hidden rounded-[2rem] border-4 border-white shadow-2xl">
            <video
              src="/video-promocional.mp4"
              poster="/video-promocional-capa.webp"
              controls
              preload="metadata"
              playsInline
              className="bg-forest aspect-478/850 h-auto w-full"
            >
              Seu navegador não consegue exibir vídeo.{' '}
              <a href="/video-promocional.mp4">Baixe o arquivo aqui.</a>
            </video>
          </div>

          <CtaButton origem="video" bloco className="mt-6">
            Quero conhecer o {produto.nome}
          </CtaButton>
        </div>
      </div>
    </section>
  )
}
