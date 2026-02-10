import { Pool } from "pg";
import "dotenv/config";
const pool = new Pool();

function must(name) {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env var: ${name}`);
  return v;
}

export default new Pool({
  host: must("PGHOST"), // or wherever the db is hosted
  user: must("PGUSER"),
  database: must("PGDATABASE"),
  password: must("PGPASSWORD"),
  port: Number(process.env.PGPORT ?? 5432), // The default port
});
