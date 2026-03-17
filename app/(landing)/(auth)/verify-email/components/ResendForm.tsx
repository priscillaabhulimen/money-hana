import { useState } from "react";
import { resendVerification } from "@/services/auth";

export function ResendForm() {
  const [email, setEmail] = useState("");
  const [isResending, setIsResending] = useState(false);
  const [resent, setResent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleResend() {
    if (!email) return;
    setError(null);
    setIsResending(true);
    try {
      await resendVerification(email);
      setResent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to resend. Please try again.");
    } finally {
      setIsResending(false);
    }
  }

  if (resent) {
    return <p className="text-xs text-green-500">Verification email resent.</p>;
  }

  return (
    <div className="flex flex-col items-center gap-2 w-full">
      <input
        type="email"
        placeholder="Enter your email to resend"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full text-sm px-3 py-2 bg-card border border-border rounded-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
      />
      {error && <p className="text-red-500 text-xs">{error}</p>}
      <p className="text-xs text-muted-foreground">
        Didn&apos;t receive it? Check your spam folder or{" "}
        <button
          onClick={handleResend}
          disabled={isResending || !email}
          className="text-primary hover:underline disabled:opacity-50"
        >
          {isResending ? "Sending..." : "resend the email"}
        </button>
        .
      </p>
    </div>
  );
}