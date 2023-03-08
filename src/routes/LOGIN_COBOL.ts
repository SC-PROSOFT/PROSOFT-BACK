import express from "express"
import { GET_CON904, login_cobol } from "../controllers/LOGIN_COBOL";

export const route_login_cobol = express.Router();

route_login_cobol.get("/login", login_cobol)
route_login_cobol.post("/GET_CON904", GET_CON904);


