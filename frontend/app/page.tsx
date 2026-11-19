import { getPosts } from "@/lib/api";
import { ArticleCard } from "@/components/ArticleCard";
import { Sidebar } from "@/components/Sidebar";

export default async function HomePage() {
  const posts = await getPosts(10);

  return (
    <>
      <section className="bg-white border-b border-slate-200 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold tracking-wider text-amber-600 uppercase">
                Seção Especial
              </span>
              <h1 className="headline-font text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mt-1">
                Opinião, Artigos e Análises
              </h1>
              <p
                className="text-sm text-slate-600 mt-2 max-w-2xl font-sans"
                id="artigos"
              >
                Debates indispensáveis sobre os acontecimentos mais relevantes
                do Brasil e do mundo, com rigor técnico e independência
                editorial.
              </p>
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 flex-grow w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8">
            {posts.length === 0 ? (
              <div className="bg-white rounded-lg border border-slate-200 p-8 text-center">
                <p className="text-slate-600 text-sm">
                  Nenhum artigo encontrado. Verifique se o servidor FastAPI está
                  rodando na porta 8000.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {posts.map((post) => (
                  <ArticleCard key={post.id} post={post} />
                ))}
              </div>
            )}
          </div>

          <Sidebar recomendados={posts} />
        </div>
      </main>
    </>
  );
}