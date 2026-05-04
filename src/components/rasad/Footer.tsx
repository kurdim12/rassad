import { Logo } from "./Logo";
import { Twitter, Facebook, Instagram, Send } from "lucide-react";

export const Footer = () => (
  <footer className="mt-24 border-t border-white/[0.06] bg-surface/40">
    <div className="container grid gap-10 py-14 md:grid-cols-4">
      <div className="space-y-4 md:col-span-1">
        <Logo />
        <p className="text-sm leading-7 text-muted-foreground">
          منظومة عربية للتحقق الرقمي، ترصد الإشارات وتحوّلها إلى أحكام مدعومة بالأدلة.
        </p>
      </div>

      <div>
        <h4 className="mb-4 text-sm font-semibold text-foreground">روابط</h4>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li><a href="/news" className="hover:text-foreground">الأخبار المتحقق منها</a></li>
          <li><a href="/agents" className="hover:text-foreground">الوكلاء</a></li>
          <li><a href="/reports" className="hover:text-foreground">التقارير</a></li>
          <li><a href="/social" className="hover:text-foreground">وكيل السوشال ميديا</a></li>
        </ul>
      </div>

      <div>
        <h4 className="mb-4 text-sm font-semibold text-foreground">المنصة</h4>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li><a href="#" className="hover:text-foreground">المنهجية</a></li>
          <li><a href="#" className="hover:text-foreground">الخصوصية</a></li>
          <li><a href="#" className="hover:text-foreground">الشروط</a></li>
          <li><a href="#" className="hover:text-foreground">اتصل بنا</a></li>
        </ul>
      </div>

      <div>
        <h4 className="mb-4 text-sm font-semibold text-foreground">ابقَ في قلب الحقيقة</h4>
        <form className="flex overflow-hidden rounded-md border border-white/[0.08] bg-white/[0.03]">
          <input
            placeholder="بريدك الإلكتروني"
            className="flex-1 bg-transparent px-3 py-2 text-sm outline-none placeholder:text-muted-foreground/60"
          />
          <button type="button" className="grid w-11 place-items-center bg-primary text-primary-foreground">
            <Send className="h-4 w-4" />
          </button>
        </form>
        <div className="mt-4 flex gap-2">
          {[Twitter, Facebook, Instagram].map((I, i) => (
            <a key={i} href="#" className="grid h-9 w-9 place-items-center rounded-md border border-white/[0.06] text-muted-foreground hover:border-primary hover:text-foreground">
              <I className="h-4 w-4" />
            </a>
          ))}
        </div>
      </div>
    </div>
    <div className="border-t border-white/[0.06]">
      <div className="container flex flex-col items-center justify-between gap-2 py-5 text-xs text-muted-foreground md:flex-row">
        <span>© {new Date().getFullYear()} رصد RASAD. كل الحقوق محفوظة.</span>
        <span className="mono">v1.0 — INTELLIGENCE GRADE</span>
      </div>
    </div>
  </footer>
);
