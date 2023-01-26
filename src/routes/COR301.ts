import express from "express"
import { getImpresionCorr} from "../controllers/COR301";

export const route_informeCorres = express.Router();

route_informeCorres.post("/correspondenciaimpresion", getImpresionCorr)
// route_informeCorres.post("/correspondenciaimpresion", postValidarDatos)