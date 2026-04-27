"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { REPERTOIRE_CATEGORIES_ES as REPERTOIRE_CATEGORIES } from "@/content/repertoire-es";
import { pdf } from "@react-pdf/renderer";
import MyShowPdf from "./MyShowPdf";

const BAND_AVATARS = [
  { name: "Chris", role: "DJ + productor", initial: "C", color: "bg-savage-yellow text-savage-ink" },
  { name: "Marc", role: "Batería", initial: "M", color: "bg-savage-red text-savage-cream" },
  { name: "Joel", role: "Saxo", initial: "J", color: "bg-savage-cream text-savage-ink" },
  { name: "Pau", role: "Guitarra", initial: "P", color: "bg-savage-ink text-savage-yellow border border-savage-yellow/40" },
];

const CROWD_VIBES = [
  "Aguantan toda la noche",
  "Se rinden a la 1",
  "Bailan cualquier cosa",
  "Necesitan calentar",
  "Generaciones mezcladas",
  "Mucha familia mayor",
  "Crew joven, 25-35",
  "Reggaetón sí",
  "Reggaetón no",
];

const LIVE_GENRES = [
  "Pop",
  "Rock clásico",
  "Hip hop · R&B",
  "Funk · Disco",
  "80's",
  "90's · 2000's",
  "Indie español",
  "Latin · Reggaetón",
  "Soul · Motown",
];

type FirstDance = "dj" | "none" | null;
type DressCode = "savage" | "suits" | null;
type PartyKind = "cocktail" | "party" | null;

function liveDurationMinutes(kind: PartyKind): number {
  return kind === "cocktail" ? 90 : 120;
}

function liveDurationLabel(kind: PartyKind): string {
  return kind === "cocktail" ? "1h 30min" : "2h";
}

type Plan = {
  names: string;
  eventDate: string;
  partyKind: PartyKind;
  partyStart: string;
  venue: string;
  phone: string;
  email: string;
  guests: string;
  ages: string;
  crowdVibes: string[];
  dressCode: DressCode;
  liveGenres: string[];
  liveSet: string[];
  breakSongs: string;
  firstDance: FirstDance;
  firstDanceSong: string;
  firstDanceLink: string;
  vetos: string;
  notes: string;
};

const INITIAL: Plan = {
  names: "",
  eventDate: "",
  partyKind: null,
  partyStart: "",
  venue: "",
  phone: "",
  email: "",
  guests: "",
  ages: "",
  crowdVibes: [],
  dressCode: null,
  liveGenres: [],
  liveSet: [],
  breakSongs: "",
  firstDance: null,
  firstDanceSong: "",
  firstDanceLink: "",
  vetos: "",
  notes: "",
};

type StepDef = {
  id: string;
  part: "intro" | "live" | "dj" | "outro";
  partLabel: string;
  title: string;
  hint?: string;
  splash?: boolean;
};

const STEPS: StepDef[] = [
  { id: "basics", part: "intro", partLabel: "Lo básico", title: "Empezamos por vosotros.", hint: "Nombres, fecha, sitio y cuándo arranca el show. Lo confirmamos contra el contrato, sin sorpresas." },
  { id: "welcome", part: "intro", partLabel: "Bienvenida", title: "Estáis dentro." },
  { id: "crowd", part: "intro", partLabel: "Vuestra gente", title: "¿Quién va a estar en la pista?", hint: "Nos ayuda a calibrar cuándo darle caña y cuándo bajar." },
  { id: "dress", part: "intro", partLabel: "Dress code", title: "¿Cómo nos vestimos?", hint: "Nos adaptamos a la vibe de vuestra boda para que la banda parezca parte del sitio, no un proveedor." },
  { id: "live-genres", part: "live", partLabel: "Show · 1 de 4", title: "¿Qué géneros os representan?", hint: "Marcad lo que escucháis de verdad. Sin filtro de \"es una boda\"." },
  { id: "live-songs", part: "live", partLabel: "Show · 2 de 4", title: "Elegid del repertorio en directo.", hint: "Todo lo que tenemos rehearsing. Tocad para añadir, lo veréis acumularse en el panel." },
  { id: "break-songs", part: "live", partLabel: "Show · 3 de 4", title: "Canciones para los descansos.", hint: "Mientras la banda hace break, suena una playlist. Decidnos qué temas tienen que estar ahí (incluidos los que no están en nuestro repertorio)." },
  { id: "first-dance", part: "live", partLabel: "Show · 4 de 4", title: "¿Hay algún baile para abrir la fiesta?", hint: "A veces los primeros bailes los hacéis en la cena. Si pasan en la fiesta, contadnos cómo." },
  { id: "vetos", part: "outro", partLabel: "Lo que se queda fuera", title: "Lo que NO ponemos.", hint: "Sed crueles. Cada veto nos ahorra un momento incómodo." },
  { id: "notes", part: "outro", partLabel: "Una cosa más", title: "¿Algo que tengamos que saber?", hint: "Sorpresas, dramas familiares, dedicatorias, la canción de tu madre." },
  { id: "review", part: "outro", partLabel: "Cerrar", title: "Esta es vuestra noche.", hint: "Repaso rápido y lo mandamos a rehearsal." },
];

