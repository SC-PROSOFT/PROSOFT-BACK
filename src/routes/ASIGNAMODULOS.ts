import express from "express"
import { asigar_modulo, consultar_modulos_asignados } from "../controllers/ASIGNAMODULOS"

export const route_asigna_modul = express.Router()

route_asigna_modul.put("/asignar_modulo", asigar_modulo)
route_asigna_modul.get("/consultar_modulos_asignados/:llave", consultar_modulos_asignados)