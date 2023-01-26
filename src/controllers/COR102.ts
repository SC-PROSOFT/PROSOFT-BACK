import { Request, Response } from "express";
import {
  concatenarCodigos,
  delete_response,
  edit_response,
  get_all_response,
  get_response,
  omitirId,
} from "../global/global";
import { depco_model } from "../models/DEPCO";

export const getDepco = async (req: Request, res: Response) => {
  try {
    const data = await depco_model.find({}, omitirId);
    get_all_response(data, res)
  } catch (error) {
    res.json({ msg: error });
  }
};

export const postDepco = async (req: Request, res: Response) => {
  try {
    new depco_model(req.body).save((err) => {
      if (err) res.json({ msg: err.message });
      else res.json({ N1: "guardado" });
    });
  } catch (error) {
    res.json({ meg: error });
  }
};

export const putDepco = async (req: Request, res: Response) => {
  try {
    const {codigo} = req.params;
    const body = req.body;
    delete body.codigo
    const data = await depco_model.updateOne({codigo: codigo}, body, { runValidators: true });
    edit_response("depco", data, codigo, res);
  } catch (error) {
    res.json({ msg: error });
  }
};

export const deleteDepco = async (req: Request, res: Response) => {
  try {
    const { codigo } = req.params;
    const data = await depco_model.deleteOne({ codigo: codigo });
    delete_response("depco", data, codigo, res);
  } catch (error) {
    res.json({ msg: error });
  }
};

export const getDepcoId = async (req: Request, res: Response) => {
  try {
    const { codigo } = req.params
    const data = await depco_model.findOne({codigo: codigo}, omitirId);
    get_response("depco", data, codigo, res);
  } catch (error) {
    res.json({ msg: error });
  }
};

export const f8Depco = async (req: Request, res: Response) => {
  try {
    const { desde, cantidad } = req.params;
    let { dato } = req.query;
    const data = await depco_model
      .aggregate()
      .project({
        codigo:{$concat:[{$toString:["$codigo"]}]},
        descripcion:1,
        responsable:1,
        oper:1,
        codSerco:1,
        cargo:1,
        correo:1,
      })
      .match({
          $or:[
            {codigo:{$regex:dato}},
            {descripcion:{$regex:dato, $options:"i"}},
            {responsable:{$regex:dato, $options:"i"}},
            {oper:{$regex:dato, $options:"i"}},
          ]
        })
      .skip(Number(desde))
      .limit(Number(cantidad));
    console.log(data.length);
    console.log("Ya llegue 2");
    get_all_response(data, res);
  } catch (error) {
    res.json({ msg: error });
  }
};
