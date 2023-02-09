import express from 'express'
import { getTerceroF8 } from '../controllers/CON802'

export const route_con802 = express.Router()

route_con802.get("/terceF8/:desde/:cantidad", getTerceroF8)