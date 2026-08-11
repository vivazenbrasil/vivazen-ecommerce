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

O alias `@/` aponta para a raiz do projeto (`tsconfig.json`), então `@/lib/site` e `@/public/livit.jpeg` funcionam de qualquer arquivo.

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
| `favicon.ico` | O Next encontra e usa esse arquivo automaticamente por estar aqui. |

As três páginas legais são **modelos-base que ainda precisam de revisão de um advogado**. Cada uma mostra um aviso laranja no topo dizendo isso. Depois da revisão, remova esse aviso editando `components/layout/LegalPage.tsx` (é o bloco com o ícone `AlertTriangle`) — mexer num lugar tira das três.

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
| `NutritionalInfoSection.tsx` | **Client.** A tabela nutricional com lupa no hover e modal com zoom e arraste, mais o acordeão explicando cada nutriente. É o arquivo mais complexo do projeto — se for mexer, mexa com calma. |
| `HowToUseSection.tsx` | Modo de uso em três passos, prazo de resultado e como armazenar. Os textos vêm de `produto.modoDeUso` e **precisam bater com o rótulo aprovado**. |
| `WarningsSection.tsx` | Advertências, contraindicações e o aviso da ANVISA. Obrigatório por lei para suplemento. |
| `ShippingSection.tsx` | Entrega: postagem, rastreio, embalagem e a tabela de prazo por região — essa tabela só aparece se houver prazo preenchido em `entrega.prazos`. |
| `GuaranteeSection.tsx` | Selo de garantia, como pedir reembolso e o aviso dos 7 dias do CDC. |
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
| `Icons.tsx` | **Arquivo morto.** Só re-exporta ícones do lucide-react e nada no projeto importa ele. Pode apagar. |

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

| Arquivo | Uso |
|---|---|
| `livit.jpeg` | Foto do hero da home. Também é a imagem de preview no OpenGraph. |
| `livit_box.jpeg` | Foto da seção "Por que o Livit". |
| `nutrition_information.jpeg` | A tabela nutricional. É a imagem da lupa e do modal — **não comprima demais**, ela precisa ficar legível no zoom. |
| `capsulas-brinde.png` | Foto das duas mãos brindando, usada na `/sobre`. É o recorte de `image_capsules.png`. |
| `image_capsules.png` | **Órfã.** Original de onde saiu o recorte acima. Nada aponta mais para ela, mas ela continua sendo publicada. Pode apagar. |
| `capsula-vivazen.jpeg`, `logo.jpeg` | Não usadas em nenhum componente hoje. |

Sobre a `capsulas-brinde.png`: a original tinha 41% da altura em branco vazio (225px acima e 209px abaixo do conteúdo), o que fazia a imagem parecer solta no meio da página. O recorte tirou esse vazio. A proporção nativa dela é 1492×700.

Essa foto tem **fundo branco opaco**, sem transparência. É por isso que na `/sobre` ela fica numa faixa de fundo branco em vez de sobre o creme da página — assim o branco dela deixa de ser uma emenda visível e passa a ser o fundo da seção. Se você trocar essa foto, ou mantenha o fundo branco, ou ajuste a cor da faixa junto.

### Configuração na raiz

| Arquivo | O que faz |
|---|---|
| `next.config.ts` | Sem customização, só o default do Next. |
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

**O checkout é externo.** Todo botão avisa que o visitante vai para a Braip. Não tire esse aviso: ser jogado sem explicação num domínio `ev.braip.com` gera desconfiança e abandono.

## Pendências

- [ ] Preencher `entrega.prazos` em `lib/site.ts` — enquanto estiverem vazios, a tabela de prazo por região fica oculta no site (ver `ShippingSection.tsx`)
- [ ] Preencher `produto.registroAnvisa`, se houver número de notificação
- [ ] Revisão jurídica das três páginas legais e remoção do aviso em `LegalPage.tsx`
- [ ] Instalar GA4 e Meta Pixel — hoje não há como medir nada do marketing. O `CtaButton` é o ponto único para o evento de clique
- [ ] Converter as imagens para WebP (`capsulas-brinde.png` tem 922 KB)
- [ ] Apagar `components/ui/Icons.tsx` e `public/image_capsules.png`, ambos sem uso
- [ ] Coletar depoimentos reais para ligar a `TestimonialsSection`
- [ ] `app/sitemap.ts` e `app/robots.ts`
- [ ] Imagem dedicada de OpenGraph em 1200×630 (hoje usa a `livit.jpeg`, que é quadrada e corta no preview do WhatsApp)
