import express from "express";
import { getCorresF8 } from "../controllers/CORR868";
import { JwtValidator_ } from "../helpers/validators";

export const route_corr868 = express.Router();

route_corr868.get("/f8&corr868/:desde/:cantidad", JwtValidator_, getCorresF8);
