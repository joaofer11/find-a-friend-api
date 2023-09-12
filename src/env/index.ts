import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['dev', 'test', 'production']).default('dev'),
  PORT: z.coerce.number().default(3000),
  DATABASE_URL: z.string(),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  const msg = 'Error on environment variables!';

  console.error(msg, parsedEnv.error.format());

  throw new Error(msg);
}

export const env = parsedEnv.data;
