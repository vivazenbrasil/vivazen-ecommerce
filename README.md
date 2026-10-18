# VivaZen

Site institucional e landing page de marketing do suplemento **Livit**, da VivaZen.

**Importante: este site não vende nada.** Não há carrinho, checkout, banco de dados ou área de cliente. Todos os botões de compra levam para o checkout externo da **Braip**, num domínio de terceiro. A função deste site é só uma: convencer e dar segurança ao visitante antes desse clique que leva ele para fora.

Isso muda as prioridades. Não faz sentido pedir aqui integração de pagamento ou estoque — mas faz muita diferença ter modo de uso, prazo de entrega, garantia, contraindicações e FAQ bem explicados, porque é isso que faz a pessoa clicar em vez de desistir.

## Rodando o projeto

Requer Node 20 ou superior.

```bash
npm install
npm run dev      # http://localhost:3000
```

Antes de qualquer commit:

```bash
npm run build    # o build roda o TypeScript; se o tipo quebrar, o build quebra
npx eslint .
```

## A regra mais importante: `lib/site.ts`

Todo dado de negócio do site — nome do produto, preço, prazos de entrega, dias de garantia, CNPJ, telefone, FAQ, texto do modo de uso — mora em `lib/site.ts`. Nenhum componente tem esses valores escritos direto no JSX.

Se você precisa mudar um preço, um prazo ou um número de telefone, **é nesse arquivo e só nesse arquivo**. Mudar lá atualiza a home, as páginas legais, o rodapé e o SEO de uma vez.

Campos ainda não preenchidos aparecem como um aviso laranja em itálico, `[falta preencher]`, na própria tela, de propósito. Isso é para o campo faltando não passar batido até a produção. Se você ver um `[falta preencher]` no site, é um campo vazio em `lib/site.ts`, não um bug.

### Cuidado ao editar `lib/site.ts`

Os objetos exportados usam `as const`. Isso faz o TypeScript tratar cada texto como um **tipo literal**, não como `string` genérica. A consequência prática é chata e já quebrou o build uma vez:

```ts
// entrega.prazoPostagem preenchido => tipo literal 'Postamos em até...'
// esse literal nunca pode ser falso, então o TS conclui que o ramo do || é
// inalcançável, colapsa o tipo para `never`, e qualquer acesso a propriedade ali
// vira erro de compilação
{card.texto || <span>[falta preencher] {card.aviso}</span>}
```

Onde esse padrão de "mostra aviso se estiver vazio" existe, o array é **tipado explicitamente com `string`** para manter o guard alcançável. Ver `components/sections/ShippingSection.tsx` — o comentário no topo do arquivo explica. Se você criar um guard novo desse tipo, faça o mesmo, senão o build quebra no dia em que alguém preencher o campo.

## Estrutura

```
app/                    rotas (App Router do Next)
components/layout/      casca que aparece em toda página
components/sections/    blocos da home, um arquivo por seção
components/ui/          peças reutilizadas entre seções
lib/                    dados e configuração
public/                 imagens
```

O alias `@/` aponta para a raiz do projeto (`tsconfig.json`), então `@/lib/site` e `@/public/hero-livit.jpg` funcionam de qualquer arquivo.

### `app/`

| Arquivo | O que faz |
|---|---|
| `layout.tsx` | Casca de toda página. Carrega as duas fontes (Geist para texto, Fraunces para títulos), monta a metadata de SEO (OpenGraph, canonical, Twitter), injeta o JSON-LD de Organization e Product, e renderiza Header + Footer + botão de WhatsApp em volta do conteúdo. Também tem o skip-link de acessibilidade que aparece no primeiro Tab. |
| `page.tsx` | A home. É só uma lista de seções na ordem em que aparecem — não tem lógica nem estilo. Para reordenar a página, reordene aqui. Para tirar uma seção do ar, comente a linha. |
| `globals.css` | Import do Tailwind e o bloco `@theme` com as cores e fontes da marca. É o único lugar onde as cores são definidas. |
| `sobre/page.tsx` | Página "A Empresa": história, quatro compromissos, linha do tempo e CTA. |
| `politica-de-privacidade/page.tsx` | Política de privacidade (LGPD). |
| `termos-de-uso/page.tsx` | Termos de uso. |
| `trocas-e-devolucoes/page.tsx` | Política de trocas, devoluções e reembolso. |
| `sitemap.ts` | Gera o `/sitemap.xml`. A lista de rotas é escrita na mão — **ao criar uma página nova, acrescente ela lá**, nada avisa se esquecer. |
| `robots.ts` | Gera o `/robots.txt`. Libera tudo e aponta o sitemap. |
| `favicon.ico` | O Next encontra e usa esse arquivo automaticamente por estar aqui. |

As três páginas legais já passaram por revisão jurídica. Se você alterar o conteúdo de alguma delas, atualize a data no `atualizadoEm` daquela página.

### `components/layout/`

