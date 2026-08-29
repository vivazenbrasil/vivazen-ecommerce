# Livit — alegações do site e a IN 28/2018

Base: Anexo V da IN 28/2018 (lista positiva de alegações autorizadas), Anexo III
(quantidades mínimas), Anexo IV (máximas) e Anexo VI (rotulagem complementar),
texto consolidado da ANVISA.

Três partes: **onde estão as alegações no código**, **o texto novo proposto** e
**o que ainda depende do fabricante**.

---

## 1. Inventário: onde as alegações vivem no código

Ordenado por alcance, não por gravidade da frase. Uma frase média que aparece em
todas as páginas pesa mais que uma frase forte escondida num acordeão.

| # | Onde | Texto | Alcance |
|---|---|---|---|
| 1 | `lib/site.ts:21` — `site.descricao` | "…equilíbrio, sono de qualidade e **menos estresse no dia a dia**" | **Todas as páginas.** Vai na meta description, no OpenGraph e no JSON-LD |
| 2 | `lib/site.ts:39` — `produto.promessa` | "Equilíbrio, **sono tranquilo** e mais foco" | H1 da home e title de todas as páginas |
| 3 | `ProblemSection.tsx:5-30` | "Vira e mexe na cama", "**Ansiedade de fundo**", "Acorda já sem energia", "Difícil se concentrar" | Seção inteira da home |
| 4 | `lib/site.ts:299` — L-Triptofano | "auxilia na **produção de serotonina**… Ajuda a combater o **estresse e a ansiedade**" | Acordeão de composição |
| 5 | `lib/site.ts:304` — L-Teanina | "promove relaxamento sem causar sonolência… **reduz a sensação de estresse**" | Acordeão de composição |
| 6 | `lib/site.ts:319` — Inositol | "auxiliando no **equilíbrio hormonal e no bem-estar mental**" | Acordeão de composição |
| 7 | `lib/site.ts:309` — Magnésio | "**regula a pressão arterial**" | Acordeão de composição |
| 8 | `lib/site.ts:314` — Niacina | "regulação do **colesterol**" | Acordeão de composição |
| 9 | `ProductHighlightSection.tsx:13-15` | "Relaxa sem derrubar… **promove calma**… não um sedativo" | Seção "Por que o Livit" |
| 10 | `HeroSection.tsx:48` | "para **relaxar sem sedação e sem dependência**" | Primeira tela |
| 11 | `FinalCtaSection.tsx:34` | "**sinta a diferença de um sono melhor** e dias mais leves" | Último CTA |
| 12 | `lib/site.ts:73` — `prazoResultado` | "A maioria dos clientes **relata diferença já na 2ª semana**" | Seção modo de uso |
| 13 | `OffersSection.tsx:86` | "O Livit **funciona** por constância" | Seção de kits |
| 14 | Depoimento em vídeo | relato de resultado | Seção de depoimentos |

Três grupos não estavam mapeados na primeira versão deste documento:

**Itens 7 e 8** — pressão arterial e colesterol são alegações de saúde tão
específicas quanto as de ansiedade, e estão no mesmo acordeão que elas.

**Itens 11, 12 e 13** — são alegações de **resultado**, não de função de
nutriente. O item 12 é o mais delicado: cita prazo ("2ª semana") sem estudo que
sustente.

**Item 1** — é o de maior alcance de todos e o mais fácil de esquecer, porque não
aparece na tela: vai na meta description de toda página e no JSON-LD que o Google
lê.

---

## 2. Situação de cada ativo

| Ativo | Alegação funcional autorizada? |
|---|---|
| Magnésio | Sim — 7 alegações disponíveis |
| Vitamina B3 (Niacina) | Sim — 4 alegações disponíveis |
| Vitamina D3 | Sim — 6 alegações disponíveis |
| L-Triptofano | Não — nenhuma alegação no Anexo V |
| L-Teanina | Verificar — não consta no texto consolidado de 2018 |
| Inositol | Verificar — não consta no texto consolidado de 2018 |

### As quantidades: conferido contra a tabela do produto

A primeira versão deste documento pedia essa checagem. Ela foi feita, lendo a
porção de 2 cápsulas em `public/produto-tabela-nutricional.webp`:

| Nutriente | No produto | Piso (Anexo III) | Teto (Anexo IV) | Situação |
|---|---|---|---|---|
| Magnésio | 63 mg | 63 mg | 350 mg | Atende — **margem zero sobre o piso** |
| Niacina B3 | 30 mg | 2,4 mg | 35 mg | Atende — ocupa 86% do teto |
| Vitamina D3 | 50 mcg | 3 mcg | 50 mcg | Atende — **exatamente no teto** |

Os três atendem, então as alegações do Anexo V podem ser usadas. Mas dois estão
encostados num limite, e isso é assunto para o fabricante:

- **O magnésio está exatamente no piso.** Qualquer variação analítica para baixo
  — e variação de lote existe — derruba a alegação de magnésio junto.
- **A vitamina D3 está exatamente no teto.** Qualquer variação para cima
  ultrapassa o máximo permitido, e aí o problema deixa de ser de texto e passa a
  ser de formulação.

---

