import express from "express";

import { agregarDia, buscarDia, eliminarDia, editarDia, f8Dia, buscarDias } from "../controllers/DNHABIL";

export const router_dn_habil = express.Router();

router_dn_habil.delete("/eliminarDia/:ano", eliminarDia);
router_dn_habil.post("/agregarDia", agregarDia);
router_dn_habil.get("/buscarDia/:ano", buscarDia);
router_dn_habil.get("/buscarDias", buscarDias);
router_dn_habil.put("/editarDia", editarDia);
router_dn_habil.get("/f8&dia/:desde/:cantidad", f8Dia);
