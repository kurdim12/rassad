import { NavLink, Link } from "react-router-dom";
import { Search, ShieldCheck } from "lucide-react";
import { Logo } from "./Logo";

const links = [
  { to: "/", label: "الرئيسية" },
  { to: "/news", label: "الأخبار" },
  { to: "/reports", label: "التقارير" },
  { to: "/agents", label: "الوكلاء" },
  { to: "/social", label: "السوشال ميديا" },
  { to: "/about", label: "عن رصد" },
];

export const Navbar = () => (
  <header className="sticky top-0 z-40 border-b border-white/[0.06] bg-background/70 backdrop-blur-xl">
    <div className="container flex h-16 items-center justify-between gap-6">
      <Link to="/"><Logo /></Link>

      <nav className="hidden items-center gap-1 md:flex">
        {links.map((l) => (
          <NavLink
            key={l.to}
            to={l.to}
            end={l.to === "/"}
            className={({ isActive }) =>
              `relative px-3 py-2 text-sm transition-colors ${
                isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
              } [&.active]:after:absolute [&.active]:after:inset-x-2 [&.active]:after:-bottom-[17px] [&.active]:after:h-[2px] [&.active]:after:bg-primary`
            }
          >
            {l.label}
          </NavLink>
        ))}
      </nav>

      <div className="flex items-center gap-2">
        <button className="grid h-9 w-9 place-items-center rounded-md text-muted-foreground hover:bg-white/[0.04] hover:text-foreground">
          <Search className="h-4 w-4" />
        </button>
        <Link
          to="/social"
          className="inline-flex items-center gap-2 rounded-md bg-gradient-to-b from-primary to-primary/80 px-4 py-2 text-sm font-semibold text-primary-foreground signal-glow ring-1 ring-white/10 transition hover:brightness-110"
        >
          <ShieldCheck className="h-4 w-4" />
          تحقق من خبر
        </Link>
      </div>
    </div>
  </header>
);
