import { Router } from "express";
import {
  createAnimePost,
  listAnimeGet,
  removeAnimeDelete,
  updateAnimePatch,
} from "../controllers/animeController.js";

export const animeRoutes = Router();

animeRoutes.get("/", listAnimeGet); // get all or from search
animeRoutes.post("/", createAnimePost); // create anime
animeRoutes.patch("/:id", updateAnimePatch); // update anime
animeRoutes.delete("/:id", removeAnimeDelete); // delete anime
