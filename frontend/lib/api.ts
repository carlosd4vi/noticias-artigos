export interface Post {
  id: string;
  titulo: string;
  descricao: string;
  data_criada: string | null;
}

const API_URL =
  process.env.INTERNAL_API_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  "http://127.0.0.1:8000";

export async function getPosts(limite = 10): Promise<Post[]> {
  try {
    const res = await fetch(`${API_URL}/api/v1/posts?limite=${limite}`, {
      cache: "no-store",
    });

    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export function formatarDataRelativa(dataIso: string | null): string {
  if (!dataIso) return "Recentemente";

  const diffMs = Date.now() - new Date(dataIso).getTime();
  const diffMin = Math.floor(diffMs / 60000);

  if (diffMin < 1) return "Agora mesmo";
  if (diffMin < 60) return `Há ${diffMin} min`;

  const diffHoras = Math.floor(diffMin / 60);
  if (diffHoras < 24) return `Há ${diffHoras} ${diffHoras === 1 ? "hora" : "horas"}`;

  const diffDias = Math.floor(diffHoras / 24);
  if (diffDias < 7) return `Há ${diffDias} ${diffDias === 1 ? "dia" : "dias"}`;

  return new Date(dataIso).toLocaleDateString("pt-BR");
}

export async function getPostById(id: string): Promise<Post | null> {
  try {
    const res = await fetch(`${API_URL}/api/v1/posts/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}