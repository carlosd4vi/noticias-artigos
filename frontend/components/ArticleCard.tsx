import Link from "next/link";
import { Post, formatarDataRelativa } from "@/lib/api";
import { ShareButton } from "@/components/ShareButton";

interface ArticleCardProps {
  post: Post;
}

export function ArticleCard({ post }: ArticleCardProps) {
  return (
    <article
      className="card-article bg-white rounded-lg border border-slate-200 p-6 flex flex-col justify-between"
      data-purpose="article-card"
    >
      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="text-[11px] font-medium text-slate-400">
            {formatarDataRelativa(post.data_criada)}
          </span>
        </div>

        <Link href={`/post/${post.id}`}>
          <h2 className="headline-font text-xl font-bold text-slate-900 hover:text-amber-700 transition-colors cursor-pointer mb-3">
            {post.titulo}
          </h2>
        </Link>

        <p className="text-sm text-slate-600 line-clamp-3 leading-relaxed mb-4">
          {post.descricao}
        </p>

        <div className="text-xs text-slate-700 font-semibold mb-6 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
          <span>Por Carlos Davi</span>
        </div>
      </div>
      <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-slate-500">
        <div className="flex items-center gap-4">
          <ShareButton postId={post.id} titulo={post.titulo} />
        </div>
      </div>
    </article>
  );
}