## 3. Texto novo para "O que tem dentro do pote"

### Magnésio

Mineral presente em centenas de processos do organismo. O magnésio auxilia no
funcionamento muscular e no funcionamento neuromuscular, auxilia no metabolismo
energético e no metabolismo de proteínas, carboidratos e gorduras, e auxilia no
equilíbrio dos eletrólitos.

### Vitamina B3 (Niacina)

A niacina auxilia no metabolismo energético e no metabolismo de proteínas,
carboidratos e gorduras — é ela que participa da conversão do que você come em
energia. Também contribui para a manutenção da pele e auxilia na manutenção das
mucosas.

### Vitamina D3 (Colecalciferol)

A vitamina D auxilia na absorção de cálcio e fósforo e na formação de ossos e
dentes. Além disso, auxilia no funcionamento muscular e no funcionamento do
sistema imune.

### L-Triptofano

Aminoácido essencial: o organismo humano não é capaz de produzi-lo, e por isso ele
precisa vir da alimentação. Está presente em alimentos como ovos, castanhas, leite
e sementes. No Livit, aparece na forma de L-Triptofano de grau alimentício, com
lote rastreável.

### L-Teanina

Componente naturalmente presente nas folhas do chá verde (*Camellia sinensis*), de
onde é extraída. Compõe a fórmula do Livit junto aos demais ativos.

### Inositol

Substância presente naturalmente em alimentos como frutas cítricas e leguminosas,
e também produzida pelo próprio organismo. Integra a composição do Livit.

### Por que os três últimos ficaram sem descrição de função

O Anexo V é uma lista fechada. Alegação que descreve o papel metabólico ou
fisiológico de um constituinte só pode ser veiculada se estiver literalmente
naquela lista — e para aminoácidos como o L-Triptofano não existe nenhuma alegação
autorizada. Não há como reescrever "auxilia na produção de serotonina" de forma
que passe: qualquer menção a rota metabólica é, por definição, alegação funcional.

O que sobra são afirmações puramente descritivas: origem do ingrediente, presença
na alimentação, forma usada na fórmula. É pouco, mas é o que a norma permite.

---

## 4. A rotulagem está mais branda que a norma

O Anexo VI determina que produto contendo aminoácidos traga a advertência:

> "Este produto não deve ser consumido por gestantes, lactantes e crianças."

O site hoje diz que gestantes e lactantes "devem consultar um médico ou
nutricionista". A norma pede **proibição**, não recomendação de consulta. Como a
fórmula tem L-Triptofano, o texto exato acima substitui o atual.

---

## 5. O posicionamento é a maior exposição, não os ingredientes

Ajustar os seis blocos resolve pouco se o H1 continuar "Equilíbrio, sono tranquilo
e mais foco". Essa frase, a descrição que vai em toda meta description e a seção
"Você reconhece isso?" são alegações de saúde mais explícitas do que qualquer
descrição de ativo.

E é exatamente o padrão que faz o Meta reprovar anúncio por **atributo pessoal de
saúde**: criativo que sugere que a pessoa tem uma condição — "você não consegue
dormir?" — é reprovado, e reprovação repetida leva a restrição permanente da conta
de anúncios. Ou seja, a copy atual não bloqueia só a vigilância sanitária: bloqueia
o canal de distribuição que a marca mais vai querer usar.

Direções que preservam apelo sem prometer efeito clínico:

| Direção | Título |
|---|---|
| Nutriente | "Magnésio, vitaminas D3 e B3 e aminoácidos em uma cápsula só" |
| Rotina | "O suplemento que cabe na sua rotina de todo dia" |
| Fórmula aberta | "Fórmula aberta. Seis ativos, nenhuma letra miúda" |
| Ritual | "Duas cápsulas, todo dia, antes de dormir" |

A quarta descreve o modo de uso sem afirmar resultado — o horário dá o contexto
sem que a marca prometa nada.

A `ProblemSection` inteira não tem versão conforme. A premissa dela é descrever
sintomas para o visitante se reconhecer, que é justamente o que a norma e o Meta
proíbem. Ou vira uma seção sobre rotina e hábito, ou sai da página.

---

## 6. Ordem de execução

**Aplicável sem depender de ninguém.** Troca texto de risco por texto descritivo,
então só reduz exposição — não há cenário em que piore:

- itens 4 a 8 (as seis descrições de ativos)
- a advertência da seção 4

**Depende de decisão de marca.** São quatro caminhos possíveis e a escolha é do
dono do produto, não de quem escreve o código:

- itens 1, 2, 3, 9, 10, 11 — posicionamento, H1, meta description, seção de
  problemas e as promessas de resultado

**Depende do fabricante:**

- itens 12 e 14 — prazo de resultado e depoimento em vídeo
- L-Teanina e Inositol constam hoje na lista de constituintes autorizados? Se não
  constarem, o problema deixa de ser de copy e passa a ser de formulação
- as margens de magnésio e vitamina D3 apontadas na seção 2

---

*Este material organiza o que consta no texto da IN 28/2018 e não substitui a
análise de um profissional de assuntos regulatórios. Antes de publicar, vale a
revisão de um consultor regulatório ou do responsável técnico do fabricante.*
