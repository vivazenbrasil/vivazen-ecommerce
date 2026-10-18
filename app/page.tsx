import AboutSection from '@/components/sections/AboutSection'
import FaqSection from '@/components/sections/FaqSection'
import FinalCtaSection from '@/components/sections/FinalCtaSection'
import GuaranteeSection from '@/components/sections/GuaranteeSection'
import HeroSection from '@/components/sections/HeroSection'
import HowToUseSection from '@/components/sections/HowToUseSection'
import NutritionalInfoSection from '@/components/sections/NutritionalInfoSection'
import OffersSection from '@/components/sections/OffersSection'
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
          WhatsApp já vem com intenção, e a oferta é o que veio ver. */}
      <OffersSection />
      {/* Depois das ofertas, com o botão apontando de volta para elas. Para o
          vídeo apresentar o produto ANTES do preço, é só subir esta linha acima
          de <OffersSection /> — aí o botão passa a levar para frente. */}
      <VideoSection />
      <AboutSection />
      {/* Logo depois do "Quem somos": a próxima voz que a pessoa ouve é a de
         outra cliente, não a da empresa.*/}
      <TestimonialsSection />
      {/*
        SEÇÃO DE PROBLEMAS — fora do ar, e não por engano.

        Ela descrevia sintomas para o visitante se reconhecer ("Vira e mexe na
        cama", "Acorda já sem energia"). É a parte do site com maior exposição
        regulatória e não existe versão que passe: a premissa é afirmar que a
        pessoa tem uma condição, o que a IN 28/2018 não permite para suplemento e
        o Meta reprova como atributo pessoal de saúde — e reprovação repetida
        leva a restrição permanente da conta de anúncios.

        O arquivo segue em components/sections/, nada foi apagado. Descomente
        para devolver. Ver livit-copy-conforme-in28.md, seção 5.
      */}
      {/* <ProblemSection /> */}
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
