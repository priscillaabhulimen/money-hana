import { IconCircle } from "./IconCircle";
import { EmailIcon } from "./AuthIcons";

export function VerifyingState() {
  return (
    <>
      <IconCircle pulse>
        <EmailIcon className="text-primary" />
      </IconCircle>
      <p className="text-sm text-muted-foreground">Verifying your email...</p>
    </>
  );
}