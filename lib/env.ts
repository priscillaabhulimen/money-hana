const REQUIRED_ENV_VARS = [
  {
    api: 'NEXT_PUBLIC_API_URL',
  },
] as const;

export function validateEnv() {
  const errors: string[] = [];

  for (const { api } of REQUIRED_ENV_VARS) {
    const val = process.env[api];

    if (!val) {
      errors.push(`Missing: ${api}`);
      continue;
    }

  }

  if (errors.length > 0) {
    console.error('\n❌ Environment validation failed:\n');
    errors.forEach(e => console.error(`  • ${e}`));
    console.error('\nAdd the missing variables to your .env.local file.\n');

    if (process.env.NODE_ENV === 'production') {
      throw new Error('Invalid environment configuration.');
    }
  } else {
    console.log('✅ Environment OK');
  }
}