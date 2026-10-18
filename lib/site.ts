/**
 * Fonte única de verdade dos dados da VivaZen — tudo que vai para a tela sai daqui.
 *
 * Campos marcados com CONFIRMAR são exigência legal (ANVISA / CDC / LGPD) ou
 * mexem direto na conversão. Preencher antes de publicar.
 */

export const site = {
  nome: 'VivaZenBrasil',
  // Toda URL absoluta do SEO (metadataBase, canonical, OG, JSON-LD) deriva daqui.
  // O `www` importa: na Vercel o principal é o com www e o sem www devolve 308.
  // Canonical tem que apontar para a URL final. Se inverter lá, inverta aqui.
  url: 'https://www.vivazenbrasil.com.br',
  tagline: 'A natureza em sua forma mais pura',
  descricao:
    'Suplemento alimentar em cápsulas com magnésio, vitaminas D3 e B3, L-Triptofano, L-Teanina e Inositol. Tabela nutricional aberta, 60 cápsulas para 30 dias de uso.',

  contato: {
    email: 'vivazenbrasil@gmail.com',
    whatsapp: '5519989973349',
    whatsappExibicao: '(19) 98997-3349',
  },

  // Vai para o `sameAs` do JSON-LD: é o que diz ao Google que site, Instagram e
  // Facebook são a mesma entidade. Pesa mais aqui do que no projeto médio —
  // existem pelo menos quatro "VivaZen" no Brasil, um com domínio quase igual
  // (vivazenbr.com, CNPJ 60.322.870/0001-09). Array vazio = campo não emitido.
  // TODO: pegar as URLs dos perfis com o Felipe e preencher — sem isso a busca
  // pelo nome da marca continua disputada com as outras VivaZen.
  redesSociais: [] as string[],

  empresa: {
    razaoSocial: 'VivaZen Brasil Ltda.',
    cnpj: '66.600.884/0001-23', 
    endereco: 'Alphaville Centro Industrial e Empresarial, 503.',
  },
} as const

export const produto = {
  nome: 'Livit', // confirmado pelo rótulo em public/sobre-capsulas-brinde.webp
  categoria: 'Suplemento Alimentar',
  // Subtítulo do hero e parte do <title> de toda página. Fala de transparência e
  // não de efeito — é característica que a página comprova, não promessa de
  // resultado (que é o que a IN 28/2018 não deixa passar).
  promessa: 'Fórmula aberta: seis ativos e nenhuma letra miúda',

  checkoutUrl:
    'https://ev.braip.com/checkout/plakqv0l/che74r9l?currency=BRL',

  // Estes textos são exibidos exatamente como estão escritos aqui.
  quantidade: '60 cápsulas de 500mg', // 500mg lido no rótulo
  duracao: '30 dias de uso',
  preco: 'R$ 109,90', // manter o "R$" e a vírgula — o valor vai cru para a tela
  precoParcelado: 'até 3x sem juros', // ex.: "ou 12x de R$ 10,90" — confira as condições na Braip

  selos: [
    '100% Natural',
    'Sem Glúten',
    'Vegano',
    'Sem Adição de Açúcar',
  ],

 
  modoDeUso: {
    passos: [
      {
        titulo: 'Tome as cápsulas',
        texto: '2 cápsulas por dia, com um copo de água.'
      },
      {
        titulo: 'Escolha o melhor horário',
        texto: 'Recomendamos tomar 30min antes de dormir.'
      },
      {
        titulo: 'Mantenha a constância',
        texto: 'Use diariamente por no mínimo 30 dias.'
      },
    ],
    // Vazio de propósito: aqui havia "a maioria relata diferença já na 2ª semana",
    // que é alegação de resultado com prazo e sem estudo que sustente. Só volta
    // se o fabricante mandar a base. Vazio, o bloco some da tela sozinho.
    prazoResultado: '',
    armazenamento:
      'Conservar ao abrigo da luz, do calor e da umidade. Após aberto, manter em local seco e arejado e consumir em até 60 dias. Após o consumo, manter a embalagem bem fechada',
  },

  // Texto padrão exigido pela ANVISA para suplementos alimentares.
  // CONFIRMAR com o rótulo aprovado antes de publicar.
  avisoAnvisa:
    'Este produto não é medicamento. Não deve ser utilizado para o tratamento, cura ou prevenção de doenças. Não exceder a recomendação diária de consumo indicada na embalagem. Mantenha fora do alcance de crianças.',

  contraindicacoes: [
    'ALÉRGICOS: PODE CONTER DERIVADOS DE CRUSTÁCEOS(CARANGUEJO), SOJA E PINOLI(PINUS SPP.).',
    'Este produto não deve ser consumido por gestantes, lactantes e crianças.',
    'Pessoas em uso de antidepressivos ou medicamentos para o sono devem consultar um médico.',
    'Não recomendado para quem tem alergia a qualquer um dos componentes da fórmula.',
  ],

  // TODO: conferir no rótulo aprovado se existe nº de notificação/registro e
  // preencher. Enquanto vazio, a WarningsSection não exibe a linha.
  registroAnvisa: '',
} as const

