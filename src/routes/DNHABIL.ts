import express from "express";

import { agregarDia, buscarDia, eliminarDia, editarDia, f8Dia, buscarDias } from "../controllers/DNHABIL";
import { JwtValidator_ } from "../helpers/validators";

export const router_dn_habil = express.Router();

router_dn_habil.delete("/eliminarDia/:ano", JwtValidator_, eliminarDia);
router_dn_habil.post("/agregarDia", JwtValidator_, agregarDia);
router_dn_habil.get("/buscarDia/:ano", JwtValidator_, buscarDia);
router_dn_habil.get("/buscarDias", JwtValidator_, buscarDias);
router_dn_habil.put("/editarDia", JwtValidator_, editarDia);
router_dn_habil.get("/f8&dia/:desde/:cantidad", JwtValidator_, f8Dia);
