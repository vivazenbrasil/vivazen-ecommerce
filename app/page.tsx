'use client'

import tabelaNutricional from '@/public/tabelinha.png';
import AboutSection from './AboutSection';
import HeroSection from './HeroSection';
import NutritionalInfoSection from './NutritionalInfoSection';
import ProductHighlightSection from './ProductHighlightSection';

export default function Home() {
  const linktreeUrl = "https://linktr.ee/vivazenbrasil";
  
  const nutrientes = [
    {
      nome: 'L-Triptofano',
      descricao: 'Aminoácido essencial que auxilia na produção de serotonina, um neurotransmissor que regula o humor, o sono e o apetite. Ajuda a combater o estresse e a ansiedade.'
    },
    {
      nome: 'L-Teanina',
      descricao: 'Encontrada no chá verde, a L-Teanina promove relaxamento sem causar sonolência. Melhora o foco, a concentração e reduz a sensação de estresse.'
    },
    {
      nome: 'Magnésio',
      descricao: 'Mineral crucial para mais de 300 reações bioquímicas no corpo. Auxilia na função muscular e nervosa, regula a pressão arterial e contribui para a saúde óssea.'
    },
    {
      nome: 'Vitamina B3 (Niacina)',
      descricao: 'Essencial para o metabolismo energético, ajuda a converter alimentos em energia. Contribui para a saúde da pele, do sistema nervoso e para a regulação do colesterol.'
    },
    {
      nome: 'Inositol',
      descricao: 'Componente do complexo B, o Inositol desempenha um papel na comunicação celular e na resposta à insulina, auxiliando no equilíbrio hormonal e no bem-estar mental.'
    },
    {
      nome: 'Vitamina D3 (Colecalciferol)',
      descricao: 'Fundamental para a absorção de cálcio e fósforo, fortalecendo ossos e dentes. Também desempenha um papel vital no funcionamento do sistema imunológico e muscular.'
    }
  ];

  return (
    <>
      <HeroSection linktreeUrl={linktreeUrl} />
      <AboutSection />
      <ProductHighlightSection linktreeUrl={linktreeUrl} />
      <NutritionalInfoSection tabelaNutricional={tabelaNutricional} nutrientes={nutrientes} />
    </>
  );
}