export type CityLanding = {
  slug: string;
  city: string;
  region: string;
  seoTitle: string;
  seoDescription: string;
  h1Lead: string;
  h1Highlight: string;
  intro: string;
  sections: { title: string; body: string }[];
};

export const CITY_LANDINGS: CityLanding[] = [
  {
    slug: "barcelona",
    city: "Barcelona",
    region: "Spain",
    seoTitle: "Wedding DJ + live band in Barcelona · Savage Party",
    seoDescription:
      "Barcelona-based DJ plus live band for weddings in the city and within 50 km. No travel cost, local act, sax guitar and drums roaming the crowd.",
    h1Lead: "Weddings in",
    h1Highlight: "Barcelona.",
    intro:
      "Home base. When you book Savage Party for a wedding in Barcelona or within 50 km of the city you're booking a local act with no travel cost. The DJ and the three musicians live here, rehearse here, play here every week.",
    sections: [
      {
        title: "Venue types we play",
        body: "Masias in the hills behind the city. Rooftops in the Gothic quarter. Beach clubs along the Maresme. Restored industrial spaces in Poblenou. Same show, sound setup scaled to the venue.",
      },
      {
        title: "Curfew and timing",
        body: "Most outdoor venues inside Barcelona cut music at 00:00 because of the city's noise ordinance. Indoor venues and countryside masias usually allow later. We shape the 2h DJ + band block plus the 1h extra DJ around your venue's curfew so nothing critical gets clipped.",
      },
      {
        title: "Logistics",
        body: "Inside the 50 km ring there's no travel fee. Outside it we quote travel transparently. Load-in typically starts 17:00 for a 23:00 show start, we coordinate with your venue on access times and sound checks.",
      },
    ],
  },
  {
    slug: "costa-brava",
    city: "Costa Brava",
    region: "Spain",
    seoTitle: "Wedding DJ + live band on the Costa Brava · Savage Party",
    seoDescription:
      "Savage Party plays wedding venues across the Costa Brava. Masias, seaside estates, rugged-coast venues north of Palafrugell. 60-90 min from Barcelona.",
    h1Lead: "Weddings on the",
    h1Highlight: "Costa Brava.",
    intro:
      "Our backyard. The drive from Barcelona is 60 to 90 minutes to most Girona-province venues, which keeps travel costs minimal and usually means no overnight accommodation for the team.",
    sections: [
      {
        title: "Venue types we play",
        body: "Masias in the Empordà, seaside estates on the Cap de Creus coast, rugged-coast venues north of Palafrugell. Outdoor receptions under umbrella pines, peak dancing in a renovated barn or a marquee next to the main house.",
      },
      {
        title: "Curfew and timing",
        body: "Varies by municipality. Some Girona towns allow outdoor music until 01:00, others push indoors after 00:00. We plan the 2h band + 1h DJ block around your local cut-off.",
      },
      {
        title: "Logistics",
        body: "Travel from Barcelona is part of the quote, usually without overnight costs. If your reception genuinely runs past 03:00 we budget an overnight for the team so nobody's driving back on the wrong side of tired.",
      },
    ],
  },
  {
    slug: "ibiza",
    city: "Ibiza",
    region: "Balearic Islands",
    seoTitle: "Wedding DJ + live band in Ibiza · Savage Party",
    seoDescription:
      "Ibiza destination weddings with a DJ plus three live musicians roaming your crowd. Finca-style venues, cliff-front hotels, beach venues on the west coast.",
    h1Lead: "Weddings in",
    h1Highlight: "Ibiza.",
    intro:
      "The destination wedding capital of the Mediterranean and the island our sound lives for. DJ plus three live musicians roaming the crowd is basically the format the island invented, repurposed for a private celebration.",
    sections: [
      {
        title: "Venue types we play",
        body: "Finca-style countryside estates, cliff-front hotels, west-coast beach venues. Outdoor is the default. The show has to handle sunset dinner into the full after-dinner fiesta without a break in energy.",
      },
      {
        title: "Curfew and timing",
        body: "Most Ibiza villa venues allow music until 02:00 or 03:00. Some beach venues are stricter. We match the 2h DJ + band block and the 1h extra DJ to the window your venue gives you.",
      },
      {
        title: "Logistics",
        body: "Travel means a flight from Barcelona plus gear transfer. We organize this with you as part of the quote so there are no surprises on the invoice. Overnight accommodation for the team is included when the show runs late.",
      },
    ],
  },
  {
    slug: "mallorca",
    city: "Mallorca",
    region: "Balearic Islands",
    seoTitle: "Wedding DJ + live band in Mallorca · Savage Party",
    seoDescription:
      "Savage Party plays Mallorca weddings. Finca venues inland, Tramuntana mountain settings, coastal venues in Puerto Portals and Camp de Mar. DJ plus live band.",
    h1Lead: "Weddings in",
    h1Highlight: "Mallorca.",
    intro:
      "The quieter cousin of Ibiza, and for a lot of couples that's the pitch. Finca-style venues inland, Tramuntana mountain views, a more relaxed curfew culture in the rural villages.",
    sections: [
      {
        title: "Venue types we play",
        body: "Fincas in the interior: Llucmajor countryside, Sóller valley, Artà hinterland. Coastal venues in Puerto Portals, Camp de Mar, and the northeast coast. The rural finca wedding is the classic Mallorca format.",
      },
      {
        title: "Curfew and timing",
        body: "Curfews in rural Mallorca are usually generous, often 01:00 or 02:00 outdoors. Coastal venues are tighter. We plan the show block around your venue's specific permit and put the peak hour inside the window that legally matters.",
      },
      {
        title: "Logistics",
        body: "Travel from Barcelona is a 40-minute flight with gear. Overnight for the team is factored in when needed. Everything breaks down on the quote so you see exactly what the island is costing you.",
      },
    ],
  },
  {
    slug: "madrid",
    city: "Madrid",
    region: "Spain",
    seoTitle: "Wedding DJ + live band in Madrid · Savage Party",
    seoDescription:
      "Madrid destination weddings with DJ plus live band. Sierra de Guadarrama country estates, palacios in the centre, hybrid indoor-outdoor venues. Sound usually handled by the local rig.",
    h1Lead: "Weddings in",
    h1Highlight: "Madrid.",
    intro:
      "Madrid destination weddings are different. Most of our Madrid couples are Spanish families with international guest lists hosting in the high-end venues of the Sierra or in the city centre. Big party, high music expectations, packed timeline.",
    sections: [
      {
        title: "Venue types we play",
        body: "Country estates in the Sierra de Guadarrama, palacios and palaces in central Madrid, hybrid indoor-outdoor mountain venues. Music expectations in Madrid skew Latin pop, hip hop and global disco.",
      },
      {
        title: "Curfew and timing",
        body: "Curfews vary. Most private venues in the Sierra allow music until 02:00 or 03:00. Central Madrid venues are tighter on outdoor sound. We plan the 2h band + 1h DJ block around your window.",
      },
      {
        title: "Logistics",
        body: "Local sound companies in Madrid usually provide the rig and we plug in. Travel from Barcelona is a 2.5-hour AVE or a one-hour flight. Overnight for the team is factored into the quote when the show runs late.",
      },
    ],
  },
];

export function getCityBySlug(slug: string): CityLanding | undefined {
  return CITY_LANDINGS.find((c) => c.slug === slug);
}
