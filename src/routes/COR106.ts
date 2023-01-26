import express from "express";
import {getRemidep, postRemidep, putRemidep, deleteRemidep, f8Remidep, getRemidepId} from "../controllers/COR106";
import { JwtValidator_ } from "../helpers/validators";

export const route_remidep = express.Router();

route_remidep.get("/remidepAll", getRemidep);
route_remidep.post("/remidep", postRemidep);
route_remidep.put("/remidep/:codigo", putRemidep);
route_remidep.delete("/remidep/:codigo", deleteRemidep);
route_remidep.get("/f8&remidep/:desde/:cantidad", f8Remidep);
route_remidep.get("/remidep/:codigo", getRemidepId);