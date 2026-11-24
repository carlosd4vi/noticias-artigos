"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { LoginModal } from "@/components/LoginModal";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [dataAtual, setDataAtual] = useState("");
  const [loginAberto, setLoginAberto] = useState(false);
  const [verificando, setVerificando] = useState(false);

  const estaNoAdmin = pathname.startsWith("/admin");

  useEffect(() => {
    const formatada = new Intl.DateTimeFormat("pt-BR", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date());
    setDataAtual(formatada);
  }, []);

  const handleAcesso = async (): Promise<void> => {
    if (verificando) return;
    setVerificando(true);

    try {
      const res = await fetch(`${API_URL}/api/v1/me`, {
        method: "GET",
        credentials: "include",
      });

      if (res.ok) {
        router.push("/admin");
        return;
      }
    } catch {
      // Se der erro de rede, abre o modal normalmente
    } finally {
      setVerificando(false);
    }

    setLoginAberto(true);
  };

  const handleLogout = async (): Promise<void> => {
    await fetch(`${API_URL}/api/v1/logout`, {
      method: "POST",
      credentials: "include",
    });
    router.replace("/");
    router.refresh();
  };
  
  return (
    <>
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 border-b border-slate-100">
            <div className="flex items-center gap-4 sm:gap-6">
              <Link className="flex items-center" href="/">
                <span className="masthead-logo text-2xl sm:text-3xl lg:text-4xl font-black text-black tracking-tight uppercase">
                  Noticias Artigos
                </span>
              </Link>
            </div>

            <div className="flex items-center gap-3 sm:gap-5">
              <span className="hidden xl:inline-block text-xs font-medium text-slate-500 capitalize tracking-wide">
                {dataAtual}
              </span>

              {estaNoAdmin ? (
                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex flex-col items-center justify-center text-red-600 hover:text-red-800 px-2 py-1 rounded transition-colors group cursor-pointer"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="text-[10px] font-bold tracking-tight uppercase mt-0.5">
                    Sair
                  </span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleAcesso}
                  disabled={verificando}
                  className="flex flex-col items-center justify-center text-slate-700 hover:text-slate-950 disabled:opacity-50 px-2 py-1 rounded transition-colors group cursor-pointer"
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
                    {verificando ? "..." : "Entrar"}
                  </span>
                </button>
              )}
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

      <LoginModal aberto={loginAberto} onFechar={() => setLoginAberto(false)} />
    </>
  );
}