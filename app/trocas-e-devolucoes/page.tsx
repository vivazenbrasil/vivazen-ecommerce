import LegalPage, { LegalSection } from '@/components/layout/LegalPage'
import { entrega, garantia, site } from '@/lib/site'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Trocas e Devoluções',
  description: `Política de trocas, devoluções e reembolso da ${site.nome}, incluindo o direito de arrependimento de 7 dias.`,
  alternates: { canonical: '/trocas-e-devolucoes' },
}

export default function TrocasEDevolucoes() {
  return (
    <LegalPage titulo="Trocas e Devoluções" atualizadoEm="agosto de 2026">
      <LegalSection titulo="1. Direito de arrependimento (7 dias)">
        <p>{garantia.avisoCdc}</p>
        <p>
          Nesse caso, o produto deve ser devolvido preferencialmente na embalagem
          original. Os custos de devolução por arrependimento correm por nossa
          conta, conforme entendimento consolidado do CDC.
        </p>
      </LegalSection>

      <LegalSection titulo="2. Garantia de satisfação">
        <p>
          {garantia.dias > 0
            ? `Além do direito legal acima, oferecemos garantia de satisfação de ${garantia.dias} dias contados do recebimento do produto. Se você não sentir diferença, devolvemos o valor integral da compra.`
            : 'Além do direito legal acima, oferecemos garantia de satisfação. Se você não sentir diferença, devolvemos o valor integral da compra. [CONFIRMAR o prazo em dias e atualizar lib/site.ts]'}
        </p>
      </LegalSection>

      <LegalSection titulo="3. Produto com defeito ou avaria no transporte">
        <p>
          Se o produto chegar violado, avariado ou com o lacre rompido, recuse a
          entrega ou nos comunique em até 7 dias corridos, com fotos da embalagem e
          do produto. Providenciamos a substituição sem custo ou o reembolso
          integral, à sua escolha.
        </p>
        <p>
          Para vício do produto, o prazo legal de reclamação é de 30 dias para
          produtos não duráveis, conforme o art. 26 do CDC.
        </p>
      </LegalSection>

      <LegalSection titulo="4. Como solicitar">
        <ol className="list-decimal space-y-2 pl-5">
          {garantia.comoSolicitar.map((passo) => (
            <li key={passo}>{passo}</li>
          ))}
        </ol>
      </LegalSection>

      <LegalSection titulo="5. Prazo de reembolso">
        <p>
          Após a aprovação da solicitação, o estorno é processado pela plataforma de
          pagamento. Em compras no cartão de crédito, o valor pode aparecer na
          fatura seguinte, de acordo com o prazo da administradora. Em compras via
          PIX ou boleto, o valor é devolvido na conta bancária informada.
        </p>
      </LegalSection>

      <LegalSection titulo="6. Pedido não entregue ou extraviado">
        <p>
          {entrega.rastreio} Se o rastreio ficar parado ou a entrega não se
          concretizar, fale com a gente: abrimos a reclamação junto à transportadora
          e, confirmado o extravio, reenviamos o pedido ou reembolsamos o valor
          integral.
        </p>
      </LegalSection>

      <LegalSection titulo="7. Contato">
        <p>
          WhatsApp {site.contato.whatsappExibicao} ou{' '}
          <a
            href={`mailto:${site.contato.email}`}
            className="text-clay font-medium underline decoration-2 underline-offset-4"
          >
            {site.contato.email}
          </a>
          . Atendimento de segunda a sexta, em horário comercial.
        </p>
      </LegalSection>
    </LegalPage>
  )
}
