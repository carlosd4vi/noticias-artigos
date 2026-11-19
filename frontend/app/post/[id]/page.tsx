import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostById, getPosts, formatarDataRelativa } from "@/lib/api";
import { ShareButton } from "@/components/ShareButton";
import { Sidebar } from "@/components/Sidebar";

interface PostPageProps {
  params: Promise<{ id: string }>;
}

export default async function PostPage({ params }: PostPageProps) {
  const { id } = await params;

  const [post, recomendados] = await Promise.all([
    getPostById(id),
    getPosts(4),
  ]);

  if (!post) {
    notFound();
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 flex-grow w-full">

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <article className="lg:col-span-8 bg-white rounded-lg border border-slate-200 p-6 sm:p-10 shadow-sm">
          <div className="flex items-center justify-between gap-4 mb-4">
            <span className="text-xs font-bold tracking-wider text-amber-600 uppercase">
              Artigo
            </span>
            <span className="text-xs font-medium text-slate-400">
              {formatarDataRelativa(post.data_criada)}
            </span>
          </div>

          <h1 className="headline-font text-2xl sm:text-4xl font-bold text-slate-900 tracking-tight mb-6">
            {post.titulo}
          </h1>

          <div className="flex items-center justify-between py-4 border-y border-slate-100 mb-8">
            <div className="text-xs text-slate-700 font-semibold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
              <span>Por Carlos Davi</span>
            </div>

            <div className="flex items-center gap-2 text-slate-500">
              <span className="text-[11px] font-medium uppercase tracking-wider">
                Compartilhar
              </span>
              <ShareButton postId={post.id} titulo={post.titulo} />
            </div>
          </div>

          <div className="text-base sm:text-lg text-slate-700 leading-relaxed whitespace-pre-line font-sans">
            {post.descricao}
          </div>
        </article>

        <Sidebar recomendados={recomendados} />
      </div>
    </main>
  );
}