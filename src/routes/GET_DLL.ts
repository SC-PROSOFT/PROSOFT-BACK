import { GET_DLL } from './../controllers/GET_DLL';
import { validarJwt } from './../global/global';
import express from 'express'

export const route_GET_DLL = express.Router();

route_GET_DLL.post("/GET_DLL", GET_DLL)