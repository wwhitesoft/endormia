import Link from "next/link";

export default function Footer() {
  return (
    <footer className="py-8 pb-12 text-muted-2 relative z-[1]">
      <div className="w-[min(1180px,calc(100%-40px))] mx-auto">
        <div className="flex items-center justify-between gap-6 pt-6 border-t border-white/[0.06] flex-wrap">
          <div>
            <div className="flex items-center gap-3 text-text">
              <BrandMark />
              <strong>Endormia</strong>
            </div>
            <p className="mt-3 text-muted text-[0.98rem] leading-relaxed max-w-md">
              Sleep OS, Deck e Capsule per progettare un&apos;esperienza del sonno piu calma, piu semplice, piu tangibile.
            </p>
          </div>
          <div className="flex items-center gap-5 flex-wrap text-[0.95rem]">
            <Link href="/products" className="hover:text-text transition-colors">Prodotti</Link>
            <Link href="/about" className="hover:text-text transition-colors">La Visione</Link>
            <Link href="/waitlist" className="hover:text-text transition-colors">Waitlist</Link>
            <Link href="/#faq" className="hover:text-text transition-colors">FAQ</Link>
          </div>
          <div className="text-[0.72rem] uppercase tracking-[0.1em] text-muted-2">
            Endormia &middot; 2026
          </div>
        </div>
      </div>
    </footer>
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
