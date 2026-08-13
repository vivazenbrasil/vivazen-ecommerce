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

Campos ainda não preenchidos aparecem como um aviso laranja com ⚠️ na própria tela, de propósito. Isso é para o campo faltando não passar batido até a produção. Se você ver um ⚠️ no site, é um campo vazio em `lib/site.ts`, não um bug.

### Cuidado ao editar `lib/site.ts`

Os objetos exportados usam `as const`. Isso faz o TypeScript tratar cada texto como um **tipo literal**, não como `string` genérica. A consequência prática é chata e já quebrou o build uma vez:

```ts
// entrega.prazoPostagem preenchido => tipo literal 'Postamos em até...'
// esse literal nunca pode ser falso, então o TS conclui que o ramo do || é
// inalcançável, colapsa o tipo para `never`, e qualquer acesso a propriedade ali
// vira erro de compilação
{card.texto || <span>⚠️ {card.aviso}</span>}
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

O alias `@/` aponta para a raiz do projeto (`tsconfig.json`), então `@/lib/site` e `@/public/livit.webp` funcionam de qualquer arquivo.

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
| `CtaButton.tsx` | O botão de compra, usado em toda parte. Tem duas variantes de cor (fundo claro e fundo escuro) e a opção `comAviso`, que mostra embaixo o texto explicando que o checkout acontece na Braip. Como todo CTA passa por aqui, este é o ponto único para plugar rastreamento de conversão depois. |
| `SectionHeading.tsx` | O cabeçalho padrão de seção: o texto pequeno em maiúsculas, o título em Fraunces itálico e a descrição. Serve para as seções não divergirem de espaçamento e tamanho ao longo do tempo. |

### `lib/site.ts`

O arquivo de configuração. Exporta:

- `site` — nome, domínio, contatos, razão social, CNPJ
- `produto` — nome, preço, quantidade, selos, modo de uso, contraindicações, aviso da ANVISA, URL do checkout
- `entrega` — transportadora, prazos por região, rastreio, embalagem
- `garantia` — dias, como solicitar, aviso do CDC
- `nutrientes` — os seis ativos e a descrição de cada um
- `depoimentos` — vazio; ver o aviso acima
- `faq` — as perguntas e respostas

### `public/`

| Arquivo | Peso | Uso |
|---|---|---|
| `livit.webp` | 73 KB | Foto do hero da home. 1448×1086. |
| `livit_box.webp` | 85 KB | Foto da seção "Por que o Livit". |
| `nutrition_information.webp` | 154 KB | A tabela nutricional. É a imagem da lupa e do modal — **não comprima demais**, ela precisa ficar legível no zoom. 1122×1402. |
| `capsulas-brinde.webp` | 49 KB | Foto das duas mãos brindando, usada na `/sobre`. 1492×700. |
| `selo-garantia.webp` | 53 KB | O selo de "7 dias de garantia" da `GuaranteeSection`. Tem fundo transparente. |
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
| `next.config.ts` | Só os headers de segurança — ver a seção "Segurança" mais abaixo. Cada header tem o comentário explicando o que ele fecha. |
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

**Não escreva `width`/`height` em `<Image>` de import estático.** O Next já lê a dimensão do arquivo. A tabela nutricional estava declarada como 800×550 (proporção 1,45) sendo que o arquivo é 1122×1402 (0,80): o navegador reservava uma caixa deitada e pulava para a caixa em pé quando a imagem carregava. Escrever a dimensão na mão só cria uma cópia que envelhece sozinha na primeira vez que alguém trocar o arquivo.

**A `og-image.jpg` tem três regras, e todas as três são obrigatórias.** Ela é a imagem que aparece quando alguém cola o link do site num grupo de WhatsApp — para um produto vendido por link, é uma das imagens mais vistas da marca, e ninguém nunca a vê no site. As regras: **1200×630** de verdade (antes o `og:image` apontava para uma foto quase quadrada declarada como 1200×630, e o WhatsApp cortava o produto no meio); **JPEG**, porque o robô do WhatsApp não é confiável com WebP; e **abaixo de 300 KB**, que é o limite acima do qual ele desiste e não mostra preview nenhum. Depois de trocar, teste colando o link num grupo — não confie no código.

**O `site.url` leva `www`.** Na Vercel o domínio principal é o `www.vivazenbrasil.com.br`, e o endereço sem `www` responde 308 redirecionando para ele. O `canonical` tem que apontar para a URL final, que não redireciona — por isso o valor em `lib/site.ts` tem o `www`. Se você inverter o principal na Vercel, inverta lá também, senão o site declara ao Google um endereço diferente daquele que o servidor entrega.

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

- [ ] Preencher `entrega.prazos` em `lib/site.ts` — enquanto estiverem vazios, a tabela de prazo por região fica oculta no site (ver `ShippingSection.tsx`)
- [ ] Preencher `entrega.freteGratisAcima`, se existir frete grátis
- [ ] Preencher `produto.registroAnvisa`, se houver número de notificação
- [ ] Coletar depoimentos reais para ligar a `TestimonialsSection` — é a maior lacuna de conversão do site hoje
- [ ] Validar o layout no celular de verdade, olhando a tela. Isso nunca foi feito: as medidas de texto do hero foram tiradas do DOM, não de um aparelho

### Decidido não fazer

Não são esquecimento, foram descartados de propósito:

- **GA4 e Meta Pixel** — não há campanha paga rodando. Enquanto não houver, medir não muda decisão nenhuma, e instalar criaria obrigação de consentimento de cookie. O `CtaButton` é o ponto único por onde todo CTA passa, então é lá que o evento entra no dia que fizer sentido.
