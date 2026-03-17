import Link from "next/link";

export default function EmailVerifiedPage() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-screen text-center px-4">
      <div className="flex flex-col items-center gap-6 max-w-md">

        <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-green-500">
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </div>

        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-semibold">Email verified</h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Your account is active. You&apos;re all set to start tracking your finances with MoneyHana.
          </p>
        </div>

        <Link
          href="/login"
          className="bg-primary text-primary-foreground font-semibold px-6 py-2.5 rounded-sm text-sm transition-colors hover:bg-primary/90"
        >
          Log in to your account
        </Link>

      </div>
    </div>
  );
}