export const emailAiAgent = {
  metadata: {
    title: "Email AI Agent",
    description:
      "Classify every email, reply with your knowledge, and hand off to your team when a human should take over — customer support, leads, invoices, and suppliers.",
  },
  eyebrow: "Email AI Agent",
  headline: "Turn your inbox into",
  headlineAccent: "action.",
  subhead:
    "Classify every email. Reply with your knowledge. Hand off to your team when a human should take over.",
  primaryCta: "Book a Demo",
  secondaryCta: "See How It Works",
  challenge: {
    heading: "Every email needs attention. Not every email needs the same action.",
    body: "Customer questions, new leads, invoices, and supplier updates all arrive in the same inbox. Before anyone can act, someone has to sort. Replies slow down. Leads go cold.",
  },
  method: {
    eyebrow: "The method",
    heading: "One inbox. Multiple intelligent workflows.",
    steps: [
      {
        id: "detect",
        step: "01",
        title: "Detect & understand",
        body: "Read the message. Grasp intent, urgency, and context.",
      },
      {
        id: "classify",
        step: "02",
        title: "Classify precisely",
        body: "Customer, lead, supplier, invoice, or other.",
      },
      {
        id: "act",
        step: "03",
        title: "Act or hand off",
        body: "Reply, extract, notify — then escalate with clear context.",
      },
    ],
  },
  classification: {
    heading: "Every email knows where it belongs.",
    body: "Incoming mail is sorted into clear lanes so the right workflow starts immediately — no manual triage.",
    lanes: [
      { code: "A", title: "Existing customer", subtitle: "Support & follow-ups" },
      { code: "B", title: "New lead", subtitle: "Sales inquiries" },
      { code: "C", title: "Supplier", subtitle: "Orders & deliveries" },
      { code: "D", title: "Invoice", subtitle: "Bills & records" },
      { code: "E", title: "Other", subtitle: "Ready for the next custom workflow", wide: true },
    ],
    inbox: {
      label: "Live example",
      status: "Inbox → Classified",
      rows: [
        { from: "James Carter", subject: "Oak dining table pricing", badge: "Existing customer" },
        { from: "David Nguyen", subject: "Interested in your products", badge: "New lead" },
        { from: "Accounting Pro", subject: "Invoice #2847 — March 2026", badge: "Invoice" },
        { from: "IT Distribution Ltd", subject: "Delivery confirmation", badge: "Existing supplier" },
      ],
    },
  },
  workflows: {
    heading: "Built for the emails that run your business.",
    items: [
      {
        id: "support",
        step: "01",
        title: "Customer Support",
        body: "When an existing customer emails in, the agent matches them in your database, replies with brand-aligned knowledge, then can optionally hand the thread to your team after two or three AI replies.",
        ticks: [
          "Match existing customer in database",
          "Automatic replies",
          "Optional handoff after 2–3 replies",
        ],
        demo: {
          type: "chat" as const,
          metaLabel: "Example · Existing customer",
          status: "Matched",
          name: "James Carter",
          detail: "james.carter@email.com · Customer #4821",
          messages: [
            {
              role: "in" as const,
              text: "Hi, I bought a sideboard from you last year. Could you help me with the price for the oak dining table and current availability?",
            },
            {
              role: "out" as const,
              text: "Hi James — good to hear from you again. The oak dining table is in stock. I can send you size options and delivery details right away.",
            },
            { role: "in" as const, text: "Thanks! What sizes do you have available?" },
            {
              role: "out" as const,
              text: "We have 6-seat, 8-seat, and 10-seat versions in stock. Standard delivery is 5–7 business days.",
            },
            {
              role: "flag" as const,
              text: "After two/three AI replies, the conversation can be handed over to your team.",
              note: "(Optional but recommended)",
            },
          ],
        },
      },
      {
        id: "lead",
        step: "02",
        title: "Lead Management",
        body: "When a new prospect emails in, the agent classifies the lead and sends an instant follow-up — so no inquiry waits for a manual reply.",
        ticks: ["Classify as new lead", "Send instant follow-up", "Notify sales team"],
        demo: {
          type: "chat" as const,
          messages: [
            {
              role: "in" as const,
              text: "Hi, I'm interested in your products and would like more information. Could someone get back to me?",
            },
            {
              role: "out" as const,
              text: "Thanks for reaching out — we've received your message and will follow up shortly with the details you need.",
            },
            { role: "flag" as const, text: "Lead classified · Instant follow-up sent" },
          ],
        },
      },
      {
        id: "invoice",
        step: "03",
        title: "Invoice Processing",
        body: "Pull key fields from attachments, archive cleanly, and create the CRM or ERP record without manual retyping.",
        ticks: ["Extract invoice details", "Archive centrally", "Create CRM / ERP record"],
        demo: {
          type: "data" as const,
          title: "Invoice #2847",
          subtitle: "Accounting Pro · March 2026",
          rows: [
            { label: "Status", value: "Data extracted" },
            { label: "Archive", value: "Central folder" },
            { label: "Record", value: "Created" },
          ],
        },
      },
      {
        id: "supplier",
        step: "04",
        title: "Supplier Management",
        body: "When a known supplier emails in, the agent matches them in your database and sends an instant follow-up — then notifies purchasing.",
        ticks: [
          "Match supplier in database",
          "Send instant follow-up",
          "Notify purchasing team",
        ],
        demo: {
          type: "chat" as const,
          metaLabel: "Example · Existing supplier",
          status: "Matched",
          name: "IT Distribution Ltd",
          detail: "orders@it-distribution.com · Supplier #1194",
          messages: [
            {
              role: "in" as const,
              text: "Confirming delivery for next week — updated order details attached.",
            },
            {
              role: "out" as const,
              text: "Thanks — we've received your update and notified purchasing.",
            },
            { role: "flag" as const, text: "Supplier matched · Instant follow-up sent" },
          ],
        },
      },
    ],
  },
  finalCta: {
    heading: "Turn your inbox into action.",
    body: "Faster replies. Less repetitive work. Clear handoff to your team when a human should take over.",
    button: "Start a conversation",
  },
} as const;
