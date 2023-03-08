import express from "express"
import { GET_CON904, GET_SC_USUNET, login_cobol } from "../controllers/LOGIN_COBOL";

export const route_login_cobol = express.Router();

route_login_cobol.get("/login", login_cobol)
route_login_cobol.post("/GET_CON904", GET_CON904);
route_login_cobol.post("/GET_SC_USUNET", GET_SC_USUNET);


