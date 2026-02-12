import pool from "./pool.js";

async function getAnime(query, values) {
  // TODO - values are inserted into query values
  const results = await pool.query(query, []);
  return results;
}

async function createAnime(query, values) {
  const result = await pool.query(query, values);
  return result;
}

async function updateAnime(query, values) {
  const result = await pool.query(query, values);
  return result;
}

async function deleteAnime(id) {
  const results = await pool.query("DELETE FROM anime WHERE id = $1 RETURNING *", [id]);
  return results;
}

export default { getAnime, createAnime, deleteAnime, updateAnime };
