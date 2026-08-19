/**
 * Fonte única de verdade dos dados da VivaZen.
 * Tudo que aparece no site vem daqui — altere só neste arquivo.
 *
 * ATENÇÃO: os campos marcados com CONFIRMAR são obrigatórios por lei (ANVISA / CDC / LGPD)
 * ou impactam diretamente a conversão. Preencha antes de publicar.
 */

export const site = {
  nome: 'VivaZenBrasil',
  // Alimenta metadataBase, canonical, OpenGraph e JSON-LD. Se mudar de domínio,
  // é aqui — todas as URLs absolutas do SEO derivam deste valor.
  //
  // O `www` não é enfeite: na Vercel o domínio principal é o com www, e o sem
  // www responde 308 redirecionando para ele. O canonical tem que apontar para a
  // URL final, que não redireciona. Se algum dia inverter o principal na Vercel,
  // inverta aqui também.
  url: 'https://www.vivazenbrasil.com.br',
  tagline: 'A natureza em sua forma mais pura',
  descricao:
    'Suplemento natural para quem busca equilíbrio, sono de qualidade e menos estresse no dia a dia. Fórmula com L-Triptofano, L-Teanina, Magnésio e vitaminas.',

  contato: {
    email: 'vivazenbrasil@gmail.com',
    whatsapp: '5519989973349',
    whatsappExibicao: '(19) 98997-3349',
  },

  empresa: {
    razaoSocial: 'VivaZen Brasil Ltda.',
    cnpj: '66.600.884/0001-23', 
    endereco: 'Alphaville Centro Industrial e Empresarial, 503.',
  },
} as const

export const produto = {
  nome: 'Livit', // confirmado pelo rótulo em public/capsulas-brinde.png
  categoria: 'Suplemento Alimentar',
  promessa: 'Equilíbrio, sono tranquilo e mais foco — de forma 100% natural',

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
    prazoResultado: 'A maioria dos clientes relata diferença já na 2ª semana.',
    armazenamento:
      'Conservar ao abrigo da luz, do calor e da umidade. Após aberto, manter em local seco e arejado e consumir em até 60 dias. Após o consumo, manter a embalagem bem fechada',
  },

  // Texto padrão exigido pela ANVISA para suplementos alimentares.
  // CONFIRMAR com o rótulo aprovado antes de publicar.
  avisoAnvisa:
    'Este produto não é medicamento. Não deve ser utilizado para o tratamento, cura ou prevenção de doenças. Não exceder a recomendação diária de consumo indicada na embalagem. Mantenha fora do alcance de crianças.',

  contraindicacoes: [
    'ALÉRGICOS: PODE CONTER DERIVADOS DE CRUSTÁCEOS(CARANGUEJO), SOJA E PINOLI(PINUS SPP.).',
    'Gestantes, lactantes e crianças devem consultar um médico ou nutricionista antes de consumir.',
    'Pessoas em uso de antidepressivos ou medicamentos para o sono devem consultar um médico.',
    'Não recomendado para quem tem alergia a qualquer um dos componentes da fórmula.',
  ],

  registroAnvisa: '', // CONFIRMAR: nº de notificação/registro, se houver
} as const

