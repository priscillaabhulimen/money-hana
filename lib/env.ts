export const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
  throw new Error(
    "Missing required environment variable: NEXT_PUBLIC_API_URL. Add it to .env or .env.local.",
  );
}

export function validateEnv() {
  if (!process.env.NEXT_PUBLIC_API_URL) {
    throw new Error(
      "Environment validation failed. Missing: NEXT_PUBLIC_API_URL. Add it to .env or .env.local.",
    );
  }
}