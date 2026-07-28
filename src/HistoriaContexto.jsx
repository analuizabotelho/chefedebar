import { useState, useEffect } from "react";
import { ArrowLeft, Search, ChevronDown } from "lucide-react";
import BottomNav from "./BottomNav";

const BEBIDAS_API_URL = "https://x8ki-letl-twmt.n7.xano.io/api:ePYR7DTm/bebidas";

function BebidaCard({ bebida }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-white/15 rounded-2xl overflow-hidden mb-3">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-4 py-3 text-left"
      >
        <div>
          <p className="text-sm">{bebida.name}</p>
          {bebida.type && (
            <p className="text-[10px] uppercase tracking-wide text-white/40 mt-0.5">
              {bebida.type}
            </p>
          )}
        </div>
        <ChevronDown
          size={18}
          strokeWidth={1.5}
          className={`text-white/60 transition-transform shrink-0 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="px-4 pb-4 space-y-3 text-sm text-white/85 leading-relaxed">
          {bebida.base && (
            <div>
              <p className="text-[11px] text-white/40 mb-1">Base</p>
              <p>{bebida.base}</p>
            </div>
          )}
          {bebida.ingredients && (
            <div>
              <p className="text-[11px] text-white/40 mb-1">Ingredientes</p>
              <p>{bebida.ingredients}</p>
            </div>
          )}
          {bebida.origin && (
            <div>
              <p className="text-[11px] text-white/40 mb-1">Origem</p>
              <p>{bebida.origin}</p>
            </div>
          )}
          {bebida.process && (
            <div>
              <p className="text-[11px] text-white/40 mb-1">Processo</p>
              <p>{bebida.process}</p>
            </div>
          )}
          {bebida.history && (
            <div>
              <p className="text-[11px] text-white/40 mb-1">História</p>
              <p>{bebida.history}</p>
            </div>
          )}
          {bebida.notes && (
            <div>
              <p className="text-[11px] text-white/40 mb-1">Notas</p>
              <p className="italic text-white/70">{bebida.notes}</p>
            </div>
          )}
          {bebida.source && (
            <p className="text-[10px] text-white/30 pt-1">Fonte: {bebida.source}</p>
          )}
        </div>
      )}
    </div>
  );
}

export default function HistoriaContexto({ onBack, initialSearch = "", onNavigate }) {
  const [bebidas, setBebidas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState(initialSearch);

  useEffect(() => {
    fetch(BEBIDAS_API_URL)
      .then((res) => {
        if (!res.ok) throw new Error(`Erro ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setBebidas(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const filtered = bebidas.filter((b) =>
    b.name?.toLowerCase().includes(search.toLowerCase())
  );

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
          <div className="flex-1 flex items-center bg-transparent border border-white/40 rounded-full px-4 py-2">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar bebida"
              className="bg-transparent flex-1 text-sm text-white placeholder-white/50 outline-none"
            />
            <Search size={18} strokeWidth={1.5} className="text-white/70" />
          </div>
        </header>

        <h1
          className="px-5 mb-4 text-2xl"
          style={{ fontFamily: "'Allura', cursive" }}
        >
          História &amp; Contexto
        </h1>

        <main className="flex-1 overflow-y-auto px-5 pb-24">
          {loading && (
            <p className="text-white/50 text-xs text-center py-8">Carregando...</p>
          )}
          {error && (
            <p className="text-red-500 text-xs text-center py-8">
              Não foi possível carregar as bebidas agora.
            </p>
          )}
          {!loading && !error && (
            <>
              {filtered.map((b) => (
                <BebidaCard key={b.id} bebida={b} />
              ))}
              {filtered.length === 0 && (
                <p className="text-white/50 text-xs text-center py-8">
                  Nenhuma bebida encontrada.
                </p>
              )}
            </>
          )}
        </main>

        <BottomNav active="historia" onNavigate={onNavigate} />
      </div>
    </div>
  );
}