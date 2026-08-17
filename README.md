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

O alias `@/` aponta para a raiz do projeto (`tsconfig.json`), então `@/lib/site` e `@/public/livit-hero.jpeg` funcionam de qualquer arquivo.

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
| `ProblemSection.tsx` | Os quatro problemas que o produto endereça (sono, ansiedade, energia, foco). Existe para o visitante se reconhecer antes de ouvir a solução. |
| `ProductHighlightSection.tsx` | Quatro motivos para escolher o Livit, ao lado da foto da caixa. |
| `NutritionalInfoSection.tsx` | **Client.** A tabela nutricional com lupa no hover e modal com zoom e arraste, mais o acordeão explicando cada nutriente. É o arquivo mais complexo do projeto — se for mexer, mexa com calma. As duas `<Image>` daqui não têm `width`/`height` escritos na mão de propósito: o import é estático e o Next lê a dimensão do próprio arquivo. |
| `HowToUseSection.tsx` | Modo de uso em três passos, prazo de resultado e como armazenar. Os textos vêm de `produto.modoDeUso` e **precisam bater com o rótulo aprovado**. |
| `WarningsSection.tsx` | Advertências, contraindicações e o aviso da ANVISA. Obrigatório por lei para suplemento. |
| `ShippingSection.tsx` | Entrega: postagem, rastreio, embalagem e a tabela de prazo por região — essa tabela só aparece se houver prazo preenchido em `entrega.prazos`. |
| `GuaranteeSection.tsx` | Selo de garantia, como pedir reembolso e o aviso dos 7 dias do CDC. O selo é a arte `selo-garantia.webp`, e o número de dias está desenhado dentro dela — ver "Detalhes que parecem detalhe" no fim deste arquivo antes de mexer em `garantia.dias`. |
| `TestimonialsSection.tsx` | Depoimentos. **Não renderiza nada enquanto `depoimentos` estiver vazio em `lib/site.ts`** — ver o aviso abaixo. |
| `FaqSection.tsx` | **Client.** Acordeão com as dúvidas frequentes. As perguntas vêm do array `faq`. |
| `FinalCtaSection.tsx` | Último CTA, com os reforços de garantia, rastreio e pagamento seguro. |

#### Sobre os depoimentos

O array `depoimentos` em `lib/site.ts` está vazio de propósito, e a seção some quando ele está vazio.

**Só entre depoimento real, de cliente real, com autorização de uso.** Inventar avaliação é propaganda enganosa pelo art. 37 do CDC, e é motivo de derrubada de conta de anúncio na Meta. O risco é grande e o ganho é zero.

### `components/ui/`

| Arquivo | O que faz |
|---|---|
| `CtaButton.tsx` | O botão de compra, usado em toda parte. Duas variantes de cor (fundo claro e escuro), `bloco` para ocupar a largura toda nos cards de oferta, `href` para apontar para o checkout de um kit específico, e `comAviso`, que mostra embaixo o texto explicando que o checkout acontece na Braip. Se o `href` começar com `#`, ele entende que é âncora interna: não abre aba nova e omite o aviso da Braip. **Como todo CTA passa por aqui, este é o ponto único para plugar rastreamento de conversão depois — não escreva `<a href={checkout}>` solto numa seção nova.** |
| `SectionHeading.tsx` | O cabeçalho padrão de seção: o texto pequeno em maiúsculas, o título em Fraunces itálico e a descrição. Serve para as seções não divergirem de espaçamento e tamanho ao longo do tempo. |

### `lib/site.ts`

O arquivo de configuração. Exporta:

- `site` — nome, domínio, contatos, razão social, CNPJ
- `produto` — nome, preço, quantidade, selos, modo de uso, contraindicações, aviso da ANVISA, URL do checkout
- `ofertas` — os kits de 1, 2 e 3 frascos; `ofertasPublicadas` é o filtro dos que têm preço e link
- `formasDePagamento` — os meios aceitos, exibidos abaixo dos kits
- `entrega` — transportadora, prazos por região, rastreio, embalagem
- `garantia` — dias, como solicitar, aviso do CDC
- `nutrientes` — os seis ativos e a descrição de cada um
- `depoimentos` — vazio; ver o aviso acima
- `faq` — as perguntas e respostas

### `public/`

