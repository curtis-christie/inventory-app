import express from "express";
import path from "node:path";
import { configDotenv } from "dotenv";
import { fileURLToPath } from "node:url";

// app config
const app = express();
configDotenv();

// filepath
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const assetsPath = path.join(__dirname, "public");

// view setup
app.set("views", path.join((__dirname, "src", "views")));
app.set("view engine", "ejs");

// middleware setup
app.use(express.static(assetsPath));
app.use(express.urlencoded({ extended: true }));

// routes

// error route
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send(err);
});

// server start, listen
const PORT = process.env.PORT || 3000;
app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`Listening on http://localhost:${PORT}`);
});
