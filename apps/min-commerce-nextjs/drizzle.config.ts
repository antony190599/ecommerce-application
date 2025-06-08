import type { Config } from 'drizzle-kit';

export default {
  dialect: 'postgresql',
  schema: './src/db/schema/index.ts',
  out: './drizzle',
  strict: true,
  verbose: true,
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
} satisfies Config;