export default function MiShowExperience() {
  const [plan, setPlan] = useState<Plan>(INITIAL);
  const [stepIdx, setStepIdx] = useState(0);
  const [showPanelMobile, setShowPanelMobile] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const step = STEPS[stepIdx];
  const totalSteps = STEPS.length;
  const isLast = stepIdx === totalSteps - 1;
  const isFirst = stepIdx === 0;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [stepIdx]);

  async function generatePdfBlob(): Promise<Blob> {
    const logoSrc = `${window.location.origin}/logo-savage.png`;
    return await pdf(<MyShowPdf plan={plan} logoSrc={logoSrc} />).toBlob();
  }

  async function blobToBase64(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        resolve(result.split(",")[1] ?? "");
      };
      reader.onerror = () => reject(new Error("No se pudo leer el blob del PDF"));
      reader.readAsDataURL(blob);
    });
  }

  function pdfFilename(): string {
    const slug = (plan.names || "show").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    const dateSlug = (plan.eventDate || "").replace(/-/g, "");
    return `mishow-${slug}${dateSlug ? "-" + dateSlug : ""}.pdf`;
  }

  async function handleDownloadPdf() {
    try {
      const blob = await generatePdfBlob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = pdfFilename();
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
    }
  }

  async function handleSubmit() {
    if (sending) return;
    setSubmitError(null);
    setSending(true);
    try {
      const message = buildEmailBody(plan);
      const subject = `Nueva petición de show de ${plan.names || "(sin nombre)"} para ${plan.eventDate ? formatDate(plan.eventDate) : "una boda"}`;

      const blob = await generatePdfBlob();
      const pdfBase64 = await blobToBase64(blob);

      const res = await fetch("/api/mishow", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject,
          message,
          pdfBase64,
          pdfFilename: pdfFilename(),
          replyTo: plan.email || undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Error al enviar");
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setSubmitError(err instanceof Error ? err.message : "Error al enviar");
    } finally {
      setSending(false);
    }
  }

  function update<K extends keyof Plan>(k: K, v: Plan[K]) {
    setPlan((prev) => ({ ...prev, [k]: v }));
  }
  function toggleArr<K extends "crowdVibes" | "liveGenres" | "liveSet">(k: K, v: string) {
    setPlan((prev) => {
      const arr = prev[k];
      return { ...prev, [k]: arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v] };
    });
  }

  if (submitted) {
    return <SuccessScreen plan={plan} onDownloadPdf={handleDownloadPdf} />;
  }

  return (
    <main className="min-h-screen bg-savage-black text-savage-white flex flex-col">
      <Header plan={plan} />

      <ProgressBar step={stepIdx + 1} total={totalSteps} part={step.part} />

      <div className="flex-1 grid lg:grid-cols-[1fr_400px] xl:grid-cols-[1fr_440px]">
        <section className="px-4 sm:px-8 md:px-14 py-8 sm:py-10 md:py-16 max-w-3xl mx-auto w-full pb-32 lg:pb-16">
          <div key={step.id} className="w-full">
            <StepHeader part={step.partLabel} title={step.title} hint={step.hint} accent={partAccent(step.part)} />
            <div className="mt-8 sm:mt-10">
              <StepBody
                step={step.id}
                plan={plan}
                update={update}
                toggleArr={toggleArr}
              />
            </div>
            <Nav
              isFirst={isFirst}
              isLast={isLast}
              onBack={() => setStepIdx(stepIdx - 1)}
              onNext={() => isLast ? handleSubmit() : setStepIdx(stepIdx + 1)}
              nextLabel={isLast ? (sending ? "Enviando a la banda…" : "Enviar a la banda →") : "Siguiente →"}
              accent={isLast ? "red" : partAccent(step.part)}
              disabled={sending}
            />
            {isLast && submitError && (
              <p className="mt-4 text-sm text-savage-red">
                Algo ha ido mal: {submitError}. Probad otra vez en un momento.
              </p>
            )}
          </div>
        </section>

        <aside className="hidden lg:block border-l border-savage-white/10 bg-savage-black/60">
          <SidePanel plan={plan} />
        </aside>
      </div>

      <button
        onClick={() => setShowPanelMobile(true)}
        className="lg:hidden fixed bottom-5 right-5 z-30 rounded-full bg-savage-yellow text-savage-ink px-5 py-3 text-xs font-bold uppercase tracking-[0.2em] shadow-lg shadow-savage-yellow/30"
      >
        Vuestro show · {plan.liveSet.length}
      </button>

      <AnimatePresence>
        {showPanelMobile && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 220 }}
            className="lg:hidden fixed inset-0 z-40 bg-savage-black overflow-y-auto"
          >
            <div className="sticky top-0 z-10 flex items-center justify-between px-5 py-4 bg-savage-black border-b border-savage-white/10">
              <p className="text-[10px] uppercase tracking-[0.3em] text-savage-yellow">Vuestro show, en directo</p>
              <button onClick={() => setShowPanelMobile(false)} className="text-savage-white/60 text-sm py-2 px-3 -mr-2">Cerrar ✕</button>
            </div>
            <SidePanel plan={plan} />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

function partAccent(part: StepDef["part"]): "yellow" | "cream" | "red" | "white" {
  if (part === "live") return "yellow";
  if (part === "dj") return "cream";
  if (part === "outro") return "red";
  return "white";
}

// ============== HEADER + PROGRESS ==============

function Header({ plan }: { plan: Plan }) {
  return (
    <header className="border-b border-savage-white/10 px-4 sm:px-8 md:px-14 py-4">
      <div className="max-w-3xl mx-auto w-full flex items-center gap-4">
        <Link href="/" className="flex items-center gap-3 shrink-0 -ml-2 sm:-ml-3">
          <Image src="/logo-savage.png" alt="Savage Party" width={88} height={88} className="w-[80px] h-auto sm:w-[96px]" priority />
        </Link>
        <div className="hidden md:flex items-center gap-3 flex-1 justify-center">
          <div className="flex -space-x-2">
            {BAND_AVATARS.map((a) => (
              <div
                key={a.name}
                className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold ring-2 ring-savage-black ${a.color}`}
                title={`${a.name} · ${a.role}`}
              >
                {a.initial}
              </div>
            ))}
          </div>
          <span className="text-[10px] uppercase tracking-[0.25em] text-savage-white/60">
            Vuestro canal con la banda
          </span>
        </div>
        <div className="ml-auto text-right">
          <p className="text-xs text-savage-yellow font-medium">{plan.names || "Vuestros nombres"}</p>
          <p className="text-[10px] text-savage-white/50">{plan.eventDate ? formatDate(plan.eventDate) : "—"}</p>
        </div>
      </div>
    </header>
  );
}

function formatDate(iso: string) {
  if (!iso) return "—";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("es-ES", { weekday: "short", day: "numeric", month: "short", year: "numeric" });
}

function ProgressBar({ step, total, part }: { step: number; total: number; part: StepDef["part"] }) {
  const partColors: Record<StepDef["part"], string> = {
    intro: "bg-savage-white/40",
    live: "bg-savage-yellow",
    dj: "bg-savage-cream",
    outro: "bg-savage-red",
  };
  return (
    <div className="px-4 sm:px-8 md:px-14 pt-5">
      <div className="max-w-3xl mx-auto w-full">
      <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.3em] text-savage-white/50">
        <span>Paso {String(step).padStart(2, "0")} de {total}</span>
        <span className="text-savage-yellow">{Math.round((step / total) * 100)}%</span>
      </div>
      <div className="mt-3 flex gap-1">
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-all duration-500 ${
              i + 1 <= step ? partColors[part] : "bg-savage-white/10"
            }`}
          />
        ))}
      </div>
      </div>
    </div>
  );
}

