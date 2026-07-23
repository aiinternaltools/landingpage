export const emailAiAgent = {
  metadata: {
    title: "Agent AI pentru email",
    description:
      "Clasifică fiecare email, răspunde cu cunoștințele tale și transferă către echipă când e nevoie de un om — suport clienți, lead-uri, facturi și furnizori.",
  },
  eyebrow: "Agent AI pentru email",
  headline: "Transformă inboxul în",
  headlineAccent: "acțiune.",
  subhead:
    "Clasifică fiecare email. Răspunde cu cunoștințele tale. Transferă către echipă când e nevoie de un om.",
  primaryCta: "Programează un demo",
  secondaryCta: "Vezi cum funcționează",
  challenge: {
    heading: "Fiecare email cere atenție. Nu fiecare email cere aceeași acțiune.",
    body: "Întrebări de la clienți, lead-uri noi, facturi și actualizări de la furnizori ajung în același inbox. Înainte să poată acționa cineva, cineva trebuie să sorteze. Răspunsurile întârziesc. Lead-urile se răcesc.",
  },
  method: {
    eyebrow: "Metoda",
    heading: "Un inbox. Mai multe fluxuri inteligente.",
    steps: [
      {
        id: "detect",
        step: "01",
        title: "Detectează și înțelege",
        body: "Citește mesajul. Extrage intenția, urgența și contextul.",
      },
      {
        id: "classify",
        step: "02",
        title: "Clasifică precis",
        body: "Client, lead, furnizor, factură sau altceva.",
      },
      {
        id: "act",
        step: "03",
        title: "Acționează sau transferă",
        body: "Răspunde, extrage, notifică — apoi escaladează cu context clar.",
      },
    ],
  },
  classification: {
    heading: "Fiecare email știe unde aparține.",
    body: "Mesajele primite sunt sortate pe benzi clare, astfel încât fluxul potrivit pornește imediat — fără triaj manual.",
    lanes: [
      { code: "A", title: "Client existent", subtitle: "Suport și follow-up" },
      { code: "B", title: "Lead nou", subtitle: "Cereri de vânzări" },
      { code: "C", title: "Furnizor", subtitle: "Comenzi și livrări" },
      { code: "D", title: "Factură", subtitle: "Facturi și evidențe" },
      { code: "E", title: "Altele", subtitle: "Pregătit pentru următorul flux personalizat", wide: true },
    ],
    inbox: {
      label: "Exemplu live",
      status: "Inbox → Clasificat",
      rows: [
        { from: "James Carter", subject: "Preț masă dining stejar", badge: "Client existent" },
        { from: "David Nguyen", subject: "Interesat de produsele voastre", badge: "Lead nou" },
        { from: "Accounting Pro", subject: "Factură #2847 — martie 2026", badge: "Factură" },
        { from: "IT Distribution Ltd", subject: "Confirmare livrare", badge: "Furnizor existent" },
      ],
    },
  },
  workflows: {
    heading: "Construit pentru emailurile care țin businessul în mișcare.",
    items: [
      {
        id: "support",
        step: "01",
        title: "Suport clienți",
        body: "Când un client existent scrie, agentul îl potrivește în baza de date, răspunde cu cunoștințe aliniate brandului, apoi poate transfera conversația echipei după două sau trei răspunsuri AI.",
        ticks: [
          "Potrivire client existent în baza de date",
          "Răspunsuri automate",
          "Transfer opțional după 2–3 răspunsuri",
        ],
        demo: {
          type: "chat" as const,
          metaLabel: "Exemplu · Client existent",
          status: "Potrivit",
          name: "James Carter",
          detail: "james.carter@email.com · Client #4821",
          messages: [
            {
              role: "in" as const,
              text: "Bună, am cumpărat un sideboard de la voi anul trecut. Mă puteți ajuta cu prețul și disponibilitatea pentru masa dining din stejar?",
            },
            {
              role: "out" as const,
              text: "Bună James — ne bucurăm să te reauzim. Masa dining din stejar este pe stoc. Îți pot trimite opțiunile de dimensiuni și detaliile de livrare imediat.",
            },
            { role: "in" as const, text: "Mulțumesc! Ce dimensiuni aveți disponibile?" },
            {
              role: "out" as const,
              text: "Avem variante pe 6, 8 și 10 locuri pe stoc. Livrarea standard durează 5–7 zile lucrătoare.",
            },
            {
              role: "flag" as const,
              text: "După două/trei răspunsuri AI, conversația poate fi transferată echipei tale.",
              note: "(Opțional, dar recomandat)",
            },
          ],
        },
      },
      {
        id: "lead",
        step: "02",
        title: "Gestionare lead-uri",
        body: "Când un prospect nou scrie, agentul clasifică lead-ul și trimite un follow-up instant — astfel nicio cerere nu așteaptă un răspuns manual.",
        ticks: ["Clasificare ca lead nou", "Follow-up instant", "Notificare echipă de vânzări"],
        demo: {
          type: "chat" as const,
          messages: [
            {
              role: "in" as const,
              text: "Bună, sunt interesat de produsele voastre și aș dori mai multe informații. Poate cineva să mă contacteze?",
            },
            {
              role: "out" as const,
              text: "Mulțumim pentru mesaj — l-am primit și revenim în curând cu detaliile de care ai nevoie.",
            },
            { role: "flag" as const, text: "Lead clasificat · Follow-up trimis" },
          ],
        },
      },
      {
        id: "invoice",
        step: "03",
        title: "Procesare facturi",
        body: "Extrage câmpurile cheie din atașamente, arhivează curat și creează înregistrarea în CRM sau ERP fără reintroducere manuală.",
        ticks: ["Extragere detalii factură", "Arhivare centrală", "Creare înregistrare CRM / ERP"],
        demo: {
          type: "data" as const,
          title: "Factură #2847",
          subtitle: "Accounting Pro · martie 2026",
          rows: [
            { label: "Status", value: "Date extrase" },
            { label: "Arhivă", value: "Folder central" },
            { label: "Înregistrare", value: "Creată" },
          ],
        },
      },
      {
        id: "supplier",
        step: "04",
        title: "Gestionare furnizori",
        body: "Când un furnizor cunoscut scrie, agentul îl potrivește în baza de date, trimite un follow-up instant și notifică achizițiile.",
        ticks: [
          "Potrivire furnizor în baza de date",
          "Follow-up instant",
          "Notificare echipă achiziții",
        ],
        demo: {
          type: "chat" as const,
          metaLabel: "Exemplu · Furnizor existent",
          status: "Potrivit",
          name: "IT Distribution Ltd",
          detail: "orders@it-distribution.com · Furnizor #1194",
          messages: [
            {
              role: "in" as const,
              text: "Confirmăm livrarea pentru săptămâna viitoare — detalii actualizate atașate.",
            },
            {
              role: "out" as const,
              text: "Mulțumim — am primit actualizarea și am notificat achizițiile.",
            },
            { role: "flag" as const, text: "Furnizor potrivit · Follow-up trimis" },
          ],
        },
      },
    ],
  },
  finalCta: {
    heading: "Transformă inboxul în acțiune.",
    body: "Răspunsuri mai rapide. Mai puțină muncă repetitivă. Transfer clar către echipă când e nevoie de un om.",
    button: "Începe o conversație",
  },
} as const;
