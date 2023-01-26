import express from "express";
import {getAuxtip, postAuxtip, putAuxtip, deleteAuxtip, f8Auxtip, getAuxtipId} from "../controllers/COR104";
import { JwtValidator_ } from "../helpers/validators";

export const route_auxtip = express.Router();

route_auxtip.get("/auxtipAll", getAuxtip);
route_auxtip.post("/auxtip", postAuxtip);
route_auxtip.put("/auxtip/:codigo", putAuxtip);
route_auxtip.delete("/auxtip/:codigo", deleteAuxtip);
route_auxtip.get("/f8_auxtip/:desde/:cantidad", f8Auxtip);
route_auxtip.get("/auxtip/:codigo", getAuxtipId);