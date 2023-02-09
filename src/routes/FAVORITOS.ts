import express from "express";

import { agregar_favoritos, buscar_favorito, eliminar_favoritos } from "../controllers/FAVORITOS";

export const router_favoritos = express.Router();

router_favoritos.put("/eliminarfavoritos/:usuario", eliminar_favoritos);
router_favoritos.put("/agregarfavorito/:usuario",agregar_favoritos)
router_favoritos.get("/favoritos/:usuario/:modulo", buscar_favorito)
