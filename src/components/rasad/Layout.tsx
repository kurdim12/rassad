import { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

export const Layout = ({ children }: { children: ReactNode }) => (
  <div className="min-h-screen">
    <Navbar />
    <main>{children}</main>
    <Footer />
  </div>
);
