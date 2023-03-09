import express from "express";
import {getHolding, postHolding, putHolding, deleteHolding, f8Holding, getHoldingId} from "../controllers/COR107";
import { JwtValidator_ } from "../helpers/validators";

export const route_holding = express.Router();

route_holding.get("/holdingAll", JwtValidator_, getHolding);
route_holding.post("/holding", JwtValidator_, postHolding);
route_holding.put("/holding/:codigo", JwtValidator_, putHolding);
route_holding.delete("/holding/:codigo", JwtValidator_, deleteHolding);
route_holding.get("/f8&holding/:desde/:cantidad", JwtValidator_, f8Holding);
route_holding.get("/holding/:codigo", JwtValidator_, getHoldingId);