| Arquivo | Peso | Uso |
|---|---|---|
| `livit-hero.jpeg` | 96 KB | Foto do hero da home: mulher segurando a caixa. 960×1280, proporção 3/4 — a moldura do hero segue essa proporção. **Continua em JPEG de propósito**; ver o motivo em "Detalhes que parecem detalhe". |
| `livit_box.webp` | 85 KB | Foto da seção "Por que o Livit". |
| `nutrition_information.webp` | 154 KB | A tabela nutricional. É a imagem da lupa e do modal — **não comprima demais**, ela precisa ficar legível no zoom. 1122×1402. |
| `capsulas-brinde.webp` | 49 KB | Foto das duas mãos brindando, usada na `/sobre`. 1492×700. |
| `selo-garantia.webp` | 53 KB | O selo de "7 dias de garantia" da `GuaranteeSection`. Tem fundo transparente. |
| `livit_video_promocional.mp4` | 16,5 MB | O vídeo da `VideoSection`. Vertical, 478×850, 76s, com fala. É o maior arquivo do projeto — ver a regra do `preload` abaixo. |
| `livit-video-capa.webp` | 21 KB | A capa do vídeo (`poster`). É um quadro real extraído do próprio vídeo. **Trocou o vídeo, gere capa nova** — sem ela o player vira um retângulo preto. |
| `livit-caixa.webp` | 100 KB | Caixa e pote na `ProductHighlightSection`. Fundo transparente de verdade, por isso é usada sem moldura. |
| `1-frasco.webp` | 22 KB | Kit de 1 frasco na seção de ofertas. |
| `2-frascos.webp` | 37 KB | Kit de 2 frascos. |
| `3-frascos.webp` | 42 KB | Kit de 3 frascos. |
| `og-image.jpg` | 72 KB | **Só para preview de link.** Nenhuma página mostra essa imagem — ela existe para o WhatsApp, o Instagram e o Facebook. Ver a regra dela em "Detalhes que parecem detalhe". |
| `logo.webp` | 28 KB | **Não usada em nenhum componente hoje.** O cabeçalho usa o ícone de folha do lucide mais o nome em texto. Se for aproveitar essa arte, repare que ela tem fundo branco opaco e o cabeçalho é creme. |

Tudo em WebP menos a `og-image.jpg`, e por um motivo: os originais pesavam demais para uma landing. A arte original do selo, em PNG, tinha 2,9 MB e virou 53 KB; a `capsulas-brinde` tinha sido salva em modo lossless e caiu de 652 KB para 49 KB. Ao trocar qualquer imagem, gere WebP — **exceto** a de preview de link.

Vale saber por que a economia é tão grande: WebP tem dois modos, lossless e lossy. Lossless é o certo para logo, ícone e desenho de traço; para foto ele guarda pixel por pixel e o arquivo fica maior que um JPEG. Se você gerar um WebP de foto e ele vier com centenas de KB, é quase certo que saiu em lossless.

Sobre a `capsulas-brinde.webp`: a foto original tinha 41% da altura em branco vazio (225px acima e 209px abaixo do conteúdo), o que fazia a imagem parecer solta no meio da página. O recorte tirou esse vazio, e é dessa proporção de 1492×700 que sai a classe `md:aspect-1492/700` na `/sobre`. Se trocar o arquivo, confira a proporção junto.

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

**O vídeo tem 16,5 MB e mesmo assim não pesa na página — por causa de uma palavra.** É o `preload="metadata"` no `<video>`. Com ele, só o cabeçalho do arquivo desce junto com a página; os megabytes só saem do servidor quando alguém aperta o play. Se alguém trocar isso por `preload="auto"`, ou pior, colocar `autoplay`, todo visitante passa a baixar 16 MB para ver uma landing — no 4G isso é a página inteira travando. Pelo mesmo motivo não existe `autoplay`: o vídeo tem fala, e navegador nenhum deixa áudio começar sozinho.

**Vídeo sem `poster` é um retângulo preto.** A primeira tentativa aqui foi o fragmento de mídia `#t=0.1` na URL, que em tese faz o navegador pintar o quadro de 0,1s como capa. Não funcionou: com `preload="metadata"` o Chrome nem chegou a pedir o arquivo. A capa é um quadro real exportado do vídeo. Se não tiver ffmpeg à mão, dá para extrair pelo próprio navegador: carregue o vídeo num `<video>` fora da tela, dê `currentTime`, desenhe num `<canvas>` e salve o `toDataURL`.

