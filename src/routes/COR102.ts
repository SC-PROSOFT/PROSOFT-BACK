import express from "express";
import {getDepco, postDepco, putDepco, deleteDepco, f8Depco, getDepcoId} from "../controllers/COR102";
import { JwtValidator_ } from "../helpers/validators";

export const route_depco = express.Router();

route_depco.get("/depcoAll", JwtValidator_, getDepco);
route_depco.post("/depco", JwtValidator_, postDepco);
route_depco.put("/depco/:codigo", JwtValidator_, putDepco);
route_depco.delete("/depco/:codigo", JwtValidator_, deleteDepco);
route_depco.get("/f8&depco/:desde/:cantidad", JwtValidator_, f8Depco)
route_depco.get("/depco/:codigo", JwtValidator_, getDepcoId);
