import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Prodotti — Endormia",
  description: "I tre livelli dello Sleep OS Endormia: OS (app), Deck (hardware base), Capsule (premium).",
};

export default function ProductsPage() {
  return (
    <>
      {/* Header */}
      <section className="pt-28 pb-16 relative z-[1]">
        <div className="w-[min(1180px,calc(100%-40px))] mx-auto relative z-[1]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-[42px] items-end">
            <div>
              <span className="inline-flex items-center gap-2.5 px-3.5 py-2.5 rounded-full border border-white/10 bg-white/[0.03] text-muted uppercase tracking-[0.08em] text-[0.72rem]">
                <span className="eyebrow-dot" />
                Il Sistema
              </span>
              <h1 className="mt-6 text-[clamp(2.8rem,6vw,5rem)] leading-[0.94] tracking-[-0.055em] font-[780]" style={{ textWrap: "balance" as never }}>
                Tre livelli. Una sola esperienza.
              </h1>
            </div>
            <p className="text-muted text-[1.08rem] leading-[1.72] max-w-[640px] lg:justify-self-end">
              L&apos;idea non e' partire da una navicella fantascientifica e riempirla di feature. L&apos;idea e' costruire una sequenza che funziona,
              poi darle sempre piu corpo: prima con l&apos;app, poi con Deck, poi con Capsule.
            </p>
          </div>
        </div>
      </section>

      {/* Product detail: Endormia OS */}
      <section className="py-20 relative z-[1] border-t border-white/[0.04]">
        <div className="w-[min(1180px,calc(100%-40px))] mx-auto relative z-[1]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div
              className="relative h-[400px] rounded-[30px] overflow-hidden border border-white/[0.08] shadow-md"
              style={{
                background:
                  "radial-gradient(circle at 50% 30%, rgba(153,174,255,0.14), transparent 28%), linear-gradient(180deg, rgba(255,255,255,0.02), transparent 42%), linear-gradient(180deg, rgba(18,24,34,0.86), rgba(10,14,20,0.98))",
              }}
            >
              <svg viewBox="0 0 500 260" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 w-full h-full">
                <defs>
                  <radialGradient id="osG" cx="50%" cy="48%" r="35%">
                    <stop offset="0%" stopColor="rgba(142,227,255,0.88)" />
                    <stop offset="100%" stopColor="rgba(142,227,255,0)" />
                  </radialGradient>
                  <linearGradient id="ph" x1="0" x2="1" y1="0" y2="1">
                    <stop offset="0%" stopColor="rgba(30,39,57,0.95)" />
                    <stop offset="100%" stopColor="rgba(10,14,22,0.98)" />
                  </linearGradient>
                </defs>
                <circle cx="250" cy="118" r="86" fill="url(#osG)" opacity="0.58" />
                <rect x="142" y="44" width="216" height="168" rx="30" fill="url(#ph)" stroke="rgba(255,255,255,0.12)" strokeWidth="2" />
                <rect x="164" y="62" width="172" height="132" rx="24" fill="rgba(9,14,22,0.88)" />
                <circle cx="250" cy="128" r="24" fill="rgba(142,227,255,0.88)" />
                <circle cx="250" cy="128" r="40" fill="rgba(153,174,255,0.22)" />
              </svg>
            </div>
            <div>
              <div className="text-accent-2 uppercase tracking-[0.1em] text-[0.72rem] font-bold mb-3">Livello 1</div>
              <h2 className="text-[clamp(2rem,4vw,3.2rem)] leading-[1] tracking-[-0.04em] font-[760]">
                Endormia OS
              </h2>
              <p className="mt-4 text-muted text-[1.08rem] leading-[1.72] max-w-lg">
                L&apos;app che non cerca attenzione. La toglie. Tre modalita bastano: dormi ora, mi sono svegliato, routine serale.
                L&apos;obiettivo non e' far stare l&apos;utente nell&apos;app. E' farlo uscire dallo schermo il prima possibile.
              </p>
              <ul className="list-none mt-6 grid gap-3 text-muted text-[1rem]">
                {[
                  "UX notturna essenziale, zero distrazioni",
                  "Routine audio e respirazione guidata",
                  "Morning check-in leggero e logica adattiva",
                  "Sleep Signature: protocollo personalizzato che impara nel tempo",
                  "Integrazione nativa con Deck e Capsule",
                ].map((b) => (
                  <li key={b} className="gradient-bullet">{b}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Product detail: Deck */}
      <section className="py-20 relative z-[1] border-t border-white/[0.04]">
        <div className="w-[min(1180px,calc(100%-40px))] mx-auto relative z-[1]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div className="order-2 lg:order-1">
              <div className="text-accent uppercase tracking-[0.1em] text-[0.72rem] font-bold mb-3">Livello 2</div>
              <h2 className="text-[clamp(2rem,4vw,3.2rem)] leading-[1] tracking-[-0.04em] font-[760]">
                Deck
              </h2>
              <p className="mt-4 text-muted text-[1.08rem] leading-[1.72] max-w-lg">
                Il ponte fisico tra protocollo e stanza. Deck porta nel letto cio che l&apos;app da sola non puo dare:
                temperatura locale, aria silenziosa, vibrazione lieve e un gesto fisico semplice per attivare la sleep mode.
              </p>
              <ul className="list-none mt-6 grid gap-3 text-muted text-[1rem]">
                {[
                  "Topper termoregolato con controllo zonale",
                  "Head module con microventilazione silenziosa",
                  "Vibrazione somatica lieve per rilassamento",
                  "Tasto fisico sleep mode e fail-safe locale",
                  "Design discreto, si integra in qualsiasi letto",
                ].map((b) => (
                  <li key={b} className="gradient-bullet">{b}</li>
                ))}
              </ul>
            </div>
            <div
              className="relative h-[400px] rounded-[30px] overflow-hidden border border-white/[0.08] shadow-md order-1 lg:order-2"
              style={{
                background:
                  "radial-gradient(circle at 50% 30%, rgba(153,174,255,0.14), transparent 28%), linear-gradient(180deg, rgba(255,255,255,0.02), transparent 42%), linear-gradient(180deg, rgba(18,24,34,0.86), rgba(10,14,20,0.98))",
              }}
            >
              <svg viewBox="0 0 500 260" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 w-full h-full">
                <defs>
                  <linearGradient id="dG2" x1="0" x2="1">
                    <stop offset="0%" stopColor="rgba(142,227,255,0.7)" />
                    <stop offset="100%" stopColor="rgba(153,174,255,0.7)" />
                  </linearGradient>
                  <linearGradient id="dB2" x1="0" x2="1" y1="0" y2="1">
                    <stop offset="0%" stopColor="rgba(25,34,48,0.95)" />
                    <stop offset="100%" stopColor="rgba(10,14,22,0.98)" />
                  </linearGradient>
                </defs>
                <ellipse cx="250" cy="190" rx="128" ry="20" fill="rgba(255,255,255,0.1)" opacity="0.24" />
                <rect x="122" y="122" width="228" height="34" rx="17" fill="url(#dB2)" stroke="rgba(255,255,255,0.12)" strokeWidth="2" />
                <rect x="148" y="126" width="126" height="8" rx="4" fill="url(#dG2)" opacity="0.75" />
                <rect x="346" y="102" width="66" height="64" rx="20" fill="rgba(12,18,28,0.95)" stroke="rgba(255,255,255,0.12)" strokeWidth="2" />
                <circle cx="379" cy="134" r="16" fill="rgba(153,174,255,0.16)" />
                <circle cx="379" cy="134" r="8" fill="rgba(142,227,255,0.88)" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Product detail: Capsule */}
      <section className="py-20 relative z-[1] border-t border-white/[0.04]">
        <div className="w-[min(1180px,calc(100%-40px))] mx-auto relative z-[1]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div
              className="relative h-[400px] rounded-[30px] overflow-hidden border border-white/[0.08] shadow-md"
              style={{
                background:
                  "radial-gradient(circle at 50% 30%, rgba(153,174,255,0.14), transparent 28%), linear-gradient(180deg, rgba(255,255,255,0.02), transparent 42%), linear-gradient(180deg, rgba(18,24,34,0.86), rgba(10,14,20,0.98))",
              }}
            >
              <svg viewBox="0 0 500 260" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 w-full h-full">
                <defs>
                  <linearGradient id="cG2" x1="0" x2="1" y1="0" y2="1">
                    <stop offset="0%" stopColor="rgba(255,255,255,0.24)" />
                    <stop offset="100%" stopColor="rgba(153,174,255,0.08)" />
                  </linearGradient>
                </defs>
                <path d="M124 176C124 110 176 66 250 66C324 66 376 110 376 176" fill="url(#cG2)" stroke="rgba(255,255,255,0.42)" strokeWidth="2" />
                <rect x="150" y="152" width="200" height="48" rx="24" fill="rgba(18,24,34,0.92)" stroke="rgba(255,255,255,0.12)" strokeWidth="2" />
                <rect x="182" y="166" width="138" height="18" rx="9" fill="rgba(255,255,255,0.08)" />
                <ellipse cx="250" cy="198" rx="88" ry="10" fill="rgba(255,255,255,0.10)" opacity="0.32" />
              </svg>
            </div>
            <div>
              <div className="text-[#c4b5fd] uppercase tracking-[0.1em] text-[0.72rem] font-bold mb-3">Livello 3 &middot; Premium</div>
              <h2 className="text-[clamp(2rem,4vw,3.2rem)] leading-[1] tracking-[-0.04em] font-[760]">
                Capsule
              </h2>
              <p className="mt-4 text-muted text-[1.08rem] leading-[1.72] max-w-lg">
                La versione premium: piu ambiente, meno mondo attorno. Non una capsula ermetica, ma un cockpit del sonno:
                semi-enclosed, ventilazione, reclinazione, sound masking, luce amber e gestione centralizzata.
              </p>
              <ul className="list-none mt-6 grid gap-3 text-muted text-[1rem]">
                {[
                  "Privacy morbida e canopy semi-aperto",
                  "Microclima controllato con ventilazione dedicata",
                  "Reclinazione motorizzata per comfort ottimale",
                  "Sound masking e luce amber integrati",
                  "Gestione centralizzata per hotel, spa e lounge",
                ].map((b) => (
                  <li key={b} className="gradient-bullet">{b}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="section-light py-28 relative">
        <div className="w-[min(1180px,calc(100%-40px))] mx-auto relative z-[1]">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2.5 px-3.5 py-2.5 rounded-full border border-[rgba(17,19,23,0.12)] bg-[rgba(17,19,23,0.03)] text-[rgba(17,19,23,0.66)] uppercase tracking-[0.08em] text-[0.72rem]">
              <span className="eyebrow-dot" />
              Confronto
            </span>
            <h2 className="mt-[18px] text-[clamp(2.3rem,4.8vw,4.1rem)] leading-[0.98] tracking-[-0.05em] font-[760]" style={{ textWrap: "balance" as never }}>
              Scegli il livello giusto per te.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-[18px]">
            {[
              {
                name: "Endormia OS",
                target: "Consumer",
                features: ["App iOS/Android", "Sleep Signature", "Routine audio", "Respirazione guidata", "Morning check-in"],
              },
              {
                name: "Deck",
                target: "Consumer + Prosumer",
                features: ["Tutto di OS", "Topper termoregolato", "Head module", "Vibrazione somatica", "Tasto fisico sleep"],
              },
              {
                name: "Capsule",
                target: "B2B Premium",
                features: ["Tutto di Deck", "Canopy semi-aperto", "Reclinazione", "Sound masking", "Gestione centralizzata"],
              },
            ].map((tier) => (
              <div
                key={tier.name}
                className="p-6 rounded-3xl border border-[rgba(17,19,23,0.1)] bg-white/[0.36] shadow-[0_16px_34px_rgba(17,19,23,0.06)]"
              >
                <div className="text-[rgba(17,19,23,0.5)] uppercase tracking-[0.1em] text-[0.7rem] mb-2">
                  {tier.target}
                </div>
                <h3 className="text-[1.4rem] leading-[1.15] tracking-[-0.03em] font-bold mb-6">
                  {tier.name}
                </h3>
                <ul className="grid gap-3">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-[0.95rem] text-[rgba(17,19,23,0.8)]">
                      <span className="w-4 h-4 rounded-full bg-[rgba(17,19,23,0.08)] flex items-center justify-center text-[0.6rem] text-[rgba(17,19,23,0.5)]">&#10003;</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 relative z-[1] border-t border-white/[0.04]">
        <div className="w-[min(800px,calc(100%-40px))] mx-auto relative z-[1] text-center">
          <h2 className="text-[clamp(2rem,4vw,3.2rem)] leading-[0.98] tracking-[-0.05em] font-[760]" style={{ textWrap: "balance" as never }}>
            Pronto a preparare il tuo sonno?
          </h2>
          <p className="mt-4 text-muted text-[1.08rem] leading-[1.72] max-w-lg mx-auto">
            Iscriviti alla waitlist per accesso anticipato a Endormia OS o contattaci per una demo Deck/Capsule.
          </p>
          <div className="flex items-center justify-center gap-3.5 mt-8">
            <Link
              href="/waitlist"
              className="inline-flex items-center justify-center gap-2.5 min-h-[46px] px-6 rounded-full bg-gradient-to-br from-[#edf2ff] to-[#d6e9ff] text-[#0a0d12] font-bold shadow-[0_10px_28px_rgba(160,182,255,0.16)] transition-all hover:-translate-y-[1px]"
            >
              Iscriviti alla waitlist
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
