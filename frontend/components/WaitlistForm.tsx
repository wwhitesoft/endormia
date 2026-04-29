"use client";

import { useState, FormEvent } from "react";

export default function WaitlistForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Errore nel salvataggio");
      setStatus("success");
      setMessage("Richiesta ricevuta. Ti contatteremo presto.");
      form.reset();
    } catch {
      setStatus("error");
      setMessage("Si e' verificato un errore. Riprova.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-3 mt-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="grid gap-2">
          <label htmlFor="name" className="text-[0.9rem] text-muted">
            Nome
          </label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Il tuo nome"
            required
            className="w-full min-h-[52px] px-4 py-3.5 rounded-2xl border border-white/[0.08] bg-white/[0.04] text-text outline-none transition-all focus:border-accent/[0.38] focus:bg-white/[0.06] placeholder:text-[#8a8f99]"
          />
        </div>
        <div className="grid gap-2">
          <label htmlFor="email" className="text-[0.9rem] text-muted">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="nome@azienda.com"
            required
            className="w-full min-h-[52px] px-4 py-3.5 rounded-2xl border border-white/[0.08] bg-white/[0.04] text-text outline-none transition-all focus:border-accent/[0.38] focus:bg-white/[0.06] placeholder:text-[#8a8f99]"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="grid gap-2">
          <label htmlFor="interest" className="text-[0.9rem] text-muted">
            Profilo
          </label>
          <select
            id="interest"
            name="interest"
            className="w-full min-h-[52px] px-4 py-3.5 rounded-2xl border border-white/[0.08] bg-white/[0.04] text-text outline-none transition-all focus:border-accent/[0.38] focus:bg-white/[0.06]"
          >
            <option>Founder / investor</option>
            <option>Hotel / hospitality</option>
            <option>Spa / wellness</option>
            <option>Utente early adopter</option>
          </select>
        </div>
        <div className="grid gap-2">
          <label htmlFor="timeline" className="text-[0.9rem] text-muted">
            Tempistica
          </label>
          <select
            id="timeline"
            name="timeline"
            className="w-full min-h-[52px] px-4 py-3.5 rounded-2xl border border-white/[0.08] bg-white/[0.04] text-text outline-none transition-all focus:border-accent/[0.38] focus:bg-white/[0.06]"
          >
            <option>Appena possibile</option>
            <option>Entro 3 mesi</option>
            <option>Entro 6 mesi</option>
            <option>Sto solo osservando</option>
          </select>
        </div>
      </div>
      <div className="grid gap-2">
        <label htmlFor="message" className="text-[0.9rem] text-muted">
          Messaggio
        </label>
        <textarea
          id="message"
          name="message"
          placeholder="Raccontami in breve cosa ti interessa: waitlist, demo, partnership hotel, ecc."
          className="w-full min-h-[120px] px-4 py-3.5 rounded-2xl border border-white/[0.08] bg-white/[0.04] text-text outline-none transition-all focus:border-accent/[0.38] focus:bg-white/[0.06] placeholder:text-[#8a8f99] resize-y"
        />
      </div>
      <div className="flex items-center justify-between gap-3.5 mt-4 flex-wrap">
        <p className="text-muted-2 text-[0.88rem] leading-relaxed max-w-xs">
          Endormia e' un sistema wellness-first. Nessun uso dei dati per advertising. Nessun claim clinico.
        </p>
        <button
          type="submit"
          disabled={status === "loading"}
          className="inline-flex items-center justify-center gap-2.5 min-h-[46px] px-[18px] rounded-full bg-gradient-to-br from-[#edf2ff] to-[#d6e9ff] text-[#0a0d12] font-bold shadow-[0_10px_28px_rgba(160,182,255,0.16)] transition-all hover:-translate-y-[1px] disabled:opacity-50"
        >
          {status === "loading" ? "Invio..." : "Invia richiesta"}
        </button>
      </div>
      {message && (
        <p
          className={`mt-3 min-h-[22px] text-[0.9rem] ${
            status === "success" ? "text-[#cfd9ff]" : "text-red-400"
          }`}
          aria-live="polite"
        >
          {message}
        </p>
      )}
    </form>
  );
}
