import { animeRoutes } from "./anime.routes.js";
import { Router } from "express";

const indexRoutes = Router();
indexRoutes.get("/", (req, res) => {
  res.send("Hello World");
});

export { indexRoutes, animeRoutes };
