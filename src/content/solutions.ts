import type { IconName } from "@/components/brand/Icon";

export type Solution = {
  slug: string;
  name: string;
  icon: IconName;
  promise: string;
  summary: string;
  features: string[];
  bestFor: string[];
  service: string;
  mockup: "receptionist" | "pipeline" | "workflow";
};

export const solutions: Solution[] = [
  {
    slug: "ai-receptionist",
    name: "Ghia AI Receptionist",
    icon: "phone",
    promise: "Never miss another enquiry.",
    summary:
      "A voice and chat receptionist that answers calls, WhatsApp and web chat, books appointments and passes anything it can't handle to your team.",
    features: [
      "Answers calls and messages at any hour",
      "Books straight into your calendar",
      "Answers questions from your own information",
      "Hands over to a person, with context",
      "Sends your team a summary of every conversation",
    ],
    bestFor: ["Clinics", "Real estate", "Service businesses"],
    service: "ai-agents",
    mockup: "receptionist",
  },
  {
    slug: "ai-sales-engine",
    name: "Ghia AI Sales Engine",
    icon: "funnel",
    promise: "Reply to every lead in minutes, not days.",
    summary:
      "Captures leads from every source, responds instantly, qualifies them against your criteria and follows up until they book.",
    features: [
      "One pipeline for forms, ads, email and WhatsApp",
      "Instant, relevant first response",
      "Qualification your sales team designs",
      "Follow-ups that stop when someone replies",
      "CRM updated without manual entry",
    ],
    bestFor: ["Real estate", "Professional services", "B2B sales teams"],
    service: "ai-sales-engine",
    mockup: "pipeline",
  },
  {
    slug: "ai-operations",
    name: "Ghia AI Operations",
    icon: "workflow",
    promise: "Less admin. Same team.",
    summary:
      "Automates the repetitive work behind the scenes — documents, data entry, reporting and handoffs between tools.",
    features: [
      "Documents and invoices processed automatically",
      "Systems that share data without copy and paste",
      "Approvals where a person should decide",
      "Dashboards that refresh themselves",
      "Logs and alerts on every workflow",
    ],
    bestFor: ["E-commerce", "Clinics", "Finance and admin teams"],
    service: "ai-operations",
    mockup: "workflow",
  },
];

export const deploymentSteps = [
  {
    title: "Map",
    body: "We sit with the people who do the work today and map the process, edge cases and systems involved.",
  },
  {
    title: "Build",
    body: "We build on a proven foundation and configure it with your information, rules and tone.",
  },
  {
    title: "Test",
    body: "We test against real scenarios with your team before any customer sees it.",
  },
  {
    title: "Launch",
    body: "We go live on one channel or team first, with a person reviewing early conversations.",
  },
  {
    title: "Improve",
    body: "We review logs and outcomes every month and keep improving what it handles.",
  },
];
