import express from "express";
import {getAuxtip, postAuxtip, putAuxtip, deleteAuxtip, f8Auxtip, getAuxtipId} from "../controllers/COR104";
import { JwtValidator_ } from "../helpers/validators";

export const route_auxtip = express.Router();

route_auxtip.get("/auxtipAll", JwtValidator_, getAuxtip);
route_auxtip.post("/auxtip", JwtValidator_, postAuxtip);
route_auxtip.put("/auxtip/:codigo", JwtValidator_, putAuxtip);
route_auxtip.delete("/auxtip/:codigo", JwtValidator_, deleteAuxtip);
route_auxtip.get("/f8_auxtip/:desde/:cantidad", JwtValidator_, f8Auxtip);
route_auxtip.get("/auxtip/:codigo", JwtValidator_, getAuxtipId);