| Arquivo | O que faz |
|---|---|
| `Header.tsx` | Cabeçalho fixo no topo. No desktop mostra os links e o botão de comprar; abaixo de 1024px vira menu hamburguer. Client Component, porque controla o estado de aberto/fechado, trava o scroll do fundo enquanto o menu está aberto e fecha no Esc. Os links do menu ficam no array `links`, no topo do arquivo. |
| `Footer.tsx` | Rodapé. Contatos (e-mail e WhatsApp são links de verdade, não texto), navegação, links institucionais, o aviso obrigatório da ANVISA e o CNPJ. O ano do copyright é calculado, não escrito na mão. |
| `WhatsAppFloat.tsx` | Botão flutuante de WhatsApp. O SVG está escrito inline porque o lucide-react não inclui ícones de marca. Já abre com uma mensagem pré-preenchida. |
| `LegalPage.tsx` | Casca visual das três páginas legais, para não repetir o mesmo cabeçalho e espaçamento em cada uma. Exporta também `LegalSection`, usada para cada cláusula numerada. |

### `components/sections/`

Um arquivo por bloco da home, na ordem em que aparecem na página. Todos são Server Components, **exceto os dois marcados como client** — esses precisam de estado do React.

| Arquivo | O que faz |
|---|---|
| `HeroSection.tsx` | Primeira tela: nome do produto, promessa, ativos da fórmula, selos, preço e o CTA principal. |
| `OffersSection.tsx` | Os kits de 1, 2 e 3 frascos, com preço cortado, economia e um card em destaque. **Não renderiza nada enquanto nenhum kit tiver preço e link de checkout** em `ofertas`. Traz junto as formas de pagamento — ver abaixo por que elas não são uma seção separada. |
| `VideoSection.tsx` | O vídeo promocional com o botão logo abaixo — ela pede esse clique no fim do vídeo. Duas colunas a partir de `lg` para o vídeo vertical não empurrar o botão para fora da tela. |
| `AboutSection.tsx` | Faixa verde escura apresentando a VivaZen, com três pilares e link para `/sobre`. |
| `TestimonialsSection.tsx` | Depoimentos, em vídeo e em texto. **Não renderiza nada enquanto `depoimentosEmVideo` e `depoimentos` estiverem os dois vazios** em `lib/site.ts` — ver o aviso abaixo. |
| `ProblemSection.tsx` | Os quatro problemas que o produto endereça (sono, ansiedade, energia, foco). Existe para o visitante se reconhecer antes de ouvir a solução. |
| `ProductHighlightSection.tsx` | Quatro motivos para escolher o Livit, ao lado da foto da caixa. |
| `NutritionalInfoSection.tsx` | **Client.** A tabela nutricional com lupa no hover e modal com zoom e arraste, mais o acordeão explicando cada nutriente. É o arquivo mais complexo do projeto — se for mexer, mexa com calma. As duas `<Image>` daqui não têm `width`/`height` escritos na mão de propósito: o import é estático e o Next lê a dimensão do próprio arquivo. |
| `HowToUseSection.tsx` | Modo de uso em três passos, prazo de resultado e como armazenar. Os textos vêm de `produto.modoDeUso` e **precisam bater com o rótulo aprovado**. |
| `WarningsSection.tsx` | Advertências, contraindicações e o aviso da ANVISA. Obrigatório por lei para suplemento. |
| `ShippingSection.tsx` | Entrega: postagem, rastreio, embalagem e a tabela de prazo por região — essa tabela só aparece se houver prazo preenchido em `entrega.prazos`. |
| `GuaranteeSection.tsx` | Selo de garantia, como pedir reembolso e o aviso dos 7 dias do CDC. O selo é a arte `selo-garantia.webp`, e o número de dias está desenhado dentro dela — ver "Detalhes que parecem detalhe" no fim deste arquivo antes de mexer em `garantia.dias`. |
| `FaqSection.tsx` | **Client.** Acordeão com as dúvidas frequentes. As perguntas vêm do array `faq`. |
| `FinalCtaSection.tsx` | Último CTA, com os reforços de garantia, rastreio e pagamento seguro. |

#### Sobre os depoimentos

São duas listas em `lib/site.ts`: `depoimentosEmVideo`, para gravações de clientes, e `depoimentos`, para texto com nota. A seção só some quando as duas estão vazias.

Os vídeos usam `flex flex-wrap justify-center` em vez de grade de colunas fixas. Com um depoimento só, uma grade de três colunas deixaria o vídeo encostado na esquerda com dois buracos ao lado; assim um centraliza, dois ficam lado a lado e três preenchem a linha, sem ninguém precisar mexer no código.

**Só entre depoimento real, de cliente real, com autorização de uso.** Inventar avaliação é propaganda enganosa pelo art. 37 do CDC, e é motivo de derrubada de conta de anúncio na Meta. O risco é grande e o ganho é zero.

Com vídeo o cuidado é maior, porque aparece o rosto de uma pessoa. Além da veracidade, é preciso **autorização de uso de imagem**, exigida pelo art. 20 do Código Civil — e ela não some porque a pessoa mandou o vídeo espontaneamente no WhatsApp. Guarde o aceite por escrito.

### `components/ui/`

| Arquivo | O que faz |
|---|---|
| `CtaButton.tsx` | O botão de compra, usado em toda parte. **Client Component** por causa da medição: dispara o evento `cta_clique` no clique, com a propriedade `origem`. Duas variantes de cor (fundo claro e escuro), `bloco` para ocupar a largura toda nos cards de oferta, `href` para apontar para o checkout de um kit específico, e `comAviso`, que mostra embaixo o texto explicando que o checkout acontece na Braip. Se o `href` começar com `http`, ele entende que sai do site: abre aba nova e mostra o aviso da Braip. Qualquer outro valor é tratado como link interno — o teste é por `http` e não por `#`, porque desde que o destino padrão virou `/#ofertas` um link interno pode começar com barra, com `#` ou com os dois. **Como todo CTA passa por aqui, este é o ponto único para plugar rastreamento de conversão depois — não escreva `<a href={checkout}>` solto numa seção nova.** |
| `SectionHeading.tsx` | O cabeçalho padrão de seção: o texto pequeno em maiúsculas, o título em Fraunces itálico e a descrição. Serve para as seções não divergirem de espaçamento e tamanho ao longo do tempo. |

