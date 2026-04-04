import Link from "next/link";
import {
  LayoutDashboard,
  ArrowLeftRight,
  Target,
  Lightbulb,
  RefreshCcw,
  TrendingUp,
  Bell,
} from "lucide-react";

const FEATURES = [
  {
    icon: LayoutDashboard,
    title: "Dashboard Overview",
    description:
      "Get a bird's-eye view of your finances at a glance — income, expenses, and balance trends all in one place.",
  },
  {
    icon: ArrowLeftRight,
    title: "Transaction Tracking",
    description:
      "Log and categorise every income and expense. Filter, search, and paginate through your full transaction history.",
  },
  {
    icon: Target,
    title: "Spending Goals",
    description:
      "Set monthly limits per category and track your progress in real time. Get warned before you overspend.",
  },
  {
    icon: RefreshCcw,
    title: "Subscription Manager",
    description:
      "Track every recurring payment — fixed or periodic, weekly to yearly. Never be surprised by a charge again.",
  },
  {
    icon: Lightbulb,
    title: "AI Insights",
    description:
      "Receive personalised flags, spending patterns, and goal warnings generated from your actual financial behaviour.",
  },
  {
    icon: Bell,
    title: "Due Date Alerts",
    description:
      "Get notified when a subscription payment is coming up. Confirm or dismiss to keep your due dates accurate.",
  },
  {
    icon: TrendingUp,
    title: "Income vs Expense Charts",
    description:
      "Visualise your cash flow over time with clean, interactive charts that make trends impossible to miss.",
  }
];

export default function FeaturesPage() {
  return (
    <div className="flex-1 flex flex-col">

      {/* Hero */}
      <section className="flex flex-col items-center text-center px-6 pt-20 pb-16 gap-5">
        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-xs font-semibold px-3 py-1.5 rounded-full tracking-wide uppercase">
          What&apos;s inside
        </div>
        <h1 className="text-4xl sm:text-5xl font-bebas tracking-wide max-w-xl">
          Everything you need to{" "}
          <span className="text-primary">own your money</span>
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base max-w-md leading-relaxed">
          MoneyHana gives you the tools to track, understand, and control your
          finances — without the complexity of traditional apps.
        </p>
        <Link
          href="/register"
          className="mt-2 bg-primary text-primary-foreground font-semibold text-sm px-6 py-2.5 rounded-sm hover:opacity-90 transition-opacity"
        >
          Get started for free
        </Link>
      </section>

      {/* Feature grid */}
      <section className="px-6 pb-24 max-w-5xl mx-auto w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {FEATURES.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="bg-card rounded-sm p-6 flex flex-col gap-3 border border-border/50"
            >
              <div className="w-9 h-9 rounded-sm bg-primary/10 flex items-center justify-center shrink-0">
                <Icon size={18} className="text-primary" />
              </div>
              <h3 className="text-sm font-semibold">{title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA strip */}
      <section className="border-t border-border bg-muted/40 px-6 py-14 flex flex-col items-center text-center gap-4">
        <h2 className="text-2xl font-bebas tracking-wide">
          Ready to take control?
        </h2>
        <p className="text-sm text-muted-foreground max-w-sm">
          Create your free account and start tracking in under a minute.
        </p>
        <div className="flex gap-3">
          <Link
            href="/register"
            className="bg-primary text-primary-foreground font-semibold text-sm px-5 py-2.5 rounded-sm hover:opacity-90 transition-opacity"
          >
            Create account
          </Link>
          <Link
            href="/login"
            className="text-sm font-semibold px-5 py-2.5 rounded-sm border border-border hover:bg-muted transition-colors"
          >
            Sign in
          </Link>
        </div>
      </section>

    </div>
  );
}