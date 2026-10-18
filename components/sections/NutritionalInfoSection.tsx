'use client'

import SectionHeading from '@/components/ui/SectionHeading'
import { nutrientes, produto } from '@/lib/site'
import tabelaNutricional from '@/public/produto-tabela-nutricional.webp'
import { ChevronDown, X, ZoomIn, ZoomOut } from 'lucide-react'
import Image from 'next/image'
import { MouseEvent, RefObject, useEffect, useRef, useState } from 'react'

const ZOOM_LEVEL = 1.5
const LUPA_SIZE = 150
const ZOOM_MODAL_MIN = 1
const ZOOM_MODAL_MAX = 4
const ZOOM_MODAL_PASSO = 0.5

export default function NutritionalInfoSection() {
  const [gavetaAtiva, setGavetaAtiva] = useState<number | null>(null)
  const [zoomAtivo, setZoomAtivo] = useState(false)
  const [posicaoLupa, setPosicaoLupa] = useState({ x: 0, y: 0 })
  const [estiloFundo, setEstiloFundo] = useState({})
  const imagemTabelaRef = useRef<HTMLDivElement>(null)

  const [modalAberto, setModalAberto] = useState(false)
  const [zoomModal, setZoomModal] = useState(1)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const [estaArrastando, setEstaArrastando] = useState(false)
  const ultimaPosicaoRef = useRef({ x: 0, y: 0 })

  const toggleGaveta = (index: number) => {
    setGavetaAtiva(gavetaAtiva === index ? null : index)
  }

  const handleMouseMove = (
    e: MouseEvent<HTMLDivElement>,
    ref: RefObject<HTMLDivElement | null>,
  ) => {
    if (!ref.current) return

    const imgRect = ref.current.getBoundingClientRect()

    let x = e.clientX - imgRect.left
    let y = e.clientY - imgRect.top

    x = Math.max(0, Math.min(x, imgRect.width))
    y = Math.max(0, Math.min(y, imgRect.height))

    setPosicaoLupa({ x, y })

    setEstiloFundo({
      backgroundSize: `${imgRect.width * ZOOM_LEVEL}px ${imgRect.height * ZOOM_LEVEL}px`,
      backgroundPosition: `${-(x * ZOOM_LEVEL - LUPA_SIZE / 2)}px ${-(y * ZOOM_LEVEL - LUPA_SIZE / 2)}px`,
    })
  }

  const abrirModal = () => {
    setZoomModal(1)
    setPan({ x: 0, y: 0 })
    setModalAberto(true)
  }

  const fecharModal = () => {
    setModalAberto(false)
    setZoomModal(1)
    setPan({ x: 0, y: 0 })
  }

  // Fecha no Esc e trava o scroll do body enquanto o modal está aberto
  useEffect(() => {
    if (!modalAberto) return

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') fecharModal()
    }

    window.addEventListener('keydown', onKeyDown)
    const overflowAnterior = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      window.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = overflowAnterior
    }
  }, [modalAberto])

  const aumentarZoom = () =>
    setZoomModal((z) => Math.min(z + ZOOM_MODAL_PASSO, ZOOM_MODAL_MAX))

  const diminuirZoom = () =>
    setZoomModal((z) => {
      const novoZoom = Math.max(z - ZOOM_MODAL_PASSO, ZOOM_MODAL_MIN)
      if (novoZoom === ZOOM_MODAL_MIN) setPan({ x: 0, y: 0 })
      return novoZoom
    })

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (zoomModal <= ZOOM_MODAL_MIN) return
    setEstaArrastando(true)
    ultimaPosicaoRef.current = { x: e.clientX, y: e.clientY }
    e.currentTarget.setPointerCapture(e.pointerId)
  }

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!estaArrastando) return

    const dx = e.clientX - ultimaPosicaoRef.current.x
    const dy = e.clientY - ultimaPosicaoRef.current.y
    ultimaPosicaoRef.current = { x: e.clientX, y: e.clientY }

    setPan((prev) => ({ x: prev.x + dx, y: prev.y + dy }))
  }

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    setEstaArrastando(false)
    e.currentTarget.releasePointerCapture(e.pointerId)
  }

  return (
    <section id="composicao" className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Composição"
          titulo="O que tem dentro do pote"
          descricao="Fórmula aberta, sem letra miúda. Passe o mouse na tabela para ampliar ou toque para ver em tela cheia."
        />

        <div className="mt-16 grid grid-cols-1 items-start gap-12 md:grid-cols-2">
          <div className="space-y-2">
            <div
              ref={imagemTabelaRef}
              onMouseEnter={() => setZoomAtivo(true)}
              onMouseLeave={() => setZoomAtivo(false)}
              onMouseMove={(e) => handleMouseMove(e, imagemTabelaRef)}
              onClick={abrirModal}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  abrirModal()
                }
              }}
              aria-label="Ampliar tabela nutricional"
              className="focus-visible:ring-clay/50 relative mx-auto w-full cursor-pointer overflow-hidden rounded-xl focus-visible:ring-4 focus-visible:outline-none"
            >
              {/*
                Sem width/height fixos: o import estático já traz a dimensão real
                (1122x1402). Estava declarado 800x550, proporção 1.45 contra os
                0.80 reais, e o navegador reservava uma caixa deitada para depois
                pular para a em pé quando a imagem carregava.
              */}
              <Image
                src={tabelaNutricional}
                alt={`Tabela nutricional do suplemento ${produto.nome}`}
                sizes="(max-width: 768px) 90vw, 500px"
                className="border-sand/60 h-auto w-full rounded-xl border-4 shadow-lg"
              />
              {zoomAtivo && (
                <div
                  className="pointer-events-none absolute rounded-full border-2 border-white bg-no-repeat shadow-2xl"
                  style={{
                    left: `${posicaoLupa.x - LUPA_SIZE / 2}px`,
                    top: `${posicaoLupa.y - LUPA_SIZE / 2}px`,
                    width: `${LUPA_SIZE}px`,
                    height: `${LUPA_SIZE}px`,
                    backgroundImage: `url(${tabelaNutricional.src})`,
                    ...estiloFundo,
                  }}
                />
              )}
            </div>
            <p className="text-center text-sm text-stone-500 md:hidden">
              Toque na imagem para ampliar
            </p>
          </div>

          <div className="space-y-3">
            {nutrientes.map((nutriente, index) => {
              const estaAberta = gavetaAtiva === index
              return (
                <div
                  key={nutriente.nome}
                  className="border-sand overflow-hidden rounded-xl border bg-white"
                >
                  <h3>
                    <button
                      type="button"
                      onClick={() => toggleGaveta(index)}
                      aria-expanded={estaAberta}
                      aria-controls={`nutriente-${index}`}
                      className="hover:bg-cream/60 text-forest flex w-full items-center justify-between gap-4 p-5 text-left font-semibold transition-colors"
                    >
                      <span>{nutriente.nome}</span>
                      <ChevronDown
                        className={`text-clay h-5 w-5 shrink-0 transition-transform duration-300 ${
                          estaAberta ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                  </h3>
                  <div
                    id={`nutriente-${index}`}
                    role="region"
                    className={`grid transition-all duration-500 ease-in-out ${
                      estaAberta ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="p-5 pt-0 leading-relaxed text-stone-600">
                        {nutriente.descricao}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {modalAberto && (
        <div
          onClick={fecharModal}
          role="dialog"
          aria-modal="true"
          aria-label="Tabela nutricional ampliada"
          className="fixed inset-0 z-60 flex flex-col items-center justify-center bg-black/85 p-4"
        >
          <button
            onClick={fecharModal}
            autoFocus
            className="absolute top-4 right-4 z-10 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
            aria-label="Fechar"
          >
            <X className="h-6 w-6" />
          </button>

          <div
            onClick={(e) => e.stopPropagation()}
            className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 items-center gap-3 rounded-full bg-white/10 px-4 py-2 backdrop-blur-sm"
          >
            <button
              onClick={diminuirZoom}
              disabled={zoomModal <= ZOOM_MODAL_MIN}
              className="rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-30"
              aria-label="Diminuir zoom"
            >
              <ZoomOut className="h-5 w-5" />
            </button>
            <span className="w-12 text-center text-sm font-medium text-white select-none">
              {Math.round(zoomModal * 100)}%
            </span>
            <button
              onClick={aumentarZoom}
              disabled={zoomModal >= ZOOM_MODAL_MAX}
              className="rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-30"
              aria-label="Aumentar zoom"
            >
              <ZoomIn className="h-5 w-5" />
            </button>
          </div>

          <div
            onClick={(e) => e.stopPropagation()}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
            className="relative flex w-full max-w-3xl items-center justify-center overflow-hidden select-none"
            style={{
              maxHeight: '75vh',
              touchAction: 'none',
              cursor:
                zoomModal > ZOOM_MODAL_MIN
                  ? estaArrastando
                    ? 'grabbing'
                    : 'grab'
                  : 'default',
            }}
          >
            <div
              style={{
                transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoomModal})`,
                transition: estaArrastando ? 'none' : 'transform 0.2s ease-out',
              }}
            >
              <Image
                src={tabelaNutricional}
                alt={`Tabela nutricional do suplemento ${produto.nome} (ampliada)`}
                sizes="(max-width: 768px) 95vw, 768px"
                className="pointer-events-none h-auto w-full rounded-lg"
                draggable={false}
              />
            </div>
          </div>

          {zoomModal > ZOOM_MODAL_MIN && (
            <p className="absolute top-4 left-4 text-xs text-white/70">
              Arraste para mover
            </p>
          )}
        </div>
      )}
    </section>
  )
}