**A qualidade real de uma imagem é decidida em dois lugares, e o segundo manda.** O `next/image` reencoda toda imagem antes de servir, e o padrão dele é `quality=75`. Um arquivo impecável em `public/` sai recomprimido a 75 assim mesmo. Para subir isso, não basta escrever `quality={90}` no componente: **a partir do Next 16 o valor precisa estar na lista `images.qualities` do `next.config.ts`**, senão é ignorado em silêncio e cai no padrão. Foi exatamente o que aconteceu com a foto do hero — o `quality={90}` estava no código e a URL servida continuava com `q=75`. Para conferir se pegou, procure o `q=` no `srcset` do HTML gerado; não confie no que está escrito no componente.

**Nem toda imagem deve virar WebP, e a foto do hero é o contraexemplo.** A regra real é evitar **duas gerações de perda**. Converter um PNG (que é sem perda) para WebP custa uma geração e economiza muito — foi o caso das fotos dos kits e do selo. Mas a `livit-hero.jpeg` já chegou comprimida: transformá-la em WebP acrescentaria uma segunda geração de perda para nada, porque o `next/image` vai reencodar de novo na entrega de qualquer jeito. Por isso ela fica em JPEG. Ao adicionar imagem nova, pergunte: o arquivo de origem já é com perda? Se for, deixe como está e deixe o otimizador trabalhar.

**Não escreva `width`/`height` em `<Image>` de import estático.** O Next já lê a dimensão do arquivo. A tabela nutricional estava declarada como 800×550 (proporção 1,45) sendo que o arquivo é 1122×1402 (0,80): o navegador reservava uma caixa deitada e pulava para a caixa em pé quando a imagem carregava. Escrever a dimensão na mão só cria uma cópia que envelhece sozinha na primeira vez que alguém trocar o arquivo.

**A `og-image.jpg` tem três regras, e todas as três são obrigatórias.** Ela é a imagem que aparece quando alguém cola o link do site num grupo de WhatsApp — para um produto vendido por link, é uma das imagens mais vistas da marca, e ninguém nunca a vê no site. As regras: **1200×630** de verdade (antes o `og:image` apontava para uma foto quase quadrada declarada como 1200×630, e o WhatsApp cortava o produto no meio); **JPEG**, porque o robô do WhatsApp não é confiável com WebP; e **abaixo de 300 KB**, que é o limite acima do qual ele desiste e não mostra preview nenhum. Depois de trocar, teste colando o link num grupo — não confie no código.

**O `site.url` leva `www`.** Na Vercel o domínio principal é o `www.vivazenbrasil.com.br`, e o endereço sem `www` responde 308 redirecionando para ele. O `canonical` tem que apontar para a URL final, que não redireciona — por isso o valor em `lib/site.ts` tem o `www`. Se você inverter o principal na Vercel, inverta lá também, senão o site declara ao Google um endereço diferente daquele que o servidor entrega.

**O preço mora num lugar só, e esse lugar muda sozinho.** Com kits configurados em `ofertas`, o preço aparece na seção de ofertas e o hero deixa de mostrar preço; sem kits, o hero mostra o preço avulso e a seção de ofertas não existe. Os dois lados leem `ofertasPublicadas`, então a troca é automática. O motivo é que o valor avulso e o valor dos kits são preços diferentes do mesmo produto: exibir os dois a dois cliques de distância faz o visitante achar que foi cobrado a mais em um dos caminhos, e desconfiança de preço não se resolve — a pessoa fecha a aba. Se for mexer no hero ou nas ofertas, mantenha essa exclusividade.

**As três fotos dos kits são normalizadas de duas maneiras, e as duas são necessárias.** A primeira é a **altura da moldura**: 700px nas três. É isso que mantém os frascos na mesma escala, já que a `OffersSection` as renderiza com altura fixa e largura automática — se você recortar cada foto só no próprio conteúdo, o frasco único vai aparecer do tamanho do trio e o kit maior parecerá levar menos produto.

