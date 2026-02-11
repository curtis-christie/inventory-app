import { Router } from "express";
import { listAnimeGet } from "../controllers/animeController.js";

export const animeRoutes = Router();

animeRoutes.get("/", listAnimeGet); // get all or from search
// animeRoutes.post("/"); // create anime
