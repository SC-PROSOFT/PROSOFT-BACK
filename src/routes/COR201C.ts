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

route_terce.get("/terceAll", getTerce);
route_terce.post("/terce", postTerce);
route_terce.put("/terce/:codigo", putTerce);
route_terce.delete("/terce/:codigo", deleteTerce);
route_terce.get("/terce/:codigo", getTerceId);
// route_terce.get("/f8&terce/:desde/:cantidad", f8Terce);
