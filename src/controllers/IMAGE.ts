import { Request, Response } from "express";
import { get_response, edit_response, omitirId } from "../global/global";
import { image_model } from "../models/IMAGE";
import fs from "fs";

export const getImage = async (req: Request, res: Response) => {
  try {
    const { codigo } = req.params;
    const data = await image_model.findOne({ codigo: codigo }, omitirId);
    if (data) {
        res.contentType("application/*");
        let base64 = "";
        if (data?.imagen) base64 = data?.imagen.toString();
        var jpg = Buffer.from(base64, "base64");
        res.send(jpg);
      } else {
        res.json({ msg: `El pdf solicitado no existe`, cod_error: "01" });
      }
    // get_response("image", data, codigo, res);
  } catch (error) {
    res.json({ msg: error });
  }
};

export const postImage = async (req: Request, res: Response) => {
  try {
    console.log("entrando");
    const filename = req.params.codigo;
    const codigo = req.params.codigo;
    console.log("Archivo: ", filename, "Codigo: ", codigo);
    fs.readFile(`.\\image\\${filename}.jpg`, function (err, data) {
      if (err) throw err;
      console.log("SOY UNA PERRA");
      const img = data.toString("base64"); //PDF WORKS

      new image_model({ codigo: codigo, imagen: img }).save((err: any) => {
        if (err) {
          if (err.code)
            res.json({ msg: `Ya existe la imagen`, cod_error: "00" });
          else res.json(err);
        } else res.json({ N1: "guardado" });
      });

      fs.unlink(`.\\image\\${filename}.jpg`, (err) => {
        if (err) throw err;
      });
    });
  } catch (error) {
    res.json({ msg: error });
  }
};

export const putImage = async (req: Request, res: Response) => {
  try {
  } catch (error) {
    res.json({ msg: error });
  }
};
