import express from "express";
import {getCargops, postCargops, putCargops, deleteCargops, f8Cargops, getCargopsId} from "../controllers/COR108";
import { JwtValidator_ } from "../helpers/validators";

export const route_cargops = express.Router();

route_cargops.get("/cargopsAll", JwtValidator_, getCargops);
route_cargops.post("/cargops", JwtValidator_, postCargops);
route_cargops.put("/cargops/:codigo", JwtValidator_, putCargops);
route_cargops.delete("/cargops/:codigo", JwtValidator_, deleteCargops);
route_cargops.get("/f8&cargops/:desde/:cantidad", JwtValidator_, f8Cargops);
route_cargops.get("/cargops/:codigo", JwtValidator_, getCargopsId);