/**
 * Kits de compra exibidos na seção de ofertas, logo abaixo do hero.
 *
 * NÃO use `as const` aqui. Os campos precisam ser `string` para os guards de
 * "campo vazio" continuarem alcançáveis — com tipo literal o TypeScript conclui
 * que um texto preenchido nunca pode ser falso, colapsa o tipo para `never` e o
 * build quebra. É o mesmo problema descrito no topo do ShippingSection.
 *
 * Cada oferta só vai para a tela quando tiver `precoPor` E `checkoutUrl`
 * preenchidos. Enquanto nenhuma estiver completa a seção inteira não renderiza,
 * e o preço volta a aparecer no hero — ver `ofertasPublicadas` logo abaixo.
 *
 * ATENÇÃO ao `precoDe`, o valor que aparece cortado: pelo art. 37 do CDC, ele
 * precisa ser um preço que a loja realmente praticou. Inventar um valor alto só
 * para o desconto parecer maior é propaganda enganosa, dá multa do Procon e
 * derruba conta de anúncio. Se um kit nunca foi vendido por outro preço, deixe
 * `precoDe` vazio: o card simplesmente não mostra valor cortado.
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
    // 3 x R$ 109,90 = R$ 329,70. É o que a pessoa pagaria comprando três
    // frascos avulsos, e é por isso que este valor é defensável como preço
    // cortado. Estava R$ 330,00, arredondado para cima.
    precoDe: 'R$ 329,70',
    precoPor: 'R$ 279,90',
    precoParcelado: 'até 3x sem juros',
    // O card do meio é o que a maioria escolhe. 3 frascos também é o kit que
    // faz sentido recomendar: o próprio modo de uso pede constância de no
    // mínimo 30 dias e o resultado costuma aparecer a partir da 2ª semana.
    selo: 'MAIS VENDIDO',
    destaque: true,
    // ATENÇÃO: isto só decide o que aparece NA TELA. O frete grátis em si
    // precisa estar configurado no checkout deste kit lá na Braip — senão o
    // site promete uma coisa e o checkout cobra outra, o que é o mesmo tipo
    // de problema descrito no aviso do `precoDe` acima.
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

/**
 * Quanto o kit economiza em relação ao preço cortado.
 *
 * Isto é CALCULADO, e não digitado, de propósito. Existia um campo `economia`
 * preenchido à mão e ele produziu dois erros ao mesmo tempo em produção:
 *
 * O texto saía duplicado. O card já escreve "Você economiza" antes do valor, e
 * o campo trazia "Economize R$ 50,10" — na tela lia-se "Você economiza
 * Economize R$ 50,10".
 *
 * E o número podia contradizer os outros dois. Um campo que repete uma conta
 * feita a partir de outros dois campos sempre acaba desatualizado: basta mexer
 * no preço e esquecer de refazer a subtração, e a página passa a exibir uma
 * economia que não bate com os valores logo acima dela.
 *
 * Derivando, os três números não têm como divergir. Kit sem `precoDe` — como o
 * de 1 frasco — simplesmente não tem economia, e o card omite a faixa.
 */
function valorEmReais(texto: string): number | null {
  // "R$ 329,70" -> 329.7. Tira tudo que não for dígito ou vírgula e troca a
  // vírgula decimal brasileira pelo ponto que o JavaScript entende.
  const numero = Number.parseFloat(texto.replace(/[^\d,]/g, '').replace(',', '.'))
  return Number.isFinite(numero) ? numero : null
}

export function economiaDoKit(oferta: { precoDe: string; precoPor: string }): string {
  const de = valorEmReais(oferta.precoDe)
  const por = valorEmReais(oferta.precoPor)
  if (de === null || por === null || de <= por) return ''

  // Formatação na mão em vez de Intl.NumberFormat: o Intl depende da tabela de
  // idiomas de quem executa, e servidor e navegador podem entregar espaços
  // diferentes entre "R$" e o número. Isso gera erro de hidratação no React,
  // que compara o HTML do servidor com o que o navegador desenharia.
  return `R$ ${(de - por).toFixed(2).replace('.', ',')}`
}

/**
 * Uma oferta só é publicável quando tem preço E link de checkout. A regra mora
 * aqui, e não dentro dos componentes, porque duas telas dependem dela: a seção
 * de ofertas (que só aparece se houver alguma) e o hero (que só mostra preço
 * enquanto não houver nenhuma, para o site nunca exibir dois preços diferentes
 * do mesmo produto).
 */
export const ofertasPublicadas = ofertas.filter(
  // O link precisa começar com http, e não apenas "não estar vazio". Enquanto
  // o teste era só de campo preenchido, um rascunho digitado no lugar da URL
  // — "sssss", por exemplo — passava no filtro, a seção ia para a tela e o
  // botão de comprar levava para uma página inexistente do próprio site.
  // Botão de compra quebrado numa landing custa mais do que a seção inteira
  // rende, então na dúvida a seção fica escondida.
  (oferta) => oferta.precoPor && oferta.checkoutUrl.startsWith('http'),
)

/**
 * O kit com frete grátis, para a barra de aviso no topo do site — ver
 * `components/layout/PromoBar.tsx`. Deriva de `ofertasPublicadas`, e não de
 * `ofertas` direto, pelo mesmo motivo do `destinoDoCta` logo abaixo: a barra
 * não pode anunciar frete grátis num kit que ainda nem tem preço ou link de
 * checkout publicado.
 */
export const ofertaComFreteGratis = ofertasPublicadas.find(
  (oferta) => oferta.freteGratis,
)

