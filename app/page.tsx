import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function RootPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");

  if (!token) {
    redirect("/login");
  }

  // TODO: verify token with backend before redirecting to dashboard in week 3
  const res = await fetch("https://your-api.com/auth/me", {
    headers: { Cookie: `token=${token.value}` },
    cache: "no-store",
  });

  if (res.ok) {
    redirect("/dashboard");
  } else {
    redirect("/login");
  }
}