import { ArrowLeft } from "lucide-react";
import BottomNav from "./BottomNav";

export default function SobreApp({ onBack, onNavigate }) {
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
          Sobre o app
        </h1>

        <main className="flex-1 overflow-y-auto px-5 pb-24 space-y-4 text-sm text-white/85 leading-relaxed">
          <p>
            O CHEFEDEBAR nasceu da experiência real atrás do balcão e da
            necessidade de ter uma ferramenta simples, prática e honesta para
            o dia a dia do bar.
          </p>
          <p>
            Criado por uma ex-bartender, o app é voltado para iniciantes e
            profissionais que querem desenvolver técnica, ganhar segurança e
            trabalhar com mais consistência — sem ego e sem complicação.
          </p>
          <p>
            Mais do que um aplicativo, o CHEFEDEBAR é, acima de tudo, um
            agradecimento a todos os colegas de profissão — e, em especial,
            ao grande João, que ajudou a transformar aprendizado em troca e
            apoio.
          </p>
          <p className="italic text-white/70">
            Que todos possam começar com mais base e menos estresse.
          </p>
        </main>

        <BottomNav active="sobre" onNavigate={onNavigate} />
      </div>
    </div>
  );
}