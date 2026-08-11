import AboutSection from '@/components/sections/AboutSection'
import FaqSection from '@/components/sections/FaqSection'
import FinalCtaSection from '@/components/sections/FinalCtaSection'
import GuaranteeSection from '@/components/sections/GuaranteeSection'
import HeroSection from '@/components/sections/HeroSection'
import HowToUseSection from '@/components/sections/HowToUseSection'
import NutritionalInfoSection from '@/components/sections/NutritionalInfoSection'
import ProblemSection from '@/components/sections/ProblemSection'
import ProductHighlightSection from '@/components/sections/ProductHighlightSection'
import ShippingSection from '@/components/sections/ShippingSection'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
import WarningsSection from '@/components/sections/WarningsSection'

export default function Home() {
  return (
    <>
      <HeroSection />
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
