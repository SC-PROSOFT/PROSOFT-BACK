import express from 'express'
import { agregar_contabilidad, agregar_modulos_mod, create_config, editar_estado_modulos, edit_config, eliminar_contabilidad, eliminar_modulos_mod, get_config, modulos_por_contabilidad } from '../controllers/CONFIG'

export const router_config = express.Router()

router_config.post("/crear_config", create_config)
router_config.put("/editar_config", edit_config)
router_config.put("/agergar_contabilidad/:contabilidad", agregar_contabilidad)
router_config.delete("/eliminar_contabilidad/:contabilidad", eliminar_contabilidad)
router_config.get("/config", get_config)

router_config.put("/editar_estado_modulos/:modulo/:contab/:estado", editar_estado_modulos)

router_config.put("/agregar_modulos_mod/:contab/:modulo", agregar_modulos_mod)
router_config.delete("/eliminar_modulos_mod/:contab/:modulo", eliminar_modulos_mod)
router_config.get("/modulos_por_contabilidad/:contab", modulos_por_contabilidad)