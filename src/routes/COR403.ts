import express from "express";
import { buscarPdf_res, guardarPdf_res } from "../controllers/COR201";
import { deleteRescorr, getRescorr, postRescorr, putRescorr, f8Rescorr, ultResCorr, getRescorrLlave, envioCorreos } from "../controllers/COR403";


import multer from "multer";
import path from "path";
import fs from 'fs'
import { JwtValidator_ } from "../helpers/validators";


let storage = multer.diskStorage({
  destination: (req: any, file: any, cb: any) => {
    try {
      cb(null, "D:/pdf/");
    } catch (error) {
      console.error("ERROR", JwtValidator_, error);
    }
  },
  filename: (req: any, file: any, cb: any) => {
    
    try {
      const ruta = `D:\\pdf\\${req.params.anoLlave}${req.params.cont}-RES.pdf`
      fs.readFile(ruta, function (err, data) {
        if(!data){
          const filename = `${req.params.anoLlave}${req.params.cont}-RES`;
          cb(null, filename + path.extname(file.originalname))
        }else{
          cb(new Error("Archivo existente"))
        }
      })
    } catch (error) {
      console.error("ERROR", JwtValidator_, error);
    }
  },
});
console.log(storage)
const upload = multer({ storage });



export const route_rescorr = express.Router();

route_rescorr.get("/rescorr", JwtValidator_, getRescorr);
route_rescorr.post("/rescorr", JwtValidator_, postRescorr);
route_rescorr.put("/rescorr/:anoLlave/:cont", JwtValidator_, putRescorr);
route_rescorr.delete("/rescorr/:anoLlave/:cont", JwtValidator_, deleteRescorr);
route_rescorr.get("/f8&rescorr/:desde/:cantidad", JwtValidator_, f8Rescorr);
route_rescorr.get("/ultRescorr", JwtValidator_, ultResCorr);
route_rescorr.get("/getResLlave/:anoLlave/:cont", JwtValidator_, getRescorrLlave);
route_rescorr.post("/enviocCorreo&rescorres", JwtValidator_, envioCorreos);

route_rescorr.post("/guardarPdf_res/:anoLlave/:cont", JwtValidator_, upload.single("file"), guardarPdf_res);
route_rescorr.get("/buscarPdf_res/:anoLlave/:cont", JwtValidator_, buscarPdf_res);

// route_macorr.get("/macorr/:cl/:codigo", JwtValidator_, getRescorrId);
