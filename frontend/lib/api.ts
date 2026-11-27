import { MOCK_POSTS } from "./mockPosts";

export interface Post {
  id: string;
  titulo: string;
  descricao: string;
  data_criada: string | null;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
const USAR_MOCK = process.env.NEXT_PUBLIC_USE_MOCK === "true";

export async function getPosts(limit = 10, skip = 0): Promise<Post[]> {
  if (USAR_MOCK) {
    return MOCK_POSTS.slice(skip, skip + limit);
  }

  try {
    const res = await fetch(
      `${API_URL}/api/v1/posts?skip=${skip}&limit=${limit}`,
      { cache: "no-store" }
    );
    if (!res.ok) return MOCK_POSTS.slice(skip, skip + limit);
    return await res.json();
  } catch {
    // Se o backend estiver desligado (ex: demo na Vercel), usa os dados estáticos
    return MOCK_POSTS.slice(skip, skip + limit);
  }
}

export async function getPostById(id: string): Promise<Post | null> {
  if (USAR_MOCK) {
    return MOCK_POSTS.find((post) => post.id === id) ?? null;
  }

  try {
    const res = await fetch(`${API_URL}/api/v1/posts/${id}`, {
      cache: "no-store",
    });
    if (!res.ok) return MOCK_POSTS.find((post) => post.id === id) ?? null;
    return await res.json();
  } catch {
    return MOCK_POSTS.find((post) => post.id === id) ?? null;
  }
}

export function formatarDataRelativa(dataIso: string | null): string {
  if (!dataIso) return "";

  const data = new Date(dataIso);
  const agora = new Date();
  const diffSegundos = Math.floor((agora.getTime() - data.getTime()) / 1000);

  if (diffSegundos < 60) return "Agora mesmo";

  const diffMinutos = Math.floor(diffSegundos / 60);
  if (diffMinutos < 60) {
    return `Há ${diffMinutos} ${diffMinutos === 1 ? "minuto" : "minutos"}`;
  }

  const diffHoras = Math.floor(diffMinutos / 60);
  if (diffHoras < 24) {
    return `Há ${diffHoras} ${diffHoras === 1 ? "hora" : "horas"}`;
  }

  const diffDias = Math.floor(diffHoras / 24);
  if (diffDias < 7) {
    return `Há ${diffDias} ${diffDias === 1 ? "dia" : "dias"}`;
  }

  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(data);
}