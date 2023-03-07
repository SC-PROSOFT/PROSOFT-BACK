import express from "express"
import { login_cobol } from "../controllers/LOGIN_COBOL";

export const route_login_cobol = express.Router();

route_login_cobol.get("/login", login_cobol)

