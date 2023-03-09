import express from "express";
import {getRemidep, postRemidep, putRemidep, deleteRemidep, f8Remidep, getRemidepId} from "../controllers/COR106";
import { JwtValidator_ } from "../helpers/validators";

export const route_remidep = express.Router();

route_remidep.get("/remidepAll", JwtValidator_, getRemidep);
route_remidep.post("/remidep", JwtValidator_, postRemidep);
route_remidep.put("/remidep/:codigo", JwtValidator_, putRemidep);
route_remidep.delete("/remidep/:codigo", JwtValidator_, deleteRemidep);
route_remidep.get("/f8&remidep/:desde/:cantidad", JwtValidator_, f8Remidep);
route_remidep.get("/remidep/:codigo", JwtValidator_, getRemidepId);