A segunda é a **linha de base**: a base dos frascos tem que ficar na mesma altura dentro do arquivo (hoje em y=675, com 24px de branco abaixo). Essa é a que passa despercebida, porque cada foto isolada parece certa. As originais tinham 26px, 7px e 50px de branco embaixo dos frascos; como o container alinha as *imagens* pela base, o trio flutuava uns 11px acima dos outros dois quando os três cards ficavam lado a lado. Ao trocar qualquer foto, meça as duas coisas.

**O valor cortado precisa ser um preço realmente praticado.** É o `precoDe` de cada kit. Pelo art. 37 do CDC, inflar esse número para o desconto parecer maior é propaganda enganosa — dá multa do Procon e derruba conta de anúncio, exatamente como depoimento inventado. Um `precoDe` defensável é a soma do avulso (3 frascos a R$ 109,90 = R$ 329,70), porque é o que a pessoa pagaria comprando separado. Kit que nunca teve outro preço deve ficar com `precoDe` vazio: o card simplesmente não mostra valor cortado.

**Formas de pagamento ficam dentro da seção de ofertas, não em seção própria.** Essa informação é objeção de última hora: ela só trabalha no instante em que a pessoa está olhando o preço. Isolada num bloco mais abaixo, vira enfeite que ninguém lê.

**Animação nova: declare o `@keyframes` e a classe que o usa em CSS puro, lado a lado.** Não passe o nome da animação por dentro de uma variável CSS, e não use o `--animate-*` do `@theme` do Tailwind. Isso já quebrou em produção: o brilho dos botões funcionava no build local e sumia no da Vercel, deixando um borrão branco parado sobre cada botão de compra. O CSS publicado saía 161 bytes menor, sem o `@keyframes` e sem a regra, enquanto todo o resto do arquivo era idêntico. O motivo é que o único lugar onde o nome da animação aparecia era dentro do valor de `--animate-brilho-cta` — e minificador não segue esse tipo de referência, então conclui que o `@keyframes` é código morto e apaga. Com a classe citando o nome direto na propriedade `animation`, a ligação fica visível para qualquer ferramenta. Ao suspeitar desse tipo de sumiço, compare o CSS de produção com o local: baixe os dois e conte as ocorrências da classe em cada um.

**O brilho em loop dos botões roda para todo mundo, de propósito.** A prática comum seria desligá-lo sob `prefers-reduced-motion`, já que é animação infinita, e essa foi a primeira versão. Está ligado por decisão do dono do site: é o que chama atenção para o botão de compra, e a máquina de quem toca o projeto roda com "reduzir movimento" ativado — na prática o efeito nunca existiria. Para reverter, basta devolver o prefixo `motion-safe:` na classe `animate-brilho-cta` do `CtaButton`.

**"Reduzir movimento" tem dois pesos no resto do site, e a diferença é proposital.** No hover, o card de oferta dá um zoom de 3% e sobe 8px, a foto dos frascos cresce 4% e o botão sobe — são **mudanças de estado**, valem para todo mundo, e o que o `motion-reduce:transition-none` faz é tirar o percurso animado: com a preferência ligada, tudo troca de estado na hora. Quem se incomoda com movimento se incomoda com o trajeto, não com o resultado. Já o brilho que atravessa o botão é **animação** — meio segundo de algo se deslocando sozinho —, e esse fica atrás de `motion-safe:`, sumindo por completo. Ao criar efeito novo, decida em qual das duas categorias ele cai.

**Âncora que não cai no lugar certo: some três medidas, não uma.** O clique em "Ver os kits e preços" pula para `#ofertas`, e onde a tela para depende de `scroll-margin-top` + o `padding-top` da seção + os 73px do cabeçalho fixo que cobrem o começo da tela. Com `scroll-mt-24` e `py-20` o título caía 135px abaixo do cabeçalho e a grade de cards só começava a 574px numa tela de 844px — o visitante clicava e via um vazio. Ao mexer em qualquer uma das três, meça as outras duas: o resultado só existe na soma.

Dois números do zoom que não são arbitrários: os 3% do card parecem pouco escrito, mas o card ocupa um terço da largura da tela, então já é um salto bem visível — acima de 5% ele começa a parecer defeito. E os 4% da foto **somam** com os 3% do card, dando perto de 7% na imagem: essa diferença é o que cria profundidade, a foto vindo um pouco à frente da moldura. Subir mais faz os frascos furarem o topo do card.

Detalhe útil: o Tailwind já embrulha `group-hover` em `@media (hover: hover)` sozinho, então no celular não fica estado de hover grudado depois do toque.

