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
          <ul className="flex flex-wrap items-center gap-6 text-[12px] font-medium text-slate-600">
            <li><Link className="hover:text-slate-900" href="#">Termos de Uso</Link></li>
            <li><Link className="hover:text-slate-900" href="#">Política de Privacidade</Link></li>
            <li><Link className="hover:text-slate-900" href="#">Princípios Editoriais</Link></li>
            <li><Link className="hover:text-slate-900" href="#">Fale com a Redação</Link></li>
            <li><Link className="hover:text-slate-900" href="#">Anuncie Conosco</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}