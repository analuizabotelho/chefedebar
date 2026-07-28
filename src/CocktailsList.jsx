import { useState, useEffect } from "react";
import { Menu, Search, ArrowLeft } from "lucide-react";
import BottomNav from "./BottomNav";

const COCKTAILS_API_URL = "https://x8ki-letl-twmt.n7.xano.io/api:ePYR7DTm/cocktails";

const CATEGORIES = ["Unforgettables", "Contemporary Classics"];

export default function CocktailsList({ onBack, onOpenCocktail, onNavigate }) {
  const [cocktails, setCocktails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState("Unforgettables");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch(COCKTAILS_API_URL)
      .then((res) => {
        if (!res.ok) throw new Error(`Erro ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setCocktails(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const filtered = cocktails.filter((c) => {
    const matchesCategory = c.category === activeCategory;
    const matchesSearch = c.name?.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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
              placeholder="Buscar receita"
              className="bg-transparent flex-1 text-sm text-white placeholder-white/50 outline-none"
            />
            <Search size={18} strokeWidth={1.5} className="text-white/70" />
          </div>
        </header>

        <div className="flex gap-2 px-5 pb-4">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex-1 text-xs py-2 rounded-lg border transition-colors ${
                activeCategory === cat
                  ? "bg-white text-black border-white"
                  : "border-white/30 text-white/80"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <main className="flex-1 overflow-y-auto px-5 pb-24">
          {loading && (
            <p className="text-white/50 text-xs text-center py-8">Carregando cocktails...</p>
          )}
          {error && (
            <p className="text-red-500 text-xs text-center py-8">
              Não foi possível carregar os cocktails agora.
            </p>
          )}
          {!loading && !error && (
            <div className="grid grid-cols-2 gap-3">
              {filtered.map((c) => (
                <button
                  key={c.id}
                  onClick={() => onOpenCocktail(c.id)}
                  className="bg-white/5 rounded-xl overflow-hidden text-left border border-white/10"
                >
                  <div className="w-full aspect-square bg-white/10">
                    {c.image_url ? (
                      <img src={c.image_url} alt={c.name} className="w-full h-full object-cover" />
                    ) : (
                      <span className="flex items-center justify-center h-full text-[10px] text-white/40 px-2 text-center">
                        {c.name}
                      </span>
                    )}
                  </div>
                  <p className="text-xs px-2 py-2 truncate">{c.name}</p>
                </button>
              ))}
              {filtered.length === 0 && (
                <p className="col-span-2 text-white/50 text-xs text-center py-8">
                  Nenhum cocktail encontrado.
                </p>
              )}
            </div>
          )}
        </main>

        <BottomNav active="cocktailsList" onNavigate={onNavigate} />
      </div>
    </div>
  );
}