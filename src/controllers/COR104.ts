import { Request, Response } from "express";
import {
  concatenarCodigos,
  delete_response,
  edit_response,
  get_all_response,
  get_response,
  omitirId,
} from "../global/global";
import { auxtip_model } from "../models/AUXTIP";

export const getAuxtip = async (req: Request, res: Response) => {
  try {
    const data = await auxtip_model.find({}, omitirId);
    get_all_response(data, res);
  } catch (error) {
    res.json({ msg: error });
  }
};

export const postAuxtip = async (req: Request, res: Response) => {
  console.log(req.body);
  try {
    new auxtip_model(req.body).save((err) => {
      if (err) res.json({ msg: err.message });
      else res.json({ N1: "guardado" });
    });
  } catch (error) {
    res.json({ meg: error });
  }
};

export const putAuxtip = async (req: Request, res: Response) => {
  try {
    const { codigo } = req.params;
    const body = req.body;
    delete body.codigo;
    const data = await auxtip_model.updateOne({ codigo: codigo }, body, {
      runValidators: true,
    });
    edit_response("auxtip", data, codigo, res);
  } catch (error) {
    res.json({ msg: error });
  }
};

export const deleteAuxtip = async (req: Request, res: Response) => {
  try {
    const { codigo } = req.params;
    const data = await auxtip_model.deleteOne({ codigo: codigo });
    delete_response("auxtip", data, codigo, res)
  } catch (error) {
    res.json({ msg: error });
  }
};

export const getAuxtipId = async (req: Request, res: Response) => {
  try {
    const { codigo } = req.params;
    const data = await auxtip_model.findOne({ codigo: codigo }, omitirId);
    get_response("auxtip", data, codigo, res);
    
  } catch (error) {
    res.json({ msg: error });
  }
};

export const f8Auxtip = async (req: Request, res: Response) => {
  try {
    const { desde, cantidad } = req.params;
    let { dato } = req.query;
    const data = await auxtip_model
      .aggregate([
        {
          $lookup:{
            from:"tipco",
            localField:"codSerco",
            foreignField:"codigo",
            as:"tipco"
          }
        }
        
      ])
      .project({
        codigo:{$concat:[{$toString:["$codigo"]}]},
        codSerco:1,
        descripCodSerco:{$concat:[{"$arrayElemAt": ["$tipco.descripcion", 0]}]},
        descripcion:1
      })
      .match({
        $or:[
          {codigo:{$regex:dato}},
          {descripcion:{$regex:dato, $options:"i"}}

        ]
        
      })
      .skip(Number(desde))
      .limit(Number(cantidad));
    get_all_response(data, res);
  } catch (error) {
    res.json({ msg: error });
  }
};