function StepHeader({ part, title, hint, accent }: { part: string; title: string; hint?: string; accent: "yellow" | "cream" | "red" | "white" }) {
  const accentColor = accent === "yellow" ? "text-savage-yellow" : accent === "cream" ? "text-savage-cream" : accent === "red" ? "text-savage-red" : "text-savage-white";
  return (
    <div>
      <p className={`text-[10px] md:text-xs uppercase tracking-[0.3em] md:tracking-[0.4em] font-bold ${accentColor}`}>
        {part}
      </p>
      <h1 className="font-display uppercase mt-3 md:mt-4 text-[1.5rem] md:text-[2.25rem] lg:text-[3.25rem] leading-[1] md:leading-[0.95] text-savage-white max-w-3xl break-words">
        {title}
      </h1>
      {hint && (
        <p className="font-editorial italic mt-3 md:mt-4 text-sm md:text-lg text-savage-cream/80 max-w-xl leading-relaxed">
          {hint}
        </p>
      )}
    </div>
  );
}

function Nav({ isFirst, onBack, onNext, nextLabel, accent, disabled }: {
  isFirst: boolean;
  isLast: boolean;
  onBack: () => void;
  onNext: () => void;
  nextLabel: string;
  accent: "yellow" | "cream" | "red" | "white";
  disabled?: boolean;
}) {
  const btnClass =
    accent === "red" ? "bg-savage-red text-savage-cream" :
    accent === "cream" ? "bg-savage-cream text-savage-ink" :
    "bg-savage-yellow text-savage-ink";
  return (
    <div className="mt-12 flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-4">
      {!isFirst ? (
        <button onClick={onBack} className="text-xs uppercase tracking-[0.3em] text-savage-white/60 hover:text-savage-yellow py-3 px-3 -mx-3 -my-3 self-start sm:self-auto">
          ← Atrás
        </button>
      ) : (
        <span className="hidden sm:block" />
      )}
      <button
        onClick={onNext}
        disabled={disabled}
        className={`rounded-full px-6 sm:px-7 py-4 text-sm font-bold uppercase tracking-[0.2em] transition ${btnClass} ${disabled ? "opacity-50 cursor-not-allowed" : "hover:brightness-110"} w-full sm:w-auto`}
      >
        {isFirst ? "¡Vamos! →" : nextLabel}
      </button>
    </div>
  );
}

// ============== STEP BODY ==============

