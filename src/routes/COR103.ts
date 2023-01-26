import express from "express";
import {getTipco, postTipco, putTipco, deleteTipco, f8Tipco, getTipcoId} from "../controllers/COR103";
import { JwtValidator_ } from "../helpers/validators";

export const route_tipco = express.Router();

route_tipco.get("/tipcoAll", getTipco);
route_tipco.post("/tipco", postTipco);
route_tipco.put("/tipco/:codigo", putTipco);
route_tipco.delete("/tipco/:codigo", deleteTipco);
route_tipco.get("/f8_tipco/:desde/:cantidad", f8Tipco);
route_tipco.get("/tipco/:codigo", getTipcoId);
