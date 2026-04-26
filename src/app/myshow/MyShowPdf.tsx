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
  partyStart: string;
  djExtraHours: number;
  venue: string;
  phone: string;
  email: string;
  guests: string;
  ages: string;
  crowdVibes: string[];
  dressCode: "savage" | "suits" | null;
  liveGenres: string[];
  liveSet: string[];
  liveMustPlay: string;
  firstDance: "dj" | "none" | null;
  firstDanceSong: string;
  firstDanceLink: string;
  djVibes: string[];
  djReferenceUrl: string;
  djMustBangers: string;
  djMustSingalongs: string;
  djMustClosing: string;
  djRequests: "yes" | "filtered" | "no" | null;
  lastSong: string;
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
  return d.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short", year: "numeric" });
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

function DjBucket({ title, items }: { title: string; items: string[] }) {
  if (items.length === 0) return null;
  return (
    <View style={styles.djBucket}>
      <Text style={styles.djBucketLabel}>{title} · {items.length}</Text>
      {items.map((it, i) => (
        <Text key={i} style={styles.djBucketItem}>· {it}</Text>
      ))}
    </View>
  );
}

export default function MyShowPdf({ plan, logoSrc }: { plan: PlanData; logoSrc: string }) {
  const dressLabel = plan.dressCode === "savage" ? "Savage style (elegant + funky)" : plan.dressCode === "suits" ? "Full suits, gala" : "—";
  const requestsLabel = plan.djRequests === "yes" ? "Open mic" : plan.djRequests === "filtered" ? "Filtered by couple" : plan.djRequests === "no" ? "Closed" : "—";
  const firstDanceLabel = plan.firstDance === "dj" ? `DJ plays it · ${plan.firstDanceSong || "—"}` : plan.firstDance === "none" ? "Already done at dinner" : "—";
  const extraLabel = plan.djExtraHours === 0 ? "Just included (1h DJ)" : `+${plan.djExtraHours}h on top of included`;
  const vetos = splitLines(plan.vetos);
  const liveWishlist = splitLines(plan.liveMustPlay);
  const ref = `${plan.names.replace(/\s|&/g, "").toUpperCase().slice(0, 12) || "—"}-${(plan.eventDate || "").replace(/-/g, "").slice(2) || "—"}`;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.topStripe} fixed />
        <View style={styles.bottomStripe} fixed />

        <View style={styles.header}>
          {/* eslint-disable-next-line jsx-a11y/alt-text */}
          <Image src={logoSrc} style={styles.logo} />
          <View style={styles.refBox}>
            <Text style={styles.refLabel}>Booking ref</Text>
            <Text style={styles.refValue}>{ref}</Text>
          </View>
        </View>

        <Text style={styles.overline}>Show specification</Text>
        <Text style={styles.title}>Show for {plan.names || "—"}</Text>
        <Text style={styles.subtitle}>{formatDate(plan.eventDate)} · {plan.venue || "—"}</Text>

        <Section title="Event basics">
          <Row label="Names" value={plan.names || "—"} />
          <Row label="Date" value={formatDate(plan.eventDate)} />
          <Row label="Venue" value={plan.venue || "—"} />
          <Row label="Phone" value={plan.phone || "—"} />
          <Row label="Email" value={plan.email || "—"} mono />
          <Row label="Party start" value={plan.partyStart || "—"} />
          <Row label="Extra DJ hours" value={extraLabel} />
          <Row label="Headcount" value={plan.guests || "—"} />
          <Row label="Age range" value={plan.ages || "—"} />
          <Row label="Crowd vibe" value={plan.crowdVibes.join(", ") || "—"} />
          <Row label="Dress code" value={dressLabel} />
        </Section>

        <Section title="Live show">
          <Row label="Genres" value={plan.liveGenres.join(", ") || "—"} />
          <Row label="Picks from repertoire" value={`${plan.liveSet.length} tracks`} />
          {plan.liveSet.length > 0 && <ListBlock items={plan.liveSet} />}
          <Row label="Wishlist (not in repertoire)" value={`${liveWishlist.length} tracks`} />
          {liveWishlist.length > 0 && <ListBlock items={liveWishlist} />}
          <Row label="Opening dance" value={firstDanceLabel} />
          {plan.firstDance === "dj" && plan.firstDanceLink && (
            <Row label="Reference link" value={plan.firstDanceLink} mono />
          )}
        </Section>

        <Section title="DJ set" red>
          <Row label="Vibes" value={plan.djVibes.join(", ") || "—"} />
          <Row label="Reference playlist" value={plan.djReferenceUrl || "—"} mono />
          <Row label="Requests from guests" value={requestsLabel} />
          <Row label="Last song of the night" value={plan.lastSong || "—"} />
          <DjBucket title="Peak bangers" items={splitLines(plan.djMustBangers)} />
          <DjBucket title="Singalongs" items={splitLines(plan.djMustSingalongs)} />
          <DjBucket title="Closing vibes" items={splitLines(plan.djMustClosing)} />
        </Section>

        <Section title="Banned">
          {vetos.length > 0
            ? <ListBlock items={vetos} banned />
            : <Text style={styles.empty}>Nothing banned.</Text>
          }
        </Section>

        <Section title="Notes">
          <Text style={styles.notes}>{plan.notes || "—"}</Text>
        </Section>

        <View style={styles.footer} fixed>
          <Text>Generated by Savage Party · myshow</Text>
          <Text>{new Date().toLocaleDateString("en-GB")}</Text>
        </View>
      </Page>
    </Document>
  );
}
