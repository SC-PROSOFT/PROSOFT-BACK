import express from "express";
import { getUsuar } from "../controllers/USUAR";

export const route_usuar = express.Router();

route_usuar.get("/usuar", getUsuar);