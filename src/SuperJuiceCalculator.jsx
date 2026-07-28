import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import BottomNav from "./BottomNav";

const CITRICOS = [
  { nome: "Limão Siciliano", emoji: "🍋", acidoCitrico: "6.4%", acidoMalico: "0.1%", agua: "88%" },
  { nome: "Limão Taiti", emoji: "🍋‍🟩", acidoCitrico: "5.0%", acidoMalico: "0.1%", agua: "90%" },
  { nome: "Laranja", emoji: "🍊", acidoCitrico: "1.0%", acidoMalico: "0.2%", agua: "86%" },
];

function CitricoCalcCard({ citrico }) {
  const [pesoCascas, setPesoCascas] = useState("");
  const [resultado, setResultado] = useState(null);

  function calcular() {
    const peso = parseFloat(pesoCascas);
    if (!peso || peso <= 0) {
      setResultado(null);
      return;
    }
    const ac = parseFloat(citrico.acidoCitrico) / 100;
    const am = parseFloat(citrico.acidoMalico) / 100;
    const ag = parseFloat(citrico.agua) / 100;
    setResultado({
      acidoCitrico: (peso * ac).toFixed(1),
      acidoMalico: (peso * am).toFixed(1),
      agua: (peso * ag).toFixed(1),
    });
  }

  return (
    <div className="bg-white text-black rounded-2xl p-4 mb-4">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-base">{citrico.emoji}</span>
        <span className="text-sm font-medium">{citrico.nome}</span>
      </div>

      <div className="flex items-center justify-between mb-3">
        <span className="text-sm text-black/70">Peso das cascas</span>
        <input
          type="number"
          value={pesoCascas}
          onChange={(e) => setPesoCascas(e.target.value)}
          placeholder="ex. 25g"
          className="w-24 text-sm text-right border border-black/20 rounded px-2 py-1 outline-none"
        />
      </div>

      <button
        onClick={calcular}
        className="w-full bg-black text-white text-sm rounded py-2 mb-4"
      >
        Calcular
      </button>

      <div className="space-y-2 text-sm text-black/80">
        <div className="flex justify-between">
          <span>Ácido Cítrico</span>
          <span>{resultado ? `${resultado.acidoCitrico}g` : "—"}</span>
        </div>
        <div className="flex justify-between">
          <span>Ácido Málico</span>
          <span>{resultado ? `${resultado.acidoMalico}g` : "—"}</span>
        </div>
        <div className="flex justify-between">
          <span>Água</span>
          <span>{resultado ? `${resultado.agua}g` : "—"}</span>
        </div>
      </div>
    </div>
  );
}

export default function SuperJuiceCalculator({ onBack, onNavigate }) {
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
          Super Juice Calculator
        </h1>

        <main className="flex-1 overflow-y-auto px-5 pb-24">
          <p className="text-xs text-white/60 mb-4 leading-relaxed">
            Informe o peso das cascas de cada cítrico para calcular as proporções
            de ácido cítrico, ácido málico e água.
          </p>

          {CITRICOS.map((c) => (
            <CitricoCalcCard key={c.nome} citrico={c} />
          ))}

          <p className="text-[10px] text-white/30 text-center mt-2">
            Conceito baseado na calculadora criada por Kevin Kos
          </p>
        </main>

        <BottomNav active="calculator" onNavigate={onNavigate} />
      </div>
    </div>
  );
}