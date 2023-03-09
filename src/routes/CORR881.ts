import express from 'express'
import { getCorr881F8 } from '../controllers/CORR881'
import { JwtValidator_ } from '../helpers/validators'

export const route_corr881 = express.Router()

route_corr881.get("/corr881/:desde/:cantidad", JwtValidator_, getCorr881F8)