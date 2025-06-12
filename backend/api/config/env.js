import { config } from "dotenv";

config({ path: `.env.development.local` });

export const { DB_URI, JWT_SECRET, JWT_EXPIRES_IN } = process.env;
