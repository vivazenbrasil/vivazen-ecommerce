import LegalPage, { LegalSection } from '@/components/layout/LegalPage'
import { produto, site } from '@/lib/site'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Termos de Uso',
  description: `Condições de uso do site da ${site.nome} e regras aplicáveis às compras realizadas através dele.`,
  alternates: { canonical: '/termos-de-uso' },
}

export default function TermosDeUso() {
  return (
    <LegalPage titulo="Termos de Uso" atualizadoEm="agosto de 2026">
      <LegalSection titulo="1. Aceitação">
        <p>
          Ao acessar e navegar pelo site {site.url}, você concorda com estes Termos
          de Uso. Se não concordar com alguma condição, pedimos que não utilize o
          site.
        </p>
      </LegalSection>

      <LegalSection titulo="2. Sobre o site e o produto">
        <p>
          Este site é operado por {site.empresa.razaoSocial || '[RAZÃO SOCIAL]'},
          CNPJ {site.empresa.cnpj || '[CNPJ]'}, e tem finalidade informativa e
          comercial. O {produto.nome} é um suplemento alimentar.
        </p>
        <p className="border-clay/25 bg-clay/5 rounded-lg border p-4 text-sm">
          {produto.avisoAnvisa}
        </p>
      </LegalSection>

      <LegalSection titulo="3. Conteúdo informativo, não orientação médica">
        <p>
          As informações publicadas aqui têm caráter educativo e não constituem
          consulta, diagnóstico ou prescrição. Elas não substituem a avaliação de um
          médico, nutricionista ou outro profissional de saúde habilitado. Resultados
          podem variar de pessoa para pessoa.
        </p>
      </LegalSection>

      <LegalSection titulo="4. Compras e pagamento">
        <p>
          As compras são processadas pela plataforma Braip, em ambiente próprio dela.
          Ao clicar nos botões de compra, você é direcionado ao checkout da Braip e
          passa a estar sujeito também aos termos e à política de privacidade dessa
          plataforma.
        </p>
        <p>
          Preços, condições de parcelamento e disponibilidade podem ser alterados sem
          aviso prévio. O valor válido é sempre o exibido no checkout no momento da
          finalização da compra.
        </p>
      </LegalSection>

      <LegalSection titulo="5. Propriedade intelectual">
        <p>
          A marca {site.nome}, os textos, as imagens, o layout e os demais elementos
          deste site são protegidos por direitos autorais e de marca. É vedada a
          reprodução, total ou parcial, sem autorização prévia por escrito.
        </p>
      </LegalSection>

      <LegalSection titulo="6. Uso adequado">
        <p>
          Você se compromete a não utilizar o site para fins ilícitos, não tentar
          obter acesso não autorizado aos nossos sistemas e não empregar meios
          automatizados de coleta de dados sem a nossa autorização.
        </p>
      </LegalSection>

      <LegalSection titulo="7. Limitação de responsabilidade">
        <p>
          Empregamos esforços para manter o site disponível e as informações
          corretas e atualizadas, mas não garantimos operação ininterrupta ou livre
          de erros. Não nos responsabilizamos por danos decorrentes do uso do produto
          em desacordo com as instruções do rótulo e as advertências publicadas.
        </p>
      </LegalSection>

      <LegalSection titulo="8. Legislação e foro">
        <p>
          Estes Termos são regidos pelas leis brasileiras. Eventuais controvérsias
          serão dirimidas no foro do domicílio do consumidor, conforme o Código de
          Defesa do Consumidor.
        </p>
      </LegalSection>

      <LegalSection titulo="9. Contato">
        <p>
          Dúvidas sobre estes Termos:{' '}
          <a
            href={`mailto:${site.contato.email}`}
            className="text-clay font-medium underline decoration-2 underline-offset-4"
          >
            {site.contato.email}
          </a>{' '}
          ou WhatsApp {site.contato.whatsappExibicao}.
        </p>
      </LegalSection>
    </LegalPage>
  )
}
