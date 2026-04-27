"use client";

import { Document, Page, Text, View, StyleSheet, Image } from "@react-pdf/renderer";

const C = {
  cream: "#F4E6CE",
  ink: "#2A1A0F",
  yellow: "#FFC007",
  red: "#E63422",
  inkSoft: "#2A1A0F",
};

const styles = StyleSheet.create({
  page: {
    backgroundColor: C.cream,
    color: C.ink,
    paddingTop: 36,
    paddingBottom: 50,
    paddingHorizontal: 44,
    fontFamily: "Helvetica",
    fontSize: 10,
    position: "relative",
  },
  topStripe: { position: "absolute", top: 0, left: 0, right: 0, height: 6, backgroundColor: C.yellow },
  bottomStripe: { position: "absolute", bottom: 0, left: 0, right: 0, height: 6, backgroundColor: C.yellow },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingBottom: 12,
    marginBottom: 4,
    borderBottomWidth: 2,
    borderBottomColor: C.ink,
  },
  logo: { width: 48, height: 48 },
  refBox: { textAlign: "right" },
  refLabel: { fontSize: 7, letterSpacing: 1.5, color: C.inkSoft, opacity: 0.6, textTransform: "uppercase" },
  refValue: { fontSize: 10, fontFamily: "Helvetica-Bold", marginTop: 3, color: C.ink },
  overline: { fontSize: 8, letterSpacing: 2, color: C.red, fontFamily: "Helvetica-Bold", textTransform: "uppercase", marginTop: 16 },
  title: { fontSize: 22, fontFamily: "Helvetica-Bold", marginTop: 4, color: C.ink, textTransform: "uppercase" },
  subtitle: { fontSize: 9, color: C.inkSoft, opacity: 0.7, marginTop: 4 },
  section: { marginTop: 18 },
  sectionHeader: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
  sectionBullet: { width: 6, height: 6, borderRadius: 3, backgroundColor: C.yellow, marginRight: 8, marginTop: 2 },
  sectionBulletRed: { backgroundColor: C.red },
  sectionTitle: { fontSize: 10, fontFamily: "Helvetica-Bold", letterSpacing: 1.5, textTransform: "uppercase", color: C.ink, flex: 1, paddingBottom: 3, borderBottomWidth: 1.5, borderBottomColor: C.ink },
  sectionTitleRed: { color: C.red, borderBottomColor: C.red },
  row: { flexDirection: "row", paddingVertical: 1.5, alignItems: "flex-start" },
  rowLabel: { fontSize: 8, letterSpacing: 1, color: C.inkSoft, opacity: 0.55, textTransform: "uppercase", width: 130 },
  rowValue: { fontSize: 10, flex: 1, color: C.ink },
  rowValueMono: { fontFamily: "Courier", fontSize: 9 },
  list: { marginLeft: 130, marginTop: 2, marginBottom: 6 },
  listItem: { fontSize: 10, color: C.ink, marginBottom: 1 },
  listItemBanned: { textDecoration: "line-through", color: C.inkSoft, opacity: 0.6 },
  djBucket: { marginTop: 8 },
  djBucketLabel: { fontSize: 7.5, letterSpacing: 1, color: C.inkSoft, opacity: 0.6, textTransform: "uppercase", marginBottom: 3 },
  djBucketItem: { fontSize: 10, color: C.ink, marginBottom: 1 },
  notes: { fontSize: 10, color: C.ink, lineHeight: 1.4 },
  empty: { fontSize: 9, color: C.inkSoft, opacity: 0.5, fontStyle: "italic" },
  footer: {
    position: "absolute",
    bottom: 22,
    left: 44,
    right: 44,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 6,
    borderTopWidth: 1,
    borderTopColor: C.inkSoft,
    fontSize: 7,
    color: C.inkSoft,
    opacity: 0.6,
    letterSpacing: 1.2,
    textTransform: "uppercase",
  },
});

type PlanData = {
  names: string;
  eventDate: string;
  partyKind: "cocktail" | "party" | null;
  partyStart: string;
  venue: string;
  phone: string;
  email: string;
  guests: string;
  ages: string;
  crowdVibes: string[];
  dressCode: "savage" | "suits" | null;
  liveGenres: string[];
  liveSet: string[];
  breakSongs: string;
  firstDance: "dj" | "none" | null;
  firstDanceSong: string;
  firstDanceLink: string;
  vetos: string;
  notes: string;
};

function splitLines(s: string): string[] {
  return s.split("\n").map((x) => x.trim()).filter(Boolean);
}

function formatDate(iso: string) {
  if (!iso) return "—";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("es-ES", { weekday: "short", day: "numeric", month: "short", year: "numeric" });
}

