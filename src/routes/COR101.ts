import express from "express";
import {getSerco, postSerco, putSerco, deleteSerco, f8Serco, getSercoId} from "../controllers/COR101";
import { JwtValidator_ } from "../helpers/validators";

export const route_serco = express.Router();

route_serco.get("/sercoAll", getSerco);
route_serco.post("/serco", postSerco);
route_serco.put("/serco/:codigo", putSerco);
route_serco.delete("/serco/:codigo", deleteSerco);
route_serco.get("/f8&serco/:desde/:cantidad", f8Serco);
route_serco.get("/serco/:codigo", getSercoId);