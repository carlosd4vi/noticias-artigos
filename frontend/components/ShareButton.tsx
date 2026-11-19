"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

interface ShareButtonProps {
  postId: string;
  titulo: string;
}

export function ShareButton({ postId, titulo }: ShareButtonProps) {
  const [aberto, setAberto] = useState(false);
  const [copiado, setCopiado] = useState(false);
  const [montado, setMontado] = useState(false);

  useEffect(() => {
    setMontado(true);
  }, []);

  const getUrl = () => {
    if (typeof window === "undefined") return "";
    return `${window.location.origin}/post/${postId}`;
  };

  const compartilharX = () => {
    const url = encodeURIComponent(getUrl());
    const texto = encodeURIComponent(titulo);
    window.open(
      `https://twitter.com/intent/tweet?text=${texto}&url=${url}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const compartilharWhatsApp = () => {
    const texto = encodeURIComponent(`${titulo} ${getUrl()}`);
    window.open(
      `https://api.whatsapp.com/send?text=${texto}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const copiarLink = async () => {
    try {
      await navigator.clipboard.writeText(getUrl());
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    } catch {
      alert("Não foi possível copiar o link.");
    }
  };

  const modal = aberto ? (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
      onClick={() => setAberto(false)}
    >
      <div
        className="bg-white rounded-lg border border-slate-200 shadow-xl w-full max-w-sm p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
          <h3 className="font-bold text-sm uppercase tracking-wider text-slate-900">
            Compartilhar artigo
          </h3>
          <button
            type="button"
            onClick={() => setAberto(false)}
            aria-label="Fechar"
            className="text-slate-400 hover:text-slate-700 text-lg leading-none cursor-pointer"
          >
            ✕
          </button>
        </div>

        <p className="headline-font text-sm text-slate-700 line-clamp-2 mb-5">
          {titulo}
        </p>

        <div className="flex flex-col gap-2.5">
          <button
            type="button"
            onClick={compartilharX}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-md bg-slate-900 hover:bg-black text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
          >
            Compartilhar no X
          </button>

          <button
            type="button"
            onClick={compartilharWhatsApp}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-md bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
          >
            Compartilhar no WhatsApp
          </button>

          <button
            type="button"
            onClick={copiarLink}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-md bg-slate-100 hover:bg-amber-50 hover:text-amber-700 border border-slate-200 text-slate-800 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
          >
            {copiado ? "✓ Link copiado!" : "Copiar Link"}
          </button>
        </div>
      </div>
    </div>
  ) : null;

  return (
    <>
      <button
        aria-label="Compartilhar"
        className="action-icon-btn p-1 hover:text-amber-600 transition-colors cursor-pointer"
        type="button"
        onClick={() => setAberto(true)}
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {montado && createPortal(modal, document.body)}
    </>
  );
}