/**
 * Para onde vai qualquer botão de compra que não seja o de um kit específico.
 *
 * Com kits no ar, todo botão leva para a seção de kits em vez de jogar direto
 * na Braip: o visitante escolhe entre 1, 2 e 3 frascos antes de sair do site, e
 * mandar para o checkout do frasco avulso entrega a venda menor. Sem kits
 * configurados, cai no checkout, que passa a ser o único destino existente —
 * assim nenhum botão aponta para uma seção invisível.
 *
 * A barra antes do `#` não é detalhe. `/#ofertas` resolve os dois casos do
 * site: na home o navegador reconhece o mesmo documento e faz rolagem suave até
 * a âncora; na `/sobre` ou numa página legal, onde a seção não existe e não há
 * para onde rolar, ele navega para a home e cai na seção. Um `#ofertas` sozinho
 * não faria nada nessas páginas.
 *
 * A regra mora aqui, e não dentro de um componente, porque o cabeçalho também
 * depende dela — e o cabeçalho é Client Component, então não pode importar de
 * um módulo de servidor.
 */
export const destinoDoCta =
  ofertasPublicadas.length > 0 ? '/#ofertas' : produto.checkoutUrl

export const formasDePagamento = ['Pix', 'Cartão de crédito', 'Boleto']

export const entrega = {
  transportadora: 'Correios e transportadoras parceiras',
  prazos: [
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
  // ATENÇÃO: este número também está desenhado dentro de public/selo-garantia.webp.
  // Se mudar aqui, troque a arte — senão a seção esconde o selo e volta para o
  // círculo em CSS (a trava está em components/sections/GuaranteeSection.tsx).
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
      'Aminoácido essencial que auxilia na produção de serotonina, um neurotransmissor que regula o humor, o sono e o apetite. Ajuda a combater o estresse e a ansiedade.',
  },
  {
    nome: 'L-Teanina',
    descricao:
      'Encontrada no chá verde, a L-Teanina promove relaxamento sem causar sonolência. Melhora o foco, a concentração e reduz a sensação de estresse.',
  },
  {
    nome: 'Magnésio',
    descricao:
      'Mineral crucial para mais de 300 reações bioquímicas no corpo. Auxilia na função muscular e nervosa, regula a pressão arterial e contribui para a saúde óssea.',
  },
  {
    nome: 'Vitamina B3 (Niacina)',
    descricao:
      'Essencial para o metabolismo energético, ajuda a converter alimentos em energia. Contribui para a saúde da pele, do sistema nervoso e para a regulação do colesterol.',
  },
  {
    nome: 'Inositol',
    descricao:
      'Componente do complexo B, o Inositol desempenha um papel na comunicação celular e na resposta à insulina, auxiliando no equilíbrio hormonal e no bem-estar mental.',
  },
  {
    nome: 'Vitamina D3 (Colecalciferol)',
    descricao:
      'Fundamental para a absorção de cálcio e fósforo, fortalecendo ossos e dentes. Também desempenha um papel vital no funcionamento do sistema imunológico e muscular.',
  },
] as const

/**
 * ATENÇÃO: SOMENTE DEPOIMENTOS REAIS.
 * Inventar avaliação de cliente é propaganda enganosa (art. 37 do CDC) e a Meta
 * derruba anúncio por isso. Preencha com prints/mensagens que você realmente
 * recebeu e tenha autorização de uso. Enquanto o array estiver vazio, a seção
 * não aparece no site.
 */
export const depoimentos: {
  nome: string
  local: string
  texto: string
  nota: number
}[] = []
/**
 * Depoimentos gravados em vídeo.
 *
 * Vale a mesma regra do array acima, e com peso maior: aqui aparece o rosto de
 * uma pessoa real. Só entra vídeo de cliente de verdade e com autorização de
 * uso de imagem — no Brasil ela é exigida pelo art. 20 do Código Civil, e não
 * some porque a pessoa mandou o vídeo espontaneamente no WhatsApp. Guarde o
 * aceite por escrito.
 *
 * `capa` é um quadro extraído do próprio vídeo. Sem ela o player aparece como
 * um retângulo preto — o mesmo problema descrito na VideoSection. Ao adicionar
 * um depoimento novo, gere a capa junto.
 */
export const depoimentosEmVideo: {
  nome: string
  local: string
  video: string
  capa: string
}[] = [
  {
    // CONFIRMAR o nome e a cidade: o nome veio do arquivo que você enviou
    // (depoimento_beatriz.mp4) e a cidade não foi informada. Depoimento sem
    // procedência convence menos, e nome de pessoa real na tela merece
    // conferência.
    nome: 'Beatriz',
    local: '',
    video: '/depoimento_beatriz.mp4',
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