### `lib/site.ts`

O arquivo de configuração. Exporta:

- `site` — nome, domínio, contatos, razão social, CNPJ
- `produto` — nome, preço, quantidade, selos, modo de uso, contraindicações, aviso da ANVISA, URL do checkout
- `ofertas` — os kits de 1, 2 e 3 frascos; `ofertasPublicadas` é o filtro dos que têm preço e link
- `economiaDoKit(oferta)` — calcula quanto o kit economiza a partir de `precoDe` e `precoPor`; não existe campo `economia` para preencher
- `destinoDoCta` — para onde vai todo botão de compra que não é de um kit específico
- `depoimentosEmVideo` — depoimentos gravados; `depoimentos` guarda os de texto com nota
- `formasDePagamento` — os meios aceitos, exibidos abaixo dos kits
- `entrega` — transportadora, prazos por região, rastreio, embalagem
- `garantia` — dias, como solicitar, aviso do CDC
- `nutrientes` — os seis ativos e a descrição de cada um
- `depoimentos` — vazio; ver o aviso acima
- `faq` — as perguntas e respostas

### `public/`

**O nome do arquivo diz onde ele aparece.** O prefixo é a seção, e a listagem da pasta vira um índice: tudo que começa com `kit-` vive na seção de kits, `video-` no vídeo promocional, `depoimento-` nos depoimentos, e assim por diante. A convenção é kebab-case, em português, sem underscore — nome novo segue o mesmo padrão.

| Arquivo | Peso | Onde aparece |
|---|---|---|
| `hero-livit.jpg` | 96 KB | **Hero.** Mulher segurando a caixa. 960×1280, proporção 3/4 — a moldura do hero segue essa proporção. **Continua em JPEG de propósito**; ver o motivo em "Detalhes que parecem detalhe". |
| `kit-1-frasco.webp` | 22 KB | **Kits.** Card de 1 frasco. |
| `kit-2-frascos.webp` | 37 KB | **Kits.** Card de 2 frascos. |
| `kit-3-frascos.webp` | 42 KB | **Kits.** Card de 3 frascos. |
| `video-promocional.mp4` | 16,5 MB | **Vídeo.** Vertical, 478×850, 76s, com fala. É o maior arquivo do projeto — ver a regra do `preload` abaixo. |
| `video-promocional-capa.webp` | 21 KB | **Vídeo.** A capa (`poster`), um quadro real extraído do próprio vídeo. **Trocou o vídeo, gere capa nova** — sem ela o player vira um retângulo preto. |
| `depoimento-beatriz.mp4` | 9,5 MB | **Depoimentos.** Vertical, 576×1024, 58s, com fala. |
| `depoimento-beatriz-capa.webp` | 22 KB | **Depoimentos.** Capa do vídeo acima, também extraída dele. |
| `produto-caixa.webp` | 100 KB | **Por que o Livit.** Caixa e pote. Fundo transparente de verdade, por isso é usada sem moldura. |
| `produto-tabela-nutricional.webp` | 154 KB | **Composição.** É a imagem da lupa e do modal — **não comprima demais**, ela precisa ficar legível no zoom. 1122×1402. |
| `selo-garantia.webp` | 53 KB | **Garantia.** O selo de "7 dias". Tem fundo transparente. |
| `sobre-capsulas-brinde.webp` | 49 KB | **Página `/sobre`.** Duas mãos brindando. 1492×700. |
| `og-image.jpg` | 72 KB | **Nenhuma página.** Existe só para o preview de link no WhatsApp, Instagram e Facebook. O nome é convenção universal e por isso não leva prefixo. Ver a regra dela em "Detalhes que parecem detalhe". |
| `logo.webp` | 28 KB | **Sem uso hoje.** O cabeçalho usa o ícone de folha do lucide mais o nome em texto. Se for aproveitar essa arte, repare que ela tem fundo branco opaco e o cabeçalho é creme. |

Dois arquivos são **fontes**, não são servidos pelo site e mesmo assim ficam versionados: `png-livit-2.png` (o original de onde saiu a `produto-caixa.webp`) e `video-vivazen.mp4`. A intenção era deixá-los de fora, mas arquivos já sumiram sozinhos do disco desta máquina três vezes durante o desenvolvimento — a `og-image.jpg` duas vezes e a capa do depoimento uma. Enquanto isso não for resolvido, o repositório é a única cópia confiável, e 4,3 MB é barato perto de perder o original de uma arte.

Tudo em WebP menos a `og-image.jpg`, e por um motivo: os originais pesavam demais para uma landing. A arte original do selo, em PNG, tinha 2,9 MB e virou 53 KB; a `sobre-capsulas-brinde` tinha sido salva em modo lossless e caiu de 652 KB para 49 KB. Ao trocar qualquer imagem, gere WebP — **exceto** a de preview de link.

