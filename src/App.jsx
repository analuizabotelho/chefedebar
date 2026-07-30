import { useState, useEffect } from "react";
import { Menu, Search, Calculator, Home, BookOpen, Heart, User } from "lucide-react";
import Drawer from "./Drawer";
import CocktailsList from "./CocktailsList";
import CocktailDetail from "./CocktailDetail";
import HistoriaContexto from "./HistoriaContexto";
import BasesXaropes from "./BasesXaropes";
import GlobalSearch from "./GlobalSearch";
import SuperJuiceCalculator from "./SuperJuiceCalculator";
import BottomNav from "./BottomNav";
import SobreApp from "./SobreApp";
import Perfil from "./Perfil";
import Favoritos from "./Favoritos";

const COCKTAILS_API_URL = "https://x8ki-letl-twmt.n7.xano.io/api:ePYR7DTm/cocktails";

const AGUA_MULTIPLICADOR = 16.66; // água = peso das cascas × 16.66, igual em todos os cítricos

const CITRICOS = [
  { nome: "Limão Siciliano", emoji: "🍋", acidoCitrico: 1.0, acidoMalico: 0 },
  { nome: "Limão Taiti", emoji: "🍋‍🟩", acidoCitrico: 0.6667, acidoMalico: 0.333 },
  { nome: "Laranja", emoji: "🍊", acidoCitrico: 0.90, acidoMalico: 0.11 },
  { nome: "Toranja", emoji: "🍈", acidoCitrico: 0.80, acidoMalico: 0.20, msg: 0.0333 },
];

function pickRandom(list, count) {
  const pool = [...list];
  const picked = [];
  while (picked.length < Math.min(count, pool.length)) {
    const i = Math.floor(Math.random() * pool.length);
    picked.push(pool.splice(i, 1)[0]);
  }
  return picked;
}

