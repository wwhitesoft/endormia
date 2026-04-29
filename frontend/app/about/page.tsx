import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "La Visione — Endormia",
  description: "La scienza del sonno e la visione dietro Endormia Sleep OS.",
};

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-28 pb-20 relative z-[1]">
        <div className="w-[min(1180px,calc(100%-40px))] mx-auto relative z-[1]">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2.5 px-3.5 py-2.5 rounded-full border border-white/10 bg-white/[0.03] text-muted uppercase tracking-[0.08em] text-[0.72rem]">
              <span className="eyebrow-dot" />
              La Visione
            </span>
            <h1 className="mt-6 text-[clamp(2.8rem,6vw,5rem)] leading-[0.94] tracking-[-0.055em] font-[780]" style={{ textWrap: "balance" as never }}>
              Il sonno non ha bisogno di piu tecnologia.{" "}
              <em className="font-serif italic font-[540] tracking-[-0.03em]">Ha bisogno di meno attrito.</em>
            </h1>
            <p className="mt-6 text-muted text-[1.14rem] leading-[1.75] max-w-2xl">
              Endormia nasce da un&apos;osservazione semplice: il mercato del sonno e' pieno di gadget separati
              che non comunicano tra loro. Un&apos;app fa rumore bianco, un device misura il battito, un topper
              raffredda il letto. Ma nessuno coordina l&apos;esperienza.
            </p>
          </div>
        </div>
      </section>

      {/* Science section (light) */}
      <section className="section-light py-28 relative">
        <div className="w-[min(1180px,calc(100%-40px))] mx-auto relative z-[1]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">
            <div>
              <span className="inline-flex items-center gap-2.5 px-3.5 py-2.5 rounded-full border border-[rgba(17,19,23,0.12)] bg-[rgba(17,19,23,0.03)] text-[rgba(17,19,23,0.66)] uppercase tracking-[0.08em] text-[0.72rem]">
                <span className="eyebrow-dot" />
                La Scienza
              </span>
              <h2 className="mt-[18px] text-[clamp(2.3rem,4.8vw,4.1rem)] leading-[0.98] tracking-[-0.05em] font-[760]" style={{ textWrap: "balance" as never }}>
                Cosa sappiamo del sonno oggi.
              </h2>
            </div>
            <div className="text-[rgba(17,19,23,0.76)] text-[1.08rem] leading-[1.75]">
              <p>
                La ricerca sul sonno ha identificato cinque leve ambientali fondamentali che influenzano
                la qualita dell&apos;addormentamento e del riposo: <strong>temperatura</strong>, <strong>luce</strong>,
                <strong> suono</strong>, <strong>postura</strong> e <strong>stimolazione tattile</strong> (vibrazione).
              </p>
              <p className="mt-4">
                Il corpo ha bisogno di abbassare la temperatura interna di circa 1-2 gradi per attivare
                il processo di addormentamento. La luce blu blocca la melatonina. Il rumore frammentato
                impedisce le transizioni tra le fasi del sonno. Ogni leva, presa da sola, aiuta.
                Ma e' la loro combinazione coordinata che fa la differenza reale.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-[18px] mt-12">
            {[
              { num: "01", title: "Termoregolazione", desc: "Il corpo deve raffreddarsi per dormire. Un ambiente a 18-19 gradi con un topper termoregolato accelera la transizione verso il sonno." },
              { num: "02", title: "Ambiente sonoro", desc: "Non serve silenzio assoluto. Serve coerenza: sound masking, fade progressivi, frequenze che non attivano la corteccia prefrontale." },
              { num: "03", title: "Luce e ritmo circadiano", desc: "L'esposizione serale a luce amber e la riduzione progressiva dell'intensita preparano il cervello al rilascio di melatonina naturale." },
            ].map((s) => (
              <article
                key={s.num}
                className="p-6 rounded-3xl border border-[rgba(17,19,23,0.1)] bg-white/[0.36] shadow-[0_16px_34px_rgba(17,19,23,0.06)]"
              >
                <div className="inline-flex items-center justify-center w-[34px] h-[34px] rounded-full bg-[rgba(17,19,23,0.06)] text-[rgba(17,19,23,0.78)] text-[0.82rem] font-bold mb-4">
                  {s.num}
                </div>
                <h3 className="text-[1.18rem] leading-[1.25] tracking-[-0.03em] font-semibold">
                  {s.title}
                </h3>
                <p className="mt-3 text-[0.98rem] leading-relaxed text-[rgba(17,19,23,0.74)]">
                  {s.desc}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Vision */}
      <section className="py-28 relative z-[1] border-t border-white/[0.04]">
        <div className="w-[min(1180px,calc(100%-40px))] mx-auto relative z-[1]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
            <div>
              <span className="inline-flex items-center gap-2.5 px-3.5 py-2.5 rounded-full border border-white/10 bg-white/[0.03] text-muted uppercase tracking-[0.08em] text-[0.72rem]">
                <span className="eyebrow-dot" />
                La Visione
              </span>
              <h2 className="mt-[18px] text-[clamp(2.3rem,4.8vw,4.1rem)] leading-[0.98] tracking-[-0.05em] font-[760]" style={{ textWrap: "balance" as never }}>
                Non un gadget. Un sistema operativo per il sonno.
              </h2>
              <p className="mt-4 text-muted text-[1.08rem] leading-[1.72] max-w-lg">
                Endormia e' progettato come piattaforma, non come prodotto singolo.
                La Sleep Signature impara cosa funziona per ogni persona e adatta
                l&apos;esperienza nel tempo. L&apos;hardware e' il mezzo, non il fine.
              </p>
            </div>

            <div className="grid gap-[18px]">
              {[
                { title: "Software-first", desc: "Partiamo dall'app per validare protocolli, linguaggio e rituali. Il software insegna cosa funziona prima di costruire hardware." },
                { title: "Hardware progressivo", desc: "Deck aggiunge temperatura, ventilazione e vibrazione. Capsule porta l'ambiente completo. Ogni livello e' opzionale." },
                { title: "Piattaforma aperta", desc: "Il protocollo Sleep Signature e' il moat. Puo integrare device di terze parti e scalare verso hospitality, spa e wellness." },
              ].map((v) => (
                <div
                  key={v.title}
                  className="p-6 rounded-[28px] border border-white/[0.08] bg-white/[0.03] shadow-md"
                >
                  <h3 className="text-[1.18rem] leading-[1.25] tracking-[-0.03em] font-semibold">
                    {v.title}
                  </h3>
                  <p className="mt-3 text-[0.98rem] leading-relaxed text-muted">
                    {v.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 relative z-[1] border-t border-white/[0.04]">
        <div className="w-[min(800px,calc(100%-40px))] mx-auto relative z-[1] text-center">
          <h2 className="text-[clamp(2rem,4vw,3.2rem)] leading-[0.98] tracking-[-0.05em] font-[760]" style={{ textWrap: "balance" as never }}>
            Vuoi saperne di piu?
          </h2>
          <p className="mt-4 text-muted text-[1.08rem] leading-[1.72] max-w-lg mx-auto">
            Iscriviti alla waitlist per accesso anticipato o contattaci per una demo dedicata.
          </p>
          <div className="flex items-center justify-center gap-3.5 mt-8 flex-wrap">
            <Link
              href="/waitlist"
              className="inline-flex items-center justify-center gap-2.5 min-h-[46px] px-6 rounded-full bg-gradient-to-br from-[#edf2ff] to-[#d6e9ff] text-[#0a0d12] font-bold shadow-[0_10px_28px_rgba(160,182,255,0.16)] transition-all hover:-translate-y-[1px]"
            >
              Richiedi anteprima
            </Link>
            <Link
              href="/products"
              className="inline-flex items-center justify-center gap-2.5 min-h-[46px] px-6 rounded-full border border-white/10 bg-white/[0.02] text-text transition-all hover:border-white/20 hover:bg-white/[0.04] hover:-translate-y-[1px]"
            >
              Scopri i prodotti
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
