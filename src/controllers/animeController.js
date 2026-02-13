import db from "../db/queries.js";
import { ALLOWED_FIELDS } from "../utils/fields.js";

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
      filters.push(`genre = $${values.length}`);
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

    const results = await db.getAnime(query, values);

    return res.render("viewAnime", { result: results.rows }); //TODO add render view res.render("index", { messages: messages, title: "Mini Messageboard" });
  } catch (err) {
    next(err);
  }
}

export async function getNewAnimeForm(req, res, next) {
  res.render("createAnimeForm");
}

export async function createAnimePost(req, res, next) {
  try {
    console.log("create anime");
    const { anime_name, type, status, seasons, episodes, has_english_dub, genre } = req.body;
    const query = `
      INSERT INTO anime (
        anime_name,
        genre,
        type,
        status,
        seasons,
        episodes,
        has_english_dub
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *;
    `;

    const values = [
      anime_name,
      genre,
      type,
      status,
      seasons ?? 1,
      episodes ?? 0,
      has_english_dub ?? false,
    ];

    const result = await db.createAnime(query, values);
    //TODO redirect to page detailing new anime
    return res.status(201).json(result.rows[0]);
  } catch (err) {
    next(err);
  }
}

export async function getAnimeUpdateForm(req, res, next) {
  const value = [];
  value.push(Number(req.params.id));
  const query = `
    SELECT *
    FROM anime a
    WHERE id = $1
    `;
  console.log(value);
  const anime = await db.getAnime(query, value);
  console.log(anime.rows[0]);

  res.render("updateAnimeForm", { id: Number(req.params.id), anime: anime.rows[0] });
}

export async function updateAnimePatch(req, res, next) {
  try {
    const id = Number(req.params.id);

    const updates = {};
    for (const [key, value] of Object.entries(req.body)) {
      if (ALLOWED_FIELDS.has(key)) {
        updates[key] = value;
      }
    }

    const keys = Object.keys(updates);
    const setParts = keys.map((col, i) => `${col} = $${i + 1}`);

    setParts.push("updated_at = NOW()");

    const values = keys.map((k) => updates[k]);
    values.push(id);

    const query = `
    UPDATE anime
    SET ${setParts.join(", ")}
    WHERE id = $${values.length}
    RETURNING *`;

    const result = await db.updateAnime(query, values);
    //TODO redirect to page detailing updated anime
    return res.json(result.rows[0]);
  } catch (err) {
    next(err);
  }
}

export async function removeAnimeDelete(req, res, next) {
  try {
    const id = Number(req.params.id);
    const result = db.deleteAnime(id);
    res.status(200).json(result.rows[0]);
  } catch (err) {
    next(err);
  }
}