/**
 * Kits exibidos na seção de ofertas, logo abaixo do hero.
 *
 * Nada de `as const` aqui: com tipo literal o TS conclui que um texto preenchido
 * nunca é falso, colapsa para `never` nos guards de campo vazio e o build quebra
 * (mesma pegadinha descrita no topo do ShippingSection).
 *
 * ATENÇÃO ao `precoDe`: pelo art. 37 do CDC o valor cortado tem que ser preço
 * que a loja praticou de verdade. Inflar para o desconto parecer maior é
 * propaganda enganosa — multa do Procon e conta de anúncio derrubada. Kit que
 * nunca teve outro preço fica com `precoDe` vazio e o card omite o corte.
 */
export const ofertas: {
  id: string
  frascos: number
  titulo: string
  subtitulo: string
  precoDe: string
  precoPor: string
  precoParcelado: string
  selo: string
  destaque: boolean
  freteGratis: boolean
  checkoutUrl: string
}[] = [
  {
    id: '1-frasco',
    frascos: 1,
    titulo: 'Para experimentar',
    subtitulo: '1 frasco · 60 cápsulas · 30 dias',
    precoDe: '',
    precoPor: 'R$ 109,90',
    precoParcelado: 'até 3x sem juros',
    selo: '',
    destaque: false,
    freteGratis: false,
    checkoutUrl: 'https://buy.braip.com/checkout/plakqv0l/che74r9l',
  },
  {
    id: '3-frascos',
    frascos: 3,
    titulo: 'Para o resultado completo',
    subtitulo: '3 frascos · 180 cápsulas · 90 dias',
    // 3 x R$ 109,90 = R$ 329,70, que é o que sairia comprando avulso — por isso
    // este corte é defensável. Estava R$ 330,00, arredondado para cima.
    precoDe: 'R$ 329,70',
    precoPor: 'R$ 279,90',
    precoParcelado: 'até 3x sem juros',
    // O card do meio é o que a maioria escolhe, e 3 frascos é o kit que faz
    // sentido recomendar: o modo de uso pede no mínimo 30 dias de constância.
    selo: 'MAIS VENDIDO',
    destaque: true,
    // Isto só decide o que aparece NA TELA. O frete grátis em si tem que estar
    // configurado no checkout deste kit lá na Braip, senão o site promete e o
    // checkout cobra — mesmo problema do aviso do `precoDe` acima.
    freteGratis: true,
    checkoutUrl: 'https://buy.braip.com/checkout/plan46qy/che74r9l',
  },
  {
    id: '2-frascos',
    frascos: 2,
    titulo: 'Para manter a constância',
    subtitulo: '2 frascos · 120 cápsulas · 60 dias',
    precoDe: 'R$ 219,80', // 2 x R$ 109,90. Estava R$ 220,00.
    precoPor: 'R$ 199,90',
    precoParcelado: 'até 3x sem juros',
    selo: '',
    destaque: false,
    freteGratis: false,
    checkoutUrl: 'https://buy.braip.com/checkout/plajel1o/che74r9l',
  },
]

// "R$ 329,70" -> 329.7. Tira o que não for dígito ou vírgula e troca a vírgula
// decimal pelo ponto que o JS entende.
function valorEmReais(texto: string): number | null {
  const numero = Number.parseFloat(texto.replace(/[^\d,]/g, '').replace(',', '.'))
  return Number.isFinite(numero) ? numero : null
}

/**
 * Quanto o kit economiza. Calculado, e não digitado: havia um campo `economia`
 * preenchido na mão que saía duplicado na tela ("Você economiza Economize R$
 * 50,10") e ainda desatualizava sempre que alguém mexia no preço e esquecia de
 * refazer a subtração. Derivando, os três números não têm como divergir.
 */
export function economiaDoKit(oferta: { precoDe: string; precoPor: string }): string {
  const de = valorEmReais(oferta.precoDe)
  const por = valorEmReais(oferta.precoPor)
  if (de === null || por === null || de <= por) return ''

  // Na mão em vez de Intl.NumberFormat de propósito: o Intl depende da tabela de
  // idiomas de quem executa, e servidor e cliente podem devolver espaços
  // diferentes entre "R$" e o número — o que dá erro de hidratação no React.
  return `R$ ${(de - por).toFixed(2).replace('.', ',')}`
}

