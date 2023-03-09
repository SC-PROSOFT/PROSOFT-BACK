import express from "express"
import { asigar_modulo, consultar_modulos_asignados } from "../controllers/ASIGNAMODULOS"
import { JwtValidator_ } from "../helpers/validators"

export const route_asigna_modul = express.Router()

route_asigna_modul.put("/asignar_modulo", JwtValidator_, asigar_modulo)
route_asigna_modul.get("/consultar_modulos_asignados/:llave", JwtValidator_, consultar_modulos_asignados)