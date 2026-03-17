import Link from "next/link";
import { IconCircle } from "./IconCircle";
import { ErrorIcon } from "./AuthIcons";

export function VerifyErrorState({ message }: { message: string }) {
  return (
    <>
      <IconCircle variant="red">
        <ErrorIcon className="text-red-500" />
      </IconCircle>
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold">Verification failed</h1>
        <p className="text-sm text-muted-foreground">{message}</p>
      </div>
      <Link href="/login" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
        Back to login
      </Link>
    </>
  );
}