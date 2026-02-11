import pool from "./pool.js";

async function getAnime(query, values) {
  const { rows } = await pool.query("SELECT * FROM anime");
  return rows;
}

async function createAnime(query, values) {
  // create anime
}

export default { getAnime, createAnime };
