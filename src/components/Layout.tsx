import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Navigation } from "./Navigation";
import { PhoneIcon } from "./icons";

export const Footer = () => (
  <footer className="bg-primary text-primary-foreground pb-20 md:pb-0">
    <div className="page-wrap py-7 flex flex-wrap items-center justify-between gap-4 text-sm">
      <div>
        <p className="font-display font-bold text-base">AI Safe Quảng Trị</p>
        <p className="text-primary-foreground/80">Học sinh chủ động ứng phó thiên tai.</p>
      </div>
      <p className="flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-foreground/15 px-3 py-1.5"><PhoneIcon size={16} />Cứu nạn <strong>112</strong></span>
        <span className="rounded-full bg-primary-foreground/15 px-3 py-1.5">Cứu hỏa <strong>114</strong></span>
        <span className="rounded-full bg-primary-foreground/15 px-3 py-1.5">Cấp cứu <strong>115</strong></span>
        <Link to="/tuyen-truyen" className="underline px-2">Nguồn tham khảo</Link>
      </p>
    </div>
  </footer>
);

export const Layout = ({ title, subtitle, children }: { title: string; subtitle?: string; children: ReactNode }) => (
  <div className="min-h-screen flex flex-col">
    <Navigation />
    <div className="sky pt-24 pb-8 border-b">
      <header className="page-wrap max-w-5xl">
        <h1 className="text-3xl md:text-5xl font-extrabold">{title}</h1>
        {subtitle && <p className="text-foreground/75 mt-3 text-base md:text-lg max-w-3xl">{subtitle}</p>}
      </header>
    </div>
    <main className="page-wrap flex-1 pt-8 pb-12">{children}</main>
    <Footer />
  </div>
);
