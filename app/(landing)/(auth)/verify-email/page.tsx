'use client';

import Link from "next/link";
import { useState } from "react";

export default function VerifyEmailPage() {
  const [resent, setResent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function handleResend() {
    setIsLoading(true);
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/resend-verification`, {
        method: "POST",
        credentials: "include",
      });
      setResent(true);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
      <div className="flex flex-col items-center gap-6 max-w-md">

        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary">
            <rect width="20" height="16" x="2" y="4" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
          </svg>
        </div>

        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-semibold">Check your inbox</h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            We sent a verification link to your email address.
            Click the link to activate your account and get started.
          </p>
        </div>

        {resent ? (
          <p className="text-xs text-green-500">Verification email resent.</p>
        ) : (
          <p className="text-xs text-muted-foreground">
            Didn&apos;t receive it? Check your spam folder or{" "}
            <button
              onClick={handleResend}
              disabled={isLoading}
              className="text-primary hover:underline disabled:opacity-50"
            >
              {isLoading ? "Sending..." : "resend the email"}
            </button>
            .
          </p>
        )}

        <Link href="/login" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
          Back to login
        </Link>

      </div>
    </div>
  );
}