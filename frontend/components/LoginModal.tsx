"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";

interface LoginModalProps {
  aberto: boolean;
  onFechar: () => void;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export function LoginModal({ aberto, onFechar }: LoginModalProps) {
  const router = useRouter();
  const [montado, setMontado] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  useEffect(() => {
    setMontado(true);
  }, []);

  // Fecha ao apertar ESC
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onFechar();
    };
    if (aberto) window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [aberto, onFechar]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro("");
    setCarregando(true);

    try {
      const formData = new URLSearchParams();
      formData.append("username", username);
      formData.append("password", password);

      const res = await fetch(`${API_URL}/api/v1/login`, {
  method: "POST",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
  credentials: "include",
  body: formData.toString(),
});

if (!res.ok) {
  const data = await res.json().catch(() => null);
  throw new Error(data?.detail || "Usuário ou senha inválidos.");
}

setUsername("");
setPassword("");
onFechar();
router.push("/admin");
router.refresh();
    } catch (err) {
      setErro(err instanceof Error ? err.message : "Erro ao conectar com o servidor.");
    } finally {
      setCarregando(false);
    }
  };

  if (!montado || !aberto) return null;

  const modal = (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 backdrop-blur-[1px]"
      onClick={onFechar}
    >
      <div
        className="bg-white rounded-lg border border-slate-200 shadow-xl w-full max-w-sm p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-5">
          <div>
            <h2 className="font-bold text-sm uppercase tracking-wider text-slate-900">
              Acesso Restrito
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Entre para gerenciar os artigos
            </p>
          </div>
          <button
            type="button"
            onClick={onFechar}
            aria-label="Fechar modal"
            className="text-slate-400 hover:text-slate-700 text-lg leading-none cursor-pointer"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {erro && (
            <div className="p-3 rounded-md bg-red-50 border border-red-200 text-xs font-medium text-red-700">
              {erro}
            </div>
          )}

          <div>
            <label
              htmlFor="login-username"
              className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5"
            >
              Usuário
            </label>
            <input
              id="login-username"
              type="text"
              required
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Digite seu usuário"
              className="w-full px-3 py-2 text-sm rounded-md border border-slate-300 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors"
            />
          </div>

          <div>
            <label
              htmlFor="login-password"
              className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5"
            >
              Senha
            </label>
            <input
              id="login-password"
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3 py-2 text-sm rounded-md border border-slate-300 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={carregando}
            className="w-full py-2.5 px-4 rounded-md bg-slate-900 hover:bg-black disabled:bg-slate-400 text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
          >
            {carregando ? "Entrando..." : "Entrar"}
          </button>
        </form>
      </div>
    </div>
  );

  return createPortal(modal, document.body);
}