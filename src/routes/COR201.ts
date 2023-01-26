import express from "express";
import {
  buscarPdf,
  buscarPdf_res,
  deleteCorres,
  envioCorreos,
  getCorres,
  getCorresF8,
  guardarPdf,
  guardarPdf_res,
  postCorres,
  putCorres,
  ultCorres,
} from "../controllers/COR201";

import multer from "multer";
import path from "path";

let storage = multer.diskStorage({
  destination: (req: any, file: any, cb: any) => {
    try {
      cb(null, "./pdf");
    } catch (error) {
      console.error("ERROR", error);
    }
  },
  filename: (req: any, file: any, cb: any) => {
    try {
      const filename = `${req.params.anoLlave}${req.params.cont}`;
      cb(null, filename + path.extname(file.originalname));
    } catch (error) {
      console.error("ERROR", error);
    }
  },
});

const upload = multer({ storage });

export const route_corres = express.Router();

route_corres.post("/corres", postCorres);
route_corres.put("/corres", putCorres);
route_corres.get("/corres/:anoLlave/:cont", getCorres);
route_corres.delete("/corres/:anoLlave/:cont", deleteCorres);
route_corres.get("/getCorresF8/:desde/:cantidad", getCorresF8);
route_corres.post("/enviocCorreo", envioCorreos);
route_corres.get("/ultimaCorres", ultCorres);
route_corres.post("/guardarPdf/:anoLlave/:cont", upload.single("file"), guardarPdf);
route_corres.post("/guardarPdf_res/:anoLlave/:cont", upload.single("file"), guardarPdf_res);
route_corres.get("/buscarPdf/:anoLlave/:cont", buscarPdf);
route_corres.get("/buscarPdf_res/:anoLlave/:cont", buscarPdf_res);
