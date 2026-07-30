import { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import BottomNav from "./BottomNav";
import { getFavoriteIds } from "./favorites";

const COCKTAILS_API_URL = "https://x8ki-letl-twmt.n7.xano.io/api:ePYR7DTm/cocktails";

export default function Favoritos({ onBack, onOpenCocktail, onNavigate }) {
  const [cocktails, setCocktails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  const favoriteIds = getFavoriteIds();
  const favoritos = cocktails.filter((c) => favoriteIds.includes(c.id));

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
          Favoritos
        </h1>

        <main className="flex-1 overflow-y-auto px-5 pb-24">
          {loading && (
            <p className="text-white/50 text-xs text-center py-8">Carregando favoritos...</p>
          )}
          {error && (
            <p className="text-red-500 text-xs text-center py-8">
              Não foi possível carregar os favoritos agora.
            </p>
          )}
          {!loading && !error && (
            <div className="grid grid-cols-2 gap-3">
              {favoritos.map((c) => (
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
              {favoritos.length === 0 && (
                <p className="col-span-2 text-white/50 text-xs text-center py-8">
                  Você ainda não favoritou nenhum cocktail.
                </p>
              )}
            </div>
          )}
        </main>

        <BottomNav active="favoritos" onNavigate={onNavigate} />
      </div>
    </div>
  );
}