import express from 'express'
import { listadoControlRespuestas } from '../controllers/COR304'

export const route_listadoRespuesta = express.Router()

route_listadoRespuesta.post("/listadoRespuesta", listadoControlRespuestas)