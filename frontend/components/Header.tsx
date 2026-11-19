"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export function Header() {
  const [dataAtual, setDataAtual] = useState("");

  useEffect(() => {
    const formatada = new Intl.DateTimeFormat("pt-BR", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date());
    setDataAtual(formatada);
  }, []);

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 border-b border-slate-100">
          <div className="flex items-center gap-4 sm:gap-6">
            <Link className="flex items-center" href="/">
              <span className="masthead-logo text-2xl sm:text-3xl lg:text-4xl font-black text-black tracking-tight uppercase">
                Noticias Artigos
              </span>
            </Link>
            <button
              aria-label="Pesquisar notícias"
              className="p-2 text-slate-700 hover:text-black focus:outline-none rounded-md transition-colors"
              type="button"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                viewBox="0 0 24 24"
              >
                <path
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          <div className="flex items-center gap-3 sm:gap-5">
            <span className="hidden xl:inline-block text-xs font-medium text-slate-500 capitalize tracking-wide">
              {dataAtual}
            </span>
            <Link
              className="flex flex-col items-center justify-center text-slate-700 hover:text-slate-950 px-2 py-1 rounded transition-colors group"
              href="/login"
            >
              <svg
                className="w-6 h-6 text-slate-700 group-hover:text-black transition-colors"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                viewBox="0 0 24 24"
              >
                <path
                  d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="text-[10px] font-bold tracking-tight uppercase mt-0.5">
                Entrar
              </span>
            </Link>
          </div>
        </div>

        <nav className="overflow-x-auto scrollbar-none py-2.5 border-t border-slate-50">
          <ul className="flex items-center gap-6 sm:gap-8 text-xs sm:text-sm font-semibold text-slate-600 whitespace-nowrap">
            <li>
              <Link
                className="text-amber-600 border-b-2 border-amber-500 pb-1"
                href="/#artigos"
              >
                Artigos
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}