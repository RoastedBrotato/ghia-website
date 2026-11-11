import type { IconName } from "@/components/brand/Icon";

export type Pillar = "growth" | "ai";

export type Service = {
  slug: string;
  pillar: Pillar;
  name: string;
  /** Short name for nav and cards */
  short: string;
  icon: IconName;
  summary: string;
  headline: string;
  intro: string;
  tags: string[];
  capabilities: { title: string; body: string }[];
  outcomes: string[];
  faqs: { q: string; a: string }[];
  related: string[];
};

export const pillars: Record<Pillar, { name: string; eyebrow: string; summary: string }> = {
  growth: {
    name: "Growth",
    eyebrow: "Pillar 01 · Growth",
    summary:
      "Marketplaces, search, paid media and the website that converts them — run as one system.",
  },
  ai: {
    name: "AI automation",
    eyebrow: "Pillar 02 · AI automation",
    summary:
      "Agents and workflows that answer every enquiry, follow up every lead and take repetitive work off your team.",
  },
};

export const services: Service[] = [
  /* ------------------------------------------------------------------ Growth */
  {
    slug: "amazon-walmart",
    pillar: "growth",
    name: "Amazon & Walmart",
    short: "Amazon & Walmart",
    icon: "storefront",
    summary: "Listings, ads and inventory run as one P&L.",
    headline: "Marketplaces, run as one P&L.",
    intro:
      "We manage listings, advertising and inventory across Amazon and Walmart together, so growth in one place never creates a problem in another.",
    tags: ["Seller Central", "Vendor Central", "DSP", "WFS"],
    capabilities: [
      {
        title: "Listing optimisation",
        body: "Titles, bullets, images and A+ content written for how shoppers actually search and decide.",
      },
      {
        title: "Sponsored ads and DSP",
        body: "Campaign structure, bidding and keyword harvesting tied to contribution margin, not ACoS alone.",
      },
      {
        title: "Walmart Marketplace and WFS",
        body: "Account launch, catalogue setup and Walmart Fulfillment Services onboarding.",
      },
      {
        title: "Inventory and forecasting",
        body: "Reorder planning that keeps ad spend from pushing a best-seller out of stock.",
      },
      {
        title: "Brand protection",
        body: "Brand Registry, catalogue hygiene and monitoring for hijackers and listing changes.",
      },
      {
        title: "One view of performance",
        body: "Sales, ad spend and margin across both marketplaces in a single report.",
      },
    ],
    outcomes: [
      "A catalogue audit with prioritised fixes in the first weeks",
      "Ad structure you can read and audit yourself",
      "Monthly reviews against revenue and margin, not impressions",
    ],
    faqs: [
      {
        q: "Do you work with sellers or vendors?",
        a: "Both. We manage 3P Seller Central accounts and 1P Vendor Central relationships, and hybrid setups.",
      },
      {
        q: "Do we need to be on both marketplaces?",
        a: "No. Many brands start on Amazon and add Walmart once the catalogue and operations are ready. If Walmart isn't worth it for you yet, we'll say so.",
      },
      {
        q: "Who owns the accounts?",
        a: "You do. We work inside your accounts with the access you grant, and you keep everything if we part ways.",
      },
    ],
    related: ["paid-media", "ai-operations", "web-development"],
  },
  {
    slug: "seo",
    pillar: "growth",
    name: "Search engine optimisation",
    short: "SEO",
    icon: "seo",
    summary: "Technical SEO and content that compounds.",
    headline: "Search traffic that compounds.",
    intro:
      "We fix what stops search engines from understanding your site, then build the content that earns rankings — in Google and in AI answers.",
    tags: ["Technical", "Content", "Local", "AI search"],
    capabilities: [
      {
        title: "Technical SEO",
        body: "Crawling, indexation, site speed, Core Web Vitals, structured data and internal linking.",
      },
      {
        title: "Keyword and topic strategy",
        body: "A map of what your buyers search for, grouped by intent and tied to pages that convert.",
      },
      {
        title: "Content production",
        body: "Articles, guides and landing pages written by people who understand the subject.",
      },
      {
        title: "On-page optimisation",
        body: "Titles, headings, copy and media tuned page by page against real search data.",
      },
      {
        title: "Local SEO",
        body: "Google Business Profile, location pages and citations for businesses that serve an area.",
      },
      {
        title: "AI search visibility",
        body: "Clear structure, entities and sources that AI overviews and answer engines can cite.",
      },
    ],
    outcomes: [
      "A technical audit with fixes ranked by impact and effort",
      "A content plan tied to pages that convert",
      "Reporting from Search Console and analytics, not vanity rank trackers",
    ],
    faqs: [
      {
        q: "How long does SEO take?",
        a: "Technical fixes can show within weeks. Content usually takes several months to compound. We set expectations for your site after the audit.",
      },
      {
        q: "Do you guarantee rankings?",
        a: "No one controls Google's rankings. We commit to the method, the work and transparent reporting.",
      },
      {
        q: "Do you build links?",
        a: "We earn them through useful content and digital PR. We don't buy links or use networks that put your domain at risk.",
      },
    ],
    related: ["web-development", "ui-ux", "paid-media"],
  },
  {
    slug: "paid-media",
    pillar: "growth",
    name: "Meta & Google Ads",
    short: "Meta & Google Ads",
    icon: "paid-social",
    summary: "Creative-led paid media, measured on revenue.",
    headline: "Paid media, measured on revenue.",
    intro:
      "Creative, targeting and tracking built together, so every pound or dollar of spend can be traced to what it returned.",
    tags: ["Meta", "PMax", "Shopping", "YouTube"],
    capabilities: [
      {
        title: "Creative strategy and production",
        body: "Ad concepts, static and video, built around a testing plan rather than one-off guesses.",
      },
      {
        title: "Meta Ads",
        body: "Facebook and Instagram campaigns structured for learning, with clear audience and creative tests.",
      },
      {
        title: "Google Ads",
        body: "Search, Performance Max, Shopping and YouTube, with negative keywords and feeds kept clean.",
      },
      {
        title: "Tracking and attribution",
        body: "Conversions API, enhanced conversions and GA4 set up so the platforms learn from real sales.",
      },
      {
        title: "Landing pages",
        body: "Pages designed for the ad that sends the traffic, not your homepage.",
      },
      {
        title: "Testing programme",
        body: "A written backlog of tests with a hypothesis, a result and a decision for each.",
      },
    ],
    outcomes: [
      "A tracking audit before we spend anything",
      "A creative testing calendar you can see",
      "Reporting on revenue, cost per acquisition and payback",
    ],
    faqs: [
      {
        q: "Is there a minimum budget?",
        a: "There's no fixed minimum, but if a budget is too small for the platforms to learn from, we'll tell you before you spend it.",
      },
      {
        q: "Who owns the ad accounts?",
        a: "You do. Always. We work as users on your accounts and billing stays with you.",
      },
      {
        q: "Do you make the creative?",
        a: "Yes. We plan, write and produce ad creative, and can work alongside your in-house team or existing content.",
      },
    ],
    related: ["ui-ux", "ai-sales-engine", "seo"],
  },
  {
    slug: "ui-ux",
    pillar: "growth",
    name: "UI/UX design",
    short: "UI/UX design",
    icon: "ux-design",
    summary: "Interfaces that turn traffic into customers.",
    headline: "Interfaces that turn traffic into customers.",
    intro:
      "Research-led design for websites, stores and products — from the first wireframe to a design system your team can keep using.",
    tags: ["Figma", "Design systems", "CRO"],
    capabilities: [
      {
        title: "Research and audits",
        body: "Analytics, session recordings and customer interviews to find where people get stuck.",
      },
      {
        title: "Information architecture",
        body: "Navigation and page structure that match how your customers think.",
      },
      {
        title: "Wireframes and prototypes",
        body: "Clickable flows tested before anything gets built.",
      },
      {
        title: "Visual design",
        body: "Interfaces that look like your brand and read clearly on every screen size.",
      },
      {
        title: "Design systems",
        body: "Tokens, components and documentation so new pages stay consistent.",
      },
      {
        title: "Conversion optimisation",
        body: "Structured experiments on the pages that carry the most revenue.",
      },
    ],
    outcomes: [
      "A UX audit with annotated recommendations",
      "Figma files and a component library you own",
      "Designs handed over ready to build",
    ],
    faqs: [
      {
        q: "Do you only design, or build too?",
        a: "Both. Our designers and developers work as one team, so what's designed is what ships.",
      },
      {
        q: "Can you work with our existing brand?",
        a: "Yes. We design within your brand guidelines, or help tighten them if they don't cover digital yet.",
      },
      {
        q: "Do you design apps and dashboards?",
        a: "Yes — web apps, internal tools and dashboards, as well as marketing sites and stores.",
      },
    ],
    related: ["web-development", "seo", "paid-media"],
  },
  {
    slug: "web-development",
    pillar: "growth",
    name: "Web development",
    short: "Web development",
    icon: "web-dev",
    summary: "Fast, search-ready sites and stores.",
    headline: "Fast, search-ready sites and stores.",
    intro:
      "Marketing sites, Shopify stores and web apps built for speed, search and easy editing — with integrations that keep your data in one place.",
    tags: ["Next.js", "Shopify", "Headless", "CMS"],
    capabilities: [
      {
        title: "Marketing websites",
        body: "Built on Next.js, Webflow or WordPress depending on who needs to edit it.",
      },
      {
        title: "Shopify stores",
        body: "Themes, custom sections, apps and checkout extensions.",
      },
      {
        title: "Performance",
        body: "Core Web Vitals treated as a requirement, not an afterthought.",
      },
      {
        title: "Integrations",
        body: "CRM, payments, analytics, marketplaces and your internal tools, connected properly.",
      },
      {
        title: "Content management",
        body: "A CMS your team can use without opening a ticket.",
      },
      {
        title: "Hosting and maintenance",
        body: "Monitoring, updates, backups and a clear support process after launch.",
      },
    ],
    outcomes: [
      "A technical plan and timeline before build starts",
      "Code, hosting and domains in your name",
      "Documentation and a handover session at launch",
    ],
    faqs: [
      {
        q: "Which platform should we use?",
        a: "It depends on who edits the site, what it needs to integrate with and your budget. We recommend one after the audit and explain why.",
      },
      {
        q: "Will the site be fast?",
        a: "We set performance budgets at the start and test against them before launch.",
      },
      {
        q: "Can you take over an existing site?",
        a: "Yes. We start with a code and performance audit, then fix, extend or rebuild depending on what we find.",
      },
    ],
    related: ["ui-ux", "seo", "custom-ai"],
  },

  /* ---------------------------------------------------------- AI automation */
  {
    slug: "ai-agents",
    pillar: "ai",
    name: "AI agents & receptionist",
    short: "AI agents",
    icon: "agent",
    summary: "Voice and chat agents that answer every enquiry.",
    headline: "AI agents that answer every enquiry.",
    intro:
      "Voice and chat agents that answer calls, reply on your website and WhatsApp, book appointments and hand over to your team when a person is needed.",
    tags: ["Voice", "WhatsApp", "Web chat"],
    capabilities: [
      {
        title: "AI voice receptionist",
        body: "Answers calls day and night, books appointments and routes urgent calls to the right person.",
      },
      {
        title: "Website and WhatsApp agents",
        body: "Reply instantly, answer questions from your own information and capture contact details.",
      },
      {
        title: "Customer support agents",
        body: "Handle order status, FAQs and common requests, and open tickets for the rest.",
      },
      {
        title: "Internal assistants",
        body: "Give staff instant answers from your policies, SOPs and documents.",
      },
      {
        title: "Human handover",
        body: "Clear rules for when the agent stops and a person takes over, with full context passed on.",
      },
      {
        title: "Monitoring and guardrails",
        body: "Conversation logs, review queues and limits on what the agent is allowed to say or do.",
      },
    ],
    outcomes: [
      "A pilot on one channel before rolling out to others",
      "Scripts, knowledge and escalation rules you approve",
      "A log of every conversation your team can review",
    ],
    faqs: [
      {
        q: "Will callers know it's an AI?",
        a: "Yes. We recommend the agent says so up front. Modern voice models sound natural, and honesty builds more trust than pretending.",
      },
      {
        q: "What happens when it doesn't know the answer?",
        a: "It says so, takes the caller's details and hands over to your team. It doesn't guess.",
      },
      {
        q: "How is our data handled?",
        a: "We use providers with business data terms, keep only what the workflow needs and agree retention rules with you before launch.",
      },
    ],
    related: ["ai-sales-engine", "ai-operations", "custom-ai"],
  },
  {
    slug: "ai-sales-engine",
    pillar: "ai",
    name: "AI sales engine",
    short: "AI sales engine",
    icon: "funnel",
    summary: "Capture, qualify and follow up every lead.",
    headline: "Turn more leads into customers.",
    intro:
      "Every lead captured, answered in minutes, qualified against your criteria and followed up until it books — with your CRM kept up to date automatically.",
    tags: ["CRM", "Lead routing", "Follow-up"],
    capabilities: [
      {
        title: "Lead capture from every source",
        body: "Website forms, ad lead forms, marketplaces, email and WhatsApp in one pipeline.",
      },
      {
        title: "Instant first response",
        body: "Every lead gets a relevant reply in minutes, at any hour.",
      },
      {
        title: "Qualification",
        body: "Questions that sort serious buyers from browsers, using criteria your sales team sets.",
      },
      {
        title: "Follow-up sequences",
        body: "Personalised email, SMS and WhatsApp follow-ups that stop when someone replies.",
      },
      {
        title: "Appointment booking",
        body: "Qualified leads book straight into your team's calendars.",
      },
      {
        title: "CRM automation",
        body: "Records created, updated and de-duplicated without manual data entry.",
      },
    ],
    outcomes: [
      "A map of where leads arrive today and where they're lost",
      "Qualification rules written with your sales team",
      "A pipeline view your team trusts",
    ],
    faqs: [
      {
        q: "Which CRMs do you work with?",
        a: "HubSpot, Salesforce, Pipedrive, Zoho and others with an API. If you don't have a CRM yet, we'll help you choose one.",
      },
      {
        q: "Will it replace our sales team?",
        a: "No. It handles speed and admin so your team spends its time on conversations that are ready to close.",
      },
      {
        q: "Can we approve messages before they go out?",
        a: "Yes. Templates and tone are agreed up front, and any step can require approval.",
      },
    ],
    related: ["ai-agents", "paid-media", "ai-operations"],
  },
  {
    slug: "ai-operations",
    pillar: "ai",
    name: "AI operations",
    short: "AI operations",
    icon: "workflow",
    summary: "Workflows, documents and reporting on autopilot.",
    headline: "Take the repetitive work off your team.",
    intro:
      "We find the manual, repeatable work in your operations — data entry, documents, reporting — and automate it with AI and integrations your team can see and trust.",
    tags: ["Workflows", "Documents", "Dashboards"],
    capabilities: [
      {
        title: "Workflow automation",
        body: "Multi-step processes across your tools, with checks and approvals where they matter.",
      },
      {
        title: "Document and invoice processing",
        body: "Extract, validate and file data from PDFs, emails and forms.",
      },
      {
        title: "CRM and ERP integrations",
        body: "Systems that share data instead of relying on copy and paste.",
      },
      {
        title: "Email and task automation",
        body: "Triage inboxes, draft replies and create tasks for the right person.",
      },
      {
        title: "Reporting and dashboards",
        body: "Business performance in one place, refreshed automatically.",
      },
      {
        title: "Forecasting",
        body: "Sales and demand forecasts built from your own historical data.",
      },
    ],
    outcomes: [
      "A workflow audit ranking tasks by time saved and risk",
      "Automations with logs and alerts, not black boxes",
      "Documentation your team can maintain",
    ],
    faqs: [
      {
        q: "Which tools do you build with?",
        a: "n8n, Make and Zapier for workflows, and custom code where those aren't enough. We pick what your team can maintain.",
      },
      {
        q: "What if an automation makes a mistake?",
        a: "Every workflow has validation, logging and alerts, and high-stakes steps keep a person in the loop.",
      },
      {
        q: "Where should we start?",
        a: "With one process that is high-volume, rule-based and painful. A quick win builds the case for the rest.",
      },
    ],
    related: ["custom-ai", "ai-sales-engine", "amazon-walmart"],
  },
  {
    slug: "custom-ai",
    pillar: "ai",
    name: "Custom AI development",
    short: "Custom AI",
    icon: "chip",
    summary: "AI applications and features, built for your business.",
    headline: "Custom AI, built for your business.",
    intro:
      "When off-the-shelf tools don't fit, we design and build AI applications, assistants and product features — tested, secure and maintainable.",
    tags: ["LLM apps", "RAG", "APIs"],
    capabilities: [
      {
        title: "AI applications",
        body: "Web apps and internal tools with AI at the core, from prototype to production.",
      },
      {
        title: "Knowledge assistants",
        body: "Assistants that answer from your documents and data, with sources shown.",
      },
      {
        title: "AI features in your product",
        body: "Search, summarisation, drafting and classification added to software you already run.",
      },
      {
        title: "API integrations",
        body: "Leading model providers connected to your systems with the right guardrails.",
      },
      {
        title: "Evaluation and testing",
        body: "Test sets and quality checks so changes improve results instead of guessing.",
      },
      {
        title: "Security and access control",
        body: "Permissions, audit logs and data handling designed in from day one.",
      },
    ],
    outcomes: [
      "A scoped prototype before a full build",
      "An evaluation set that measures quality",
      "Code and infrastructure in your accounts",
    ],
    faqs: [
      {
        q: "Which AI models do you use?",
        a: "We choose per use case from leading providers such as OpenAI and Anthropic, and design so models can be swapped as they improve.",
      },
      {
        q: "How do you stop the AI making things up?",
        a: "Grounding in your own data, showing sources, evaluation tests and clear limits on what it answers.",
      },
      {
        q: "Who owns what you build?",
        a: "You do — code, prompts, data and infrastructure.",
      },
    ],
    related: ["ai-operations", "ai-agents", "web-development"],
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);
export const servicesByPillar = (p: Pillar) => services.filter((s) => s.pillar === p);
