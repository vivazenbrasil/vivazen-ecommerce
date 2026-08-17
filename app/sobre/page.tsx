import CtaButton from '@/components/ui/CtaButton'
import { produto, site } from '@/lib/site'
import capsulasBrinde from '@/public/capsulas-brinde.webp'
import { FlaskConical, Leaf, Recycle, Sprout, Users } from 'lucide-react'
import type { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'A Empresa',
  description: `Conheça a história da ${site.nome}: de uma pequena horta orgânica a uma marca de produtos naturais com transparência e qualidade.`,
  alternates: { canonical: '/sobre' },
}

const compromissos = [
  {
    icone: Sprout,
    titulo: 'Cultivo responsável',
    texto:
      'Priorizamos fornecedores que trabalham sem agrotóxicos e que conseguem provar a origem do que vendem. Se não dá para rastrear, não entra na nossa fórmula.',
  },
  {
    icone: FlaskConical,
    titulo: 'Formulação com propósito',
    texto:
      'Cada ativo entra porque tem uma função clara e uma dose que faz sentido. Não usamos ingrediente de vitrine, aquele que aparece no rótulo em quantidade simbólica.',
  },
  {
    icone: Recycle,
    titulo: 'Menos rastro',
    texto:
      'Embalagens recicláveis e envios sem plástico desnecessário. Bem-estar que custa o mínimo possível ao planeta.',
  },
  {
    icone: Users,
    titulo: 'Perto de quem compra',
    texto:
      'Quem responde o nosso WhatsApp é a nossa equipe. Antes, durante e depois da compra — sem robô e sem ficar na fila.',
  },
]

const jornada = [
  {
    marco: 'Origem',
    cor: 'clay' as const,
    texto:
      'Nossa jornada começou com uma pequena horta orgânica, onde cultivávamos ervas e plantas com métodos sustentáveis, sem o uso de agrotóxicos. A paixão por compartilhar os benefícios desses ingredientes puros nos levou à criação da VivaZen.',
  },
  {
    marco: 'Hoje',
    cor: 'forest' as const,
    texto:
      'Selecionamos cuidadosamente cada produto, garantindo que venham de fontes responsáveis e mantenham a pureza de seus ingredientes. Nossa missão é oferecer produtos naturais de alta qualidade que promovam o bem-estar de forma acessível e transparente.',
  },
  {
    marco: 'O próximo passo',
    cor: 'forest' as const,
    texto:
      `O ${produto.nome} é o nosso primeiro produto, e ele carrega tudo o que aprendemos até aqui. A partir dele, queremos construir uma linha completa de suplementos naturais — cada um com a mesma exigência de origem, dose e transparência.`,
  },
]

