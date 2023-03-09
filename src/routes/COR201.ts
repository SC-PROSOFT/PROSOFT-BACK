import express from "express";
import fs from "fs";
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
import { JwtValidator_ } from "../helpers/validators";

let storage = multer.diskStorage({
  destination: (req: any, file: any, cb: any) => {
    try {
      if (!fs.existsSync("D:\\PDF\\")) fs.mkdirSync("D:\\PDF\\");
      cb(null, "D:\\PDF\\");
    } catch (error) {
      console.error("ERROR", JwtValidator_, error);
    }
  },
  filename: (req: any, file: any, cb: any) => {
    try {
      const ruta = `D:\\PDF\\${req.params.anoLlave}${req.params.cont}.pdf`;
      fs.readFile(ruta, function (err, data) {
        if (!data) {
          const filename = `${req.params.anoLlave}${req.params.cont}`;
          cb(null, filename + path.extname(file.originalname));
        } else {
          cb(new Error("Archivo existente"));
        }
      });
    } catch (error) {
      console.error("ERROR", JwtValidator_, error);
    }
  },
});

const upload = multer({ storage });

export const route_corres = express.Router();

route_corres.post("/corres", JwtValidator_, postCorres);
route_corres.put("/corres", JwtValidator_, putCorres);
route_corres.get("/corres/:anoLlave/:cont", JwtValidator_, getCorres);
route_corres.delete("/corres/:anoLlave/:cont", JwtValidator_, deleteCorres);
route_corres.get("/getCorresF8/:desde/:cantidad", JwtValidator_, getCorresF8);
route_corres.post("/enviocCorreo", JwtValidator_, envioCorreos);
route_corres.get("/ultimaCorres", JwtValidator_, ultCorres);
route_corres.post(
  "/guardarPdf/:anoLlave/:cont", JwtValidator_,
  upload.single("file"),
  guardarPdf
);
route_corres.get("/buscarPdf/:anoLlave/:cont", JwtValidator_, buscarPdf);
