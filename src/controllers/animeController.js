import db from "../db/queries.js";

export async function listAnimeGet(req, res, next) {
  try {
    const { search, type, status, genre } = req.query;

    const filters = [];
    const values = [];
    const joins = [];

    if (search) {
      values.push(`%${search}%`);
      filters.push(`anime_name ILIKE $${values.length}`);
    }

    if (type) {
      values.push(type);
      filters.push(`type = $${values.length}`);
    }

    if (status) {
      values.push(status);
      filters.push(`status = $${values.length}`);
    }

    if (genre) {
      values.push(genre);
      joins.push("JOIN anime_genres ag ON ag.anime_id = a.id");
      filters.push(`ag.genre_id = $${values.length}`);
    }

    const whereClause = filters.length > 0 ? `WHERE ${filters.join(" AND ")}` : "";
    const joinClause = joins.length > 0 ? `JOIN anime_genres ag ON ag.anime_id = a.id` : "";

    const query = `
    SELECT *
    FROM anime a
    ${joinClause}
    ${whereClause}
    ORDER BY anime_name ASC
    LIMIT 50
    `;

    const result = await db.getAnime(query, values);

    res.render(); //TODO add render view res.render("index", { messages: messages, title: "Mini Messageboard" });
  } catch (error) {
    next(err);
  }
}

export async function createAnimePost(req, res, next) {
  try {
    const { anime_name, type, status, seasons, episodes, has_english_dub, genre } = req.body;
  } catch (error) {
    next(err);
  }
}
