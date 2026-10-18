
"use client";

import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

const PIXEL_ID = "1019321557849084";
const CONSENT_KEY = "vivazen-cookie-consent";

type Consent = "accepted" | "rejected" | null;

type FbqFunction = ((...args: unknown[]) => void) & {
  callMethod?: (...args: unknown[]) => void;
  queue: unknown[][];
  push: FbqFunction;
  loaded: boolean;
  version: string;
};

declare global {
  interface Window {
    fbq?: FbqFunction;
    _fbq?: FbqFunction;
    __metaPixelInitialized?: boolean;
  }
}

function initializePixel() {
  if (!window.fbq) {
    const fbq = function (...args: unknown[]) {
      if (fbq.callMethod) {
        fbq.callMethod(...args);
      } else {
        fbq.queue.push(args);
      }
    } as FbqFunction;

    fbq.queue = [];
    fbq.push = fbq;
    fbq.loaded = true;
    fbq.version = "2.0";

    window.fbq = fbq;
    window._fbq = fbq;
  }

  if (!window.__metaPixelInitialized) {
    window.fbq("init", PIXEL_ID);
    window.__metaPixelInitialized = true;
  }

  const existingScript = document.querySelector<HTMLScriptElement>(
    'script[data-meta-pixel="true"]'
  );

  if (!existingScript) {
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://connect.facebook.net/en_US/fbevents.js";
    script.dataset.metaPixel = "true";
    document.head.appendChild(script);
  }
}

export default function MetaPixelConsent() {
  const [consent, setConsent] = useState<Consent>(null);
  const [ready, setReady] = useState(false);

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const query = searchParams.toString();

  useEffect(() => {
    try {
      const saved = localStorage.getItem(CONSENT_KEY);

      if (saved === "accepted" || saved === "rejected") {
        // A leitura do armazenamento ocorre após a montagem do componente.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setConsent(saved);
      }
    } catch {
      // Se o armazenamento não estiver disponível, não ativamos o Pixel.
    }

    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready || consent !== "accepted") return;

    initializePixel();

    window.fbq?.("consent", "grant");
    window.fbq?.("track", "PageView");
  }, [ready, consent, pathname, query]);

  useEffect(() => {
    if (!ready || consent !== "rejected") return;

    window.fbq?.("consent", "revoke");

    try {
      // Remove cookies conhecidos do Pixel no domínio atual.
      document.cookie = "_fbp=; Max-Age=0; path=/; SameSite=Lax";
      document.cookie = "_fbc=; Max-Age=0; path=/; SameSite=Lax";
    } catch {
      // A recusa continua válida mesmo se não for possível limpar cookies.
    }
  }, [ready, consent]);

  function chooseConsent(choice: Exclude<Consent, null>) {
    try {
      localStorage.setItem(CONSENT_KEY, choice);
    } catch {
      // A escolha permanece válida no estado atual da página.
    }

    setConsent(choice);
  }

  if (!ready) return null;

  return (
    <>
      {consent === null ? (
        <aside
          role="dialog"
          aria-label="Preferências de cookies"
          aria-describedby="cookie-description"
          className="fixed inset-x-4 bottom-4 z-[100] mx-auto max-w-xl rounded-xl border border-gray-200 bg-white p-5 text-gray-900 shadow-2xl"
        >
          <h2 className="text-lg font-semibold">
            Sua privacidade importa
          </h2>

          <p
            id="cookie-description"
            className="mt-2 text-sm leading-6"
          >
            Usamos recursos essenciais para o funcionamento da loja.
            Com sua autorização, também utilizamos rastreamento
            publicitário da Meta para medir visitas e melhorar anúncios.
            Você pode recusar sem perder acesso ao site. Consulte nossa
            Política de Privacidade para mais informações.
          </p>

          <div className="mt-4 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => chooseConsent("accepted")}
              className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white"
            >
              Aceitar
            </button>

            <button
              type="button"
              onClick={() => chooseConsent("rejected")}
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium"
            >
              Recusar
            </button>
          </div>
        </aside>
      ) : (
        <button
          type="button"
          onClick={() => setConsent(null)}
          className="fixed bottom-3 left-3 z-[90] rounded-full border border-gray-300 bg-white px-3 py-2 text-xs text-gray-700 shadow"
        >
          Preferências de cookies
        </button>
      )}
    </>
  );
}
