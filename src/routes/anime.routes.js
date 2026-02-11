import { Router } from "express";
import { createAnimePost, listAnimeGet } from "../controllers/animeController.js";

export const animeRoutes = Router();

animeRoutes.get("/", listAnimeGet); // get all or from search
animeRoutes.post("/", createAnimePost); // create anime
