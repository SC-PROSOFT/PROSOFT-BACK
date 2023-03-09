import express from "express";
import { getCorr869F8, getCorr869 } from "../controllers/CORR869";
import { JwtValidator_ } from "../helpers/validators";

export const route_corr869 = express.Router();

route_corr869.get("/corr869/:desde/:cantidad", JwtValidator_, getCorr869F8);
route_corr869.get("/get&corr869/:anio", JwtValidator_, getCorr869);
