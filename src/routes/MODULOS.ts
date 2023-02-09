import express from 'express'
import { agregar_modulo, editar_modulo, eliminar_modulo, obtener_modulos } from '../controllers/MODULOS'

export const router_modulos = express.Router()

router_modulos.post("/agregar_modulo", agregar_modulo)
router_modulos.put("/editar_modulo", editar_modulo)
router_modulos.delete("/eliminar_modulo/:cod", eliminar_modulo)
router_modulos.get("/obtener_modulos", obtener_modulos)