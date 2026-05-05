import { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { CookieBanner } from "./CookieBanner";
import { StickyMobileCTA } from "./StickyMobileCTA";
import { ScrollProgress } from "./ScrollProgress";
import { BackToTop } from "./BackToTop";

export const Layout = ({ children, hideMobileCTA = false }: { children: ReactNode; hideMobileCTA?: boolean }) => (
  <div className="min-h-screen">
    <ScrollProgress />
    <Navbar />
    <main>{children}</main>
    <Footer />
    {!hideMobileCTA && <StickyMobileCTA />}
    <BackToTop />
    <CookieBanner />
  </div>
);
