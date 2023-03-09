import express from 'express'
import { listadoControlRespuestas } from '../controllers/COR304'
import { JwtValidator_ } from '../helpers/validators'

export const route_listadoRespuesta = express.Router()

route_listadoRespuesta.post("/listadoRespuesta", JwtValidator_, listadoControlRespuestas)