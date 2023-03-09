import express from "express";
import {
  getTerce,
  postTerce,
  putTerce,
  deleteTerce,
  getTerceId,
} from "../controllers/COR201C";
import { JwtValidator_ } from "../helpers/validators";

export const route_terce = express.Router();

route_terce.get("/terceAll", JwtValidator_, getTerce);
route_terce.post("/terce", JwtValidator_, postTerce);
route_terce.put("/terce/:codigo", JwtValidator_, putTerce);
route_terce.delete("/terce/:codigo", JwtValidator_, deleteTerce);
route_terce.get("/terce/:codigo", JwtValidator_, getTerceId);
// route_terce.get("/f8&terce/:desde/:cantidad", JwtValidator_, f8Terce);
