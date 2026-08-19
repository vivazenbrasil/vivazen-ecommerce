import AboutSection from '@/components/sections/AboutSection'
import FaqSection from '@/components/sections/FaqSection'
import FinalCtaSection from '@/components/sections/FinalCtaSection'
import GuaranteeSection from '@/components/sections/GuaranteeSection'
import HeroSection from '@/components/sections/HeroSection'
import HowToUseSection from '@/components/sections/HowToUseSection'
import NutritionalInfoSection from '@/components/sections/NutritionalInfoSection'
import OffersSection from '@/components/sections/OffersSection'
import ProblemSection from '@/components/sections/ProblemSection'
import ProductHighlightSection from '@/components/sections/ProductHighlightSection'
import ShippingSection from '@/components/sections/ShippingSection'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
import VideoSection from '@/components/sections/VideoSection'
import WarningsSection from '@/components/sections/WarningsSection'

export default function Home() {
  return (
    <>
      <HeroSection />
      {/* Logo abaixo do hero de propósito: quem chega por anúncio ou link de
          WhatsApp já vem com intenção de compra, e a oferta é o que ele veio
          ver. Some sozinha enquanto não houver kit configurado em lib/site.ts. */}
      <OffersSection />
      {/* Depois das ofertas, com o botão apontando de volta para elas. Se você
          preferir que o vídeo apresente o produto ANTES do preço, basta mover
          esta linha para cima de <OffersSection /> — aí o botão dele passa a
          levar o visitante para frente, que é uma leitura ainda melhor. */}
      <VideoSection />
      <AboutSection />
      {/* Logo depois do "Quem somos": a pessoa acabou de ler quem é a marca e
         a próxima voz que ela ouve é a de outra cliente, não a da empresa. É
         o ponto em que prova social pesa mais. Some sozinha se não houver
         depoimento cadastrado. */}
      <TestimonialsSection />
      <ProblemSection />
      <ProductHighlightSection />
      <NutritionalInfoSection />
      <HowToUseSection />
      <WarningsSection />
      <ShippingSection />
      <GuaranteeSection />
      <FaqSection />
      <FinalCtaSection />
    </>
  )
}