function Row({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <View style={styles.row}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={[styles.rowValue, mono ? styles.rowValueMono : {}]}>{value}</Text>
    </View>
  );
}

function ListBlock({ items, banned }: { items: string[]; banned?: boolean }) {
  return (
    <View style={styles.list}>
      {items.map((it, i) => (
        <Text key={i} style={[styles.listItem, banned ? styles.listItemBanned : {}]}>· {it}</Text>
      ))}
    </View>
  );
}

function Section({ title, red, children }: { title: string; red?: boolean; children: React.ReactNode }) {
  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <View style={[styles.sectionBullet, red ? styles.sectionBulletRed : {}]} />
        <Text style={[styles.sectionTitle, red ? styles.sectionTitleRed : {}]}>{title}</Text>
      </View>
      {children}
    </View>
  );
}

export default function MyShowPdf({ plan, logoSrc }: { plan: PlanData; logoSrc: string }) {
  const dressLabel = plan.dressCode === "savage" ? "Estilo Savage (elegante y funky)" : plan.dressCode === "suits" ? "Traje completo, gala" : "—";
  const firstDanceLabel = plan.firstDance === "dj" ? `Sí · ${plan.firstDanceSong || "—"}` : plan.firstDance === "none" ? "Ya hechos en la cena" : "—";
  const partyKindLabel = plan.partyKind === "cocktail" ? "Cóctel" : plan.partyKind === "party" ? "Fiesta directa" : "—";
  const liveLengthLabel = plan.partyKind === "cocktail" ? "1h 30min" : "2h";
  const vetos = splitLines(plan.vetos);
  const breaks = splitLines(plan.breakSongs);
  const ref = `${plan.names.replace(/\s|&|y/g, "").toUpperCase().slice(0, 12) || "—"}-${(plan.eventDate || "").replace(/-/g, "").slice(2) || "—"}`;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.topStripe} fixed />
        <View style={styles.bottomStripe} fixed />

        <View style={styles.header}>
          {/* eslint-disable-next-line jsx-a11y/alt-text */}
          <Image src={logoSrc} style={styles.logo} />
          <View style={styles.refBox}>
            <Text style={styles.refLabel}>Ref. de booking</Text>
            <Text style={styles.refValue}>{ref}</Text>
          </View>
        </View>

        <Text style={styles.overline}>Especificación del show</Text>
        <Text style={styles.title}>Show para {plan.names || "—"}</Text>
        <Text style={styles.subtitle}>{formatDate(plan.eventDate)} · {plan.venue || "—"}</Text>

        <Section title="Datos del evento">
          <Row label="Nombres" value={plan.names || "—"} />
          <Row label="Fecha" value={formatDate(plan.eventDate)} />
          <Row label="Sitio" value={plan.venue || "—"} />
          <Row label="Teléfono" value={plan.phone || "—"} />
          <Row label="Email" value={plan.email || "—"} mono />
          <Row label="Tipo de inicio" value={partyKindLabel} />
          <Row label="Hora de inicio" value={plan.partyStart || "—"} />
          <Row label="Duración del live" value={liveLengthLabel} />
          <Row label="Invitados" value={plan.guests || "—"} />
          <Row label="Rango de edades" value={plan.ages || "—"} />
          <Row label="Vibe del público" value={plan.crowdVibes.join(", ") || "—"} />
          <Row label="Dress code" value={dressLabel} />
        </Section>

        <Section title="Banda en directo">
          <Row label="Géneros" value={plan.liveGenres.join(", ") || "—"} />
          <Row label="Picks del repertorio" value={`${plan.liveSet.length} temas`} />
          {plan.liveSet.length > 0 && <ListBlock items={plan.liveSet} />}
          <Row label="Baile de apertura" value={firstDanceLabel} />
          {plan.firstDance === "dj" && plan.firstDanceLink && (
            <Row label="Link de referencia" value={plan.firstDanceLink} mono />
          )}
        </Section>

        <Section title="Wishlist fuera del repertorio" red>
          {breaks.length > 0
            ? <ListBlock items={breaks} />
            : <Text style={styles.empty}>Sin canciones fuera del repertorio.</Text>
          }
        </Section>

        <Section title="Vetados">
          {vetos.length > 0
            ? <ListBlock items={vetos} banned />
            : <Text style={styles.empty}>Sin vetos.</Text>
          }
        </Section>

        <Section title="Notas">
          <Text style={styles.notes}>{plan.notes || "—"}</Text>
        </Section>

        <View style={styles.footer} fixed>
          <Text>Generado por Savage Party · mishow</Text>
          <Text>{new Date().toLocaleDateString("es-ES")}</Text>
        </View>
      </Page>
    </Document>
  );
}
