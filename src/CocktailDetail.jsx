import { useState, useEffect } from "react";
import { ArrowLeft, Heart } from "lucide-react";

const COCKTAILS_API_URL = "https://x8ki-letl-twmt.n7.xano.io/api:ePYR7DTm/cocktails";

export default function CocktailDetail({ cocktailId, onBack }) {
  const [cocktail, setCocktail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(`${COCKTAILS_API_URL}/${cocktailId}`)
      .then((res) => {
        if (!res.ok) throw new Error(`Erro ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setCocktail(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [cocktailId]);

  return (
    <div
      className="min-h-screen bg-black text-white flex justify-center"
      style={{ fontFamily: "'Quicksand', sans-serif" }}
    >
      <div className="w-full max-w-sm flex flex-col min-h-screen">

        <header className="flex items-center justify-between px-5 pt-6 pb-4">
          <button aria-label="Voltar" onClick={onBack} className="text-white">
            <ArrowLeft size={22} strokeWidth={1.5} />
          </button>
          <img src="/assets/chefedebar-logo.png" alt="chefedebar" className="h-7" />
          <button aria-label="Favoritar" className="text-white">
            <Heart size={20} strokeWidth={1.5} />
          </button>
        </header>

        <main className="flex-1 overflow-y-auto px-5 pb-10">
          {loading && (
            <p className="text-white/50 text-xs text-center py-8">Carregando receita...</p>
          )}
          {error && (
            <p className="text-red-500 text-xs text-center py-8">
              Não foi possível carregar essa receita agora.
            </p>
          )}

          {!loading && !error && cocktail && (
            <>
              <div className="w-full aspect-square rounded-2xl overflow-hidden bg-white/10 mb-4">
                {cocktail.image_url ? (
                  <img
                    src={cocktail.image_url}
                    alt={cocktail.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="flex items-center justify-center h-full text-white/40 text-sm">
                    Sem foto ainda
                  </span>
                )}
              </div>

              <h1
                className="text-2xl mb-1"
                style={{ fontFamily: "'Allura', cursive" }}
              >
                {cocktail.name}
              </h1>
              <p className="text-xs text-white/50 mb-6">{cocktail.category}</p>

              <section className="mb-5">
                <h2 className="text-sm text-white/70 mb-2">Ingredientes</h2>
                <p className="text-sm leading-relaxed">{cocktail.ingredients}</p>
              </section>

              <section className="mb-5">
                <h2 className="text-sm text-white/70 mb-2">Modo de preparo</h2>
                <p className="text-sm leading-relaxed">{cocktail.process}</p>
              </section>

              {cocktail.garnish && (
                <section className="mb-5">
                  <h2 className="text-sm text-white/70 mb-2">Garnish</h2>
                  <p className="text-sm leading-relaxed">{cocktail.garnish}</p>
                </section>
              )}

              {cocktail.notes && (
                <section className="mb-5">
                  <h2 className="text-sm text-white/70 mb-2">Notas</h2>
                  <p className="text-sm leading-relaxed text-white/80 italic">
                    {cocktail.notes}
                  </p>
                </section>
              )}

              {cocktail.source && (
                <p className="text-[10px] text-white/40 mt-6">Fonte: {cocktail.source}</p>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}