Vale saber por que a economia é tão grande: WebP tem dois modos, lossless e lossy. Lossless é o certo para logo, ícone e desenho de traço; para foto ele guarda pixel por pixel e o arquivo fica maior que um JPEG. Se você gerar um WebP de foto e ele vier com centenas de KB, é quase certo que saiu em lossless.

Sobre a `sobre-capsulas-brinde.webp`: a foto original tinha 41% da altura em branco vazio (225px acima e 209px abaixo do conteúdo), o que fazia a imagem parecer solta no meio da página. O recorte tirou esse vazio, e é dessa proporção de 1492×700 que sai a classe `md:aspect-1492/700` na `/sobre`. Se trocar o arquivo, confira a proporção junto.

Essa foto tem **fundo branco opaco**, sem transparência. É por isso que na `/sobre` ela fica numa faixa de fundo branco em vez de sobre o creme da página — assim o branco dela deixa de ser uma emenda visível e passa a ser o fundo da seção. Se você trocar essa foto, ou mantenha o fundo branco, ou ajuste a cor da faixa junto.

O selo de garantia veio com 26% de cada lado em área transparente em volta do desenho. Ele foi recortado até o conteúdo antes de virar WebP — senão ele apareceria menor do que o tamanho reservado na tela e ligeiramente fora do eixo. Vale a mesma conferência para qualquer arte nova com transparência.

### Configuração na raiz

| Arquivo | O que faz |
|---|---|
| `next.config.ts` | Os headers de segurança (ver a seção "Segurança") e a lista `images.qualities`, que precisa conter toda qualidade usada em algum `<Image quality={...}>`. |
| `postcss.config.mjs` | Registra o plugin do Tailwind v4. Não precisa mexer. |
| `eslint.config.mjs` | ESLint com as regras do Next (core-web-vitals + typescript). |
| `tsconfig.json` | TypeScript em modo `strict`, com o alias `@/*` apontando para a raiz. |
| `.gitignore` | Inclui `*.exe` e `*.msi` — nada executável deve entrar em `public/`, senão fica baixável publicamente no site. |

## Cores e fontes

Tudo definido no bloco `@theme` de `app/globals.css`:

| Token | Cor | Onde aparece |
|---|---|---|
| `forest` | `#1e3a2b` | Verde escuro: títulos, botões, faixas escuras |
| `forest-soft` | `#2f5340` | Hover dos botões escuros |
| `cream` | `#eaf0e1` | Fundo da página |
| `cream-deep` | `#dde6d0` | Brilhos decorativos de fundo |
| `clay` | `#b2794a` | Terracota: detalhes, ícones, textos de apoio |
| `clay-soft` | `#c9986f` | A versão do terracota que funciona sobre fundo escuro |
| `sand` | `#ddd0c2` | Bordas e linhas divisórias |

Use os tokens (`bg-forest`, `text-clay`), não o hex direto no componente. Trocar a paleta da marca deve ser uma edição em um arquivo só.

Duas fontes: **Geist** no texto corrido e **Fraunces** (itálico) nos títulos, via `font-display`. As duas são carregadas em `layout.tsx` com `next/font`, o que evita o pulo de layout no carregamento.

## Detalhes que parecem detalhe e não são

**`text-balance` nos parágrafos do hero.** Não troque por `text-pretty`, mesmo que pareça mais adequado para parágrafo. As larguras de linha foram medidas de verdade em 320, 375, 390 e 430px: com `pretty`, num iPhone de 375px a última linha ficava com 34% da largura (as linhas iam a 93% / 95% / 69% / 34%). Com `balance` a irregularidade cai de 61% para 16%. O `pretty` só evita palavra órfã sozinha, ele não iguala as linhas. Funciona porque os dois parágrafos ficam em no máximo 4 linhas — o Chrome ignora `balance` acima de 6 linhas.

**`whitespace-nowrap` no `L-Triptofano` e no `L-Teanina`.** Por padrão o navegador pode quebrar a linha depois de um hífen que já existe no texto, e o `L-` ficava pendurado sozinho na borda. Se você citar outro ativo com hífen, faça o mesmo.

**O número de dias da garantia está desenhado dentro do selo.** A arte `selo-garantia.webp` é um arquivo pronto com "7 DIAS" impresso; ela não é gerada a partir de `garantia.dias`. Por isso a `GuaranteeSection` tem a constante `DIAS_NO_SELO` e só mostra a imagem quando os dois números batem — se a garantia mudar para 30 dias e ninguém trocar a arte, a seção volta sozinha para um círculo desenhado em CSS. **Se você alterar `garantia.dias`, troque a arte e atualize `DIAS_NO_SELO` junto.** Prazo de garantia errado na tela é problema com o CDC, não detalhe de design.

**Todo `<video>` precisa da proporção reservada no CSS.** Um `<video>` sem metadados carregados ocupa 300×150, que é o padrão do HTML e não o tamanho do seu arquivo — o elemento nasce com uma altura e pula para outra quando o vídeo chega, empurrando o que estiver ao lado. Por isso os dois players do site levam `aspect-478/850` e `aspect-576/1024`, as proporções reais dos arquivos. Vídeo novo, proporção nova. Com `<img>` isso não é preciso, porque o `next/image` já deduz a caixa a partir do import estático.

