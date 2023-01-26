import express from "express";
import {getUnifun, postUnifun, putUnifun, deleteUnifun, f8Unifun, getUnifunId} from "../controllers/COR105";
import { JwtValidator_ } from "../helpers/validators";

export const route_unifun = express.Router();

route_unifun.get("/unifunAll", getUnifun);
route_unifun.post("/unifun", postUnifun);
route_unifun.put("/unifun/:codigo", putUnifun);
route_unifun.delete("/unifun/:codigo", deleteUnifun);
route_unifun.get("/f8&unifun/:desde/:cantidad", f8Unifun);
route_unifun.get("/unifun/:codigo", getUnifunId);