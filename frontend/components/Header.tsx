"use client";

import Link from "next/link";

export default function Header() {
  return (
    <div className="sticky top-0 z-20 backdrop-blur-[18px] bg-gradient-to-b from-[rgba(7,9,13,0.82)] to-[rgba(7,9,13,0.46)] border-b border-white/[0.04]">
      <div className="w-[min(1180px,calc(100%-40px))] mx-auto relative z-[1]">
        <nav
          className="h-[76px] flex items-center justify-between gap-6"
          aria-label="Principale"
        >
          <Link href="/" className="inline-flex items-center gap-3 font-bold tracking-[0.01em]">
            <BrandMark />
            <span>Endormia</span>
          </Link>

          <div className="hidden md:flex items-center gap-7 text-muted text-[0.95rem]">
            <NavLink href="/products">Prodotti</NavLink>
            <NavLink href="/about">La Visione</NavLink>
            <NavLink href="/#faq">FAQ</NavLink>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/products"
              className="hidden sm:inline-flex items-center justify-center gap-2.5 min-h-[46px] px-[18px] rounded-full border border-white/10 bg-white/[0.02] text-text transition-all hover:border-white/20 hover:bg-white/[0.04] hover:-translate-y-[1px]"
            >
              Scopri il sistema
            </Link>
            <Link
              href="/waitlist"
              className="inline-flex items-center justify-center gap-2.5 min-h-[46px] px-[18px] rounded-full bg-gradient-to-br from-[#edf2ff] to-[#d6e9ff] text-[#0a0d12] font-bold shadow-[0_10px_28px_rgba(160,182,255,0.16)] transition-all hover:-translate-y-[1px]"
            >
              Richiedi anteprima
            </Link>
          </div>
        </nav>
      </div>
    </div>
  );
}

function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="relative py-1.5 transition-colors duration-[180ms] hover:text-text group"
    >
      {children}
      <span className="absolute left-0 -bottom-0.5 w-full h-px origin-left scale-x-[0.65] opacity-0 bg-gradient-to-r from-white/90 to-transparent transition-all duration-[180ms] group-hover:opacity-100 group-hover:scale-x-100" />
    </Link>
  );
}

function BrandMark() {
  return (
    <span
      className="w-[34px] h-[34px] rounded-xl border border-white/[0.12] relative overflow-hidden"
      style={{
        background:
          "radial-gradient(circle at 50% 42%, rgba(142, 227, 255, 0.44), transparent 28%), linear-gradient(145deg, rgba(153,174,255,0.18), rgba(255,255,255,0.04))",
        boxShadow:
          "inset 0 1px 0 rgba(255,255,255,0.12), 0 10px 28px rgba(0,0,0,0.24)",
      }}
      aria-hidden="true"
    >
      <span
        className="absolute inset-[9px] border-[1.5px] border-white/[0.62] opacity-[0.78]"
        style={{ borderRadius: "999px 999px 12px 12px" }}
      />
    </span>
  );
}
