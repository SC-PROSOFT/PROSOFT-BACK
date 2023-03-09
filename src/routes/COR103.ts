import express from "express";
import {getTipco, postTipco, putTipco, deleteTipco, f8Tipco, getTipcoId} from "../controllers/COR103";
import { JwtValidator_ } from "../helpers/validators";

export const route_tipco = express.Router();

route_tipco.get("/tipcoAll", JwtValidator_, getTipco);
route_tipco.post("/tipco", JwtValidator_, postTipco);
route_tipco.put("/tipco/:codigo", JwtValidator_, putTipco);
route_tipco.delete("/tipco/:codigo", JwtValidator_, deleteTipco);
route_tipco.get("/f8_tipco/:desde/:cantidad", JwtValidator_, f8Tipco);
route_tipco.get("/tipco/:codigo", JwtValidator_, getTipcoId);
