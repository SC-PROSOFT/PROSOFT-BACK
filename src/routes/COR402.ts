import express  from "express";
import {getMacorr, postMacorr, putMacorr, deleteMacorr, f8Macorr, getMacorrId} from "../controllers/COR402";
import { JwtValidator_ } from "../helpers/validators";

export const route_macorr = express.Router();

route_macorr.get("/macorrAll",JwtValidator_, getMacorr);
route_macorr.post("/macorr",JwtValidator_, postMacorr);
route_macorr.put("/macorr/:cl/:codigo",JwtValidator_, putMacorr);
route_macorr.delete("/macorr/:cl/:codigo",JwtValidator_, deleteMacorr);
route_macorr.get("/f8&macorr/:desde/:cantidad",JwtValidator_, f8Macorr);
route_macorr.get("/macorr/:cl/:codigo",JwtValidator_, getMacorrId);