import express from "express";
import { buscarPdf_res, guardarPdf_res } from "../controllers/COR201";
import { deleteRescorr, getRescorr, postRescorr, putRescorr, f8Rescorr, ultResCorr, getRescorrLlave, envioCorreos } from "../controllers/COR403";


import multer from "multer";
import path from "path";
import fs from 'fs'


let storage = multer.diskStorage({
  destination: (req: any, file: any, cb: any) => {
    try {
      cb(null, "D:/pdf/");
    } catch (error) {
      console.error("ERROR", error);
    }
  },
  filename: (req: any, file: any, cb: any) => {
    try {
      const ruta = `D:\\pdf\\${req.params.anoLlave}${req.params.cont}-RES.pdf`
      console.log(ruta)
      fs.readFile(ruta, function (err, data) {
        if(!data){
          const filename = `${req.params.anoLlave}${req.params.cont}-RES`;
          cb(null, filename + path.extname(file.originalname))
        }else{
          cb(new Error("Archivo existente"))
        }
      })
    } catch (error) {
      console.error("ERROR", error);
    }
  },
});
const upload = multer({ storage });



export const route_rescorr = express.Router();

route_rescorr.get("/rescorr", getRescorr);
route_rescorr.post("/rescorr", postRescorr);
route_rescorr.put("/rescorr/:anoLlave/:cont", putRescorr);
route_rescorr.delete("/rescorr/:anoLlave/:cont", deleteRescorr);
route_rescorr.get("/f8&rescorr/:desde/:cantidad", f8Rescorr);
route_rescorr.get("/ultRescorr", ultResCorr);
route_rescorr.get("/getResLlave/:anoLlave/:cont", getRescorrLlave);
route_rescorr.post("/enviocCorreo&rescorres", envioCorreos);

route_rescorr.post("/guardarPdf_res/:anoLlave/:cont", upload.single("file"), guardarPdf_res);
route_rescorr.get("/buscarPdf_res/:anoLlave/:cont", buscarPdf_res);

// route_macorr.get("/macorr/:cl/:codigo", getRescorrId);
