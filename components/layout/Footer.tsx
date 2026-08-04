import { Leaf, Mail, MapPin, Smartphone } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-stone-100 border-t border-stone-200 px-2">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-5 text-center md:text-left">
        <div>
          <div className="flex items-center justify-center md:justify-start gap-2 text-green-800 mb-4 opacity-80">
            <Leaf className="w-6 h-6" />
            <span className="text-xl font-bold tracking-tighter">VivaZen</span>
          </div>
          <p className="text-sm text-stone-500 leading-relaxed max-w-sm mx-auto md:mx-0">
            A natureza em sua forma mais pura. Produtos naturais com qualidade e cuidado para sua saúde e bem-estar.
          </p>
        </div>

        <div>
          <h4 className="text-stone-800 font-semibold mb-4">Contato</h4>
          <ul className="flex flex-col gap-3 text-sm text-stone-600 items-center md:items-start">
            <li className="flex items-center gap-2"><Mail className="w-4 h-4 text-green-700" /> contato@vivazenbrasil@gmail.com</li>
            <li className="flex items-center gap-2"><Smartphone className="w-4 h-4 text-green-700" /> WhatsApp: (19)98333-3168</li>
          </ul>
        </div>
      </div>

      <div className="max-w-6xl mx-auto border-t border-stone-200 mt-2 pt-8 pb-8 text-center text-sm text-stone-500">
        © 2026 VivaZen. Todos os direitos reservados.
      </div>
    </footer>
  )
}