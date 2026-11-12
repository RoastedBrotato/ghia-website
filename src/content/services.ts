import type { IconName } from "@/components/brand/Icon";

export type Pillar = "creative" | "growth" | "commerce" | "digital";

/** The four divisions. Each service is a sub-category with its own page. */
export const pillars: Record<
  Pillar,
  {
    name: string;
    eyebrow: string;
    title: string;
    accent: string;
    summary: string;
    hue: string;
    icon: IconName;
    /** How a project in this category runs, shown on each service page */
    process: { title: string; body: string }[];
    /** Who this category is usually right for */
    goodFit: string[];
  }
> = {
  creative: {
    icon: "brand",
    name: "Creative & Production",
    eyebrow: "Creative & production",
    title: "Ideas people",
    accent: "remember.",
    summary: "Brand identity, creative direction, film production, 3D modelling, animation, VFX and graphic design.",
    hue: "#9b7bff",
    process: [
      { title: "Brief & research", body: "We learn the business, the audience and the competition, and agree what the work has to achieve." },
      { title: "Concepts", body: "Two or three distinct directions, each shown in real use — not just on a white page." },
      { title: "Production", body: "One direction refined and produced in-house: design, shoot, edit, animate." },
      { title: "Handover", body: "Final files, guidelines and cut-downs for every channel, ready for your team to use." },
    ],
    goodFit: [
      "New brands getting ready to launch",
      "Established businesses whose look no longer matches who they are",
      "Teams that need campaign, film or 3D work produced to a deadline",
    ],
  },
  growth: {
    icon: "growth",
    name: "Marketing & Growth",
    eyebrow: "Marketing & growth",
    title: "Attention that",
    accent: "converts.",
    summary: "Digital marketing, Google & Meta Ads, SEO, social media management, content strategy and campaign management.",
    hue: "#00c8ff",
    process: [
      { title: "Audit", body: "Your channels, tracking and numbers reviewed, so we know where growth is leaking." },
      { title: "Plan", body: "One roadmap ranked by impact, with the targets we'll be judged on." },
      { title: "Launch", body: "Campaigns, content and listings set live with tracking you can check." },
      { title: "Optimise & report", body: "Weekly changes, monthly reporting on leads and revenue, and a clear next step." },
    ],
    goodFit: [
      "Businesses spending on ads without clear returns",
      "Brands that need a steady stream of content and campaigns",
      "Teams that want one partner across search, social and paid media",
    ],
  },
  commerce: {
    icon: "storefront",
    name: "E-commerce & Marketplace",
    eyebrow: "E-commerce & marketplace",
    title: "Marketplaces that",
    accent: "sell.",
    summary: "Amazon and Walmart marketplace management, listing optimisation, advertising, inventory planning and brand protection.",
    hue: "#ffa462",
    process: [
      { title: "Account audit", body: "Catalogue, listings, ads and inventory reviewed, with the fixes ranked by revenue impact." },
      { title: "Fix & optimise", body: "Listings rewritten, images and A+ content upgraded, catalogue errors cleaned up." },
      { title: "Advertise", body: "Sponsored ads and DSP structured around margin, with stock levels watched alongside spend." },
      { title: "Protect & report", body: "Brand monitoring, reorder planning and monthly reviews against revenue and margin." },
    ],
    goodFit: [
      "Brands selling on Amazon, Walmart or both",
      "Sellers whose ad spend is growing faster than profit",
      "Brands launching on a new marketplace",
    ],
  },
  digital: {
    icon: "chip",
    name: "Technology & Digital Solutions",
    eyebrow: "Technology & digital",
    title: "Systems that",
    accent: "never sleep.",
    summary: "Website and app development, UI/UX, AI agents, workflow automation, cloud solutions, hosting and IT support.",
    hue: "#1678e8",
    process: [
      { title: "Discovery", body: "Goals, users, content and the tools you already use, mapped before anything is built." },
      { title: "Design", body: "Wireframes and designs you review on real screens, desktop and mobile." },
      { title: "Build & test", body: "Developed, connected to your systems and tested for speed, accessibility and security." },
      { title: "Launch & support", body: "Go live with monitoring in place, then ongoing updates, fixes and improvements." },
    ],
    goodFit: [
      "Businesses whose website is slow, dated or hard to update",
      "Teams losing leads to missed calls and slow follow-up",
      "Companies that need reliable hosting, maintenance and IT support",
    ],
  },
};

export const pillarOrder: Pillar[] = ["creative", "growth", "commerce", "digital"];

