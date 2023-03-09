import express from 'express'
import { agregar_modulo, editar_modulo, eliminar_modulo, obtener_modulos } from '../controllers/MODULOS'
import { JwtValidator_ } from '../helpers/validators'

export const router_modulos = express.Router()

router_modulos.post("/agregar_modulo", JwtValidator_, agregar_modulo)
router_modulos.put("/editar_modulo", JwtValidator_, editar_modulo)
router_modulos.delete("/eliminar_modulo/:cod", JwtValidator_, eliminar_modulo)
router_modulos.get("/obtener_modulos", JwtValidator_, obtener_modulos)