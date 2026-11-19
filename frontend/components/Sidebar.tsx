import Link from "next/link";
import { Post } from "@/lib/api";

interface SidebarProps {
  recomendados: Post[];
}

export function Sidebar({ recomendados }: SidebarProps) {
  return (
    <aside className="lg:col-span-4 space-y-8" data-purpose="sidebar-column">
      <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
          <h3 className="font-bold text-sm uppercase tracking-wider text-slate-900 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
            Recomendados
          </h3>
        </div>

        {recomendados.length === 0 ? (
          <p className="text-xs text-slate-500">Nenhum artigo recomendado ainda.</p>
        ) : (
          <ol className="space-y-4">
            {recomendados.slice(0, 4).map((post, index) => (
              <li
                key={post.id}
                className="flex items-start gap-4 pb-4 border-b border-slate-100 last:border-0 last:pb-0 group"
              >
                <span className="headline-font text-2xl font-bold text-slate-300 group-hover:text-amber-500 transition-colors leading-none pt-1">
                  {index + 1}
                </span>
                <Link href={`/post/${post.id}`}>
                  <h4 className="headline-font text-sm font-semibold text-slate-900 group-hover:text-amber-700 transition-colors mt-0.5 leading-snug">
                    {post.titulo}
                  </h4>
                </Link>
              </li>
            ))}
          </ol>
        )}
      </div>

      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <h3 className="font-bold text-sm uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-3 mb-4">
          Colunistas em Destaque
        </h3>
        <div className="space-y-3">
          <a
            className="block p-3 rounded-md hover:bg-slate-50 transition-colors border-l-2 border-transparent hover:border-amber-500"
            href="https://www.linkedin.com/in/carlosd4vi/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="text-xs font-bold text-slate-900 block">
              Carlos Davi
            </span>
            <span className="text-xs text-slate-500 line-clamp-1">
              Noticias de tecnologia do Brasil e mundo
            </span>
          </a>
        </div>
      </div>
    </aside>
  );
}