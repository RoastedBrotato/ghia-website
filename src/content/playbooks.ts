export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "quote"; text: string };

export type Playbook = {
  slug: string;
  title: string;
  category: string;
  summary: string;
  date: string; // ISO
  readMinutes: number;
  body: Block[];
};

export const playbooks: Playbook[] = [
  {
    slug: "five-fixes-for-a-stalled-amazon-listing",
    title: "Five fixes for a stalled Amazon listing",
    category: "Amazon",
    summary:
      "When sales flatten, the cause is usually in the listing or the ad structure — not the algorithm. Here's where we look first.",
    date: "2026-11-10",
    readMinutes: 6,
    body: [
      {
        type: "p",
        text: "A listing that used to sell and now doesn't is rarely a mystery. Traffic, conversion or both have dropped, and the data to tell which is already in Seller Central. Before changing anything, find out which one moved.",
      },
      { type: "h2", text: "1. Check what you actually rank for" },
      {
        type: "p",
        text: "Open the Search Query Performance report in Brand Analytics. Compare the search terms that drive impressions today with the ones that drove them three months ago. A listing often slips because a competitor took a high-volume term, not because the whole listing stopped working.",
      },
      {
        type: "ul",
        items: [
          "Note the five terms with the most purchases over the last 90 days.",
          "Check your impression share and click share for each.",
          "Search each term logged out and see what now sits above you.",
        ],
      },
      { type: "h2", text: "2. Rewrite the title for the shopper" },
      {
        type: "p",
        text: "Titles stuffed with keywords read badly on mobile, where most shoppers see only the first line. Lead with the brand, the product type and the one attribute buyers filter on most — size, quantity or compatibility. Move the rest to bullets and backend search terms.",
      },
      { type: "h2", text: "3. Fix the main image and the image stack" },
      {
        type: "p",
        text: "The main image decides the click in search results. It should fill the frame and show the product clearly at thumbnail size. The secondary images should answer the questions in your reviews and Q&A: size in hand, what's in the box, how it's used.",
      },
      { type: "h2", text: "4. Look at price, Buy Box and reviews together" },
      {
        type: "p",
        text: "Conversion drops if you lose the Buy Box, if a competitor undercuts you or if recent reviews mention a problem. Check Buy Box percentage in the Business Reports, read the last 20 reviews, and compare your price to the listings now ranking above you.",
      },
      { type: "h2", text: "5. Restructure the ads" },
      {
        type: "p",
        text: "Many stalled accounts run a few broad campaigns where every keyword competes for the same budget. A cleaner structure makes performance readable and lets you control spend.",
      },
      {
        type: "ol",
        items: [
          "Separate automatic, broad, phrase and exact campaigns.",
          "Harvest converting search terms from auto and broad into exact.",
          "Add those terms as negatives in the discovery campaigns.",
          "Protect branded terms in their own campaign.",
          "Judge campaigns on contribution margin, not ACoS alone.",
        ],
      },
      { type: "h2", text: "Where to start" },
      {
        type: "p",
        text: "Work out whether traffic or conversion fell first. If impressions dropped, start with ranking and ads. If clicks held but orders fell, start with the image, price and reviews. Change one thing at a time so you know what worked.",
      },
      {
        type: "quote",
        text: "Rankings are won in the details nobody screenshots.",
      },
    ],
  },
  {
    slug: "what-an-ai-receptionist-should-and-shouldnt-do",
    title: "What an AI receptionist should — and shouldn't — do",
    category: "AI automation",
    summary:
      "AI receptionists work best with a clear job description. Here's how we decide what to hand over and what stays with people.",
    date: "2026-11-06",
    readMinutes: 5,
    body: [
      {
        type: "p",
        text: "An AI receptionist is not a replacement for your front desk. It's a new team member with a narrow job, and like any new hire it needs a job description, rules and someone checking its work.",
      },
      { type: "h2", text: "What it should handle" },
      {
        type: "p",
        text: "The best tasks are high-volume, repetitive and low-risk — the calls and messages your team answers the same way every time.",
      },
      {
        type: "ul",
        items: [
          "Answering opening hours, location, pricing and service questions from approved information.",
          "Booking, rescheduling and cancelling appointments in your calendar.",
          "Taking messages and contact details with the reason for the call.",
          "Qualifying enquiries with a short, agreed set of questions.",
          "Sending confirmations and summaries to the customer and your team.",
        ],
      },
      { type: "h2", text: "What it shouldn't handle" },
      {
        type: "p",
        text: "Anything where a wrong answer causes real harm, or where the customer needs judgement and empathy, belongs with a person.",
      },
      {
        type: "ul",
        items: [
          "Medical, legal or financial advice.",
          "Complaints, disputes and refunds outside a clear policy.",
          "Emergencies — these should be routed immediately.",
          "Negotiating price or terms.",
          "Anything it can't answer from the information it was given.",
        ],
      },
      { type: "h2", text: "Rules that make it trustworthy" },
      {
        type: "ol",
        items: [
          "It says it's an AI assistant at the start of the conversation.",
          "It answers only from approved information and says when it doesn't know.",
          "It hands over to a person on request, with the conversation so far.",
          "Every conversation is logged and reviewable by your team.",
          "Sensitive data is collected only when the workflow needs it.",
        ],
      },
      { type: "h2", text: "How to roll one out" },
      {
        type: "p",
        text: "Start on one channel, such as after-hours calls, with a person reviewing every conversation for the first weeks. Expand to more hours and channels once the logs show it's handling calls the way your best receptionist would.",
      },
    ],
  },
  {
    slug: "technical-seo-checks-before-your-next-blog-post",
    title: "Technical SEO checks before your next blog post",
    category: "SEO",
    summary:
      "Content can't rank if search engines can't crawl, index and understand it. Six checks worth an afternoon before you publish more.",
    date: "2026-11-02",
    readMinutes: 6,
    body: [
      {
        type: "p",
        text: "Publishing more content is the most common SEO advice and often the wrong first step. If technical issues stop pages being indexed or understood, new content inherits the same problems.",
      },
      { type: "h2", text: "1. Indexation" },
      {
        type: "p",
        text: "In Google Search Console, open the Pages report. Look at why pages aren't indexed. 'Crawled — currently not indexed' on important pages usually means thin, duplicate or poorly linked content. 'Excluded by noindex' should only appear on pages you meant to hide.",
      },
      { type: "h2", text: "2. Canonicals and duplicates" },
      {
        type: "p",
        text: "Filtered category pages, tracking parameters and http/https or www variants can create many URLs for the same content. Each indexable page should have one canonical URL, and internal links should point to it.",
      },
      { type: "h2", text: "3. Internal links" },
      {
        type: "p",
        text: "Pages with no internal links pointing to them are hard to find for people and crawlers alike. Link from relevant, established pages using descriptive anchor text, and keep important pages within a few clicks of the homepage.",
      },
      { type: "h2", text: "4. Core Web Vitals" },
      {
        type: "p",
        text: "Check the Core Web Vitals report for field data from real users. Common fixes: size images properly, load fonts efficiently, defer non-critical scripts and reserve space for anything that loads late so the layout doesn't shift.",
      },
      { type: "h2", text: "5. Structured data" },
      {
        type: "p",
        text: "Schema markup helps search engines and AI systems understand what a page is about. Use Organization on the homepage, Article on posts, Product on product pages and LocalBusiness if you serve an area. Validate with the Rich Results Test.",
      },
      { type: "h2", text: "6. Sitemap and robots.txt" },
      {
        type: "ul",
        items: [
          "The XML sitemap lists only canonical, indexable URLs.",
          "It's submitted in Search Console and referenced in robots.txt.",
          "robots.txt doesn't block CSS, JavaScript or important sections.",
        ],
      },
      { type: "h2", text: "Then write" },
      {
        type: "p",
        text: "Once the foundations are sound, new content has a fair chance. Choose topics by search intent, link each new piece from related pages, and measure it on clicks and conversions in Search Console and analytics.",
      },
    ],
  },
];

export const getPlaybook = (slug: string) => playbooks.find((p) => p.slug === slug);

export const formatDate = (iso: string) =>
  new Date(iso + "T00:00:00Z").toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
