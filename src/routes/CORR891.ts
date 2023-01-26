import express from 'express'
import { getCorr891F8, getCorrId } from '../controllers/CORR891'

export const route_corr891 = express.Router()

route_corr891.get("/corr891/:desde/:cantidad", getCorr891F8)
route_corr891.get("/getCorrId", getCorrId)