**Os grupos de hover têm nome: `group/card` e `group/cta`.** O `CtaButton` é um grupo e está dentro do card, que também é. Com os dois anônimos, o `group-hover` do botão responderia ao hover do card inteiro e o brilho dispararia ao passar o mouse em qualquer canto. Se criar outro grupo dentro de um card, nomeie também.

**Sem emoji em nenhum lugar.** Nem na tela, nem em comentário, nem aqui, nem em mensagem de commit. Este é um site que vende: emoji num aviso ou num título destoa da identidade (verde escuro, terracota, Fraunces itálico) e custa credibilidade justamente na página que foi feita para construir credibilidade. Onde é preciso chamar atenção, use rótulo em texto — `[falta preencher]` na tela, `ATENÇÃO:` em comentário. Havia um triângulo de alerta em três avisos de campo vazio que renderizavam na tela de produção; foram trocados.

**O checkout é externo.** Todo botão avisa que o visitante vai para a Braip. Não tire esse aviso: ser jogado sem explicação num domínio `ev.braip.com` gera desconfiança e abandono.

## Segurança

O site é estático: não tem rota de API, server action, middleware, banco, login nem formulário. Isso não é pouco — é o que faz a superfície de ataque ser praticamente nula. Não existe injeção de SQL onde não há SQL, nem vazamento de cadastro onde não há cadastro. **Ao adicionar qualquer uma dessas coisas, essa garantia cai por terra e a conta precisa ser refeita** — em particular o CSP, que hoje é frouxo de propósito (só `frame-ancestors`) porque não há entrada de dado nesta origem.

Os headers ficam em `next.config.ts`, com o comentário de cada um. O que eles cobrem: enquadramento da página em iframe de terceiro (o golpe de sobrepor um botão de compra falso), sniffing de tipo de conteúdo, vazamento de URL completa no referer ao sair para o checkout, e acesso a câmera/microfone/localização/pagamento.

Duas coisas que nenhum header resolve, e que valem mais que todas elas juntas:

- **O acesso ao GitHub e à Vercel.** Quem entra numa dessas duas contas muda o site no ar. 2FA nas duas.
- **Clone da página.** O HTML é público por definição; qualquer um copia a landing, troca o link do checkout e roda anúncio em cima. É o golpe comum com produto de plataforma de afiliado. A defesa é vigilância e denúncia, não código.

Não há rastreamento instalado — nem GA4, nem Pixel, nem cookie de terceiro. Como consequência, o site **não coleta dado nenhum de visitante**, e a exposição à LGPD é praticamente zero. Se um dia entrar analytics, passa a precisar de banner de consentimento.

Um detalhe sobre o `robots.txt`, que costuma ser mal entendido: **ele não protege nada.** É um índice público, e é o primeiro arquivo que scanner automatizado abre. Escrever `Disallow: /qualquer-coisa` ali não esconde a página — anuncia que ela existe, e só os robôs honestos obedecem. Nunca liste caminho privado no `app/robots.ts`. O que não pode ser visto precisa de senha.

## Pendências

- [ ] Preencher `ofertas` em `lib/site.ts` com os preços e os links de checkout da Braip de cada kit — enquanto estiverem vazios a seção de ofertas não aparece e o hero segue mostrando o preço avulso
- [ ] Preencher `entrega.prazos` em `lib/site.ts` — enquanto estiverem vazios, a tabela de prazo por região fica oculta no site (ver `ShippingSection.tsx`)
- [ ] Preencher `entrega.freteGratisAcima`, se existir frete grátis
- [ ] Preencher `produto.registroAnvisa`, se houver número de notificação
- [ ] Coletar depoimentos reais para ligar a `TestimonialsSection` — é a maior lacuna de conversão do site hoje
- [ ] Validar o layout no celular de verdade, olhando a tela. Isso nunca foi feito: as medidas de texto do hero foram tiradas do DOM, não de um aparelho

### Decidido não fazer

Não são esquecimento, foram descartados de propósito:

- **GA4 e Meta Pixel** — não há campanha paga rodando. Enquanto não houver, medir não muda decisão nenhuma, e instalar criaria obrigação de consentimento de cookie. O `CtaButton` é o ponto único por onde todo CTA passa, então é lá que o evento entra no dia que fizer sentido.
