import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { Menu, ShieldCheck, X } from "lucide-react";
import { Logo } from "./Logo";

const links = [
  { to: "/", label: "الرئيسية" },
  { to: "/verify", label: "تحقّق" },
  { to: "/live", label: "البث المباشر" },
  { to: "/how-it-works", label: "كيف يعمل" },
  { to: "/agents", label: "الوكلاء" },
  { to: "/news", label: "الأخبار" },
  { to: "/pricing", label: "الأسعار" },
  { to: "/about", label: "عن رصد" },
  { to: "/contact", label: "تواصل" },
];

export const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-white/[0.06] bg-background/70 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between gap-4">
        <Link to="/" aria-label="رصد - الرئيسية"><Logo /></Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="التنقل الرئيسي">
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

        <div className="hidden items-center gap-2 md:flex">
          <Link
            to="/login"
            className="rounded-md border border-white/[0.08] bg-white/[0.03] px-4 py-2 text-sm font-semibold text-foreground hover:bg-white/[0.06]"
            style={{ minHeight: 40 }}
          >
            تسجيل الدخول
          </Link>
          <Link
            to="/signup"
            className="inline-flex items-center gap-2 rounded-md bg-gradient-to-b from-primary to-primary/80 px-4 py-2 text-sm font-semibold text-primary-foreground signal-glow ring-1 ring-white/10 transition hover:brightness-110"
            style={{ minHeight: 40 }}
          >
            <ShieldCheck className="h-4 w-4" />
            ابدأ مجاناً
          </Link>
        </div>

        <button
          aria-label={open ? "إغلاق القائمة" : "فتح القائمة"}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
          className="grid place-items-center rounded-md border border-white/[0.06] text-foreground lg:hidden"
          style={{ width: 44, height: 44 }}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="border-t border-white/[0.06] bg-background/95 backdrop-blur-xl lg:hidden">
          <nav className="container flex flex-col gap-1 py-4" aria-label="قائمة الجوال">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/"}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `rounded-md px-3 py-3 text-sm font-medium ${
                    isActive ? "bg-white/[0.06] text-foreground" : "text-muted-foreground hover:bg-white/[0.04]"
                  }`
                }
                style={{ minHeight: 48 }}
              >
                {l.label}
              </NavLink>
            ))}
            <div className="mt-3 grid grid-cols-2 gap-2 border-t border-white/[0.06] pt-3">
              <Link
                to="/login"
                onClick={() => setOpen(false)}
                className="grid place-items-center rounded-md border border-white/[0.08] bg-white/[0.03] py-3 text-sm font-semibold"
                style={{ minHeight: 48 }}
              >
                تسجيل الدخول
              </Link>
              <Link
                to="/signup"
                onClick={() => setOpen(false)}
                className="grid place-items-center rounded-md bg-gradient-to-b from-primary to-primary/80 py-3 text-sm font-bold text-primary-foreground"
                style={{ minHeight: 48 }}
              >
                ابدأ مجاناً
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
