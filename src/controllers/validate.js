import { body, validationResult, matchedData } from "express-validator";

//TODO - body - anime_name, type, status, seasons, episodes, has_english_dub
const validateAnime = [body()];
