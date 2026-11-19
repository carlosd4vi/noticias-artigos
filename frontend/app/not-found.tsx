import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex-grow flex flex-col items-center justify-center text-center">
      <span className="text-xs font-bold tracking-wider text-amber-600 uppercase">
        Erro 404
      </span>
      <h1 className="headline-font text-3xl sm:text-4xl font-bold text-slate-900 mt-2">
        Página não encontrada
      </h1>
      <p className="text-sm text-slate-600 mt-3 max-w-md">
        O artigo ou página que você procura não existe ou foi removido.
      </p>
      <Link
        href="/"
        className="mt-6 px-5 py-2.5 bg-slate-900 hover:bg-amber-600 text-white text-xs font-bold uppercase tracking-wider rounded-md transition-colors"
      >
        Voltar para o início
      </Link>
    </div>
  );
}