function useRandomCocktailsFromApi(count = 10) {
  const [cocktails, setCocktails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    fetch(COCKTAILS_API_URL)
      .then((res) => {
        if (!res.ok) throw new Error(`Erro ${res.status} ao buscar cocktails`);
        return res.json();
      })
      .then((data) => {
        if (cancelled) return;
        // Só usa cocktails que já têm foto cadastrada pro carrossel
        const comFoto = data.filter((c) => c.image_url && c.image_url.trim() !== "");
        const fonte = comFoto.length > 0 ? comFoto : data;
        setCocktails(pickRandom(fonte, count));
        setLoading(false);
      })
      .catch((err) => {
        if (cancelled) return;
        setError(err.message);
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [count]);

  return { cocktails, loading, error };
}

export default function App() {
  const { cocktails, loading, error } = useRandomCocktailsFromApi(10);
  const [pesoCascas, setPesoCascas] = useState("");
  const [citrico, setCitrico] = useState(CITRICOS[0]);
  const [resultado, setResultado] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [view, setView] = useState("home"); // "home" | "cocktailsList" | "cocktailDetail"
  const [selectedCocktailId, setSelectedCocktailId] = useState(null);
  const [pendingSearch, setPendingSearch] = useState("");
  const [previousView, setPreviousView] = useState("home");

  const IMPLEMENTED_VIEWS = ["home", "cocktailsList", "calculator", "perfil", "favoritos"];
  function handleNavigate(key) {
    if (IMPLEMENTED_VIEWS.includes(key)) setView(key);
  }

  function openCocktail(id, fromView) {
    setSelectedCocktailId(id);
    setPreviousView(fromView);
    setView("cocktailDetail");
  }

  if (view === "cocktailsList") {
    return (
      <CocktailsList
        onBack={() => setView("home")}
        onOpenCocktail={(id) => openCocktail(id, "cocktailsList")}
        onNavigate={handleNavigate}
      />
    );
  }

  if (view === "cocktailDetail") {
    return (
      <CocktailDetail
        cocktailId={selectedCocktailId}
        onBack={() => setView(previousView)}
      />
    );
  }

  if (view === "historia") {
    return (
      <HistoriaContexto
        onBack={() => setView("home")}
        initialSearch={pendingSearch}
        onNavigate={handleNavigate}
      />
    );
  }

  if (view === "bases") {
    return (
      <BasesXaropes
        onBack={() => setView("home")}
        initialSearch={pendingSearch}
        onNavigate={handleNavigate}
      />
    );
  }

  if (view === "calculator") {
    return <SuperJuiceCalculator onBack={() => setView("home")} onNavigate={handleNavigate} />;
  }

  if (view === "sobre") {
    return <SobreApp onBack={() => setView("home")} onNavigate={handleNavigate} />;
  }

  if (view === "perfil") {
    return <Perfil onBack={() => setView("home")} onNavigate={handleNavigate} />;
  }

  if (view === "favoritos") {
    return (
      <Favoritos
        onBack={() => setView("home")}
        onOpenCocktail={(id) => openCocktail(id, "favoritos")}
        onNavigate={handleNavigate}
      />
    );
  }

  function calcular() {
    const peso = parseFloat(pesoCascas);
    if (!peso || peso <= 0) {
      setResultado(null);
      return;
    }
    setResultado({
      acidoCitrico: (peso * citrico.acidoCitrico).toFixed(1),
      acidoMalico: (peso * citrico.acidoMalico).toFixed(1),
      msg: citrico.msg ? (peso * citrico.msg).toFixed(1) : null,
      agua: (peso * AGUA_MULTIPLICADOR).toFixed(0),
    });
  }

  return (
    <div
      className="min-h-screen bg-black text-white flex justify-center"
      style={{ fontFamily: "'Quicksand', sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Allura&family=Quicksand:wght@400;500;600&display=swap');
        .logo-font { font-family: 'Allura', cursive; }
      `}</style>
      <div className="w-full max-w-sm flex flex-col min-h-screen">

        <div className="px-5 pt-6 pb-4">
          <img
            src="/assets/chefedebar-logo.png"
            alt="chefedebar"
            className="h-8"
          />
        </div>

        <header className="flex items-center gap-3 px-5 pb-4">
          <button
            aria-label="Abrir menu"
            className="text-white shrink-0"
            onClick={() => setDrawerOpen(true)}
          >
            <Menu size={24} strokeWidth={1.5} />
          </button>
          <div className="flex-1">
            <GlobalSearch
              onOpenCocktail={(id) => openCocktail(id, "home")}
              onOpenHistoria={(name) => {
                setPendingSearch(name);
                setView("historia");
              }}
              onOpenBases={(name) => {
                setPendingSearch(name);
                setView("bases");
              }}
            />
          </div>
        </header>

        <main className="flex-1 overflow-y-auto px-5 pb-24">
          <p className="text-center text-xs text-white/70 mb-4 leading-relaxed">
            Confira receitas clássicas seguindo o modelo IBA
          </p>

          <div className="bg-white rounded-2xl p-2 mb-8 min-h-[112px]">
            {loading && (
              <p className="text-black/50 text-xs text-center py-8">Carregando cocktails...</p>
            )}
            {error && (
              <p className="text-red-500 text-xs text-center py-8">
                Não foi possível carregar os cocktails agora.
              </p>
            )}
            {!loading && !error && (
              <div className="flex gap-2 overflow-x-auto no-scrollbar">
                {cocktails.slice(0, 3).map((c) => (
                  <button
                    key={c.id}
                    className="shrink-0 w-24 h-24 rounded-xl overflow-hidden bg-black/5"
                    onClick={() => openCocktail(c.id, "home")}
                    aria-label={`Ver receita ${c.name}`}
                  >
                    {c.image_url ? (
                      <img src={c.image_url} alt={c.name} className="w-full h-full object-cover" />
                    ) : (
                      <span className="flex items-center justify-center h-full text-[10px] text-black/40 px-1 text-center">
                        {c.name}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={() => setView("calculator")}
            className="flex items-center gap-2 mb-3"
          >
            <Calculator size={18} strokeWidth={1.5} />
            <span className="text-sm">Super Juice Calculator</span>
          </button>

          <div className="bg-white text-black rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-base">{citrico.emoji}</span>
              <select
                value={citrico.nome}
                onChange={(e) =>
                  setCitrico(CITRICOS.find((c) => c.nome === e.target.value))
                }
                className="text-sm font-medium bg-transparent outline-none"
              >
                {CITRICOS.map((c) => (
                  <option key={c.nome} value={c.nome}>{c.nome}</option>
                ))}
              </select>
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
              {citrico.msg && (
                <div className="flex justify-between">
                  <span>MSG</span>
                  <span>{resultado?.msg ? `${resultado.msg}g` : "—"}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Água</span>
                <span>{resultado ? `${resultado.agua}g` : "—"}</span>
              </div>
            </div>

          </div>
        </main>

        <BottomNav active="home" onNavigate={handleNavigate} />
      </div>

      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onNavigate={(label) => {
          setDrawerOpen(false);
          if (label === "Cocktails") setView("cocktailsList");
          if (label === "História & Contexto") setView("historia");
          if (label === "Bases & Xaropes") setView("bases");
          if (label === "Super Juice Calculator") setView("calculator");
          if (label === "Sobre o app") setView("sobre");
          if (label === "Favoritos") setView("favoritos");
        }}
      />
    </div>
  );
}