/**
 * Oferta só é publicável com preço E link de checkout. A regra mora aqui, e não
 * nos componentes, porque duas telas dependem dela: a seção de ofertas e o hero
 * (que só mostra preço enquanto não houver kit, para o site nunca exibir dois
 * preços diferentes do mesmo produto).
 *
 * O teste do link é `startsWith('http')`, não "campo preenchido": um rascunho
 * digitado no lugar da URL ("sssss") passava no filtro e o botão de comprar
 * levava para uma página inexistente. Na dúvida a seção fica escondida.
 */
export const ofertasPublicadas = ofertas.filter(
  (oferta) => oferta.precoPor && oferta.checkoutUrl.startsWith('http'),
)

// Alimenta a PromoBar. Deriva de `ofertasPublicadas` e não de `ofertas` direto:
// a barra não pode anunciar frete grátis de um kit que ainda não está no ar.
export const ofertaComFreteGratis = ofertasPublicadas.find(
  (oferta) => oferta.freteGratis,
)

/**
 * Destino de qualquer botão de compra que não seja o de um kit específico.
 *
 * Com kits no ar todos levam para a seção de kits: mandar direto para a Braip
 * entrega o frasco avulso, que é a menor das três vendas. Sem kits, cai no
 * checkout — assim nenhum botão aponta para uma seção invisível.
 *
 * A barra antes do `#` não é detalhe. `/#ofertas` funciona nos dois casos: na
 * home o navegador reconhece o mesmo documento e rola suave até a âncora; em
 * /sobre ou numa página legal ele navega para a home e cai na seção. Um
 * `#ofertas` sozinho não faria nada fora da home.
 */
export const destinoDoCta =
  ofertasPublicadas.length > 0 ? '/#ofertas' : produto.checkoutUrl

// Menor e maior preço dos kits, como número, para o JSON-LD — que quer valor
// numérico e não o texto "R$ 279,90". Sai dos mesmos dados da tela, então o
// preço que o Google lê não tem como divergir do que o visitante vê.
export function faixaDePrecoDosKits(): { min: number; max: number } | null {
  const valores = ofertasPublicadas
    .map((oferta) => valorEmReais(oferta.precoPor))
    .filter((v): v is number => v !== null)
  if (valores.length === 0) return null
  return { min: Math.min(...valores), max: Math.max(...valores) }
}

export const formasDePagamento = ['Pix', 'Cartão de crédito', 'Boleto']

export const entrega = {
  transportadora: 'Correios e transportadoras parceiras',
  prazos: [
    // TODO: prazos por região ainda com a transportadora. Enquanto os três
    // estiverem vazios a tabela não renderiza — ver ShippingSection.
    { regiao: 'Sudeste', prazo: '' },
    { regiao: 'Sul e Centro-Oeste', prazo: '' },
    { regiao: 'Nordeste e Norte', prazo: '' },
  ],
  prazoPostagem: 'Postamos em até 1 dia útil após a confirmação do pagamento',
  freteGratisAcima: '',
  rastreio:
    'Você recebe o código de rastreio por e-mail assim que o pedido é postado.',
  embalagem:
    'Enviamos em embalagem discreta, sem identificação do conteúdo na parte externa.',
} as const

export const garantia = {
  // Este número também está desenhado dentro de public/selo-garantia.webp. Se
  // mudar aqui, troque a arte junto — senão a seção esconde o selo e cai no
  // círculo em CSS (a trava está na GuaranteeSection).
  dias: 7,
  titulo: 'Satisfação garantida ou seu dinheiro de volta',
  comoSolicitar: [
    'Fale com a gente pelo WhatsApp ou e-mail dentro do prazo de garantia.',
    'Nossa equipe confirma os dados do seu pedido.',
    'O reembolso é processado pela plataforma de pagamento em até 7 dias úteis.',
  ],

  avisoCdc:
    'Nos termos do art. 49 do Código de Defesa do Consumidor, você pode desistir da compra em até 7 dias corridos após o recebimento do produto.',
} as const

