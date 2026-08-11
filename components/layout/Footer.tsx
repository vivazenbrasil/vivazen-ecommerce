import { produto, site } from '@/lib/site'
import { Leaf, Mail, Smartphone } from 'lucide-react'
import Link from 'next/link'

const navegacao = [
  { href: '/#produto', label: 'O Produto' },
  { href: '/#modo-de-uso', label: 'Modo de Uso' },
  { href: '/#entrega', label: 'Entrega e Frete' },
  { href: '/#garantia', label: 'Garantia' },
  { href: '/#faq', label: 'Dúvidas Frequentes' },
  { href: '/sobre', label: 'A Empresa' },
]

const legal = [
  { href: '/politica-de-privacidade', label: 'Política de Privacidade' },
  { href: '/termos-de-uso', label: 'Termos de Uso' },
  { href: '/trocas-e-devolucoes', label: 'Trocas e Devoluções' },
]

export default function Footer() {
  return (
    <footer className="bg-forest text-cream/80">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="text-cream mb-4 flex items-center gap-2">
              <Leaf className="h-6 w-6" />
              <span className="text-xl font-bold tracking-tighter">{site.nome}</span>
            </div>
            <p className="max-w-sm text-sm leading-relaxed">
              {site.tagline}. Produtos naturais com qualidade e cuidado para sua
              saúde e bem-estar.
            </p>

            <ul className="mt-6 flex flex-col gap-3 text-sm">
              <li>
                <a
                  href={`mailto:${site.contato.email}`}
                  className="hover:text-cream flex items-center gap-2 transition-colors"
                >
                  <Mail className="text-clay-soft h-4 w-4 shrink-0" />
                  {site.contato.email}
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${site.contato.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-cream flex items-center gap-2 transition-colors"
                >
                  <Smartphone className="text-clay-soft h-4 w-4 shrink-0" />
                  WhatsApp: {site.contato.whatsappExibicao}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-cream mb-4 text-sm font-semibold tracking-wide uppercase">
              Navegação
            </h4>
            <ul className="flex flex-col gap-2.5 text-sm">
              {navegacao.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-cream transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-cream mb-4 text-sm font-semibold tracking-wide uppercase">
              Institucional
            </h4>
            <ul className="flex flex-col gap-2.5 text-sm">
              {legal.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-cream transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Aviso legal obrigatório para suplementos */}
        <div className="border-cream/15 mt-12 border-t pt-8">
          <p className="text-cream/60 max-w-4xl text-xs leading-relaxed">
            {produto.avisoAnvisa}
            {produto.registroAnvisa && ` Registro/Notificação ANVISA nº ${produto.registroAnvisa}.`}
          </p>
          <p className="text-cream/60 mt-3 text-xs leading-relaxed">
            As informações deste site têm caráter informativo e não substituem a
            orientação de um médico ou nutricionista. Resultados podem variar de
            pessoa para pessoa.
          </p>
        </div>

        <div className="border-cream/15 text-cream/60 mt-8 flex flex-col gap-2 border-t pt-8 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.nome}. Todos os direitos reservados.
          </p>
          {(site.empresa.razaoSocial || site.empresa.cnpj) && (
            <p>
              {site.empresa.razaoSocial}
              {site.empresa.razaoSocial && site.empresa.cnpj && ' — '}
              {site.empresa.cnpj && `CNPJ ${site.empresa.cnpj}`}
            </p>
          )}
        </div>
      </div>
    </footer>
  )
}
