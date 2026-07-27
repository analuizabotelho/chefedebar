import { GlassWater, BookOpen, ScrollText, Calculator, Heart, Info, X } from "lucide-react";

const MENU_ITEMS = [
  { label: "Cocktails", icon: GlassWater },
  { label: "Bases & Xaropes", icon: BookOpen },
  { label: "História & Contexto", icon: ScrollText },
  { label: "Super Juice Calculator", icon: Calculator },
  { label: "Favoritos", icon: Heart },
  { label: "Sobre nós", icon: Info },
];

export default function Drawer({ open, onClose, onNavigate }) {
  return (
    <>
      {/* Overlay escuro atrás do menu, fecha ao clicar fora */}
      <div
        className={`fixed inset-0 bg-black/60 z-40 transition-opacity ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Painel do drawer, desliza da esquerda */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-black border-r border-white/10 z-50 transform transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ fontFamily: "'Quicksand', sans-serif" }}
        aria-hidden={!open}
      >
        <div className="flex items-center justify-between px-5 pt-6 pb-4">
          <img src="/assets/chefedebar-logo.png" alt="chefedebar" className="h-7" />
          <button onClick={onClose} aria-label="Fechar menu" className="text-white">
            <X size={20} strokeWidth={1.5} />
          </button>
        </div>

        <nav className="flex flex-col mt-4">
          {MENU_ITEMS.map(({ label, icon: Icon }) => (
            <button
              key={label}
              onClick={() => onNavigate?.(label)}
              className="flex items-center gap-3 px-5 py-3 text-white/90 hover:bg-white/5 text-left text-sm"
            >
              <Icon size={18} strokeWidth={1.5} />
              {label}
            </button>
          ))}
        </nav>
      </aside>
    </>
  );
}