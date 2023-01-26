import express  from "express";
import {getMacorr, postMacorr, putMacorr, deleteMacorr, f8Macorr, getMacorrId} from "../controllers/COR402";

export const route_macorr = express.Router();

route_macorr.get("/macorrAll", getMacorr);
route_macorr.post("/macorr", postMacorr);
route_macorr.put("/macorr/:cl/:codigo", putMacorr);
route_macorr.delete("/macorr/:cl/:codigo", deleteMacorr);
route_macorr.get("/f8&macorr/:desde/:cantidad", f8Macorr);
route_macorr.get("/macorr/:cl/:codigo", getMacorrId);