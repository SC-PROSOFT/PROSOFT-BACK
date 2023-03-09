import express from 'express'
import { agregar_contabilidad, agregar_modulos_mod, create_config, editar_estado_modulos, edit_config, eliminar_contabilidad, eliminar_modulos_mod, get_config, modulos_por_contabilidad } from '../controllers/CONFIG'
import { JwtValidator_ } from '../helpers/validators'

export const router_config = express.Router()

router_config.post("/crear_config", JwtValidator_, create_config)
router_config.put("/editar_config", JwtValidator_, edit_config)
router_config.put("/agergar_contabilidad/:contabilidad", JwtValidator_, agregar_contabilidad)
router_config.delete("/eliminar_contabilidad/:contabilidad", JwtValidator_, eliminar_contabilidad)
router_config.get("/config", JwtValidator_, get_config)

router_config.put("/editar_estado_modulos/:modulo/:contab/:estado", JwtValidator_, editar_estado_modulos)

router_config.put("/agregar_modulos_mod/:contab/:modulo", JwtValidator_, agregar_modulos_mod)
router_config.delete("/eliminar_modulos_mod/:contab/:modulo", JwtValidator_, eliminar_modulos_mod)
router_config.get("/modulos_por_contabilidad/:contab", JwtValidator_, modulos_por_contabilidad)