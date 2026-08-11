import { produto, site } from '@/lib/site'

const mensagem = encodeURIComponent(
  `Olá! Vi o site da ${site.nome} e queria saber mais sobre o ${produto.nome}.`,
)

export default function WhatsAppFloat() {
  return (
    <a
      href={`https://wa.me/${site.contato.whatsapp}?text=${mensagem}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar com a VivaZen no WhatsApp"
      className="fixed right-5 bottom-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105 focus-visible:ring-4 focus-visible:ring-[#25D366]/40 focus-visible:outline-none"
    >
      {/* Ícone oficial do WhatsApp (lucide não inclui marcas) */}
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7" aria-hidden="true">
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21 5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2m0 1.67c4.55 0 8.24 3.7 8.24 8.24s-3.69 8.25-8.24 8.25c-1.53 0-3.03-.43-4.32-1.23l-.31-.19-3.2.84.85-3.12-.2-.32a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m-3.6 4.15c-.17 0-.44.06-.68.31s-.9.88-.9 2.15c0 1.26.92 2.48 1.05 2.65.13.17 1.79 2.85 4.33 3.88 2.11.86 2.54.69 3 .64.46-.04 1.48-.6 1.69-1.19.21-.58.21-1.08.15-1.19-.06-.1-.23-.16-.48-.29-.25-.12-1.48-.73-1.71-.81-.23-.09-.4-.13-.56.12-.17.25-.65.83-.8 1-.15.17-.29.19-.54.06-.25-.12-1.06-.39-2.02-1.24-.75-.66-1.25-1.48-1.4-1.73-.15-.25-.02-.38.1-.51.11-.11.25-.29.38-.44.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.44-.06-.12-.56-1.37-.77-1.87-.2-.49-.4-.42-.55-.43z" />
      </svg>
    </a>
  )
}
