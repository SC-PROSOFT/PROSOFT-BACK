import express from "express";
import { getCorresF8 } from "../controllers/CORR868";

export const route_corr868 = express.Router();

route_corr868.get("/f8&corr868/:desde/:cantidad", getCorresF8);
