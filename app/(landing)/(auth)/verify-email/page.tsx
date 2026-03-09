'use client';

import Link from "next/link";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { verifyEmail } from "@/services/auth";
import { IconCircle } from "./components/IconCircle";
import { ResendForm } from "./components/ResendForm";
import { EmailIcon } from "./components/AuthIcons";
import { VerifyErrorState } from "./components/VerifyErrorStat";
import { VerifyingState } from "./components/VerifyingState";

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  const [isVerifying, setIsVerifying] = useState(!!token);
  const [verifyError, setVerifyError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) return;

    async function verify() {
      try {
        await verifyEmail(token!);
        router.push("/email-verified");
      } catch (err) {
        setVerifyError(err instanceof Error ? err.message : "Verification failed. The link may have expired.");
      } finally {
        setIsVerifying(false);
      }
    }

    verify();
  }, [token, router]);

  if (token) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center min-h-screen text-center px-4">
        <div className="flex flex-col items-center gap-6 max-w-md">
          {isVerifying && <VerifyingState />}
          {verifyError && <VerifyErrorState message={verifyError} />}
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-screen text-center px-4">
      <div className="flex flex-col items-center gap-6 max-w-md">

        <IconCircle>
          <EmailIcon className="text-primary" />
        </IconCircle>

        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-semibold">Check your inbox</h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            We sent a verification link to your email address.
            Click the link to activate your account and get started.
          </p>
        </div>

        <ResendForm />

        <Link href="/login" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
          Back to login
        </Link>

      </div>
    </div>
  );
}