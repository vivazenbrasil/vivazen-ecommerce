import { X, ZoomIn, ZoomOut } from "lucide-react";
import Image, { StaticImageData } from "next/image";
import { MouseEvent, RefObject, useRef, useState } from "react";

interface NutritionalInfoSectionProps {
  tabelaNutricional: StaticImageData;
  nutrientes: { nome: string; descricao: string }[];
}

export default function NutritionalInfoSection({ tabelaNutricional, nutrientes }: NutritionalInfoSectionProps) {
  const [gavetaAtiva, setGavetaAtiva] = useState<number | null>(null);
  const [zoomAtivo, setZoomAtivo] = useState(false);
  const [posicaoLupa, setPosicaoLupa] = useState({ x: 0, y: 0 });
  const [estiloFundo, setEstiloFundo] = useState({});
  const imagemTabelaRef = useRef<HTMLDivElement>(null);

  const ZOOM_LEVEL = 1.5;
  const LUPA_SIZE = 150;

  const [modalAberto, setModalAberto] = useState(false);
  const [zoomModal, setZoomModal] = useState(1);
  const ZOOM_MODAL_MIN = 1;
  const ZOOM_MODAL_MAX = 4;
  const ZOOM_MODAL_PASSO = 0.5;

  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [estaArrastando, setEstaArrastando] = useState(false);
  const ultimaPosicaoRef = useRef({ x: 0, y: 0 });

  const toggleGaveta = (index: number) => {
    setGavetaAtiva(gavetaAtiva === index ? null : index);
  };

  const handleMouseEnter = () => {
    setZoomAtivo(true);
  };

  const handleMouseLeave = () => {
    setZoomAtivo(false);
  };

  const handleMouseMove = (
    e: MouseEvent<HTMLDivElement>,
    ref: RefObject<HTMLDivElement | null>
  ) => {
    if (!ref.current) return;

    const imgRect = ref.current.getBoundingClientRect();

    let x = e.clientX - imgRect.left;
    let y = e.clientY - imgRect.top;

    x = Math.max(0, Math.min(x, imgRect.width));
    y = Math.max(0, Math.min(y, imgRect.height));

    setPosicaoLupa({ x, y });

    const bgWidth = imgRect.width * ZOOM_LEVEL;
    const bgHeight = imgRect.height * ZOOM_LEVEL;
    const bgPosX = -(x * ZOOM_LEVEL - LUPA_SIZE / 2);
    const bgPosY = -(y * ZOOM_LEVEL - LUPA_SIZE / 2);

    setEstiloFundo({
      backgroundSize: `${bgWidth}px ${bgHeight}px`,
      backgroundPosition: `${bgPosX}px ${bgPosY}px`,
    });
  };

  const abrirModal = () => {
    setZoomModal(1);
    setPan({ x: 0, y: 0 });
    setModalAberto(true);
  };

  const fecharModal = () => {
    setModalAberto(false);
    setZoomModal(1);
    setPan({ x: 0, y: 0 });
  };

  const aumentarZoom = () => {
    setZoomModal((z) => Math.min(z + ZOOM_MODAL_PASSO, ZOOM_MODAL_MAX));
  };

  const diminuirZoom = () => {
    setZoomModal((z) => {
      const novoZoom = Math.max(z - ZOOM_MODAL_PASSO, ZOOM_MODAL_MIN);
      if (novoZoom === ZOOM_MODAL_MIN) {
        setPan({ x: 0, y: 0 });
      }
      return novoZoom;
    });
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (zoomModal <= ZOOM_MODAL_MIN) return;
    setEstaArrastando(true);
    ultimaPosicaoRef.current = { x: e.clientX, y: e.clientY };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!estaArrastando) return;

    const dx = e.clientX - ultimaPosicaoRef.current.x;
    const dy = e.clientY - ultimaPosicaoRef.current.y;
    ultimaPosicaoRef.current = { x: e.clientX, y: e.clientY };

    setPan((prev) => ({ x: prev.x + dx, y: prev.y + dy }));
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    setEstaArrastando(false);
    e.currentTarget.releasePointerCapture(e.pointerId);
  };

  return (
    <section className="bg-white py-20 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-green-900 mb-12 text-center">
          Informação Nutricional
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-2">
            <div
              ref={imagemTabelaRef}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onMouseMove={(e) => handleMouseMove(e, imagemTabelaRef)}
              onClick={abrirModal}
              className="relative w-full max-w-none mx-auto cursor-pointer overflow-hidden"
            >
              <Image
                src={tabelaNutricional}
                alt="Tabela Nutricional do produto VivaZen"
                width={800}
                height={550}
                className="w-full h-auto rounded-lg shadow-lg border-4 border-stone-100"
              />
              {zoomAtivo && (
                <div
                  className="absolute pointer-events-none rounded-full border-2 border-white bg-no-repeat shadow-2xl"
                  style={{
                    left: `${posicaoLupa.x - LUPA_SIZE / 2}px`,
                    top: `${posicaoLupa.y - LUPA_SIZE / 2}px`,
                    width: `${LUPA_SIZE}px`,
                    height: `${LUPA_SIZE}px`,
                    backgroundImage: `url(${(tabelaNutricional as StaticImageData).src})`,
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
            {nutrientes.map((nutriente, index) => (
              <div key={index} className="border border-stone-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleGaveta(index)}
                  className="w-full flex justify-between items-center p-5 text-left font-semibold text-lg text-green-900 bg-stone-50 hover:bg-stone-100 transition-colors"
                >
                  <span>{nutriente.nome}</span>
                  <span className={`transform transition-transform duration-300 ${gavetaAtiva === index ? 'rotate-180' : 'rotate-0'}`}>
                    ▼
                  </span>
                </button>
                <div className={`grid transition-all duration-500 ease-in-out ${gavetaAtiva === index ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                  <div className="overflow-hidden">
                    <p className="p-5 pt-0 text-stone-600 font-light">
                      {nutriente.descricao}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {modalAberto && (
        <div onClick={fecharModal} className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/80 p-4">
          <button onClick={fecharModal} className="absolute top-4 right-4 text-white bg-white/10 hover:bg-white/20 rounded-full p-2 transition-colors z-10" aria-label="Fechar">
            <X className="w-6 h-6" />
          </button>

          <div onClick={(e) => e.stopPropagation()} className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 z-10">
            <button onClick={diminuirZoom} disabled={zoomModal <= ZOOM_MODAL_MIN} className="text-white bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed rounded-full p-2 transition-colors" aria-label="Diminuir zoom">
              <ZoomOut className="w-5 h-5" />
            </button>
            <span className="text-white text-sm font-medium w-12 text-center select-none">
              {Math.round(zoomModal * 100)}%
            </span>
            <button onClick={aumentarZoom} disabled={zoomModal >= ZOOM_MODAL_MAX} className="text-white bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed rounded-full p-2 transition-colors" aria-label="Aumentar zoom">
              <ZoomIn className="w-5 h-5" />
            </button>
          </div>

          <div
            onClick={(e) => e.stopPropagation()}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
            className="relative w-full max-w-3xl flex items-center justify-center overflow-hidden select-none"
            style={{
              maxHeight: '75vh',
              touchAction: 'none',
              cursor: zoomModal > ZOOM_MODAL_MIN ? (estaArrastando ? 'grabbing' : 'grab') : 'default',
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
                alt="Tabela Nutricional do produto VivaZen (ampliada)"
                width={1200}
                height={825}
                className="w-full h-auto rounded-lg pointer-events-none"
                draggable={false}
              />
            </div>
          </div>

          {zoomModal > ZOOM_MODAL_MIN && (
            <p className="absolute top-4 left-4 text-white/70 text-xs">
              Arraste para mover
            </p>
          )}
        </div>
      )}
    </section>
  );
}