import express from "express";

import { agregar_favoritos, buscar_favorito, eliminar_favoritos } from "../controllers/FAVORITOS";
import { JwtValidator_ } from "../helpers/validators";

export const router_favoritos = express.Router();

router_favoritos.put("/eliminarfavoritos/:usuario",JwtValidator_, eliminar_favoritos);
router_favoritos.put("/agregarfavorito/:usuario",JwtValidator_,agregar_favoritos)
router_favoritos.get("/favoritos/:usuario/:modulo",JwtValidator_, buscar_favorito)