**O vídeo tem 16,5 MB e mesmo assim não pesa na página — por causa de uma palavra.** É o `preload="metadata"` no `<video>`. Com ele, só o cabeçalho do arquivo desce junto com a página; os megabytes só saem do servidor quando alguém aperta o play. Se alguém trocar isso por `preload="auto"`, ou pior, colocar `autoplay`, todo visitante passa a baixar 16 MB para ver uma landing — no 4G isso é a página inteira travando. Pelo mesmo motivo não existe `autoplay`: o vídeo tem fala, e navegador nenhum deixa áudio começar sozinho.

**Vídeo sem `poster` é um retângulo preto.** A primeira tentativa aqui foi o fragmento de mídia `#t=0.1` na URL, que em tese faz o navegador pintar o quadro de 0,1s como capa. Não funcionou: com `preload="metadata"` o Chrome nem chegou a pedir o arquivo. A capa é um quadro real exportado do vídeo. Se não tiver ffmpeg à mão, dá para extrair pelo próprio navegador: carregue o vídeo num `<video>` fora da tela, dê `currentTime`, desenhe num `<canvas>` e salve o `toDataURL`.

**A qualidade real de uma imagem é decidida em dois lugares, e o segundo manda.** O `next/image` reencoda toda imagem antes de servir, e o padrão dele é `quality=75`. Um arquivo impecável em `public/` sai recomprimido a 75 assim mesmo. Para subir isso, não basta escrever `quality={90}` no componente: **a partir do Next 16 o valor precisa estar na lista `images.qualities` do `next.config.ts`**, senão é ignorado em silêncio e cai no padrão. Foi exatamente o que aconteceu com a foto do hero — o `quality={90}` estava no código e a URL servida continuava com `q=75`. Para conferir se pegou, procure o `q=` no `srcset` do HTML gerado; não confie no que está escrito no componente.

**Nem toda imagem deve virar WebP, e a foto do hero é o contraexemplo.** A regra real é evitar **duas gerações de perda**. Converter um PNG (que é sem perda) para WebP custa uma geração e economiza muito — foi o caso das fotos dos kits e do selo. Mas a `hero-livit.jpg` já chegou comprimida: transformá-la em WebP acrescentaria uma segunda geração de perda para nada, porque o `next/image` vai reencodar de novo na entrega de qualquer jeito. Por isso ela fica em JPEG. Ao adicionar imagem nova, pergunte: o arquivo de origem já é com perda? Se for, deixe como está e deixe o otimizador trabalhar.

**Não escreva `width`/`height` em `<Image>` de import estático.** O Next já lê a dimensão do arquivo. A tabela nutricional estava declarada como 800×550 (proporção 1,45) sendo que o arquivo é 1122×1402 (0,80): o navegador reservava uma caixa deitada e pulava para a caixa em pé quando a imagem carregava. Escrever a dimensão na mão só cria uma cópia que envelhece sozinha na primeira vez que alguém trocar o arquivo.

**A `og-image.jpg` tem três regras, e todas as três são obrigatórias.** Ela é a imagem que aparece quando alguém cola o link do site num grupo de WhatsApp — para um produto vendido por link, é uma das imagens mais vistas da marca, e ninguém nunca a vê no site. As regras: **1200×630** de verdade (antes o `og:image` apontava para uma foto quase quadrada declarada como 1200×630, e o WhatsApp cortava o produto no meio); **JPEG**, porque o robô do WhatsApp não é confiável com WebP; e **abaixo de 300 KB**, que é o limite acima do qual ele desiste e não mostra preview nenhum. Depois de trocar, teste colando o link num grupo — não confie no código.

**O `site.url` leva `www`.** Na Vercel o domínio principal é o `www.vivazenbrasil.com.br`, e o endereço sem `www` responde 308 redirecionando para ele. O `canonical` tem que apontar para a URL final, que não redireciona — por isso o valor em `lib/site.ts` tem o `www`. Se você inverter o principal na Vercel, inverta lá também, senão o site declara ao Google um endereço diferente daquele que o servidor entrega.

**O preço mora num lugar só, e esse lugar muda sozinho.** Com kits configurados em `ofertas`, o preço aparece na seção de ofertas e o hero deixa de mostrar preço; sem kits, o hero mostra o preço avulso e a seção de ofertas não existe. Os dois lados leem `ofertasPublicadas`, então a troca é automática. O motivo é que o valor avulso e o valor dos kits são preços diferentes do mesmo produto: exibir os dois a dois cliques de distância faz o visitante achar que foi cobrado a mais em um dos caminhos, e desconfiança de preço não se resolve — a pessoa fecha a aba. Se for mexer no hero ou nas ofertas, mantenha essa exclusividade.

**As três fotos dos kits são normalizadas de duas maneiras, e as duas são necessárias.** A primeira é a **altura da moldura**: 700px nas três. É isso que mantém os frascos na mesma escala, já que a `OffersSection` as renderiza com altura fixa e largura automática — se você recortar cada foto só no próprio conteúdo, o frasco único vai aparecer do tamanho do trio e o kit maior parecerá levar menos produto.

A segunda é a **linha de base**: a base dos frascos tem que ficar na mesma altura dentro do arquivo (hoje em y=675, com 24px de branco abaixo). Essa é a que passa despercebida, porque cada foto isolada parece certa. As originais tinham 26px, 7px e 50px de branco embaixo dos frascos; como o container alinha as *imagens* pela base, o trio flutuava uns 11px acima dos outros dois quando os três cards ficavam lado a lado. Ao trocar qualquer foto, meça as duas coisas.

