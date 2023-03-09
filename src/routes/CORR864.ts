import express from 'express'
import { getRescorr, getRescorrF8 } from '../controllers/CORR864'
import { JwtValidator_ } from '../helpers/validators'

export const route_corr864 = express.Router()

route_corr864.get("/f8&corr864/:desde/:cantidad", JwtValidator_, getRescorrF8)
route_corr864.get("/corr864/:anoLlave/:cont", JwtValidator_, getRescorr)