import { useState, useEffect } from "react";

const COCKTAILS_API_URL = "https://x8ki-letl-twmt.n7.xano.io/api:ePYR7DTm/cocktails";
const BEBIDAS_API_URL = "https://x8ki-letl-twmt.n7.xano.io/api:ePYR7DTm/bebidas";
const XAROPES_API_URL = "https://x8ki-letl-twmt.n7.xano.io/api:ePYR7DTm/xaropes";

export default function GlobalSearch({ onOpenCocktail, onOpenHistoria, onOpenBases }) {
  const [query, setQuery] = useState("");
  const [allData, setAllData] = useState({ cocktails: [], bebidas: [], xaropes: [] });
  const [loaded, setLoaded] = useState(false);

  // Busca as 3 tabelas uma única vez, na primeira vez que a pessoa digita algo
  useEffect(() => {
    if (query.trim() === "" || loaded) return;

    Promise.all([
      fetch(COCKTAILS_API_URL).then((r) => r.json()),
      fetch(BEBIDAS_API_URL).then((r) => r.json()),
      fetch(XAROPES_API_URL).then((r) => r.json()),
    ])
      .then(([cocktails, bebidas, xaropes]) => {
        setAllData({ cocktails, bebidas, xaropes });
        setLoaded(true);
      })
      .catch(() => {
        // Falha silenciosa: se a busca global não carregar, a pessoa ainda
        // pode navegar manualmente pelo Drawer
      });
  }, [query, loaded]);

  const q = query.trim().toLowerCase();
  const matches =
    q === ""
      ? []
      : [
          ...allData.cocktails
            .filter((c) => c.name?.toLowerCase().includes(q))
            .map((c) => ({ ...c, __tipo: "Cocktail" })),
          ...allData.bebidas
            .filter((b) => b.name?.toLowerCase().includes(q))
            .map((b) => ({ ...b, __tipo: "Bebida" })),
          ...allData.xaropes
            .filter((x) => x.name?.toLowerCase().includes(q))
            .map((x) => ({ ...x, __tipo: "Xarope" })),
        ].slice(0, 8);

  function handleSelect(item) {
    if (item.__tipo === "Cocktail") onOpenCocktail(item.id);
    if (item.__tipo === "Bebida") onOpenHistoria(item.name);
    if (item.__tipo === "Xarope") onOpenBases(item.name);
  }

  return (
    <div className="relative">
      <div className="flex-1 flex items-center bg-transparent border border-white/40 rounded-full px-4 py-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar receita"
          className="bg-transparent flex-1 text-sm text-white placeholder-white/50 outline-none"
        />
      </div>

      {q !== "" && (
        <div className="absolute left-0 right-0 mt-2 bg-white text-black rounded-xl overflow-hidden z-30 max-h-72 overflow-y-auto shadow-lg">
          {!loaded && (
            <p className="text-xs text-black/50 text-center py-4">Buscando...</p>
          )}
          {loaded && matches.length === 0 && (
            <p className="text-xs text-black/50 text-center py-4">Nada encontrado.</p>
          )}
          {loaded &&
            matches.map((item) => (
              <button
                key={`${item.__tipo}-${item.id}`}
                onClick={() => handleSelect(item)}
                className="w-full flex items-center justify-between px-4 py-2 text-left hover:bg-black/5 border-b border-black/5 last:border-0"
              >
                <span className="text-sm">{item.name}</span>
                <span className="text-[10px] uppercase text-black/40">{item.__tipo}</span>
              </button>
            ))}
        </div>
      )}
    </div>
  );
}