import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 mt-12 py-10 text-slate-600 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="masthead-logo text-xl font-black text-black tracking-tight uppercase">
              Noticias Artigos
            </span>
            <p className="text-slate-500 mt-1 text-[11px]">
              © 2026 Noticias Artigos. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}