**Todo valor em dinheiro carrega o `R$` dentro do próprio dado.** Os campos de preço vão crus para a tela — nenhum componente formata nada. Se você escrever `279,90` em vez de `R$ 279,90`, é exatamente `279,90` que o cliente vê, ao lado de um hero que mostra `R$ 109,90`. Já aconteceu e ficou no ar. A regra vale para `preco`, `precoParcelado`, `precoDe` e `precoPor`.

**Número que sai de uma conta entre outros dois números não vira campo — vira função.** A economia de cada kit é `precoDe` menos `precoPor`, e por um tempo existiu um campo `economia` digitado à mão. Ele produziu dois defeitos de uma vez, os dois em produção. O texto duplicou, porque o card já escreve "Você economiza" e o campo trazia "Economize R$ 50,10" — lia-se *"Você economiza Economize R$ 50,10"*. E o número podia contradizer os outros dois: basta ajustar um preço e esquecer de refazer a subtração para a página exibir uma economia que não bate com os valores logo acima dela. Hoje quem calcula é `economiaDoKit()`, então os três números não têm como divergir. Sempre que for acrescentar um dado, pergunte se ele pode ser deduzido do que já existe; se puder, deduza.

Duas decisões dentro dessa função que valem entender. A formatação é feita na mão — `` `R$ ${valor.toFixed(2).replace('.', ',')}` `` — e não com `Intl.NumberFormat`, porque o `Intl` depende da tabela de idiomas de quem executa: servidor e navegador podem produzir espaços diferentes entre o `R$` e o número, e o React acusa erro de hidratação ao comparar o HTML que veio do servidor com o que ele desenharia. E a conversão de texto para número (`"R$ 329,70"` → `329.7`) precisa trocar a vírgula por ponto, porque `parseFloat` só entende o ponto decimal do inglês.

**O valor cortado precisa ser um preço realmente praticado.** É o `precoDe` de cada kit. Pelo art. 37 do CDC, inflar esse número para o desconto parecer maior é propaganda enganosa — dá multa do Procon e derruba conta de anúncio, exatamente como depoimento inventado. Um `precoDe` defensável é a soma do avulso (3 frascos a R$ 109,90 = R$ 329,70), porque é o que a pessoa pagaria comprando separado. Kit que nunca teve outro preço deve ficar com `precoDe` vazio: o card simplesmente não mostra valor cortado.

**Formas de pagamento ficam dentro da seção de ofertas, não em seção própria.** Essa informação é objeção de última hora: ela só trabalha no instante em que a pessoa está olhando o preço. Isolada num bloco mais abaixo, vira enfeite que ninguém lê.

**Animação nova: declare o `@keyframes` e a classe que o usa em CSS puro, lado a lado.** Não passe o nome da animação por dentro de uma variável CSS, e não use o `--animate-*` do `@theme` do Tailwind. Isso já quebrou em produção: o brilho dos botões funcionava no build local e sumia no da Vercel, deixando um borrão branco parado sobre cada botão de compra. O CSS publicado saía 161 bytes menor, sem o `@keyframes` e sem a regra, enquanto todo o resto do arquivo era idêntico. O motivo é que o único lugar onde o nome da animação aparecia era dentro do valor de `--animate-brilho-cta` — e minificador não segue esse tipo de referência, então conclui que o `@keyframes` é código morto e apaga. Com a classe citando o nome direto na propriedade `animation`, a ligação fica visível para qualquer ferramenta. Ao suspeitar desse tipo de sumiço, compare o CSS de produção com o local: baixe os dois e conte as ocorrências da classe em cada um.

**O brilho em loop dos botões roda para todo mundo, de propósito.** A prática comum seria desligá-lo sob `prefers-reduced-motion`, já que é animação infinita, e essa foi a primeira versão. Está ligado por decisão do dono do site: é o que chama atenção para o botão de compra, e a máquina de quem toca o projeto roda com "reduzir movimento" ativado — na prática o efeito nunca existiria. Para reverter, basta devolver o prefixo `motion-safe:` na classe `brilho-cta` do `CtaButton`. (A classe se chamava `animate-brilho-cta` na versão com `--animate-*` do `@theme` — exatamente a que quebrava na Vercel, descrita no parágrafo acima.)

**"Reduzir movimento" tem dois pesos no resto do site, e a diferença é proposital.** No hover, o card de oferta dá um zoom de 3% e sobe 8px, a foto dos frascos cresce 4% e o botão sobe — são **mudanças de estado**, valem para todo mundo, e o que o `motion-reduce:transition-none` faz é tirar o percurso animado: com a preferência ligada, tudo troca de estado na hora. Quem se incomoda com movimento se incomoda com o trajeto, não com o resultado. Já o brilho que atravessa o botão é **animação** — algo se deslocando sozinho, em loop —, e é a categoria que normalmente ficaria atrás de `motion-safe:`. Aqui ele roda para todo mundo, pela decisão descrita no parágrafo acima. Ao criar efeito novo, decida em qual das duas categorias ele cai antes de escolher o prefixo.

