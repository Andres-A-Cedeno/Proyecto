import express from "express";
import { getGenres } from "../controllers/genresController.js";

const routerGenres = express.Router();
routerGenres.get("/getAllgenres", getGenres);

export default routerGenres;