function StepBody({ step, plan, update, toggleArr }: {
  step: string;
  plan: Plan;
  update: <K extends keyof Plan>(k: K, v: Plan[K]) => void;
  toggleArr: <K extends "crowdVibes" | "liveGenres" | "liveSet">(k: K, v: string) => void;
}) {
  switch (step) {
    case "welcome":
      return <WelcomeStep names={plan.names} />;
    case "basics":
      return (
        <div className="space-y-6">
          <Field label="Vuestros nombres *">
            <input
              type="text"
              value={plan.names}
              onChange={(e) => update("names", e.target.value)}
              className="w-full bg-savage-ink/40 border border-savage-white/15 rounded-xl px-4 py-3 text-base md:px-5 md:py-4 md:text-lg text-savage-white outline-none focus:border-savage-yellow"
              placeholder="ej. Marta y David"
            />
          </Field>
          <Field label="Fecha de la boda *">
            <input
              type="date"
              value={plan.eventDate}
              onChange={(e) => update("eventDate", e.target.value)}
              className="w-full bg-savage-ink/40 border border-savage-white/15 rounded-xl px-4 py-3 text-base md:px-5 md:py-4 md:text-lg text-savage-white outline-none focus:border-savage-yellow"
            />
          </Field>
          <Field label="¿Empezáis con cóctel o directos a la fiesta? *">
            <div className="flex flex-wrap gap-2">
              {([
                { id: "cocktail", label: "Cóctel" },
                { id: "party", label: "Fiesta" },
              ] as { id: PartyKind; label: string }[]).map((opt) => {
                const active = plan.partyKind === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => update("partyKind", opt.id)}
                    className={`text-sm uppercase tracking-wider px-4 py-2.5 rounded-full border-2 transition ${
                      active
                        ? "bg-savage-yellow text-savage-ink border-savage-yellow"
                        : "border-savage-white/20 text-savage-white/70 hover:border-savage-white/50"
                    }`}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </Field>
          {plan.partyKind && (
            <Field
              label={`Hora del ${plan.partyKind === "cocktail" ? "cóctel" : "comienzo de la fiesta"} *`}
              hint={plan.partyKind === "cocktail"
                ? "El cóctel dura 1h 30min y no se alarga. Lo anclamos aquí."
                : "Cuando empieza la fiesta. Lo usamos para construir el timing real de la noche."}
            >
              <input
                type="time"
                value={plan.partyStart}
                onChange={(e) => update("partyStart", e.target.value)}
                className="w-full bg-savage-ink/40 border border-savage-white/15 rounded-xl px-4 py-3 text-base md:px-5 md:py-4 md:text-lg text-savage-white outline-none focus:border-savage-yellow"
              />
            </Field>
          )}
          <Field label="Sitio *">
            <input
              type="text"
              value={plan.venue}
              onChange={(e) => update("venue", e.target.value)}
              className="w-full bg-savage-ink/40 border border-savage-white/15 rounded-xl px-4 py-3 text-base md:px-5 md:py-4 md:text-lg text-savage-white outline-none focus:border-savage-yellow"
              placeholder="ej. Castell de Caramany"
            />
          </Field>
          <Field label="Teléfono / WhatsApp *">
            <input
              type="tel"
              value={plan.phone}
              onChange={(e) => update("phone", e.target.value)}
              className="w-full bg-savage-ink/40 border border-savage-white/15 rounded-xl px-4 py-3 text-base md:px-5 md:py-4 md:text-lg text-savage-white outline-none focus:border-savage-yellow"
              placeholder="+34 …"
            />
          </Field>
          <Field label="Email *">
            <input
              type="email"
              value={plan.email}
              onChange={(e) => update("email", e.target.value)}
              className="w-full bg-savage-ink/40 border border-savage-white/15 rounded-xl px-4 py-3 text-base md:px-5 md:py-4 md:text-lg text-savage-white outline-none focus:border-savage-yellow"
              placeholder="tu@email.com"
            />
          </Field>
        </div>
      );
    case "dress":
      return (
        <Radio
          options={[
            { id: "savage", label: "Estilo Savage", subtitle: "Elegantes pero funky. Nuestro look habitual. Funciona para casi todas las bodas." },
            { id: "suits", label: "Traje completo, gala", subtitle: "Black tie o boda formal. Nos vestimos a la altura del sitio." },
          ]}
          value={plan.dressCode}
          onChange={(v) => update("dressCode", v as DressCode)}
        />
      );
    case "crowd":
      return (
        <div className="space-y-8">
          <Field label="Número de invitados">
            <input
              type="text"
              value={plan.guests}
              onChange={(e) => update("guests", e.target.value)}
              className="w-full bg-savage-ink/40 border border-savage-white/15 rounded-xl px-4 py-3 text-base md:px-5 md:py-4 md:text-lg text-savage-white outline-none focus:border-savage-yellow"
              placeholder="120"
            />
          </Field>
          <Field label="Rango de edades">
            <input
              type="text"
              value={plan.ages}
              onChange={(e) => update("ages", e.target.value)}
              className="w-full bg-savage-ink/40 border border-savage-white/15 rounded-xl px-4 py-3 text-base md:px-5 md:py-4 md:text-lg text-savage-white outline-none focus:border-savage-yellow"
              placeholder="ej. Mezcla 25-55, mucha familia mayor…"
            />
          </Field>
          <Field label="Vibe del público" hint="Marcad lo que aplique.">
            <Chips options={CROWD_VIBES} selected={plan.crowdVibes} onToggle={(v) => toggleArr("crowdVibes", v)} />
          </Field>
        </div>
      );
    case "live-genres":
      return (
        <Field hint='Pick lo que escucháis de verdad. Sin filtro de "es una boda".'>
          <Chips options={LIVE_GENRES} selected={plan.liveGenres} onToggle={(v) => toggleArr("liveGenres", v)} large />
        </Field>
      );
    case "live-songs":
      return (
        <RepertoirePicker
          selected={plan.liveSet}
          onToggle={(v) => toggleArr("liveSet", v)}
        />
      );
    case "break-songs":
      return (
        <Field label="Una por línea. Cualquier artista, cualquier estilo." hint="Estas suenan en la playlist mientras la banda hace break. Cuantas más nos paséis, mejor curamos el rato.">
          <textarea
            rows={9}
            value={plan.breakSongs}
            onChange={(e) => update("breakSongs", e.target.value)}
            className="w-full bg-savage-ink/40 border border-savage-white/15 rounded-xl px-4 py-3 sm:px-5 sm:py-4 text-base text-savage-white outline-none focus:border-savage-yellow resize-none leading-relaxed"
            placeholder={"Sweet Caroline — Neil Diamond\nDespacito — Luis Fonsi\n…"}
          />
        </Field>
      );
    case "first-dance":
      return (
        <div className="space-y-6">
          <Radio
            options={[
              { id: "dj", label: "Sí, queremos abrir con un tema", subtitle: "Lo ponemos desde la playlist o lo prepara la banda." },
              { id: "none", label: "No, los hicimos en la cena", subtitle: "Saltamos directos al live show." },
            ]}
            value={plan.firstDance}
            onChange={(v) => update("firstDance", v as FirstDance)}
          />
          {plan.firstDance === "dj" && (
            <div className="space-y-5">
              <Field label="Título y artista">
                <input
                  type="text"
                  value={plan.firstDanceSong}
                  onChange={(e) => update("firstDanceSong", e.target.value)}
                  className="w-full bg-savage-ink/40 border border-savage-white/15 rounded-xl px-4 py-3 text-base md:px-5 md:py-4 md:text-lg text-savage-white outline-none focus:border-savage-yellow"
                  placeholder="Can't Help Falling in Love — Elvis"
                />
              </Field>
              <Field
                label="Link (opcional)"
                hint="Spotify, YouTube, Apple Music. Solo si es una versión o arreglo concreto que tengamos que igualar."
              >
                <input
                  type="url"
                  value={plan.firstDanceLink}
                  onChange={(e) => update("firstDanceLink", e.target.value)}
                  className="w-full bg-savage-ink/40 border border-savage-white/15 rounded-xl px-4 py-3 text-base md:px-5 md:py-4 md:text-lg text-savage-white outline-none focus:border-savage-yellow"
                  placeholder="https://open.spotify.com/track/…"
                />
              </Field>
            </div>
          )}
        </div>
      );
    case "vetos":
      return (
        <Field label="Una por línea.">
          <textarea
            rows={6}
            value={plan.vetos}
            onChange={(e) => update("vetos", e.target.value)}
            className="w-full bg-savage-ink/40 border border-savage-red/30 rounded-xl px-4 py-3 sm:px-5 sm:py-4 text-base text-savage-white outline-none focus:border-savage-red resize-none leading-relaxed"
            placeholder={"Macarena\nDespacito"}
          />
        </Field>
      );
    case "notes":
      return (
        <Field label="Lo que sea">
          <textarea
            rows={6}
            value={plan.notes}
            onChange={(e) => update("notes", e.target.value)}
            className="w-full bg-savage-ink/40 border border-savage-white/15 rounded-xl px-4 py-3 sm:px-5 sm:py-4 text-base text-savage-white outline-none focus:border-savage-yellow resize-none leading-relaxed"
            placeholder="Sorpresas, dramas familiares, dedicatorias…"
          />
        </Field>
      );
    case "review":
      return <ReviewStep plan={plan} />;
    default:
      return null;
  }
}

// ============== WELCOME ==============

function WelcomeStep({ names }: { names: string }) {
  const display = names.trim() || "Vosotros dos";
  return (
    <div className="space-y-6">
      <p className="font-display uppercase text-savage-yellow text-xl sm:text-2xl md:text-3xl break-words">
        {display}, dentro.
      </p>
      <p className="text-savage-white/90 leading-relaxed text-lg sm:text-xl">
        Bienvenidos a Savage. A partir de ahora no sois solo clientes. <span className="text-savage-yellow font-bold">Sois parte de la banda.</span>
      </p>
      <p className="text-savage-white/85 leading-relaxed text-base sm:text-lg">
        Y ser de la banda significa una cosa: traed esa actitud con vosotros. Decidnos lo que de verdad queréis, lo que de verdad no soportáis y lo que no podéis imaginar la noche sin. Cuanto más sinceros, más fuerte vamos.
      </p>
      <div className="rounded-2xl border border-savage-yellow/30 bg-savage-yellow/5 p-5 sm:p-6 mt-2">
        <p className="text-[10px] uppercase tracking-[0.3em] text-savage-yellow font-bold mb-3">Cómo va esto</p>
        <ul className="space-y-2 text-savage-white/80 text-sm sm:text-base leading-relaxed">
          <li>· Solo banda en directo. Vosotros marcáis géneros, picks del repertorio y qué suena en los descansos.</li>
          <li>· Unos 10 minutos del tirón. No cerréis la pestaña, no se guarda nada hasta que le deis a enviar.</li>
          <li>· Una vez enviado, está con la banda. Solo escribimos si algo necesita aclararse.</li>
        </ul>
      </div>
    </div>
  );
}

// ============== REVIEW ==============

function ReviewStep({ plan }: { plan: Plan }) {
  const recap = [
    { label: "Pareja", value: plan.names || "—" },
    { label: "Fecha", value: plan.eventDate ? formatDate(plan.eventDate) : "—" },
    { label: "Sitio", value: plan.venue || "—" },
    { label: plan.partyKind === "party" ? "Fiesta" : "Cóctel", value: plan.partyStart || "—" },
    { label: "Duración live", value: liveDurationLabel(plan.partyKind) },
    { label: "Live picks", value: `${plan.liveSet.length} temas` },
    { label: "Para los descansos", value: `${splitLines(plan.breakSongs).length} temas` },
  ];
  return (
    <div className="space-y-6">
      <p className="text-savage-white/85 leading-relaxed text-base md:text-lg">
        Repaso rápido. Le dais a enviar y la banda se pone con vuestro show. El cartel y el resumen aparecerán aquí para descargar una vez enviado.
      </p>

      <div className="rounded-2xl border border-savage-white/10 bg-savage-ink/30 divide-y divide-savage-white/10">
        {recap.map((s) => (
          <div key={s.label} className="flex items-baseline justify-between gap-4 px-4 py-3 md:px-5 md:py-3.5">
            <p className="text-[10px] uppercase tracking-[0.3em] text-savage-white/50 shrink-0">{s.label}</p>
            <p className="text-sm text-savage-white text-right break-words">{s.value}</p>
          </div>
        ))}
      </div>

      <p className="text-savage-white/60 text-sm leading-relaxed">
        Cuando le deis a <span className="text-savage-red font-bold">Enviar a la banda</span>, el resumen va directo a Chris. Si tenemos alguna duda os escribimos, si no, dadlo por cerrado.
      </p>
    </div>
  );
}

// ============== REPERTOIRE PICKER ==============

function RepertoirePicker({ selected, onToggle }: {
  selected: string[];
  onToggle: (song: string) => void;
}) {
  return (
    <div className="space-y-8">
      {REPERTOIRE_CATEGORIES.map((cat) => (
        <div key={cat.id}>
          <div className="flex items-baseline justify-between mb-3">
            <p className="text-xs uppercase tracking-[0.3em] text-savage-yellow font-bold">{cat.title}</p>
            <p className="text-[10px] uppercase tracking-wider text-savage-white/40">
              {cat.songs.filter((s) => selected.includes(s)).length} / {cat.songs.length}
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-2">
            {cat.songs.map((s) => {
              const active = selected.includes(s);
              const [title, artist] = s.split(" — ");
              return (
                <motion.button
                  key={s}
                  onClick={() => onToggle(s)}
                  whileTap={{ scale: 0.97 }}
                  className={`text-left rounded-xl border p-3 flex items-center gap-3 transition ${
                    active
                      ? "border-savage-yellow bg-savage-yellow/10"
                      : "border-savage-white/15 hover:border-savage-white/40"
                  }`}
                >
                  <SongCover title={title} accent="yellow" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-savage-white truncate">{title}</p>
                    <p className="text-xs text-savage-white/50 truncate">{artist || ""}</p>
                  </div>
                  <span className={`text-xs ${active ? "text-savage-yellow" : "text-savage-white/30"}`}>
                    {active ? "✓" : "+"}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

// ============== FORM PRIMITIVES ==============

function Field({ label, hint, children }: { label?: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      {label && <p className="text-[10px] uppercase tracking-[0.3em] text-savage-white/60 mb-3">{label}</p>}
      {hint && <p className="text-savage-white/55 text-sm mb-4">{hint}</p>}
      {children}
    </div>
  );
}

function Chips({ options, selected, onToggle, accent = "yellow", large, allowCustom }: {
  options: string[];
  selected: string[];
  onToggle: (v: string) => void;
  accent?: "yellow" | "cream";
  large?: boolean;
  allowCustom?: boolean;
}) {
  const [adding, setAdding] = useState(false);
  const [draft, setDraft] = useState("");
  const customs = selected.filter((s) => !options.includes(s));
  const allOptions = [...options, ...customs];
  const activeClass =
    accent === "cream"
      ? "bg-savage-cream text-savage-ink border-savage-cream"
      : "bg-savage-yellow text-savage-ink border-savage-yellow";
  const sizeClass = large ? "text-sm px-4 py-2.5" : "text-xs px-3 py-2";

  function commit() {
    const v = draft.trim();
    if (v && !selected.includes(v)) onToggle(v);
    setDraft("");
    setAdding(false);
  }

  return (
    <div className="flex flex-wrap gap-2 items-center">
      {allOptions.map((opt) => {
        const active = selected.includes(opt);
        return (
          <button
            key={opt}
            onClick={() => onToggle(opt)}
            className={`uppercase tracking-wider rounded-full border transition ${sizeClass} ${
              active ? activeClass : "border-savage-white/20 text-savage-white/70 hover:border-savage-white/50"
            }`}
          >
            {opt}
          </button>
        );
      })}
      {allowCustom && (
        adding ? (
          <input
            autoFocus
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                commit();
              }
              if (e.key === "Escape") {
                setDraft("");
                setAdding(false);
              }
            }}
            onBlur={commit}
            placeholder="Escribe un género y dale enter"
            className={`uppercase tracking-wider rounded-full border-2 bg-savage-black/60 outline-none transition ${sizeClass} ${
              accent === "cream" ? "border-savage-cream text-savage-cream" : "border-savage-yellow text-savage-yellow"
            } w-full sm:w-auto sm:min-w-[200px]`}
          />
        ) : (
          <button
            onClick={() => setAdding(true)}
            className={`uppercase tracking-wider rounded-full border-2 border-dashed transition ${sizeClass} ${
              accent === "cream"
                ? "border-savage-cream/40 text-savage-cream/70 hover:border-savage-cream hover:text-savage-cream"
                : "border-savage-yellow/40 text-savage-yellow/70 hover:border-savage-yellow hover:text-savage-yellow"
            }`}
          >
            + Añadir
          </button>
        )
      )}
    </div>
  );
}

function Radio<T extends string>({ options, value, onChange, accent = "yellow" }: {
  options: { id: T; label: string; subtitle?: string }[];
  value: T | null;
  onChange: (v: T) => void;
  accent?: "yellow" | "cream";
}) {
  return (
    <div className="grid gap-3">
      {options.map((opt) => {
        const active = value === opt.id;
        const activeBorder = accent === "cream" ? "border-savage-cream bg-savage-cream/10" : "border-savage-yellow bg-savage-yellow/10";
        const activeText = accent === "cream" ? "text-savage-cream" : "text-savage-yellow";
        return (
          <button
            key={opt.id}
            onClick={() => onChange(opt.id)}
            className={`text-left rounded-2xl border-2 px-5 py-4 transition ${
              active ? activeBorder : "border-savage-white/15 hover:border-savage-white/40"
            }`}
          >
            <p className={`text-base font-bold ${active ? activeText : "text-savage-white"}`}>{opt.label}</p>
            {opt.subtitle && <p className="text-xs text-savage-white/55 mt-1">{opt.subtitle}</p>}
          </button>
        );
      })}
    </div>
  );
}

// ============== SIDE PANEL ==============

function SidePanel({ plan }: { plan: Plan }) {
  const [liveExpanded, setLiveExpanded] = useState(false);
  const LIVE_PREVIEW_COUNT = 4;
  const vetos = splitLines(plan.vetos);
  const breaks = splitLines(plan.breakSongs);

  return (
    <div className="lg:sticky lg:top-0 lg:h-screen overflow-y-auto p-6">
      <div>
        <p className="text-[10px] uppercase tracking-[0.3em] text-savage-yellow">Vuestro show, en directo</p>
        <h3 className="font-display uppercase text-2xl mt-2 leading-tight">{plan.names || "Vuestros nombres"}</h3>
        <p className="text-xs text-savage-white/60 mt-1">{formatDate(plan.eventDate)} · {plan.venue || "—"}</p>
      </div>

      <Timeline partyStart={plan.partyStart} partyKind={plan.partyKind} />

      {plan.liveSet.length > 0 && (
        <PanelBlock title="Live · picks" count={plan.liveSet.length} accent="yellow">
          <AnimatePresence initial={false}>
            {(liveExpanded ? plan.liveSet : plan.liveSet.slice(0, LIVE_PREVIEW_COUNT)).map((s, i) => (
              <PanelSongRow key={s} index={i} title={s.split(" — ")[0]} subtitle={s.split(" — ")[1]} accent="yellow" />
            ))}
          </AnimatePresence>
          {plan.liveSet.length > LIVE_PREVIEW_COUNT && (
            <button
              onClick={() => setLiveExpanded(!liveExpanded)}
              className="w-full mt-2 text-[10px] uppercase tracking-[0.3em] text-savage-yellow/70 hover:text-savage-yellow py-2 border border-dashed border-savage-yellow/30 rounded-lg transition"
            >
              {liveExpanded
                ? "Ver menos ▲"
                : `+ ${plan.liveSet.length - LIVE_PREVIEW_COUNT} más ▼`}
            </button>
          )}
        </PanelBlock>
      )}

      {breaks.length > 0 && (
        <PanelBlock title="Playlist · descansos" count={breaks.length} accent="cream">
          {breaks.map((s, i) => (
            <PanelSongRow key={s + i} index={i} title={s} accent="cream" muted />
          ))}
        </PanelBlock>
      )}

      {vetos.length > 0 && (
        <div className="mt-6 rounded-xl border border-savage-red/30 bg-savage-red/5 p-3">
          <p className="text-[10px] uppercase tracking-[0.3em] text-savage-red mb-2">No suena</p>
          <div className="flex flex-wrap gap-1.5">
            {vetos.map((v) => (
              <span key={v} className="text-[11px] line-through text-savage-white/60 bg-savage-black/40 px-2 py-1 rounded">
                {v}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function addMinutes(time: string, minutes: number): string | null {
  if (!time || !/^\d{2}:\d{2}$/.test(time)) return null;
  const [hh, mm] = time.split(":").map(Number);
  const total = hh * 60 + mm + minutes;
  const wrapped = ((total % (24 * 60)) + 24 * 60) % (24 * 60);
  const newHH = Math.floor(wrapped / 60);
  const newMM = wrapped % 60;
  return `${String(newHH).padStart(2, "0")}:${String(newMM).padStart(2, "0")}`;
}

function Timeline({ partyStart, partyKind }: { partyStart: string; partyKind: PartyKind }) {
  const liveDuration = liveDurationMinutes(partyKind);
  const liveStart = partyStart || "—";
  const closeTime = addMinutes(partyStart, liveDuration) || "—";

  return (
    <div className="mt-5">
      <p className="text-[10px] uppercase tracking-[0.3em] text-savage-white/50 mb-2">Timeline</p>
      <div className="flex h-2 rounded-full overflow-hidden">
        <div className="bg-savage-yellow" style={{ flex: liveDuration }} title={`Banda · ${liveStart}`} />
      </div>
      <div className="grid gap-1 mt-2 grid-cols-2">
        <div>
          <p className="text-[10px] uppercase tracking-wide text-savage-white/70 truncate">Banda</p>
          <p className="text-[10px] text-savage-white/40">{liveStart}</p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-wide text-savage-white/70 truncate">Cierre</p>
          <p className="text-[10px] text-savage-white/40">{closeTime}</p>
        </div>
      </div>
    </div>
  );
}

function PanelBlock({ title, count, accent, children }: {
  title: string;
  count: number;
  accent: "yellow" | "cream";
  children: React.ReactNode;
}) {
  return (
    <div className="mt-6">
      <div className="flex items-baseline justify-between mb-3">
        <p className="text-[10px] uppercase tracking-[0.3em] text-savage-white/50">{title}</p>
        <p className={`text-xs font-bold ${accent === "yellow" ? "text-savage-yellow" : "text-savage-cream"}`}>
          {count.toString().padStart(2, "0")}
        </p>
      </div>
      <div className="space-y-1.5">{children}</div>
    </div>
  );
}

function PanelSongRow({ index, title, subtitle, accent, muted }: { index: number; title: string; subtitle?: string; accent: "yellow" | "cream"; muted?: boolean }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 30, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: -30, scale: 0.95 }}
      transition={{ type: "spring", damping: 22 }}
      className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
        muted
          ? "bg-savage-black/30 border border-savage-white/10"
          : accent === "yellow"
            ? "bg-savage-yellow/8 border border-savage-yellow/20"
            : "bg-savage-cream/5 border border-savage-cream/20"
      }`}
    >
      <span className={`font-display text-xs w-6 ${accent === "yellow" ? "text-savage-yellow" : "text-savage-cream"}`}>
        {String(index + 1).padStart(2, "0")}
      </span>
      <SongCover title={title} accent={accent} />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-savage-white truncate">{title}</p>
        {subtitle && <p className="text-[11px] text-savage-white/50 uppercase tracking-wide truncate">{subtitle}</p>}
      </div>
    </motion.div>
  );
}

function SongCover({ title, accent }: { title: string; accent: "yellow" | "cream" }) {
  const initial = title.charAt(0).toUpperCase();
  return (
    <div className={`w-9 h-9 rounded shrink-0 flex items-center justify-center font-display text-sm ${
      accent === "yellow" ? "bg-savage-yellow/20 text-savage-yellow" : "bg-savage-cream/15 text-savage-cream"
    }`}>
      {initial}
    </div>
  );
}

function splitLines(s: string): string[] {
  return s.split("\n").map((x) => x.trim()).filter(Boolean);
}

function buildEmailBody(plan: Plan): string {
  const dash = "—";
  const fmtList = (items: string[]) =>
    items.length === 0 ? `  ${dash}` : items.map((v) => `  - ${v}`).join("\n");
  const dressLabel =
    plan.dressCode === "savage" ? "Estilo Savage (elegante y funky)" :
    plan.dressCode === "suits" ? "Traje completo, gala" : dash;
  const firstDanceLabel =
    plan.firstDance === "dj" ? `Sí (${plan.firstDanceSong || "sin título"})` :
    plan.firstDance === "none" ? "Ya hechos en la cena" : dash;
  const breaks = splitLines(plan.breakSongs);
  const vetos = splitLines(plan.vetos);
  const date = plan.eventDate ? formatDate(plan.eventDate) : dash;
  const liveEnd = addMinutes(plan.partyStart, liveDurationMinutes(plan.partyKind)) || dash;

  return [
    `Hola,`,
    ``,
    `Acaba de llegar una petición de show desde mishow. Detalles completos en el PDF adjunto.`,
    ``,
    `Pareja`,
    `  Nombres: ${plan.names || dash}`,
    `  Fecha: ${date}`,
    `  Sitio: ${plan.venue || dash}`,
    `  Teléfono: ${plan.phone || dash}`,
    `  Email: ${plan.email || dash}`,
    `  Tipo de inicio: ${plan.partyKind === "cocktail" ? "Cóctel" : plan.partyKind === "party" ? "Fiesta directa" : dash}`,
    `  Hora de inicio: ${plan.partyStart || dash}`,
    `  Duración del live: ${liveDurationLabel(plan.partyKind)}`,
    ``,
    `Timeline`,
    `  Banda en directo: ${plan.partyStart || dash} a ${liveEnd}`,
    ``,
    `Público`,
    `  Invitados: ${plan.guests || dash}`,
    `  Edades: ${plan.ages || dash}`,
    `  Vibes:`,
    fmtList(plan.crowdVibes),
    ``,
    `Dress code: ${dressLabel}`,
    ``,
    `Géneros del live show:`,
    fmtList(plan.liveGenres),
    ``,
    `Picks del repertorio (${plan.liveSet.length}):`,
    fmtList(plan.liveSet),
    ``,
    `Canciones para los descansos (${breaks.length}):`,
    fmtList(breaks),
    ``,
    `Baile de apertura: ${firstDanceLabel}`,
    plan.firstDanceLink ? `Link de referencia: ${plan.firstDanceLink}` : ``,
    ``,
    `Vetados (${vetos.length}):`,
    fmtList(vetos),
    ``,
    `Notas:`,
    plan.notes ? `  ${plan.notes.split("\n").join("\n  ")}` : `  ${dash}`,
    ``,
    `Source: savageparty.es/mishow`,
  ].join("\n").replace(/\n{3,}/g, "\n\n");
}

// ============== POSTER ARTWORK (used by html2canvas) ==============

function PosterArtwork({ plan }: { plan: Plan }) {
  const name1 = plan.names.split(" y ")[0] || plan.names.split(" & ")[0] || "Nombre 1";
  const name2 = plan.names.split(" y ")[1] || plan.names.split(" & ")[1] || "Nombre 2";
  const dateLine = plan.eventDate
    ? new Date(plan.eventDate).toLocaleDateString("es-ES", { day: "2-digit", month: "short", year: "numeric" }).toUpperCase()
    : "FECHA.MES.AÑO";
  return (
    <div
      className="bg-savage-red text-savage-yellow relative overflow-hidden"
      style={{ width: "900px", height: "1200px" }}
    >
      <div
        className="absolute inset-0 opacity-[0.18] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(rgba(0,0,0,0.6) 1px, transparent 1px)",
          backgroundSize: "8px 8px",
        }}
      />
      <div className="absolute top-0 left-0 right-0 h-4 bg-savage-yellow" />
      <div className="absolute bottom-0 left-0 right-0 h-4 bg-savage-yellow" />
      <div className="absolute top-0 bottom-0 left-0 w-4 bg-savage-yellow" />
      <div className="absolute top-0 bottom-0 right-0 w-4 bg-savage-yellow" />

      <div className="absolute inset-0 flex flex-col px-16 pt-14 pb-12">
        <div className="flex items-start justify-between gap-3">
          <Image src="/logo-savage.png" alt="Savage Party" width={130} height={130} unoptimized />
          <div className="text-right">
            <p className="text-[14px] uppercase tracking-[0.3em] font-bold text-savage-yellow">Show privado</p>
            <p className="text-[12px] uppercase tracking-[0.25em] mt-1 text-savage-yellow/60">
              Nº {(plan.names.replace(/\s|&|y/g, "").toUpperCase().slice(0, 6) || "—")}-{(plan.eventDate || "").replace(/-/g, "").slice(2) || "—"}
            </p>
          </div>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center text-center">
          <div className="flex items-center gap-4 mb-10">
            <span className="block w-16 h-[3px] bg-savage-yellow" />
            <p className="font-display uppercase text-[18px] tracking-[0.5em] text-savage-yellow">
              Cabezas de cartel
            </p>
            <span className="block w-16 h-[3px] bg-savage-yellow" />
          </div>
          <h1 className="font-display uppercase text-[112px] leading-[0.82] text-savage-yellow">
            {name1}
            <br />
            <span className="font-display text-[124px] inline-block leading-none my-2 text-savage-cream">×</span>
            <br />
            {name2}
          </h1>
          <div className="mt-12 flex flex-col items-center gap-3">
            <p className="font-display text-[42px] tracking-tight text-savage-yellow">{dateLine}</p>
            <p className="text-[18px] uppercase tracking-[0.3em] font-bold text-savage-cream">{plan.venue || "Sitio"}</p>
            {plan.partyStart && (
              <p className="text-[14px] uppercase tracking-[0.4em] text-savage-yellow/60 mt-1">
                Puertas {plan.partyStart}
              </p>
            )}
          </div>
        </div>

        <div className="border-t-2 border-savage-yellow pt-5 flex items-center justify-between text-[14px] uppercase tracking-[0.3em] font-bold text-savage-yellow">
          <span>Una noche.</span>
          <span className="text-savage-cream">Una banda.</span>
          <span>Vuestro show.</span>
        </div>
      </div>
    </div>
  );
}

// ============== SUCCESS SCREEN ==============

function SuccessScreen({ plan, onDownloadPdf }: { plan: Plan; onDownloadPdf: () => void | Promise<void> }) {
  const display = plan.names.trim() || "Vosotros dos";
  const [downloadingPdf, setDownloadingPdf] = useState(false);
  const [downloadingPoster, setDownloadingPoster] = useState(false);
  const posterCaptureRef = useRef<HTMLDivElement>(null);

  async function handleDownloadPdfClick() {
    setDownloadingPdf(true);
    try { await onDownloadPdf(); } finally { setDownloadingPdf(false); }
  }

  async function handleDownloadPosterClick() {
    setDownloadingPoster(true);
    try {
      const node = posterCaptureRef.current;
      if (!node) return;
      const html2canvas = (await import("html2canvas-pro")).default;
      const canvas = await html2canvas(node, { backgroundColor: "#E63422", scale: 2 });
      const blob: Blob | null = await new Promise((resolve) => canvas.toBlob(resolve, "image/png"));
      if (!blob) return;
      const slug = (plan.names || "show").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `mishow-cartel-${slug}.png`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
    } finally {
      setDownloadingPoster(false);
    }
  }

  return (
    <main className="min-h-screen bg-savage-red text-savage-yellow relative overflow-hidden flex flex-col">
      <div
        className="absolute inset-0 opacity-[0.18] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: "radial-gradient(rgba(0,0,0,0.6) 1px, transparent 1px)",
          backgroundSize: "6px 6px",
        }}
      />
      <div className="absolute top-0 left-0 right-0 h-2.5 bg-savage-yellow" />
      <div className="absolute bottom-0 left-0 right-0 h-2.5 bg-savage-yellow" />

      <header className="relative z-10 px-5 sm:px-6 md:px-10 py-5 flex items-center justify-between">
        <Image src="/logo-savage.png" alt="Savage Party" width={88} height={88} />
        <Link
          href="/"
          className="rounded-full border-2 border-savage-yellow text-savage-yellow px-5 py-2 text-xs font-bold uppercase tracking-[0.3em] hover:bg-savage-yellow hover:text-savage-ink transition"
        >
          ← Inicio
        </Link>
      </header>

      <section className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6 py-12 max-w-3xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-[10px] sm:text-xs uppercase tracking-[0.5em] text-savage-cream font-bold mb-6"
        >
          ━━ Hecho ━━
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="font-display uppercase text-[2.25rem] sm:text-[4rem] md:text-[5.5rem] leading-[0.9] sm:leading-[0.85] break-words"
        >
          {display}
          <br />
          <span className="text-savage-cream">estáis dentro.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="font-editorial italic text-lg sm:text-xl md:text-2xl text-savage-cream mt-8 max-w-2xl leading-relaxed"
        >
          Eso es todo lo que necesitamos. La banda lo lee esta noche. Si algo necesita aclararse os escribimos, si no, dadlo por cerrado.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className="mt-12 grid sm:grid-cols-3 gap-4 w-full max-w-2xl text-left"
        >
          <SuccessStep n="01" text="Chris se lo lee todo esta noche y monta el primer borrador del show." />
          <SuccessStep n="02" text="Si tenemos alguna duda os escribimos. Si no hay noticias, todo bien." />
          <SuccessStep n="03" text="La noche del bolo, la banda toca la boda que los tres hemos construido." />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-12 flex flex-col items-center gap-3 w-full max-w-md"
        >
          <p className="text-[10px] uppercase tracking-[0.3em] text-savage-yellow/70 mb-1">
            Para guardaros
          </p>
          <div className="flex flex-col sm:flex-row gap-3 w-full justify-center">
            <button
              onClick={handleDownloadPosterClick}
              disabled={downloadingPoster}
              className={`rounded-full bg-savage-yellow text-savage-ink px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] transition ${downloadingPoster ? "opacity-50 cursor-not-allowed" : "hover:brightness-110"}`}
            >
              {downloadingPoster ? "Generando…" : "Descargar cartel"}
            </button>
            <button
              onClick={handleDownloadPdfClick}
              disabled={downloadingPdf}
              className={`rounded-full bg-savage-cream text-savage-ink px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] transition ${downloadingPdf ? "opacity-50 cursor-not-allowed" : "hover:brightness-110"}`}
            >
              {downloadingPdf ? "Generando…" : "Descargar PDF del show"}
            </button>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.85 }}
          className="mt-12 text-sm uppercase tracking-[0.3em] text-savage-yellow/70"
        >
          Nos vemos en soundcheck.
        </motion.p>
        <p className="font-editorial italic text-savage-cream text-base mt-2">
          — Chris, en nombre de la banda.
        </p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-10"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-savage-cream text-savage-ink px-7 py-3.5 text-sm font-bold uppercase tracking-[0.25em] hover:brightness-110 transition"
          >
            ← Volver al inicio
          </Link>
        </motion.div>
      </section>

      <div className="relative z-10 border-t-2 border-savage-yellow/40 px-6 py-4 flex items-center justify-between text-[9px] uppercase tracking-[0.3em] font-bold">
        <span>Una noche.</span>
        <span className="text-savage-cream">Una banda.</span>
        <span>Vuestro show.</span>
      </div>

      {/* Hidden off-screen poster used by html2canvas for download */}
      <div className="fixed -left-[3000px] top-0 pointer-events-none" aria-hidden>
        <div ref={posterCaptureRef}>
          <PosterArtwork plan={plan} />
        </div>
      </div>
    </main>
  );
}

function SuccessStep({ n, text }: { n: string; text: string }) {
  return (
    <div className="rounded-2xl border-2 border-savage-yellow/40 bg-savage-yellow/5 p-5">
      <p className="font-display text-3xl text-savage-cream">{n}</p>
      <p className="text-sm text-savage-yellow/90 mt-2 leading-relaxed">{text}</p>
    </div>
  );
}
