import  express from "express";
import {
    getImage,
    postImage,
    putImage
} from "../controllers/IMAGE"
import multer from "multer";
import path from "path";

let storage = multer.diskStorage({
    destination: (req: any, file: any, cb: any) => {
      try {
        cb(null, "./image");
      } catch (error) {
        console.log("ERROR", error);
      }
    },
    filename: (req: any, file: any, cb: any) => {
      try {
        const filename = `${req.params.codigo}`;
        cb(null, filename + path.extname(file.originalname));
      } catch (error) {
        console.log("ERROR", error);
      }
    },
  });

  
const upload = multer({ storage });

export const route_image = express.Router();

route_image.post(
    "/image/:codigo",
    upload.single("file"),
    postImage
);
route_image.get("/getImage/:codigo", getImage)