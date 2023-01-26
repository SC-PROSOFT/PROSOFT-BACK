import express from "express"
import { getImp1M} from "../controllers/CORRPRU";

export const route_pruebaImp1M = express.Router();

route_pruebaImp1M.post("/impresionCorres1M/:desde/:cantidad", getImp1M);//Esto es solo para pruiebas backend, comentar tambien la linea #15 del controller CORRPRU
// route_pruebaImp1M.post("/impresionCorres1M", getImp1M);//Ruta real para el front