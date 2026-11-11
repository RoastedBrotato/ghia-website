import type { IconName } from "@/components/brand/Icon";

export type Industry = {
  slug: string;
  name: string;
  icon: IconName;
  summary: string;
  headline: string;
  intro: string;
  challenges: { title: string; body: string }[];
  deploy: { title: string; body: string; service: string }[];
  note?: string;
};

export const industries: Industry[] = [
  {
    slug: "real-estate",
    name: "Real estate",
    icon: "calendar",
    summary: "Answer every buyer and tenant enquiry and book more viewings.",
    headline: "Every enquiry answered. More viewings booked.",
    intro:
      "Enquiries arrive from portals, ads, calls and WhatsApp — often after hours. We make sure each one is answered, qualified and booked, and that your listings are found in the first place.",
    challenges: [
      {
        title: "Enquiries arrive out of hours",
        body: "Buyers and tenants message in the evening and at weekends, when no one is at the desk.",
      },
      {
        title: "Qualifying takes agent time",
        body: "Hours go on calls with people who aren't ready, can't afford it or want a different area.",
      },
      {
        title: "Slow follow-up loses leads",
        body: "The agency that replies first usually gets the viewing.",
      },
    ],
    deploy: [
      {
        title: "AI receptionist for calls and WhatsApp",
        body: "Answers property questions and takes details at any hour.",
        service: "ai-agents",
      },
      {
        title: "Lead qualification and viewing booking",
        body: "Budget, area, timing and finance checked before a viewing is booked into the right diary.",
        service: "ai-sales-engine",
      },
      {
        title: "Meta and Google lead campaigns",
        body: "Valuation and listing campaigns that feed straight into your pipeline.",
        service: "paid-media",
      },
      {
        title: "Local SEO and listing pages",
        body: "Area pages and a Google Business Profile that win local searches.",
        service: "seo",
      },
    ],
  },
  {
    slug: "healthcare-clinics",
    name: "Dental & healthcare clinics",
    icon: "phone",
    summary: "Fill the diary without adding front-desk pressure.",
    headline: "A front desk that never puts patients on hold.",
    intro:
      "Clinics lose bookings to missed calls and spend hours on scheduling and admin. We automate the front desk and help new patients find you.",
    challenges: [
      {
        title: "Missed calls are missed patients",
        body: "Busy front desks can't answer every call, and many callers don't leave a voicemail.",
      },
      {
        title: "Scheduling eats staff time",
        body: "Bookings, reschedules, reminders and confirmations take hours each week.",
      },
      {
        title: "New patients search locally",
        body: "If you don't appear in local search and maps, you aren't on the list.",
      },
    ],
    deploy: [
      {
        title: "AI receptionist",
        body: "Answers calls and messages, books and reschedules, and routes anything clinical to staff.",
        service: "ai-agents",
      },
      {
        title: "Reminders and confirmations",
        body: "Automated messages that keep the diary accurate.",
        service: "ai-operations",
      },
      {
        title: "Local SEO",
        body: "Treatment pages, reviews and a Google Business Profile that show up in local results.",
        service: "seo",
      },
      {
        title: "Google Ads",
        body: "Campaigns for high-value treatments, tracked to booked appointments.",
        service: "paid-media",
      },
    ],
    note: "We automate scheduling and administration only — never clinical decisions. Workflows are designed with your compliance lead around the privacy rules that apply to you.",
  },
  {
    slug: "ecommerce",
    name: "E-commerce brands",
    icon: "marketplace",
    summary: "Marketplaces, store, ads and support run as one system.",
    headline: "Every channel you sell on, run as one system.",
    intro:
      "Amazon, Walmart, your own store and paid media all pull on the same inventory and budget. We run them together and automate the operations behind them.",
    challenges: [
      {
        title: "Channels managed in silos",
        body: "Separate agencies optimise separate numbers, and nobody owns the total.",
      },
      {
        title: "Inventory and ads out of sync",
        body: "Ads push products that are about to run out, while slow stock sits unsold.",
      },
      {
        title: "Support volume grows with sales",
        body: "Order-status and returns questions swamp the team at peak times.",
      },
    ],
    deploy: [
      {
        title: "Amazon and Walmart management",
        body: "Listings, ads and inventory run as one P&L.",
        service: "amazon-walmart",
      },
      {
        title: "Shopify development and CRO",
        body: "A fast store designed to convert the traffic you pay for.",
        service: "web-development",
      },
      {
        title: "Meta and Google Ads",
        body: "Creative-led campaigns measured on revenue across channels.",
        service: "paid-media",
      },
      {
        title: "AI customer support",
        body: "Order status, returns and FAQs answered instantly, with handover for the rest.",
        service: "ai-agents",
      },
    ],
  },
  {
    slug: "professional-services",
    name: "Professional services",
    icon: "content",
    summary: "Win more clients and spend less time on admin.",
    headline: "More clients. Less admin.",
    intro:
      "Accountants, law firms, recruiters and consultancies grow on reputation and responsiveness. We help you be found, reply faster and automate the paperwork.",
    challenges: [
      {
        title: "Intake is slow and manual",
        body: "Enquiries need several back-and-forth emails before work can start.",
      },
      {
        title: "Documents everywhere",
        body: "Information is retyped from PDFs and emails into multiple systems.",
      },
      {
        title: "Expertise isn't visible online",
        body: "Your knowledge doesn't show up when prospects search for answers.",
      },
    ],
    deploy: [
      {
        title: "Automated client intake",
        body: "Qualification, document collection and booking in one flow.",
        service: "ai-sales-engine",
      },
      {
        title: "Document processing",
        body: "Data extracted from documents and filed where it belongs.",
        service: "ai-operations",
      },
      {
        title: "SEO and content",
        body: "Guides and service pages that answer the questions your clients search for.",
        service: "seo",
      },
      {
        title: "Knowledge assistant",
        body: "An internal assistant that answers from your own precedents and procedures.",
        service: "custom-ai",
      },
    ],
  },
];

export const getIndustry = (slug: string) => industries.find((i) => i.slug === slug);