export type Service = {
  slug: string;
  pillar: Pillar;
  name: string;
  /** Short name for nav and cards */
  short: string;
  icon: IconName;
  summary: string;
  /** The sub-services shown on the card, studio-style */
  list: string[];
  headline: string;
  intro: string;
  capabilities: { title: string; body: string }[];
  outcomes: string[];
  faqs: { q: string; a: string }[];
  related: string[];
};

export const services: Service[] = [
  {
    slug: "branding-creative",
    pillar: "creative",
    name: "Branding & Creative",
    short: "Branding & Creative",
    icon: "brand",
    summary: "Identities and ideas people remember.",
    list: ["Brand Identity", "Creative Direction", "Campaign Concepts", "Corporate Branding"],
    headline: "Brands people remember.",
    intro:
      "Identity, direction and campaign ideas built on a clear strategy — so everything you put out looks, sounds and feels like one brand.",
    capabilities: [
      {
        title: "Brand identity",
        body: "Logo, typography, colour, imagery and the guidelines that hold them together.",
      },
      {
        title: "Creative direction",
        body: "One point of view across shoots, campaigns, social and the website.",
      },
      {
        title: "Campaign concepts",
        body: "Big ideas with the channel plan to carry them — not just a key visual.",
      },
      {
        title: "Corporate branding",
        body: "Stationery, decks, signage and templates your team can use without a designer.",
      },
    ],
    outcomes: [
      "A brand strategy workshop before any design starts",
      "Full brand guidelines and source files you own",
      "Launch assets ready for web, social and print",
    ],
    faqs: [
      {
        q: "Can you refresh our brand rather than start over?",
        a: "Yes. Most work is an evolution. We audit what you have, keep what's working and fix what isn't.",
      },
      {
        q: "How many logo concepts do we see?",
        a: "Usually two or three distinct directions, each shown in real use, then we refine one together.",
      },
      {
        q: "Do you name brands too?",
        a: "Yes — naming, taglines and tone of voice are part of our brand strategy work.",
      },
    ],
    related: ["design-development", "media-film-production", "social-content"],
  },
  {
    slug: "media-film-production",
    pillar: "creative",
    name: "Media & Film Production",
    short: "Media & Film",
    icon: "film",
    summary: "Films and video that move people.",
    list: [
      "TVCs & DVCs",
      "Brand Films",
      "Documentaries",
      "Corporate Videos",
      "Live Streaming",
      "Film & Video Production",
      "Post-Production",
    ],
    headline: "Films that move people.",
    intro:
      "From script to final grade — commercials, brand films and corporate video produced end to end, cut for every screen they'll run on.",
    capabilities: [
      {
        title: "TVCs & DVCs",
        body: "Broadcast and digital commercials, with cut-downs for every platform.",
      },
      {
        title: "Brand films & documentaries",
        body: "Longer stories about your people, product and purpose.",
      },
      {
        title: "Corporate video",
        body: "Recruitment, training, investor and event films.",
      },
      {
        title: "Live streaming",
        body: "Multi-camera streams for launches, conferences and events.",
      },
      {
        title: "Production",
        body: "Scripting, casting, locations, crew and shoot management.",
      },
      {
        title: "Post-production",
        body: "Editing, colour, sound design, subtitles and delivery in every format.",
      },
    ],
    outcomes: [
      "A treatment and production plan before the shoot",
      "Master files plus cut-downs for each channel",
      "Raw footage and project files on request",
    ],
    faqs: [
      {
        q: "Do you handle the whole production?",
        a: "Yes — concept, script, crew, shoot and post. You can also bring us in for one stage only.",
      },
      {
        q: "Can you shoot content for ads?",
        a: "Yes. We plan shoots around the ad tests we'll run, so one day on set covers weeks of creative.",
      },
      {
        q: "Who owns the footage?",
        a: "You do. Usage rights for talent and music are agreed up front and documented.",
      },
    ],
    related: ["animation-vfx", "social-content", "ppc-performance"],
  },
  {
    slug: "animation-vfx",
    pillar: "creative",
    name: "3D Modeling, Animation & VFX",
    short: "3D, Animation & VFX",
    icon: "cube",
    summary: "3D, animation and effects that stop the scroll.",
    list: [
      "3D Modeling",
      "Product Visualization",
      "Character Animation",
      "Architectural Visualization",
      "Motion Graphics",
      "Visual Effects & Compositing",
    ],
    headline: "3D that stops the scroll.",
    intro:
      "Product renders, character animation and visual effects — made for ads, launches and listings where the visual has to do the selling.",
    capabilities: [
      {
        title: "3D modeling",
        body: "Accurate models of products, spaces and characters, ready to render or animate.",
      },
      {
        title: "Product visualisation",
        body: "Studio-quality renders and 360° spins without a photo shoot.",
      },
      {
        title: "Character animation",
        body: "Mascots and characters with personality, rigged for reuse.",
      },
      {
        title: "Architectural visualisation",
        body: "Interiors, exteriors and walkthroughs before anything is built.",
      },
      {
        title: "Motion graphics",
        body: "2D and 3D motion for ads, explainers and social.",
      },
      {
        title: "VFX & compositing",
        body: "Clean-up, CGI integration and effects for live-action footage.",
      },
    ],
    outcomes: [
      "Style frames approved before animation starts",
      "Renders delivered in every size you need",
      "Source scenes and models handed over",
    ],
    faqs: [
      {
        q: "Can 3D replace a product photo shoot?",
        a: "Often, yes — especially for listings, colour variants and products that don't exist yet.",
      },
      {
        q: "What do you need from us?",
        a: "CAD files or reference photos, dimensions and materials. We'll take it from there.",
      },
      {
        q: "Can renders be used on Amazon?",
        a: "Yes. We follow marketplace image rules so renders can be used on your listings.",
      },
    ],
    related: ["media-film-production", "amazon-walmart", "branding-creative"],
  },
  {
    slug: "marketing-strategy",
    pillar: "growth",
    name: "Marketing & Strategy",
    short: "Marketing & Strategy",
    icon: "compass",
    summary: "A plan that ties every channel to revenue.",
    list: [
      "Brand Strategy",
      "Digital Marketing",
      "Social Media Marketing",
      "Outdoor Advertising",
      "Campaign Planning",
      "Media Planning",
      "Campaign Management",
    ],
    headline: "A plan that ties every channel to revenue.",
    intro:
      "Positioning, channel mix and campaign plans built from your numbers — then run, measured and adjusted every month.",
    capabilities: [
      {
        title: "Brand strategy",
        body: "Positioning, audience and messaging that every campaign builds on.",
      },
      {
        title: "Digital marketing",
        body: "Search, social, email and paid media planned as one system.",
      },
      {
        title: "Outdoor advertising",
        body: "Billboards, transit and on-ground activations, planned with digital.",
      },
      {
        title: "Campaign & media planning",
        body: "Budgets, channels and flighting set against clear targets.",
      },
      {
        title: "Campaign management",
        body: "Day-to-day running, reporting and optimisation across every channel.",
      },
    ],
    outcomes: [
      "A written strategy and channel plan in the first month",
      "Monthly reporting against revenue, not impressions",
      "A testing backlog with a decision for every test",
    ],
    faqs: [
      {
        q: "Do you only plan, or run the campaigns too?",
        a: "Both. We can hand over a plan, or run it end to end with our media and creative teams.",
      },
      {
        q: "Do you do offline advertising?",
        a: "Yes — outdoor, print and activations, planned and measured alongside digital.",
      },
      {
        q: "How do you measure results?",
        a: "We agree the numbers that matter up front — leads, sales, cost per acquisition — and report on them monthly.",
      },
    ],
    related: ["ppc-performance", "social-content", "seo"],
  },
  {
    slug: "ppc-performance",
    pillar: "growth",
    name: "PPC & Performance Marketing",
    short: "PPC & Performance",
    icon: "paid-social",
    summary: "Meta & Google Ads, measured on revenue.",
    list: ["Google & Meta Ads", "Paid Advertising", "Campaign Optimization", "Performance Analytics"],
    headline: "Paid media, measured on revenue.",
    intro:
      "Creative, targeting and tracking built together, so every rupee, pound or dollar of spend can be traced to what it returned.",
    capabilities: [
      {
        title: "Meta Ads",
        body: "Facebook and Instagram campaigns structured for learning, with clear audience and creative tests.",
      },
      {
        title: "Google Ads",
        body: "Search, Performance Max, Shopping and YouTube, with negatives and feeds kept clean.",
      },
      {
        title: "Creative for ads",
        body: "Static and video concepts built around a testing plan, not one-off guesses.",
      },
      {
        title: "Campaign optimisation",
        body: "Bids, budgets and audiences adjusted weekly against cost per acquisition.",
      },
      {
        title: "Tracking & analytics",
        body: "Conversions API, enhanced conversions and GA4 so platforms learn from real sales.",
      },
      {
        title: "Landing pages",
        body: "Pages designed for the ad that sends the traffic, not your homepage.",
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
        a: "Yes. We plan, write and produce ad creative, and can work alongside your in-house team.",
      },
    ],
    related: ["marketing-strategy", "design-development", "ai-automation"],
  },
  {
    slug: "seo",
    pillar: "growth",
    name: "Search Engine Optimisation",
    short: "SEO",
    icon: "seo",
    summary: "Search traffic that compounds.",
    list: ["Technical SEO", "Keyword Strategy", "Content Production", "Local SEO", "AI Search Visibility"],
    headline: "Search traffic that compounds.",
    intro:
      "We fix what stops search engines from understanding your site, then build the content that earns rankings — in Google and in AI answers.",
    capabilities: [
      {
        title: "Technical SEO",
        body: "Crawling, indexation, site speed, Core Web Vitals, structured data and internal linking.",
      },
      {
        title: "Keyword & topic strategy",
        body: "A map of what your buyers search for, grouped by intent and tied to pages that convert.",
      },
      {
        title: "Content production",
        body: "Articles, guides and landing pages written by people who understand the subject.",
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
    related: ["design-development", "marketing-strategy", "ppc-performance"],
  },
  {
    slug: "social-content",
    pillar: "growth",
    name: "Social & Content Management",
    short: "Social & Content",
    icon: "content",
    summary: "Always-on content that builds an audience.",
    list: [
      "Social Media Strategy & Management",
      "Content Creation",
      "Influencer & PR Management",
      "Community Management",
    ],
    headline: "Content that builds an audience.",
    intro:
      "A content engine for your brand — planned monthly, produced in-house and managed daily, with influencers and PR working in the same direction.",
    capabilities: [
      {
        title: "Social strategy & management",
        body: "Platform plans, content calendars and daily publishing across your channels.",
      },
      {
        title: "Content creation",
        body: "Reels, carousels, photography and copy produced by our own team.",
      },
      {
        title: "Influencer & PR",
        body: "Creator partnerships and press outreach that line up with your campaigns.",
      },
      {
        title: "Community management",
        body: "Comments and DMs answered quickly and in your voice.",
      },
    ],
    outcomes: [
      "A monthly content calendar you approve in advance",
      "Monthly reports on reach, engagement and enquiries",
      "Every asset and account stays in your name",
    ],
    faqs: [
      {
        q: "Which platforms do you manage?",
        a: "Instagram, Facebook, TikTok, LinkedIn, YouTube and X — we recommend where to focus after the audit.",
      },
      {
        q: "How many posts a month?",
        a: "It depends on goals and budget. We'd rather post less and make each piece count.",
      },
      {
        q: "Do you reply to comments and messages?",
        a: "Yes. Community management is part of the service, with rules for what gets passed to your team.",
      },
    ],
    related: ["media-film-production", "marketing-strategy", "ai-automation"],
  },
  {
    slug: "amazon-walmart",
    pillar: "commerce",
    name: "Amazon & Walmart",
    short: "Amazon & Walmart",
    icon: "storefront",
    summary: "Listings, ads and inventory run as one P&L.",
    list: ["Listing Optimisation", "Sponsored Ads & DSP", "Walmart Marketplace & WFS", "Inventory Planning", "Brand Protection"],
    headline: "Marketplaces, run as one P&L.",
    intro:
      "We manage listings, advertising and inventory across Amazon and Walmart together, so growth in one place never creates a problem in another.",
    capabilities: [
      {
        title: "Listing optimisation",
        body: "Titles, bullets, images and A+ content written for how shoppers actually search and decide.",
      },
      {
        title: "Sponsored ads & DSP",
        body: "Campaign structure, bidding and keyword harvesting tied to contribution margin, not ACoS alone.",
      },
      {
        title: "Walmart Marketplace & WFS",
        body: "Account launch, catalogue setup and Walmart Fulfillment Services onboarding.",
      },
      {
        title: "Inventory & forecasting",
        body: "Reorder planning that keeps ad spend from pushing a best-seller out of stock.",
      },
      {
        title: "Brand protection",
        body: "Brand Registry, catalogue hygiene and monitoring for hijackers and listing changes.",
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
    related: ["ppc-performance", "animation-vfx", "ai-automation"],
  },
  {
    slug: "design-development",
    pillar: "digital",
    name: "Design & Development",
    short: "Design & Development",
    icon: "web-dev",
    summary: "Websites and apps that look sharp and convert.",
    list: ["Graphic Design", "UI/UX", "Website & App Development", "Motion Graphics"],
    headline: "Websites and apps that convert.",
    intro:
      "Research-led design and fast, search-ready builds — marketing sites, stores and apps your team can actually edit.",
    capabilities: [
      {
        title: "UI/UX design",
        body: "Research, wireframes and prototypes tested before anything gets built.",
      },
      {
        title: "Website development",
        body: "Next.js, Webflow, WordPress or Shopify — chosen for who needs to edit it.",
      },
      {
        title: "App development",
        body: "Web and mobile apps, dashboards and internal tools with clean integrations.",
      },
      {
        title: "Graphic design",
        body: "Ads, social, print and presentation design that stays on-brand.",
      },
      {
        title: "Motion graphics",
        body: "Animated logos, UI motion and explainer pieces that make the product click.",
      },
      {
        title: "Conversion optimisation",
        body: "Structured experiments on the pages that carry the most revenue.",
      },
    ],
    outcomes: [
      "A UX audit and technical plan before build starts",
      "Figma files, code, hosting and domains in your name",
      "Performance budgets tested before launch",
    ],
    faqs: [
      {
        q: "Which platform should we use?",
        a: "It depends on who edits the site, what it needs to integrate with and your budget. We recommend one after the audit and explain why.",
      },
      {
        q: "Can you take over an existing site?",
        a: "Yes. We start with a code and performance audit, then fix, extend or rebuild depending on what we find.",
      },
      {
        q: "Do you only design, or build too?",
        a: "Both. Our designers and developers work as one team, so what's designed is what ships.",
      },
    ],
    related: ["branding-creative", "seo", "ppc-performance"],
  },
  {
    slug: "ai-automation",
    pillar: "digital",
    name: "AI Agents & Automation",
    short: "AI & Automation",
    icon: "agent",
    summary: "Agents that answer every enquiry and follow up every lead.",
    list: ["AI Receptionist (voice & chat)", "AI Sales Engine", "Workflow Automation", "Custom AI Development"],
    headline: "AI that answers every enquiry.",
    intro:
      "Voice and chat agents, lead follow-up and workflow automation connected to your tools — so no enquiry waits and your team stops copying data between systems.",
    capabilities: [
      {
        title: "AI receptionist",
        body: "Answers calls, web chat and WhatsApp day and night, books appointments and hands over to your team.",
      },
      {
        title: "AI sales engine",
        body: "Every lead captured, answered in minutes, qualified and followed up until it books.",
      },
      {
        title: "Workflow automation",
        body: "Orders, invoices, reports and data entry moved between your systems automatically.",
      },
      {
        title: "Custom AI development",
        body: "Assistants and tools built on your own data, with clear guardrails.",
      },
      {
        title: "Monitoring & guardrails",
        body: "Conversation logs, review queues and limits on what the AI is allowed to say or do.",
      },
    ],
    outcomes: [
      "A pilot on one workflow or channel before rolling out",
      "Scripts, knowledge and escalation rules you approve",
      "A log of every conversation and action your team can review",
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
    related: ["it-tech-support", "ppc-performance", "design-development"],
  },
  {
    slug: "it-tech-support",
    pillar: "digital",
    name: "IT & Tech Support",
    short: "IT & Tech Support",
    icon: "support",
    summary: "Websites, cloud and systems kept running.",
    list: [
      "Website Maintenance",
      "Hosting & Backups",
      "Cloud Solutions",
      "Data Management",
      "IT Infrastructure",
      "Technical Support",
      "Troubleshooting",
    ],
    headline: "Systems that just keep running.",
    intro:
      "Hosting, maintenance, cloud and day-to-day support — so your website, data and tools stay fast, secure and backed up.",
    capabilities: [
      {
        title: "Website maintenance",
        body: "Updates, security patches, uptime monitoring and small changes on request.",
      },
      {
        title: "Hosting & backups",
        body: "Fast hosting with daily backups and tested restores.",
      },
      {
        title: "Cloud solutions",
        body: "Google Workspace, Microsoft 365 and cloud infrastructure set up and managed.",
      },
      {
        title: "Data management",
        body: "Databases, migrations and access controls kept clean and documented.",
      },
      {
        title: "IT infrastructure",
        body: "Devices, networks and accounts for growing teams.",
      },
      {
        title: "Support & troubleshooting",
        body: "A clear support channel with agreed response times.",
      },
    ],
    outcomes: [
      "An audit of your current setup and risks",
      "A support channel with agreed response times",
      "Monthly uptime, backup and security reports",
    ],
    faqs: [
      {
        q: "Can you support a site you didn't build?",
        a: "Yes. We start with an audit, fix anything urgent, then take over maintenance.",
      },
      {
        q: "Do you offer monthly support plans?",
        a: "Yes — sized to your systems, with agreed response times.",
      },
      {
        q: "Where is our data hosted?",
        a: "With reputable providers in the region you choose. Accounts and credentials stay in your name.",
      },
    ],
    related: ["design-development", "ai-automation", "seo"],
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);
export const servicesByPillar = (p: Pillar) => services.filter((s) => s.pillar === p);