**Âncora que não cai no lugar certo: some três medidas, não uma.** O clique em "Ver os kits e preços" pula para `#ofertas`, e onde a tela para depende de `scroll-margin-top` + o `padding-top` da seção + os 73px do cabeçalho fixo que cobrem o começo da tela. Com `scroll-mt-24` e `py-20` o título caía 135px abaixo do cabeçalho e a grade de cards só começava a 574px numa tela de 844px — o visitante clicava e via um vazio. Ao mexer em qualquer uma das três, meça as outras duas: o resultado só existe na soma.

Dois números do zoom que não são arbitrários: os 3% do card parecem pouco escrito, mas o card ocupa um terço da largura da tela, então já é um salto bem visível — acima de 5% ele começa a parecer defeito. E os 4% da foto **somam** com os 3% do card, dando perto de 7% na imagem: essa diferença é o que cria profundidade, a foto vindo um pouco à frente da moldura. Subir mais faz os frascos furarem o topo do card.

Detalhe útil: o Tailwind já embrulha `group-hover` em `@media (hover: hover)` sozinho, então no celular não fica estado de hover grudado depois do toque.

**Os grupos de hover têm nome: `group/card` e `group/cta`.** O `CtaButton` é um grupo e está dentro do card, que também é. Com os dois anônimos, o `group-hover` do botão responderia ao hover do card inteiro e o brilho dispararia ao passar o mouse em qualquer canto. Se criar outro grupo dentro de um card, nomeie também.

**Acordeão começa fechado, sempre.** Tanto a FAQ quanto a tabela de nutrientes guardam o índice aberto em `useState<number | null>(null)`. A FAQ já esteve em `0`, o que abria a primeira resposta ao carregar a página. Além de parecer defeito, isso atrapalha a leitura: um acordeão existe para a pessoa bater o olho na lista inteira e escolher a dúvida dela; com uma resposta aberta, as perguntas seguintes são empurradas para baixo e a lista deixa de ser escaneável.

**Nunca aplique `scale` num elemento de largura total.** A barra de frete grátis levava o `pulso-suave` na própria faixa, que ocupa 100% da tela. Um `scale(1.03)` ali deixa o elemento 3% mais largo que a janela — uns 57px num monitor comum — e o navegador responde com uma barra de rolagem horizontal que aparece e some a cada volta da animação. O conserto é pulsar o conteúdo interno, que é estreito e centralizado; de quebra o efeito fica melhor, porque o texto respira de verdade em vez de a faixa toda esticar de um jeito quase imperceptível. Para conferir se a página estoura: compare `document.documentElement.scrollWidth` com `clientWidth`, amostrando ao longo de um ciclo inteiro da animação.

**Sem emoji em nenhum lugar.** Nem na tela, nem em comentário, nem aqui, nem em mensagem de commit. Este é um site que vende: emoji num aviso ou num título destoa da identidade (verde escuro, terracota, Fraunces itálico) e custa credibilidade justamente na página que foi feita para construir credibilidade. Onde é preciso chamar atenção, use rótulo em texto — `[falta preencher]` na tela, `ATENÇÃO:` em comentário. Havia um triângulo de alerta em três avisos de campo vazio que renderizavam na tela de produção; foram trocados.

**Nenhum botão vai direto para a Braip, exceto os dos cards de kit.** Todos os outros — cabeçalho, hero, vídeo, "Por que o Livit", CTA final, e o da `/sobre` — apontam para `destinoDoCta`, que é a seção de kits. O motivo é comercial: quem clica sem passar pelos kits sai do site levando o frasco avulso, a menor das três vendas possíveis. Antes o botão do cabeçalho, o mais visível da página, fazia exatamente isso.

O valor é `/#ofertas`, **com a barra na frente**, e ela resolve os dois casos do site de uma vez. Na home, o navegador reconhece que é o mesmo documento e rola suavemente até a âncora. Na `/sobre` ou numa página legal, onde a seção não existe e não há para onde rolar, ele navega para a home e cai na seção. Um `#ofertas` sozinho não faria nada nessas páginas — é o tipo de link que parece funcionar porque ninguém testa fora da home.

Por isso também o teste de "é link externo?" no `CtaButton` passou a ser `href.startsWith('http')` em vez de `startsWith('#')`: agora um link interno pode começar com barra, com `#` ou com os dois, e só sai do site quem tem endereço absoluto. Desse teste dependem o `target="_blank"` e o aviso de que o pagamento acontece na Braip — que seria mentira num clique que apenas rola a página.

**A rolagem suave tem um limite que o CSS não vence.** Ela vem de `scroll-behavior: smooth` no `html`. Havia um bloco `@media (prefers-reduced-motion: reduce)` desligando isso, que é a recomendação padrão, e ele foi removido pela mesma decisão que deixou o brilho sempre ligado. Mas atenção: Chrome e Firefox também respeitam essa preferência do sistema **no próprio motor**, e nesse nível o CSS não manda. Numa máquina com "reduzir movimento" ativado, o salto continua instantâneo por decisão do navegador. Garantir a animação nesse caso exigiria rolar por JavaScript com `requestAnimationFrame`, o que não está feito.

**O checkout é externo.** Todo botão avisa que o visitante vai para a Braip. Não tire esse aviso: ser jogado sem explicação num domínio `ev.braip.com` gera desconfiança e abandono.

## Medição de audiência

O site usa **Vercel Analytics**, ligado no `app/layout.tsx`. Ele **não usa cookie**, então o site continua sem gravar nada no navegador de quem visita — e é por isso que não existe banner de consentimento por aqui.

