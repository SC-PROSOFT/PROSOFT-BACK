import express from "express";
import {getHolding, postHolding, putHolding, deleteHolding, f8Holding, getHoldingId} from "../controllers/COR107";
import { JwtValidator_ } from "../helpers/validators";

export const route_holding = express.Router();

route_holding.get("/holdingAll", getHolding);
route_holding.post("/holding", postHolding);
route_holding.put("/holding/:codigo", putHolding);
route_holding.delete("/holding/:codigo", deleteHolding);
route_holding.get("/f8&holding/:desde/:cantidad", f8Holding);
route_holding.get("/holding/:codigo", getHoldingId);