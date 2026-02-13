import { Router } from "express";
import {
  createAnimePost,
  getAnimeUpdateForm,
  getNewAnimeForm,
  listAnimeGet,
  removeAnimeDelete,
  updateAnimePatch,
} from "../controllers/animeController.js";

export const animeRoutes = Router();

animeRoutes.get("/", listAnimeGet); // get all or from search
animeRoutes.get("/add", getNewAnimeForm); // get new anime form
animeRoutes.post("/add", createAnimePost); // create anime
animeRoutes.get("/update/:id", getAnimeUpdateForm); // get update form
animeRoutes.post("/update/:id", updateAnimePatch); // update anime
animeRoutes.delete("/:id", removeAnimeDelete); // delete anime
