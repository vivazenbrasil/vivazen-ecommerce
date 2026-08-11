import LegalPage, { LegalSection } from '@/components/layout/LegalPage'
import { site } from '@/lib/site'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Política de Privacidade',
  description: `Como a ${site.nome} coleta, usa e protege os seus dados pessoais, em conformidade com a LGPD.`,
  alternates: { canonical: '/politica-de-privacidade' },
  robots: { index: true, follow: true },
}

export default function PoliticaDePrivacidade() {
  return (
    <LegalPage titulo="Política de Privacidade" atualizadoEm="agosto de 2026">
      <LegalSection titulo="1. Quem somos">
        <p>
          {site.empresa.razaoSocial || '[RAZÃO SOCIAL]'}, inscrita no CNPJ sob o
          nº {site.empresa.cnpj || '[CNPJ]'}, opera o site {site.url} e é a
          controladora dos dados pessoais tratados aqui, nos termos da Lei nº
          13.709/2018 (LGPD).
        </p>
      </LegalSection>

      <LegalSection titulo="2. Quais dados coletamos">
        <p>
          <strong>Dados que você nos fornece:</strong> nome, e-mail e telefone,
          quando você entra em contato conosco por WhatsApp ou e-mail.
        </p>
        <p>
          <strong>Dados de navegação:</strong> endereço IP, tipo de dispositivo,
          navegador, páginas visitadas e origem do acesso, coletados
          automaticamente por cookies e ferramentas de análise.
        </p>
        <p>
          <strong>Dados de compra:</strong> os dados de pagamento e de entrega são
          coletados e tratados diretamente pela Braip, nossa processadora de
          pagamentos. Nós não temos acesso ao número do seu cartão de crédito.
        </p>
      </LegalSection>

      <LegalSection titulo="3. Para que usamos os seus dados">
        <ul className="list-disc space-y-2 pl-5">
          <li>Responder às suas dúvidas e prestar atendimento;</li>
          <li>Processar e entregar os seus pedidos;</li>
          <li>Cumprir obrigações legais e fiscais;</li>
          <li>Entender como o site é usado e melhorar a experiência;</li>
          <li>
            Enviar comunicações sobre produtos e promoções, quando você autorizar.
          </li>
        </ul>
      </LegalSection>

      <LegalSection titulo="4. Com quem compartilhamos">
        <p>
          Compartilhamos dados apenas com quem é necessário para a operação:
          plataforma de pagamento (Braip), transportadoras e Correios para a
          entrega, e ferramentas de análise de tráfego. Não vendemos os seus dados
          pessoais a terceiros.
        </p>
      </LegalSection>

      <LegalSection titulo="5. Cookies">
        <p>
          Usamos cookies necessários ao funcionamento do site e cookies de análise,
          que nos ajudam a entender o comportamento de navegação de forma agregada.
          Você pode bloquear ou apagar cookies nas configurações do seu navegador,
          ciente de que isso pode afetar o funcionamento de algumas partes do site.
        </p>
      </LegalSection>

      <LegalSection titulo="6. Por quanto tempo guardamos">
        <p>
          Mantemos os dados pelo tempo necessário para as finalidades descritas
          acima e para o cumprimento de obrigações legais — em regra, cinco anos
          para registros de compra, conforme a legislação fiscal e consumerista.
        </p>
      </LegalSection>

      <LegalSection titulo="7. Os seus direitos">
        <p>
          A LGPD garante a você o direito de confirmar a existência de tratamento,
          acessar, corrigir, anonimizar, portar ou eliminar os seus dados, revogar
          consentimento e obter informação sobre os terceiros com quem
          compartilhamos dados.
        </p>
        <p>
          Para exercer qualquer um desses direitos, escreva para{' '}
          <a
            href={`mailto:${site.contato.email}`}
            className="text-clay font-medium underline decoration-2 underline-offset-4"
          >
            {site.contato.email}
          </a>
          . Respondemos em até 15 dias.
        </p>
      </LegalSection>

      <LegalSection titulo="8. Segurança">
        <p>
          Adotamos medidas técnicas e administrativas para proteger os seus dados
          contra acesso não autorizado, perda ou destruição. Ainda assim, nenhum
          sistema é totalmente imune, e nos comprometemos a comunicar você e a ANPD
          caso ocorra um incidente de segurança relevante.
        </p>
      </LegalSection>

      <LegalSection titulo="9. Alterações desta política">
        <p>
          Podemos atualizar esta política a qualquer momento. A data da última
          atualização está indicada no topo desta página. Mudanças relevantes serão
          comunicadas pelos nossos canais de contato.
        </p>
      </LegalSection>
    </LegalPage>
  )
}
