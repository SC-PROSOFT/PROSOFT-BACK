import express from "express";
import {getSerco, postSerco, putSerco, deleteSerco, f8Serco, getSercoId} from "../controllers/COR101";
import { JwtValidator_ } from "../helpers/validators";

export const route_serco = express.Router();

route_serco.get("/sercoAll", JwtValidator_, getSerco);
route_serco.post("/serco", JwtValidator_, postSerco);
route_serco.put("/serco/:codigo", JwtValidator_, putSerco);
route_serco.delete("/serco/:codigo", JwtValidator_, deleteSerco);
route_serco.get("/f8&serco/:desde/:cantidad", JwtValidator_, f8Serco);
route_serco.get("/serco/:codigo", JwtValidator_, getSercoId);