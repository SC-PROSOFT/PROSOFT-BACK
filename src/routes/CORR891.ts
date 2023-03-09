import express from 'express'
import { getCorr891F8, getCorrId } from '../controllers/CORR891'
import { JwtValidator_ } from '../helpers/validators'

export const route_corr891 = express.Router()

route_corr891.get("/corr891/:desde/:cantidad", JwtValidator_, getCorr891F8)
route_corr891.get("/getCorrId", JwtValidator_, getCorrId)
