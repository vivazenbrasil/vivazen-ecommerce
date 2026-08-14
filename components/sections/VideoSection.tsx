import CtaButton from '@/components/ui/CtaButton'
import SectionHeading from '@/components/ui/SectionHeading'
import { ofertasPublicadas, produto } from '@/lib/site'

/**
 * Vídeo promocional.
 *
 * O arquivo é vertical (478x850), tem 76 segundos e tem FALA. Isso decide tudo
 * o que está escrito aqui:
 *
 * `controls` e nada de autoplay. Vídeo com voz não pode começar sozinho — o
 * navegador bloqueia áudio automático de qualquer forma, e o que sobraria seria
 * um vídeo mudo passando sem ninguém entender. Quem quiser assistir, aperta.
 *
 * `preload="metadata"` é o que impede o arquivo de 16,5 MB de ser baixado por
 * todo visitante. Só o cabeçalho vem junto com a página; os megabytes só saem
 * do servidor quando alguém aperta o play.
 *
 * `poster` é obrigatório aqui. A primeira tentativa foi usar o fragmento de
 * mídia `#t=0.1` na URL, que em tese faz o navegador buscar e pintar o quadro
 * de 0,1s. Não funcionou: com `preload="metadata"` o Chrome nem chegou a pedir
 * o arquivo, e o vídeo ficou um retângulo preto no meio de uma página de venda.
 * A capa em `livit-video-capa.webp` é um quadro real extraído do próprio vídeo.
 * Se trocar o vídeo, gere uma capa nova junto — sem ela volta o retângulo preto.
 *
 * `playsInline` mantém o vídeo dentro da página no iPhone, em vez de abrir o
 * player em tela cheia por cima do site e tirar a pessoa da página de venda.
 *
 * A largura máxima é pequena de propósito: o arquivo tem 478px de largura real,
 * então esticá-lo além disso só entrega imagem borrada.
 */
export default function VideoSection() {
  /*
    O vídeo termina com ela pedindo para clicar no botão. O destino segue a
    mesma regra do hero: se existem kits publicados, o botão leva para eles;
    senão, vai direto para o checkout, que é o único destino que existe.
    Assim o site nunca manda a pessoa para uma seção invisível.
  */
  const destino = ofertasPublicadas.length > 0 ? '#ofertas' : produto.checkoutUrl

  return (
    <section id="video" className="bg-cream-deep py-16 md:py-20">
      {/*
        Duas colunas a partir de `lg`, e não por estética: o vídeo é vertical e
        alto. Empilhado no centro, ele empurrava o botão para fora da tela num
        monitor comum — a pessoa terminava de assistir, ouvia "clique no botão"
        e não via botão nenhum sem rolar. Ao lado do texto, vídeo e botão cabem
        juntos na mesma tela.
      */}
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
              src="/livit_video_promocional.mp4"
              poster="/livit-video-capa.webp"
              controls
              preload="metadata"
              playsInline
              className="bg-forest aspect-478/850 h-auto w-full"
            >
              Seu navegador não consegue exibir vídeo.{' '}
              <a href="/livit_video_promocional.mp4">Baixe o arquivo aqui.</a>
            </video>
          </div>

          {/* O botão que ela pede no fim do vídeo. Fica logo abaixo do player
              de propósito: é para onde o olho vai quando o vídeo termina. */}
          <CtaButton href={destino} bloco className="mt-6">
            Quero conhecer o {produto.nome}
          </CtaButton>
        </div>
      </div>
    </section>
  )
}
