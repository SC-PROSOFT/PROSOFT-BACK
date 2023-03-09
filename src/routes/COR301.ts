import express from "express"
import { getImpresionCorr} from "../controllers/COR301";
import { JwtValidator_ } from "../helpers/validators";

export const route_informeCorres = express.Router();

route_informeCorres.post("/correspondenciaimpresion", JwtValidator_, getImpresionCorr)
// route_informeCorres.post("/correspondenciaimpresion", postValidarDatos)