export default function Sobre() {
  return (
    <>
      {/* HERO */}
      <section className="px-6 pt-20 pb-16 md:pt-28">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-clay inline-flex items-center gap-2 text-xs font-semibold tracking-[0.25em] uppercase">
            <Leaf size={16} />
            Nossa História
          </span>

          <h1 className="font-display text-forest mt-6 text-5xl leading-[1.05] italic md:text-6xl xl:text-7xl">
            Da terra para
            <br />
            o seu bem-estar
          </h1>

          {/*
            Texto institucional escrito pela VivaZen. Se for alterar, altere a
            frase inteira: as três estão encadeadas — o motivo da fundação, a
            necessidade percebida, e o que a marca virou.

            `max-w-2xl` e não `max-w-xl`: o parágrafo tem umas 340 letras e é
            centralizado. Na medida anterior ele quebrava em seis linhas, e
            texto centralizado com muitas linhas fica cansativo de ler, porque
            o olho perde a margem de referência a cada volta.
          */}
          <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-stone-600">
            A VivaZen foi fundada para oferecer alternativas naturais e puras
            para os desafios do estilo de vida atual. Percebemos a necessidade
            de criar produtos que entregassem resultados reais sem gerar
            dependência. Assim nasceu a nossa marca: um ecossistema de
            bem-estar pensado para devolver a leveza, a clareza e a qualidade de
            vida que você merece.
          </p>
        </div>
      </section>

      {/*
        FAIXA DA IMAGEM
        A foto tem fundo branco opaco (sem canal alpha), então ela vive numa
        faixa branca de largura total: o branco deixa de ser uma emenda visível
        sobre o creme e passa a ser o fundo da seção.

        capsulas-brinde.webp é o recorte de image_capsules.png — a original tinha
        41% da altura em branco morto (225px acima, 209px abaixo do conteúdo).
        Proporção nativa do recorte: 1492/700 ≈ 2.131 — é dela que sai a classe
        `md:aspect-1492/700` abaixo. Se trocar o arquivo, confira a proporção.

        No mobile usamos uma caixa mais alta (3/2) com object-cover, o que corta
        as laterais e aproxima nos potes — senão os braços ficariam minúsculos.
      */}
      <section className="bg-white py-14 md:py-20">
        <div className="mx-auto max-w-5xl px-6">
          <div className="relative mx-auto aspect-3/2 w-full md:aspect-1492/700">
            <Image
              src={capsulasBrinde}
              alt={`Duas pessoas brindando com potes do suplemento ${produto.nome} da VivaZen`}
              fill
              priority
              placeholder="blur"
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="object-cover object-center"
            />
          </div>

          <p className="font-display text-forest mx-auto mt-10 max-w-lg text-center text-2xl leading-snug italic md:text-3xl">
            Bem-estar é melhor quando compartilhado.
          </p>
        </div>
      </section>

      {/* COMPROMISSOS */}
      <section className="px-6 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-clay text-xs font-semibold tracking-[0.3em] uppercase">
              No que acreditamos
            </span>
            <h2 className="font-display text-forest mt-4 text-4xl leading-tight italic md:text-5xl">
              Quatro compromissos que não negociamos
            </h2>
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2">
            {compromissos.map((item) => (
              <div
                key={item.titulo}
                className="border-sand rounded-2xl border bg-white p-8"
              >
                <item.icone className="text-clay h-7 w-7" />
                <h3 className="text-forest mt-5 text-lg font-semibold">
                  {item.titulo}
                </h3>
                <p className="mt-2.5 leading-relaxed text-stone-600">
                  {item.texto}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* JORNADA */}
      <section className="bg-white px-6 py-20 md:py-28">
        <div className="mx-auto max-w-5xl">
          <div className="mb-16 text-center">
            <span className="text-clay text-xs font-semibold tracking-[0.3em] uppercase">
              Nossa Jornada
            </span>
            <h2 className="font-display text-forest mt-4 text-4xl italic md:text-5xl">
              Crescendo com a natureza
            </h2>
          </div>

          <ol className="relative mx-auto max-w-3xl">
            {/* Linha vertical ligando os marcos */}
            <div
              aria-hidden="true"
              className="bg-sand absolute top-3 bottom-3 left-1.75 w-0.5"
            />

            {jornada.map((item, i) => (
              <li
                key={item.marco}
                className={`relative pl-12 ${i < jornada.length - 1 ? 'pb-16' : ''}`}
              >
                <span
                  aria-hidden="true"
                  className={`absolute top-1.5 left-0 h-4 w-4 rounded-full ring-4 ring-white ${
                    item.cor === 'clay' ? 'bg-clay' : 'bg-forest'
                  }`}
                />
                <h3
                  className={`text-sm font-semibold tracking-widest uppercase ${
                    item.cor === 'clay' ? 'text-clay' : 'text-forest'
                  }`}
                >
                  {item.marco}
                </h3>
                <p className="mt-4 text-lg leading-8 text-stone-600">
                  {item.texto}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-forest text-cream relative overflow-hidden px-6 py-20 md:py-28">
        <div
          aria-hidden="true"
          className="bg-clay/12 pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full blur-3xl"
        />
        <div className="relative mx-auto max-w-2xl text-center">
          <h2 className="font-display text-cream text-3xl leading-tight italic md:text-4xl">
            Pronto para sentir a diferença?
          </h2>
          <p className="text-cream/80 mt-5 leading-relaxed">
            O {produto.nome} reúne tudo o que a VivaZen acredita sobre bem-estar em{' '}
            {produto.quantidade.toLowerCase()}.
          </p>
          <CtaButton
            variante="claro"
            comAviso
            className="mt-9 flex flex-col items-center"
          >
            Conhecer o {produto.nome}
          </CtaButton>
        </div>
      </section>
    </>
  )
}
