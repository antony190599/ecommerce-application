import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool, PoolConfig } from 'pg';
import * as schema from './schema';

// Extender la interfaz PoolConfig para incluir la propiedad native
interface ExtendedPoolConfig extends PoolConfig {
  native?: boolean;
}

// Create a PostgreSQL connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  native: false // Ahora TypeScript no debería marcar un error
} as ExtendedPoolConfig);

// Create a DrizzleORM instance
export const db = drizzle(pool, { schema });
