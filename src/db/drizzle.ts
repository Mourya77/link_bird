import { drizzle } from "drizzle-orm/vercel-postgres";
import { sql } from "@vercel/postgres";
import * as schema from "./schema";

// This file creates the database client that your app uses to communicate
// with your Vercel Postgres database.
export const db = drizzle(sql, { schema });

