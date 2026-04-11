export const API_URL = process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
  throw new Error(
    "Missing required environment variable: API_URL. Add it to .env or .env.local.",
  );
}

export function validateEnv() {
  if (!process.env.API_URL && !process.env.NEXT_PUBLIC_API_URL) {
    throw new Error(
      "Environment validation failed. Missing: API_URL. Add it to .env or .env.local.",
    );
  }
}