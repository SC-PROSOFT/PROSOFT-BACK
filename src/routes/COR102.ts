import express from "express";
import {getDepco, postDepco, putDepco, deleteDepco, f8Depco, getDepcoId} from "../controllers/COR102";
import { JwtValidator_ } from "../helpers/validators";

export const route_depco = express.Router();

route_depco.get("/depcoAll", getDepco);
route_depco.post("/depco", postDepco);
route_depco.put("/depco/:codigo", putDepco);
route_depco.delete("/depco/:codigo", deleteDepco);
route_depco.get("/f8&depco/:desde/:cantidad", f8Depco)
route_depco.get("/depco/:codigo", getDepcoId);
