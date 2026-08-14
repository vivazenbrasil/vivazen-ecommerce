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
import WarningsSection from '@/components/sections/WarningsSection'

export default function Home() {
  return (
    <>
      <HeroSection />
      {/* Logo abaixo do hero de propósito: quem chega por anúncio ou link de
          WhatsApp já vem com intenção de compra, e a oferta é o que ele veio
          ver. Some sozinha enquanto não houver kit configurado em lib/site.ts. */}
      <OffersSection />
      <AboutSection />
      <ProblemSection />
      <ProductHighlightSection />
      <NutritionalInfoSection />
      <HowToUseSection />
      <WarningsSection />
      <ShippingSection />
      <GuaranteeSection />
      <TestimonialsSection />
      <FaqSection />
      <FinalCtaSection />
    </>
  )
}
