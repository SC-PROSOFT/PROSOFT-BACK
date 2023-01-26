import express from "express";
import { deleteRescorr, getRescorr, postRescorr, putRescorr, f8Rescorr, ultResCorr, getRescorrLlave, envioCorreos } from "../controllers/COR403";

export const route_rescorr = express.Router();

route_rescorr.get("/rescorr", getRescorr);
route_rescorr.post("/rescorr", postRescorr);
route_rescorr.put("/rescorr/:anoLlave/:cont", putRescorr);
route_rescorr.delete("/rescorr/:anoLlave/:cont", deleteRescorr);
route_rescorr.get("/f8&rescorr/:desde/:cantidad", f8Rescorr);
route_rescorr.get("/ultRescorr", ultResCorr);
route_rescorr.get("/getResLlave/:anoLlave/:cont", getRescorrLlave);
route_rescorr.post("/enviocCorreo&rescorres", envioCorreos);
// route_macorr.get("/macorr/:cl/:codigo", getRescorrId);
