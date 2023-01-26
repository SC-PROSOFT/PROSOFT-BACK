import express from 'express'
import { getCorr871F8 } from '../controllers/CORR871'

export const route_corr871 = express.Router()

route_corr871.get("/corr871/:desde/:cantidad", getCorr871F8)