"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

interface Post {
  id: string;
  titulo: string;
  descricao: string;
  data_criada: string;
}

function formatarData(iso: string) {
  if (!iso) return "—";
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(iso));
}

export default function AdminDashboard() {
  const router = useRouter();
  const [usuario, setUsuario] = useState<string | null>(null);
  const [verificando, setVerificando] = useState(true);

  const [posts, setPosts] = useState<Post[]>([]);
  const [carregandoPosts, setCarregandoPosts] = useState(true);

  // Estado do formulário (Criar / Editar)
  const [formAberto, setFormAberto] = useState(false);
  const [editandoId, setEditandoId] = useState<string | null>(null);
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState("");
  const LIMITE = 10;
  const [temMais, setTemMais] = useState(false);
  const [carregandoMais, setCarregandoMais] = useState(false);

  const carregarPosts = useCallback(async (skip = 0, acumular = false) => {
  if (acumular) {
    setCarregandoMais(true);
  } else {
    setCarregandoPosts(true);
  }

  try {
    const res = await fetch(
      `${API_URL}/api/v1/posts?skip=${skip}&limit=${LIMITE}`,
      { cache: "no-store" }
    );
    if (res.ok) {
      const data: Post[] = await res.json();
      const lista = Array.isArray(data) ? data : [];

      setPosts((prev) => (acumular ? [...prev, ...lista] : lista));
      // Se veio menos que 10, significa que chegou no fim do banco
      setTemMais(lista.length === LIMITE);
    }
  } catch {
    setErro("Não foi possível carregar os artigos.");
  } finally {
    setCarregandoPosts(false);
    setCarregandoMais(false);
  }
}, []);

  useEffect(() => {
    const verificarSessao = async () => {
      try {
        const res = await fetch(`${API_URL}/api/v1/me`, {
          credentials: "include",
        });
        if (!res.ok) {
          router.replace("/");
          return;
        }
        const data = await res.json();
        setUsuario(data.username);
        carregarPosts();
      } catch {
        router.replace("/");
      } finally {
        setVerificando(false);
      }
    };

    verificarSessao();
  }, [router, carregarPosts]);

  const handleLogout = async () => {
    await fetch(`${API_URL}/api/v1/logout`, {
      method: "POST",
      credentials: "include",
    });
    router.replace("/");
    router.refresh();
  };

  const abrirNovo = () => {
    setEditandoId(null);
    setTitulo("");
    setDescricao("");
    setErro("");
    setFormAberto(true);
  };

  const abrirEdicao = (post: Post) => {
    setEditandoId(post.id);
    setTitulo(post.titulo);
    setDescricao(post.descricao);
    setErro("");
    setFormAberto(true);
  };

  const handleSalvar = async (e: React.FormEvent) => {
    e.preventDefault();
    setSalvando(true);
    setErro("");

    const url = editandoId
      ? `${API_URL}/api/v1/posts/${editandoId}`
      : `${API_URL}/api/v1/posts`;

    const method = editandoId ? "PATCH" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          titulo,
          descricao,
        }),
      });

      if (res.status === 401) {
        router.replace("/");
        return;
      }

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.detail || "Erro ao salvar artigo.");
      }

      setFormAberto(false);
      await carregarPosts();
    } catch (err) {
      setErro(err instanceof Error ? err.message : "Erro ao salvar.");
    } finally {
      setSalvando(false);
    }
  };

  const handleDeletar = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir este artigo?")) return;

    try {
      const res = await fetch(`${API_URL}/api/v1/posts/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (res.status === 401) {
        router.replace("/");
        return;
      }

      if (res.ok) {
        setPosts((prev) => prev.filter((p) => p.id !== id));
      }
    } catch {
      setErro("Erro ao excluir artigo.");
    }
  };

  if (verificando) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 text-sm text-slate-500">
        Verificando sessão...
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <main className="max-w-5xl mx-auto px-4 py-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold text-slate-900">Artigos</h1>
            <p className="text-xs text-slate-500 mt-0.5">
              {posts.length}{" "}
              {posts.length === 1 ? "publicação" : "publicações"} cadastradas
            </p>
          </div>

          <button
            type="button"
            onClick={abrirNovo}
            className="px-4 py-2.5 rounded-md bg-slate-900 hover:bg-black text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
          >
            + Novo Artigo
          </button>
        </div>

        {erro && (
          <div className="p-3 rounded-md bg-red-50 border border-red-200 text-xs font-medium text-red-700">
            {erro}
          </div>
        )}
        <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm">
          {carregandoPosts ? (
            <div className="p-8 text-center text-sm text-slate-500">
              Carregando artigos...
            </div>
          ) : posts.length === 0 ? (
            <div className="p-8 text-center text-sm text-slate-500">
              Nenhum artigo publicado ainda.
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  <th className="py-3 px-4">Título</th>
                  <th className="py-3 px-4 hidden sm:table-cell">Publicado em</th>
                  <th className="py-3 px-4 text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {posts.map((post) => (
                  <tr key={post.id} className="hover:bg-slate-50/70">
                    <td className="py-3 px-4 font-medium text-slate-900">
                      {post.titulo}
                    </td>
                    <td className="py-3 px-4 hidden sm:table-cell text-xs text-slate-500 whitespace-nowrap">
                      {formatarData(post.data_criada)}
                    </td>
                    <td className="py-3 px-4 text-right space-x-3 whitespace-nowrap">
                      <button
                        type="button"
                        onClick={() => abrirEdicao(post)}
                        className="text-xs font-bold text-amber-600 hover:text-amber-800 cursor-pointer"
                      >
                        Editar
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeletar(post.id)}
                        className="text-xs font-bold text-red-600 hover:text-red-800 cursor-pointer"
                      >
                        Excluir
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
         {temMais && (
          <div className="flex justify-center pt-2">
            <button
              type="button"
              onClick={() => carregarPosts(posts.length, true)}
              disabled={carregandoMais}
              className="px-5 py-2.5 rounded-md border border-slate-300 bg-white hover:bg-slate-50 disabled:opacity-50 text-xs font-bold uppercase tracking-wider text-slate-700 transition-colors cursor-pointer"
            >
              {carregandoMais ? "Carregando..." : "Carregar mais artigos"}
            </button>
          </div>
        )}
      </main>
      {formAberto && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 backdrop-blur-[1px]"
            onClick={() => setFormAberto(false)}
          >
            <form
              onSubmit={handleSalvar}
              onClick={(e) => e.stopPropagation()}
              className="bg-white border border-slate-200 rounded-lg p-6 space-y-4 shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h2 className="text-sm font-bold uppercase tracking-wider text-slate-800">
                  {editandoId ? "Editar Artigo" : "Novo Artigo"}
                </h2>
                <button
                  type="button"
                  onClick={() => setFormAberto(false)}
                  aria-label="Fechar modal"
                  className="text-slate-400 hover:text-slate-700 text-lg leading-none cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Título
                </label>
                <input
                  type="text"
                  required
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                  placeholder="Título do artigo"
                  className="w-full px-3 py-2 text-sm rounded-md border border-slate-300 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Descrição
                </label>
                <textarea
                  required
                  rows={8}
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                  placeholder="Escreva o conteúdo do artigo..."
                  className="w-full px-3 py-2 text-sm rounded-md border border-slate-300 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setFormAberto(false)}
                  className="px-4 py-2 rounded-md border border-slate-300 text-xs font-bold uppercase tracking-wider text-slate-700 hover:bg-slate-50 cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={salvando}
                  className="px-4 py-2 rounded-md bg-slate-900 hover:bg-black disabled:bg-slate-400 text-white text-xs font-bold uppercase tracking-wider cursor-pointer"
                >
                  {salvando
                    ? "Salvando..."
                    : editandoId
                    ? "Salvar Alterações"
                    : "Publicar"}
                </button>
              </div>
            </form>
          </div>
        )}
    </div>
  );
}