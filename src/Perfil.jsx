import { ArrowLeft, User } from "lucide-react";
import BottomNav from "./BottomNav";

export default function Perfil({ onBack, onNavigate }) {
  return (
    <div
      className="min-h-screen bg-black text-white flex justify-center"
      style={{ fontFamily: "'Quicksand', sans-serif" }}
    >
      <div className="w-full max-w-sm flex flex-col min-h-screen">

        <div className="px-5 pt-6 pb-4">
          <img src="/assets/chefedebar-logo.png" alt="chefedebar" className="h-8" />
        </div>

        <header className="flex items-center gap-3 px-5 pb-4">
          <button aria-label="Voltar" onClick={onBack} className="text-white shrink-0">
            <ArrowLeft size={22} strokeWidth={1.5} />
          </button>
        </header>

        <h1
          className="px-5 mb-4 text-2xl"
          style={{ fontFamily: "'Allura', cursive" }}
        >
          Perfil
        </h1>

        <main className="flex-1 flex flex-col items-center justify-center px-5 pb-24 text-center">
          <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-4">
            <User size={28} strokeWidth={1.5} className="text-white/50" />
          </div>
          <p className="text-sm text-white/70 mb-1">Em breve</p>
          <p className="text-xs text-white/40 max-w-[240px]">
            Login e perfil pessoal estão a caminho — em breve você vai poder
            salvar suas preferências e acompanhar seu progresso por aqui.
          </p>
        </main>

        <BottomNav active="perfil" onNavigate={onNavigate} />
      </div>
    </div>
  );
}