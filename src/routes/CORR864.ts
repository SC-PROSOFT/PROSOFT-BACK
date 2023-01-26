import express from 'express'
import { getRescorr, getRescorrF8 } from '../controllers/CORR864'

export const route_corr864 = express.Router()

route_corr864.get("/f8&corr864/:desde/:cantidad", getRescorrF8)
route_corr864.get("/corr864/:anoLlave/:cont", getRescorr)