export const nutrientes = [
  {
    nome: 'L-Triptofano',
    descricao:
      'Aminoácido essencial: o organismo humano não é capaz de produzi-lo, e por isso ele precisa vir da alimentação. Está presente em alimentos como ovos, castanhas, leite e sementes. No Livit, aparece na forma de L-Triptofano de grau alimentício, com lote rastreável.',
  },
  {
    nome: 'L-Teanina',
    descricao:
      'Componente naturalmente presente nas folhas do chá verde (Camellia sinensis), de onde é extraída. Compõe a fórmula do Livit junto aos demais ativos.',
  },
  {
    nome: 'Magnésio',
    descricao:
      'Mineral presente em centenas de processos do organismo. O magnésio auxilia no funcionamento muscular e no funcionamento neuromuscular, auxilia no metabolismo energético e no metabolismo de proteínas, carboidratos e gorduras, e auxilia no equilíbrio dos eletrólitos.',
  },
  {
    nome: 'Vitamina B3 (Niacina)',
    descricao:
      'A niacina auxilia no metabolismo energético e no metabolismo de proteínas, carboidratos e gorduras — é ela que participa da conversão do que você come em energia. Também contribui para a manutenção da pele e auxilia na manutenção das mucosas.',
  },
  {
    nome: 'Inositol',
    descricao:
      'Substância presente naturalmente em alimentos como frutas cítricas e leguminosas, e também produzida pelo próprio organismo. Integra a composição do Livit.',
  },
  {
    nome: 'Vitamina D3 (Colecalciferol)',
    descricao:
      'A vitamina D auxilia na absorção de cálcio e fósforo e na formação de ossos e dentes. Além disso, auxilia no funcionamento muscular e no funcionamento do sistema imune.',
  },
] as const


export const depoimentos: {
  nome: string
  local: string
  texto: string
  nota: number
}[] = []

export const depoimentosEmVideo: {
  nome: string
  local: string
  video: string
  capa: string
}[] = [
  {
    // TODO: confirmar nome e cidade com a cliente. O nome saiu do arquivo
    nome: 'Beatriz',
    local: '',
    video: '/depoimento-beatriz.mp4',
    capa: '/depoimento-beatriz-capa.webp',
  },
]

export const faq = [
  {
    pergunta: 'Como eu recebo o produto?',
    resposta:
      'Após a confirmação do pagamento, preparamos seu pedido e enviamos pelos Correios ou por transportadora parceira. Você recebe o código de rastreio por e-mail para acompanhar a entrega do início ao fim.',
  },
  {
    pergunta: 'Em quanto tempo chega?',
    resposta:
      'O prazo varia conforme a sua região e aparece calculado no checkout, junto com o valor do frete, antes de você finalizar a compra. Depois da postagem você recebe o código de rastreio para acompanhar a entrega.',
  },
  {
    pergunta: 'A compra é segura? Por que sou direcionado para outro site?',
    resposta:
      'Sim. A VivaZen usa a Braip, uma plataforma de pagamentos brasileira, para processar as compras. Por isso o botão te leva para o ambiente de checkout dela — é lá que seus dados de pagamento são tratados, com criptografia. Nós nunca temos acesso ao número do seu cartão.',
  },
  {
    pergunta: 'Quais formas de pagamento vocês aceitam?',
    resposta:
      'Cartão de crédito (com opção de parcelamento), PIX e boleto bancário. As opções disponíveis aparecem na tela do checkout.',
  },
  {
    pergunta: 'E se eu não gostar do produto?',
    resposta:
      'Você tem a garantia legal de 7 dias do Código de Defesa do Consumidor para desistir da compra após o recebimento, além da nossa garantia de satisfação. Basta falar com a gente pelo WhatsApp que resolvemos.',
  },
  {
    pergunta: 'É preciso receita médica?',
    resposta:
      'Não. Trata-se de um suplemento alimentar, de venda livre. Ainda assim, se você faz uso de medicamentos contínuos, está grávida, amamentando ou tem alguma condição de saúde, recomendamos conversar com seu médico ou nutricionista antes de começar.',
  },
  {
    pergunta: 'Posso tomar junto com outros suplementos ou medicamentos?',
    resposta:
      'Com outros suplementos, geralmente sim. Com medicamentos — especialmente antidepressivos, ansiolíticos ou indutores do sono — é essencial consultar seu médico antes, porque alguns componentes da fórmula podem interagir com eles.',
  },
  {
    pergunta: 'Vou precisar tomar para sempre?',
    resposta:
      'Não. É um suplemento de apoio ao seu bem-estar, não um medicamento de uso contínuo obrigatório. Muitos clientes fazem ciclos de uso e pausas. O ideal é avaliar com um profissional o que faz sentido para o seu caso.',
  },
  {
    pergunta: 'Preciso pagar imposto ou taxa extra na entrega?',
    resposta:
      'Não. O produto é nacional e o valor que você paga no checkout (produto + frete) é o valor final. Não existe nenhuma cobrança adicional no momento da entrega.',
  },
  {
    pergunta: 'Como falo com vocês se tiver um problema?',
    resposta: `Pelo WhatsApp ${site.contato.whatsappExibicao} ou pelo e-mail ${site.contato.email}. Respondemos em horário comercial, de segunda a sexta.`,
  },
] as const
