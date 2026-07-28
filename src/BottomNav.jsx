import { Home, BookOpen, Heart, Calculator, User } from "lucide-react";

const NAV_ITEMS = [
  { key: "home", icon: Home, label: "Início" },
  { key: "cocktailsList", icon: BookOpen, label: "Cocktails" },
  { key: "favoritos", icon: Heart, label: "Favoritos" },
  { key: "calculator", icon: Calculator, label: "Calculadora" },
  { key: "perfil", icon: User, label: "Perfil" },
];

export default function BottomNav({ active, onNavigate }) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 flex justify-center bg-black border-t border-white/10 z-20">
      <div className="w-full max-w-sm flex justify-around items-center py-3">
        {NAV_ITEMS.map(({ key, icon: Icon, label }) => (
          <button
            key={key}
            onClick={() => onNavigate(key)}
            aria-label={label}
            className={active === key ? "text-white" : "text-white/40"}
          >
            <Icon size={22} strokeWidth={1.5} />
          </button>
        ))}
      </div>
    </nav>
  );
}