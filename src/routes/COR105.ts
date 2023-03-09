import express from "express";
import {getUnifun, postUnifun, putUnifun, deleteUnifun, f8Unifun, getUnifunId} from "../controllers/COR105";
import { JwtValidator_ } from "../helpers/validators";

export const route_unifun = express.Router();

route_unifun.get("/unifunAll", JwtValidator_, getUnifun);
route_unifun.post("/unifun", JwtValidator_, postUnifun);
route_unifun.put("/unifun/:codigo", JwtValidator_, putUnifun);
route_unifun.delete("/unifun/:codigo", JwtValidator_, deleteUnifun);
route_unifun.get("/f8&unifun/:desde/:cantidad", JwtValidator_, f8Unifun);
route_unifun.get("/unifun/:codigo", JwtValidator_, getUnifunId);