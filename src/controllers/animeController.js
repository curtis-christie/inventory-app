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

    res.send(result.rows); //TODO add render view res.render("index", { messages: messages, title: "Mini Messageboard" });
  } catch (err) {
    next(err);
  }
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

    res.status(201).json(result.rows[0]);
  } catch (err) {
    next(err);
  }
}

export async function updateAnimePatch(req, res, next) {
  try {
    const id = Number(req.params.id);

    const cols = [];
    const values = [];

    // UPDATE anime
    // SET (cols) = (values)
    // WHERE id = `${id}`
    db.updateAnime(id, cols, values);
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
