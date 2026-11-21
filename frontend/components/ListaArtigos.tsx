"use client";

import { useState } from "react";
import { ArticleCard } from "@/components/ArticleCard";
import type { Post } from "@/lib/api";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
const LIMITE = 10;

export function ListaArtigos({ postsIniciais }: { postsIniciais: Post[] }) {
  const [posts, setPosts] = useState<Post[]>(postsIniciais);
  const [temMais, setTemMais] = useState(postsIniciais.length === LIMITE);
  const [carregando, setCarregando] = useState(false);

  const carregarMais = async () => {
    setCarregando(true);
    try {
      const res = await fetch(
        `${API_URL}/api/v1/posts?skip=${posts.length}&limit=${LIMITE}`,
        { cache: "no-store" }
      );
      if (res.ok) {
        const novos: Post[] = await res.json();
        setPosts((prev) => [...prev, ...novos]);
        setTemMais(novos.length === LIMITE);
      }
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {posts.map((post) => (
          <ArticleCard key={post.id} post={post} />
        ))}
      </div>

      {temMais && (
        <div className="flex justify-center">
          <button
            type="button"
            onClick={carregarMais}
            disabled={carregando}
            className="px-6 py-2.5 rounded-md bg-slate-900 hover:bg-black disabled:bg-slate-400 text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
          >
            {carregando ? "Carregando..." : "Carregar mais artigos"}
          </button>
        </div>
      )}
    </div>
  );
}