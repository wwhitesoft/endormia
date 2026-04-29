import Link from "next/link";
import WaitlistForm from "@/components/WaitlistForm";

export default function Home() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="pt-[72px] pb-[72px] relative z-[1]">
        <div className="w-[min(1180px,calc(100%-40px))] mx-auto relative z-[1]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center min-h-[calc(100vh-76px-72px)]">
            {/* Copy */}
            <div className="max-w-[590px]">
              <span className="inline-flex items-center gap-2.5 px-3.5 py-2.5 rounded-full border border-white/10 bg-white/[0.03] text-muted uppercase tracking-[0.08em] text-[0.72rem]">
                <span className="eyebrow-dot" />
                Sleep OS &middot; app + deck + capsule
              </span>
              <h1 className="mt-[18px] mb-[18px] text-[clamp(3.2rem,7vw,6.15rem)] leading-[0.94] tracking-[-0.055em] font-[780]" style={{ textWrap: "balance" as never }}>
                Il sonno non si comanda.{" "}
                <em className="font-serif italic font-[540] tracking-[-0.03em]">
                  Si prepara.
                </em>
              </h1>
              <p className="max-w-[560px] text-muted text-[1.1rem] leading-[1.7]">
                Endormia coordina microclima, suono, vibrazione, luce e postura in una sequenza unica.
                Comincia con un&apos;app pensata per sparire. Cresce in un sistema fisico che toglie lavoro a chi vuole dormire.
              </p>
              <div className="flex items-center gap-3.5 mt-7 flex-wrap">
                <Link
                  href="/waitlist"
                  className="inline-flex items-center justify-center gap-2.5 min-h-[46px] px-[18px] rounded-full bg-gradient-to-br from-[#edf2ff] to-[#d6e9ff] text-[#0a0d12] font-bold shadow-[0_10px_28px_rgba(160,182,255,0.16)] transition-all hover:-translate-y-[1px]"
                >
                  Richiedi anteprima
                </Link>
                <Link
                  href="/products"
                  className="inline-flex items-center justify-center gap-2.5 min-h-[46px] px-[18px] rounded-full border border-white/10 bg-white/[0.02] text-text transition-all hover:border-white/20 hover:bg-white/[0.04] hover:-translate-y-[1px]"
                >
                  Guarda come funziona
                </Link>
              </div>
              <p className="mt-[18px] text-muted-2 text-[0.96rem]">
                Per casa, hotel, spa e wellness. Posizionamento wellness-first, senza claim medici.
              </p>

              {/* Mini grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-[34px]">
                {[
                  { label: "Endormia OS", title: "L'app che toglie attrito.", desc: "Routine in un tocco, UX notturna radicale, check-in leggero al mattino." },
                  { label: "Deck", title: "Il ponte verso l'hardware.", desc: "Temperatura locale, aria silenziosa, vibrazione lieve e tasto fisico sleep mode." },
                  { label: "Capsule", title: "L'ambiente completo.", desc: "Privacy morbida, reclinazione, sound masking e microclima controllato." },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="p-4 pb-[18px] rounded-[22px] border border-white/[0.08] bg-white/[0.03] shadow-md"
                  >
                    <div className="text-muted-2 uppercase tracking-[0.1em] text-[0.67rem] mb-2.5">
                      {item.label}
                    </div>
                    <strong className="block text-base leading-[1.2] mb-2">
                      {item.title}
                    </strong>
                    <span className="block text-muted text-[0.94rem] leading-[1.45]">
                      {item.desc}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual */}
            <div
              className="relative min-h-[500px] sm:min-h-[560px] lg:min-h-[660px] rounded-[40px] overflow-hidden border border-white/[0.08]"
              style={{
                background:
                  "radial-gradient(circle at 50% 36%, rgba(149, 170, 255, 0.16), transparent 22%), radial-gradient(circle at 30% 68%, rgba(142, 227, 255, 0.08), transparent 18%), linear-gradient(180deg, rgba(11,16,24,0.92), rgba(9,12,18,0.98))",
                boxShadow: "0 28px 90px rgba(0,0,0,0.42)",
              }}
              aria-label="Illustrazione concettuale della Endormia Capsule"
            >
              <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.03), transparent 24%, transparent 68%, rgba(255,255,255,0.03))" }} />
              <div
                className="absolute left-1/2 top-[52%] w-[520px] h-[520px] rounded-full animate-glow-pulse"
                style={{
                  transform: "translate(-50%, -50%)",
                  background: "radial-gradient(circle, rgba(153,174,255,0.18), rgba(153,174,255,0.02) 58%, transparent 70%)",
                  filter: "blur(20px)",
                }}
              />
              {/* Floating panels */}
              <div className="absolute top-6 right-7 sm:right-7 p-4 min-w-0 sm:min-w-[220px] max-w-[calc(100%-36px)] rounded-[18px] border border-white/10 bg-[rgba(10,14,20,0.68)] shadow-[0_16px_50px_rgba(0,0,0,0.28)] backdrop-blur-[18px]">
                <small className="block text-[0.72rem] text-muted-2 uppercase tracking-[0.08em] mb-2">Protocollo attivo</small>
                <strong className="block text-base leading-[1.28]">19.2&deg;C &middot; fade audio &middot; vibro low &middot; reclinazione lieve</strong>
              </div>
              <div className="absolute left-7 bottom-7 p-4 min-w-[190px] max-w-[calc(100%-36px)] rounded-[18px] border border-white/10 bg-[rgba(10,14,20,0.68)] shadow-[0_16px_50px_rgba(0,0,0,0.28)] backdrop-blur-[18px]">
                <small className="block text-[0.72rem] text-muted-2 uppercase tracking-[0.08em] mb-2">Modalita</small>
                <strong className="block text-base leading-[1.28]">Dormi ora</strong>
              </div>
              {/* Capsule SVG */}
              <div className="absolute grid place-items-center" style={{ inset: "110px 48px 72px" }}>
                <CapsuleSVG />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Statement (light) ── */}
      <section className="section-light py-28 relative">
        <div className="w-[min(1180px,calc(100%-40px))] mx-auto relative z-[1]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <span className="inline-flex items-center gap-2.5 px-3.5 py-2.5 rounded-full border border-[rgba(17,19,23,0.12)] bg-[rgba(17,19,23,0.03)] text-[rgba(17,19,23,0.66)] uppercase tracking-[0.08em] text-[0.72rem]">
                <span className="eyebrow-dot" />
                Manifesto
              </span>
              <h2 className="mt-[18px] text-[clamp(2.4rem,5vw,4.45rem)] leading-[0.98] tracking-[-0.05em] font-[760]" style={{ textWrap: "balance" as never }}>
                Dormire meglio non e' questione di forza di volonta. E' questione di{" "}
                <em className="font-serif italic font-[540] tracking-[-0.03em]">attrito.</em>
              </h2>
            </div>
            <div>
              <p className="text-[rgba(17,19,23,0.76)] text-[1.14rem] leading-[1.75] max-w-[620px]">
                Oggi il sonno e' frammentato: un&apos;app fa l&apos;audio, un device misura, un altro raffredda.
                Endormia mette questi pezzi sotto una sola regia. Non promette magie. Costruisce condizioni piu calme,
                piu semplici, piu coerenti con il momento in cui una persona deve staccare davvero.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-[18px] mt-[38px]">
            {[
              { idx: "01", title: "Meno decisioni nel momento peggiore.", desc: "Di notte l'interfaccia deve sparire. Un tocco, una sequenza, niente librerie infinite e zero frizione inutile." },
              { idx: "02", title: "Un protocollo, non gadget scollegati.", desc: "Microclima, suono, vibrazione e luce hanno senso quando entrano insieme, con una logica unica e misurabile." },
              { idx: "03", title: "Una roadmap credibile.", desc: "Prima software per imparare. Poi hardware base. Infine capsule premium per hospitality, spa e wellness." },
            ].map((r) => (
              <article
                key={r.idx}
                className="p-6 rounded-3xl border border-[rgba(17,19,23,0.1)] bg-white/[0.36] shadow-[0_16px_34px_rgba(17,19,23,0.06)]"
              >
                <div className="inline-flex items-center justify-center w-[34px] h-[34px] rounded-full bg-[rgba(17,19,23,0.06)] text-[rgba(17,19,23,0.78)] text-[0.82rem] font-bold mb-4">
                  {r.idx}
                </div>
                <h3 className="text-[1.18rem] leading-[1.25] tracking-[-0.03em] font-semibold">
                  {r.title}
                </h3>
                <p className="mt-3 text-[0.98rem] leading-relaxed text-[rgba(17,19,23,0.74)]">
                  {r.desc}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Products (dark) ── */}
      <section className="py-28 relative z-[1] border-t border-white/[0.04]" id="sistema">
        <div className="w-[min(1180px,calc(100%-40px))] mx-auto relative z-[1]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-[42px] items-end mb-[42px]">
            <div>
              <span className="inline-flex items-center gap-2.5 px-3.5 py-2.5 rounded-full border border-white/10 bg-white/[0.03] text-muted uppercase tracking-[0.08em] text-[0.72rem]">
                <span className="eyebrow-dot" />
                Il sistema
              </span>
              <h2 className="mt-[18px] text-[clamp(2.3rem,4.8vw,4.1rem)] leading-[0.98] tracking-[-0.05em] font-[760]" style={{ textWrap: "balance" as never }}>
                Tre livelli. Una sola esperienza.
              </h2>
            </div>
            <p className="text-muted text-[1.08rem] leading-[1.72] max-w-[640px] lg:justify-self-end">
              L&apos;idea non e' partire da una navicella fantascientifica e riempirla di feature. L&apos;idea e' costruire una sequenza che funziona,
              poi darle sempre piu corpo: prima con l&apos;app, poi con Deck, poi con Capsule.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-[18px]">
            <ProductCard
              label="Endormia OS"
              title="L'app che non cerca attenzione. La toglie."
              desc="Tre modalita bastano: dormi ora, mi sono svegliato, routine serale. L'obiettivo non e' far stare l'utente nell'app. E' farlo uscire dallo schermo il prima possibile."
              bullets={["UX notturna essenziale", "Routine audio e respirazione guidata", "Morning check-in e logica adattiva"]}
              visual="os"
            />
            <ProductCard
              label="Deck"
              title="Il ponte fisico tra protocollo e stanza."
              desc="Deck porta nel letto cio' che l'app da sola non puo' dare: temperatura locale, aria silenziosa, vibrazione lieve e un gesto fisico semplice per attivare la sleep mode."
              bullets={["Topper termoregolato", "Head module con microventilazione", "Tasto fisico sleep mode e fail-safe locale"]}
              visual="deck"
            />
            <ProductCard
              label="Capsule"
              title="La versione premium: piu ambiente, meno mondo attorno."
              desc="Non una capsula ermetica, ma un cockpit del sonno: semi-enclosed, ventilazione, reclinazione, sound masking, luce amber e gestione centralizzata per hospitality e wellness."
              bullets={["Privacy morbida e canopy semi-aperto", "Microclima controllato e reclinazione", "Esperienza B2B per hotel, spa e lounge"]}
              visual="capsule"
            />
          </div>
        </div>
      </section>

      {/* ── Experience ── */}
      <section className="py-28 relative z-[1] border-t border-white/[0.04]" id="esperienza">
        <div className="w-[min(1180px,calc(100%-40px))] mx-auto relative z-[1]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="lg:sticky lg:top-[108px] lg:self-start">
              <span className="inline-flex items-center gap-2.5 px-3.5 py-2.5 rounded-full border border-white/10 bg-white/[0.03] text-muted uppercase tracking-[0.08em] text-[0.72rem]">
                <span className="eyebrow-dot" />
                Esperienza
              </span>
              <h2 className="mt-[18px] text-[clamp(2.3rem,4.8vw,4.1rem)] leading-[0.98] tracking-[-0.05em] font-[760]" style={{ textWrap: "balance" as never }}>
                Non promettiamo magia. Progettiamo le condizioni giuste.
              </h2>
              <p className="text-muted text-[1.08rem] leading-[1.72] max-w-[540px] mt-4">
                Il valore di Endormia non e' la singola feature. E' la combinazione dei segnali nel momento giusto. Luce, temperatura,
                suono, vibrazione e postura devono entrare con discrezione, non come un&apos;altra interfaccia che chiede attenzione.
              </p>
              <div className="mt-[22px] p-7 rounded-[28px] border border-white/[0.08] shadow-md" style={{ background: "linear-gradient(180deg, rgba(18,24,34,0.72), rgba(10,14,20,0.92))" }}>
                <blockquote className="text-[clamp(1.6rem,2.6vw,2.35rem)] leading-[1.1] tracking-[-0.04em] max-w-[14ch]" style={{ textWrap: "balance" as never }}>
                  &ldquo;Il vero prodotto non e' la capsula. E' la sensazione che la stanza stia gia facendo il lavoro per te.&rdquo;
                </blockquote>
                <p className="mt-4 text-muted leading-relaxed text-[0.98rem]">
                  Per questo il moat e' la <span className="text-muted">Sleep Signature</span>: il protocollo personalizzato che si adatta alla persona, non il singolo componente hardware.
                </p>
              </div>
            </div>

            <div className="grid gap-[18px]">
              {[
                { idx: "01", top: "Capisce il contesto", title: "Stanco ma lucido? Risveglio notturno? Ambiente rumoroso?", desc: "Il sistema parte da tre scenari reali, non da un catalogo infinito. In pochi secondi sceglie il protocollo giusto e riduce il numero di decisioni da prendere di notte." },
                { idx: "02", top: "Abbassa il carico sensoriale", title: "Aria, temperatura locale, suono e vibrazione entrano insieme.", desc: "Ogni stimolo e' lieve, coordinato e progressivo. Niente gimmick separati. Il sistema accompagna il passaggio verso una modalita piu calma, piu fresca, piu semplice." },
                { idx: "03", top: "Ricorda cio che funziona", title: "Un check-in leggero il mattino dopo affina la Sleep Signature.", desc: "Non un tracker ossessivo. Solo l'informazione minima che serve a capire se per quella persona funzionano meglio aria piu fresca, fade audio, vibrazione lieve o reclinazione." },
              ].map((item) => (
                <article
                  key={item.idx}
                  className="grid grid-cols-[60px_1fr] sm:grid-cols-[72px_1fr] gap-[18px] p-6 rounded-[28px] border border-white/[0.08] bg-white/[0.03] shadow-md"
                >
                  <div className="w-14 h-14 rounded-[18px] grid place-items-center bg-gradient-to-b from-white/[0.08] to-white/[0.03] text-text text-base font-bold border border-white/10">
                    {item.idx}
                  </div>
                  <div>
                    <small className="block text-muted-2 uppercase tracking-[0.1em] text-[0.72rem] mb-2.5">
                      {item.top}
                    </small>
                    <h3 className="text-[1.18rem] leading-[1.25] tracking-[-0.03em] font-semibold">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-[0.98rem] leading-relaxed text-muted">
                      {item.desc}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Destinations (light) ── */}
      <section className="section-light py-28 relative" id="destinazioni">
        <div className="w-[min(1180px,calc(100%-40px))] mx-auto relative z-[1]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-[42px] items-end mb-[42px]">
            <div>
              <span className="inline-flex items-center gap-2.5 px-3.5 py-2.5 rounded-full border border-[rgba(17,19,23,0.12)] bg-[rgba(17,19,23,0.03)] text-[rgba(17,19,23,0.66)] uppercase tracking-[0.08em] text-[0.72rem]">
                <span className="eyebrow-dot" />
                Destinazioni
              </span>
              <h2 className="mt-[18px] text-[clamp(2.3rem,4.8vw,4.1rem)] leading-[0.98] tracking-[-0.05em] font-[760]" style={{ textWrap: "balance" as never }}>
                Dove ha senso vivere davvero.
              </h2>
            </div>
            <p className="text-[rgba(17,19,23,0.74)] text-[1.08rem] leading-[1.72] max-w-[640px] lg:justify-self-end">
              Endormia puo nascere come software consumer, ma il salto di valore piu forte e' nell&apos;hospitality premium e nel wellness:
              luoghi dove una sleep experience percepibile giustifica design, hardware e servizio.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[18px]">
            {[
              { num: "01", label: "Casa", title: "Per chi ha la mente accesa, soffre il caldo o vive nel rumore.", desc: "La versione piu semplice: partire in un tocco, senza trasformare la camera in una sala controllo." },
              { num: "02", label: "Hotel premium", title: "Una camera che non vende solo letto. Vende decompressione.", desc: "Sleep experience integrata come differenza reale di servizio e posizionamento del brand." },
              { num: "03", label: "Spa & wellness", title: "Wind-down, recovery e reset guidati in uno spazio dedicato.", desc: "Sessioni brevi o rituali serali con una qualita ambientale piu tangibile del solo audio." },
              { num: "04", label: "Lounge", title: "Comfort immediato dove il riposo breve deve funzionare subito.", desc: "Aeroporti, recovery room, club privati: esperienze ad alto valore in poco tempo." },
            ].map((d) => (
              <article
                key={d.num}
                className="p-6 rounded-[26px] border border-white/[0.08] bg-white/[0.03] shadow-md min-h-[220px] flex flex-col justify-between"
              >
                <div>
                  <small className="block text-muted-2 uppercase tracking-[0.1em] text-[0.72rem] mb-2.5">
                    {d.label}
                  </small>
                  <strong className="text-[1.28rem] leading-[1.12] tracking-[-0.04em] block mt-[18px]">
                    {d.title}
                  </strong>
                  <p className="mt-3 text-[0.98rem] leading-relaxed text-[rgba(17,19,23,0.74)]">
                    {d.desc}
                  </p>
                </div>
                <div className="text-[2.4rem] leading-none tracking-[-0.06em] text-[rgba(17,19,23,0.14)] font-[760] mt-4">
                  {d.num}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-28 relative z-[1] border-t border-white/[0.04]" id="faq">
        <div className="w-[min(1180px,calc(100%-40px))] mx-auto relative z-[1]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-[42px] items-start">
            <div>
              <span className="inline-flex items-center gap-2.5 px-3.5 py-2.5 rounded-full border border-white/10 bg-white/[0.03] text-muted uppercase tracking-[0.08em] text-[0.72rem]">
                <span className="eyebrow-dot" />
                FAQ
              </span>
              <h2 className="mt-[18px] text-[clamp(2.3rem,4.8vw,4.1rem)] leading-[0.98] tracking-[-0.05em] font-[760]" style={{ textWrap: "balance" as never }}>
                Le domande che arrivano subito.
              </h2>
              <p className="text-muted text-[1.08rem] leading-[1.72] max-w-[520px] mt-4">
                Linguaggio pulito: wellness, microclima, esperienza, protocollo. Niente promesse impossibili. Niente territorio medicale raccontato male.
              </p>
            </div>

            <div className="grid gap-3">
              <FAQItem question="Endormia e' un dispositivo medico?" defaultOpen>
                No. E' presentato come sistema wellness pensato per rilassamento, wind-down e condizioni migliori per addormentarsi. Per insonnia persistente o altri disturbi serve un percorso clinico appropriato.
              </FAQItem>
              <FAQItem question="Si parte dall'app o dall'hardware?">
                Dall&apos;app. E' il modo piu rapido per validare rituali, linguaggio e protocolli. Deck arriva dopo come ponte hardware. Capsule e' una terza fase, soprattutto B2B premium.
              </FAQItem>
              <FAQItem question="Che cosa rende il progetto difendibile?">
                La Sleep Signature: il protocollo personalizzato che impara quali combinazioni di microclima, audio, vibrazione e postura aiutano davvero quella persona in quel contesto.
              </FAQItem>
              <FAQItem question="Capsule e' pensata per casa o per business?">
                Piu credibilmente per hotel, spa, wellness club e lounge. In casa il Deck e' molto piu realistico come primo hardware. La capsule puo arrivare dopo, quando il brand e il protocollo sono maturi.
              </FAQItem>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-28 relative z-[1] border-t border-white/[0.04]" id="anteprima">
        <div className="w-[min(1180px,calc(100%-40px))] mx-auto relative z-[1]">
          <div
            className="p-7 sm:p-[38px] rounded-[34px] border border-white/[0.08] shadow-[0_26px_80px_rgba(0,0,0,0.34)]"
            style={{
              background:
                "radial-gradient(circle at 100% 0%, rgba(153,174,255,0.12), transparent 34%), linear-gradient(180deg, rgba(15,19,28,0.92), rgba(10,14,20,0.98))",
            }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_minmax(340px,0.72fr)] gap-[30px] items-start">
              <div>
                <div className="block text-muted-2 uppercase tracking-[0.1em] text-[0.72rem] mb-2.5">
                  Anteprima &middot; waitlist &middot; partnership
                </div>
                <h2 className="mt-3.5 text-[clamp(2.4rem,5vw,4rem)] leading-[0.98] tracking-[-0.05em] font-[760]" style={{ textWrap: "balance" as never }}>
                  Vuoi vedere Endormia prendere{" "}
                  <em className="font-serif italic font-[540] tracking-[-0.03em]">forma</em> davvero?
                </h2>
                <p className="mt-4 text-muted leading-[1.72] text-[1.04rem] max-w-[520px]">
                  Questa pagina e' la base per una waitlist, una demo pre-seed o una proposta partnership.
                  Luxury hospitality, VC deck page o DTC consumer: scegli il percorso che ti interessa.
                </p>
                <div className="flex flex-wrap gap-2.5 mt-[22px]">
                  {["Waitlist privata", "Pilot hotel & spa", "Brand concept", "Roadmap app > deck > capsule"].map((p) => (
                    <span key={p} className="py-2 px-3 rounded-full border border-white/[0.08] bg-white/[0.03] text-muted text-[0.88rem]">
                      {p}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-6 rounded-[28px] border border-white/[0.08] bg-white/[0.03] shadow-md">
                <h3 className="text-[1.18rem] leading-[1.25] tracking-[-0.03em] font-semibold">
                  Richiedi accesso
                </h3>
                <p className="mt-3 text-[0.98rem] leading-relaxed text-muted">
                  Compila il form e ti contatteremo per early access, demo o partnership.
                </p>
                <WaitlistForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

/* ── Sub-components ── */

function ProductCard({
  label,
  title,
  desc,
  bullets,
  visual,
}: {
  label: string;
  title: string;
  desc: string;
  bullets: string[];
  visual: "os" | "deck" | "capsule";
}) {
  return (
    <article
      className="grid grid-rows-[260px_auto] rounded-[30px] overflow-hidden border border-white/[0.08] shadow-md"
      style={{
        background:
          "linear-gradient(180deg, rgba(18,24,34,0.86), rgba(10,14,20,0.98))",
      }}
    >
      <div
        className="relative border-b border-white/[0.06] overflow-hidden"
        style={{
          background:
            "radial-gradient(circle at 50% 30%, rgba(153,174,255,0.14), transparent 28%), linear-gradient(180deg, rgba(255,255,255,0.02), transparent 42%)",
        }}
        aria-hidden="true"
      >
        <ProductVisualSVG type={visual} />
        <div className="absolute bottom-[18px] left-6 right-6 h-3.5 rounded-full bg-gradient-to-r from-white/[0.03] via-white/[0.08] to-white/[0.03] opacity-60" />
      </div>
      <div className="p-[22px] pb-6">
        <div className="text-muted-2 uppercase tracking-[0.1em] text-[0.7rem] mb-3">
          {label}
        </div>
        <h3 className="text-[1.18rem] leading-[1.25] tracking-[-0.03em] font-semibold">
          {title}
        </h3>
        <p className="mt-3 text-[0.98rem] leading-relaxed text-muted">{desc}</p>
        <ul className="list-none mt-4 grid gap-2.5 text-muted text-[0.95rem]">
          {bullets.map((b) => (
            <li key={b} className="gradient-bullet">
              {b}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

function ProductVisualSVG({ type }: { type: "os" | "deck" | "capsule" }) {
  if (type === "os") {
    return (
      <svg viewBox="0 0 500 260" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 w-full h-full">
        <defs>
          <radialGradient id="osGlow" cx="50%" cy="48%" r="35%">
            <stop offset="0%" stopColor="rgba(142,227,255,0.88)" />
            <stop offset="100%" stopColor="rgba(142,227,255,0)" />
          </radialGradient>
          <linearGradient id="phone" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="rgba(30,39,57,0.95)" />
            <stop offset="100%" stopColor="rgba(10,14,22,0.98)" />
          </linearGradient>
        </defs>
        <circle cx="250" cy="118" r="86" fill="url(#osGlow)" opacity="0.58" />
        <rect x="142" y="44" width="216" height="168" rx="30" fill="url(#phone)" stroke="rgba(255,255,255,0.12)" strokeWidth="2" />
        <rect x="164" y="62" width="172" height="132" rx="24" fill="rgba(9,14,22,0.88)" />
        <circle cx="250" cy="128" r="24" fill="rgba(142,227,255,0.88)" />
        <circle cx="250" cy="128" r="40" fill="rgba(153,174,255,0.22)" />
      </svg>
    );
  }
  if (type === "deck") {
    return (
      <svg viewBox="0 0 500 260" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 w-full h-full">
        <defs>
          <linearGradient id="deckGlow" x1="0" x2="1">
            <stop offset="0%" stopColor="rgba(142,227,255,0.7)" />
            <stop offset="100%" stopColor="rgba(153,174,255,0.7)" />
          </linearGradient>
          <linearGradient id="deckBase" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="rgba(25,34,48,0.95)" />
            <stop offset="100%" stopColor="rgba(10,14,22,0.98)" />
          </linearGradient>
        </defs>
        <ellipse cx="250" cy="190" rx="128" ry="20" fill="rgba(255,255,255,0.1)" opacity="0.24" />
        <rect x="122" y="122" width="228" height="34" rx="17" fill="url(#deckBase)" stroke="rgba(255,255,255,0.12)" strokeWidth="2" />
        <rect x="148" y="126" width="126" height="8" rx="4" fill="url(#deckGlow)" opacity="0.75" />
        <rect x="346" y="102" width="66" height="64" rx="20" fill="rgba(12,18,28,0.95)" stroke="rgba(255,255,255,0.12)" strokeWidth="2" />
        <circle cx="379" cy="134" r="16" fill="rgba(153,174,255,0.16)" />
        <circle cx="379" cy="134" r="8" fill="rgba(142,227,255,0.88)" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 500 260" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 w-full h-full">
      <defs>
        <linearGradient id="capsuleGlass2" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="rgba(255,255,255,0.24)" />
          <stop offset="100%" stopColor="rgba(153,174,255,0.08)" />
        </linearGradient>
      </defs>
      <path d="M124 176C124 110 176 66 250 66C324 66 376 110 376 176" fill="url(#capsuleGlass2)" stroke="rgba(255,255,255,0.42)" strokeWidth="2" />
      <rect x="150" y="152" width="200" height="48" rx="24" fill="rgba(18,24,34,0.92)" stroke="rgba(255,255,255,0.12)" strokeWidth="2" />
      <rect x="182" y="166" width="138" height="18" rx="9" fill="rgba(255,255,255,0.08)" />
      <ellipse cx="250" cy="198" rx="88" ry="10" fill="rgba(255,255,255,0.10)" opacity="0.32" />
    </svg>
  );
}

function CapsuleSVG() {
  return (
    <svg viewBox="0 0 900 760" role="img" aria-label="Illustrazione di una capsula del sonno semi-aperta" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <radialGradient id="g1" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor="rgba(153,174,255,0.95)" />
          <stop offset="55%" stopColor="rgba(153,174,255,0.18)" />
          <stop offset="100%" stopColor="rgba(153,174,255,0)" />
        </radialGradient>
        <linearGradient id="glass" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="rgba(255,255,255,0.30)" />
          <stop offset="35%" stopColor="rgba(160,184,255,0.13)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0.03)" />
        </linearGradient>
        <linearGradient id="shell" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="rgba(236,241,255,0.20)" />
          <stop offset="100%" stopColor="rgba(118,135,186,0.08)" />
        </linearGradient>
        <linearGradient id="bed" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="rgba(36,49,76,0.95)" />
          <stop offset="100%" stopColor="rgba(9,14,24,0.95)" />
        </linearGradient>
        <linearGradient id="rim" x1="0" x2="1">
          <stop offset="0%" stopColor="rgba(255,255,255,0.75)" />
          <stop offset="50%" stopColor="rgba(142,227,255,0.56)" />
          <stop offset="100%" stopColor="rgba(153,174,255,0.68)" />
        </linearGradient>
        <filter id="blur40" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="30" />
        </filter>
        <filter id="blur16" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="12" />
        </filter>
      </defs>
      <ellipse cx="450" cy="620" rx="225" ry="26" fill="rgba(255,255,255,0.10)" filter="url(#blur16)" opacity="0.42" />
      <circle cx="450" cy="360" r="225" fill="url(#g1)" filter="url(#blur40)" opacity="0.48" />
      <path d="M182 516C182 336 302 220 450 220C598 220 718 336 718 516" fill="url(#glass)" stroke="rgba(255,255,255,0.48)" strokeWidth="3" />
      <path d="M220 516C220 360 320 256 450 256C580 256 680 360 680 516" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="2" />
      <path d="M250 516C250 378 336 288 450 288C564 288 650 378 650 516" fill="none" stroke="rgba(142,227,255,0.22)" strokeWidth="2" />
      <rect x="222" y="472" width="456" height="112" rx="52" fill="url(#shell)" stroke="rgba(255,255,255,0.12)" strokeWidth="2" />
      <rect x="274" y="496" width="352" height="62" rx="31" fill="url(#bed)" stroke="rgba(255,255,255,0.08)" strokeWidth="2" />
      <rect x="565" y="494" width="52" height="66" rx="24" fill="rgba(160,176,255,0.18)" />
      <rect x="326" y="502" width="165" height="16" rx="8" fill="rgba(255,255,255,0.06)" />
      <rect x="324" y="516" width="238" height="20" rx="10" fill="rgba(255,255,255,0.03)" />
      <rect x="408" y="412" width="84" height="126" rx="42" fill="rgba(186,198,255,0.18)" stroke="rgba(255,255,255,0.14)" strokeWidth="2" />
      <rect x="423" y="430" width="54" height="90" rx="27" fill="rgba(255,255,255,0.08)" />
      <path d="M260 516H640" stroke="url(#rim)" strokeWidth="3" opacity="0.75" />
      <circle cx="310" cy="532" r="6" fill="rgba(142,227,255,0.9)" />
      <circle cx="592" cy="532" r="6" fill="rgba(153,174,255,0.9)" />
      <path d="M170 518C190 518 202 502 210 482C228 434 248 426 272 426" fill="none" stroke="rgba(142,227,255,0.5)" strokeWidth="3" strokeLinecap="round" />
      <path d="M730 518C710 518 698 502 690 482C672 434 652 426 628 426" fill="none" stroke="rgba(153,174,255,0.4)" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function FAQItem({
  question,
  children,
  defaultOpen,
}: {
  question: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  return (
    <details
      className="rounded-[22px] border border-white/[0.08] bg-white/[0.03] overflow-hidden shadow-md group"
      open={defaultOpen}
    >
      <summary className="list-none flex items-center justify-between gap-4 px-[22px] py-5 cursor-pointer [&::-webkit-details-marker]:hidden">
        <span className="text-[1.18rem] leading-[1.25] tracking-[-0.03em] font-semibold">
          {question}
        </span>
        <span className="text-[1.2rem] text-muted-2 transition-transform duration-[180ms] group-open:rotate-45 flex-shrink-0">
          +
        </span>
      </summary>
      <div className="px-[22px] pb-5">
        <p className="text-[0.98rem] leading-relaxed text-muted">{children}</p>
      </div>
    </details>
  );
}
