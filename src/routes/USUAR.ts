import express from "express";
import { getUsuar } from "../controllers/USUAR";
import { JwtValidator_ } from "../helpers/validators";

export const route_usuar = express.Router();

route_usuar.get("/usuar", JwtValidator_, getUsuar);