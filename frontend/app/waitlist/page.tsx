import type { Metadata } from "next";
import WaitlistForm from "@/components/WaitlistForm";

export const metadata: Metadata = {
  title: "Waitlist — Endormia",
  description: "Iscriviti alla waitlist di Endormia per accesso anticipato allo Sleep OS.",
};

export default function WaitlistPage() {
  return (
    <section className="py-28 relative z-[1]">
      <div className="w-[min(800px,calc(100%-40px))] mx-auto relative z-[1]">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2.5 px-3.5 py-2.5 rounded-full border border-white/10 bg-white/[0.03] text-muted uppercase tracking-[0.08em] text-[0.72rem]">
            <span className="eyebrow-dot" />
            Early Access
          </span>
          <h1 className="mt-6 text-[clamp(2.4rem,5vw,4rem)] leading-[0.98] tracking-[-0.05em] font-[760]">
            Entra nella waitlist di Endormia.
          </h1>
          <p className="mt-4 text-muted text-[1.08rem] leading-[1.72] max-w-lg mx-auto">
            Stiamo costruendo lo Sleep OS che coordina microclima, suono, vibrazione, luce e postura.
            Iscriviti per accesso anticipato, demo o partnership.
          </p>
        </div>

        <div
          className="p-8 rounded-[34px] border border-white/[0.08] shadow-[0_26px_80px_rgba(0,0,0,0.34)]"
          style={{
            background:
              "radial-gradient(circle at 100% 0%, rgba(153,174,255,0.12), transparent 34%), linear-gradient(180deg, rgba(15,19,28,0.92), rgba(10,14,20,0.98))",
          }}
        >
          <h2 className="text-[1.18rem] leading-[1.25] tracking-[-0.03em] font-semibold">
            Richiedi accesso
          </h2>
          <p className="mt-3 text-[0.98rem] leading-relaxed text-muted">
            Compila il form qui sotto. Ti contatteremo per early access, demo o informazioni su partnership.
          </p>
          <WaitlistForm />
        </div>

        {/* What you get */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-[18px] mt-12">
          {[
            { title: "Accesso anticipato", desc: "Prova lo Sleep OS prima del lancio pubblico. Feedback diretto col team." },
            { title: "Demo personalizzata", desc: "Sessione dedicata per hotel, spa e wellness. Scopri come integrare Endormia." },
            { title: "Partnership", desc: "Collabora con noi per portare lo Sleep OS nel tuo spazio: hospitality, lounge, residenze." },
          ].map((item) => (
            <div
              key={item.title}
              className="p-6 rounded-[22px] border border-white/[0.08] bg-white/[0.03] shadow-md"
            >
              <h3 className="text-base font-semibold mb-2">{item.title}</h3>
              <p className="text-[0.94rem] leading-relaxed text-muted">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