Além das páginas vistas, existe um evento próprio: **`cta_clique`**, disparado por todo botão de compra do site. Ele carrega duas propriedades:

- **`origem`** — de onde partiu o clique: `hero`, `kit-1-frasco`, `kit-2-frascos`, `kit-3-frascos`, `video`, `produto`, `cta-final`, `sobre`, `cabecalho`, `cabecalho-mobile`. Sem isso o painel mostraria um número somado, e não daria para saber qual seção gera clique e qual é só decoração.
- **`saiu`** — `true` quando o clique leva para a Braip, `false` quando só rola a página até os kits. São intenções bem diferentes e misturá-las inflaria a métrica que importa.

Quase todos os botões passam pelo `CtaButton`, que foi construído desde o início como ponto único justamente para isso. As duas exceções são os botões do cabeçalho, que são âncoras soltas no `Header.tsx` e recebem o `track()` na mão — se mexer neles, mantenha o evento.

**O que essa medição não alcança:** a venda acontece na Braip, fora do domínio. O painel mostra quantos clicaram para o checkout, não quantos compraram. Para fechar esse ciclo seria preciso propagar UTM na URL de checkout e cruzar com o relatório da Braip.

Detalhe de desenvolvimento: o script vive em `/_vercel/insights/script.js`, que só existe quando o site roda na Vercel. Em `next start` local ele dá 404 e nenhum evento é enviado — isso é esperado, não é defeito.

## Segurança

O site é estático: não tem rota de API, server action, middleware, banco, login nem formulário. Isso não é pouco — é o que faz a superfície de ataque ser praticamente nula. Não existe injeção de SQL onde não há SQL, nem vazamento de cadastro onde não há cadastro. **Ao adicionar qualquer uma dessas coisas, essa garantia cai por terra e a conta precisa ser refeita** — em particular o CSP, que hoje é frouxo de propósito (só `frame-ancestors`) porque não há entrada de dado nesta origem.

Os headers ficam em `next.config.ts`, com o comentário de cada um. O que eles cobrem: enquadramento da página em iframe de terceiro (o golpe de sobrepor um botão de compra falso), sniffing de tipo de conteúdo, vazamento de URL completa no referer ao sair para o checkout, e acesso a câmera/microfone/localização/pagamento.

Duas coisas que nenhum header resolve, e que valem mais que todas elas juntas:

- **O acesso ao GitHub e à Vercel.** Quem entra numa dessas duas contas muda o site no ar. 2FA nas duas.
- **Clone da página.** O HTML é público por definição; qualquer um copia a landing, troca o link do checkout e roda anúncio em cima. É o golpe comum com produto de plataforma de afiliado. A defesa é vigilância e denúncia, não código.

O único rastreamento é o Vercel Analytics, que não usa cookie e agrega os dados — ver a seção acima. Não há GA4, Pixel nem cookie de terceiro, e por isso o site não precisa de banner de consentimento. Se um dia entrar GA4 ou Pixel, passa a precisar.

Um detalhe sobre o `robots.txt`, que costuma ser mal entendido: **ele não protege nada.** É um índice público, e é o primeiro arquivo que scanner automatizado abre. Escrever `Disallow: /qualquer-coisa` ali não esconde a página — anuncia que ela existe, e só os robôs honestos obedecem. Nunca liste caminho privado no `app/robots.ts`. O que não pode ser visto precisa de senha.

## Pendências

- [x] Preencher `ofertas` em `lib/site.ts` com os preços e os links de checkout da Braip de cada kit — feito: os três kits estão publicados, então a seção de ofertas está no ar e o preço saiu do hero
- [ ] Preencher `entrega.prazos` em `lib/site.ts` — enquanto estiverem vazios, a tabela de prazo por região fica oculta no site (ver `ShippingSection.tsx`)
- [ ] Preencher `entrega.freteGratisAcima`, se existir frete grátis
- [ ] Preencher `produto.registroAnvisa`, se houver número de notificação
- [ ] Coletar depoimentos reais para ligar a `TestimonialsSection` — é a maior lacuna de conversão do site hoje
- [ ] Preencher `site.redesSociais` com as URLs dos perfis oficiais — alimenta o `sameAs` do JSON-LD, que é o que desambigua esta VivaZen das outras com nome parecido
- [ ] Confirmar nome e cidade da cliente do depoimento em vídeo (`depoimentosEmVideo`, hoje só "Beatriz", sem cidade)
- [ ] Validar o layout no celular de verdade, olhando a tela. Isso nunca foi feito: as medidas de texto do hero foram tiradas do DOM, não de um aparelho

Os quatro primeiros itens também estão marcados como `TODO:` no ponto exato de `lib/site.ts` em que o campo vazio mora, então dá para chegar neles pelo código sem passar por aqui.

### Decidido não fazer

Não são esquecimento, foram descartados de propósito:

- **GA4 e Meta Pixel** — não há campanha paga rodando. A medição de audiência é feita pelo Vercel Analytics, que resolve o essencial sem cookie. GA4 e Pixel só valem quando houver anúncio pago, porque o que eles trazem de diferente é a integração com Google Ads e Meta e o público de remarketing — em troca de um banner de consentimento obrigatório. Nesse dia, o caminho é instalar o **Google Tag Manager** como base, para o marketing gerenciar tags sem depender de deploy.
