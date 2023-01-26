import express from "express";
import {getCargops, postCargops, putCargops, deleteCargops, f8Cargops, getCargopsId} from "../controllers/COR108";
import { JwtValidator_ } from "../helpers/validators";

export const route_cargops = express.Router();

route_cargops.get("/cargopsAll", getCargops);
route_cargops.post("/cargops", postCargops);
route_cargops.put("/cargops/:codigo", putCargops);
route_cargops.delete("/cargops/:codigo", deleteCargops);
route_cargops.get("/f8&cargops/:desde/:cantidad", f8Cargops);
route_cargops.get("/cargops/:codigo", getCargopsId);