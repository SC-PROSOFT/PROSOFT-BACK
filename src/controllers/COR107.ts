import { Request, Response } from "express";
import {
  concatenarCodigos,
  delete_response,
  edit_response,
  get_all_response,
  get_response,
  omitirId,
} from "../global/global";
import { holding_model } from "../models/HOLDING";

export const getHolding = async (req: Request, res: Response) => {
    try {
      const data = await holding_model.find({}, omitirId);
      get_all_response(data, res)
    } catch (error) {
      res.json({ msg: error });
    }
  };

  export const postHolding = async (req: Request, res: Response) => {
    try {
      new holding_model(req.body).save((err) => {
        if (err) res.json({ msg: err.message });
        else res.json({ N1: "guardado" });
      });
    } catch (error) {
      res.json({ meg: error });
    }
  };

  export const putHolding = async (req: Request, res: Response) => {
    try {
      const {codigo} = req.params;
      const body = req.body;
      delete body.codigo;
      const data = await holding_model.updateOne({codigo: codigo}, body, { runValidators: true });
      edit_response("remidep", data, codigo, res);
    } catch (error) {
      res.json({ msg: error });
    }
  };

  export const deleteHolding = async (req: Request, res: Response) => {
    try {
      const { codigo } = req.params;
      const data = await holding_model.deleteOne({ codigo: codigo });
      delete_response("holding", data, codigo, res)
    } catch (error) {
      res.json({ msg: error });
    }
  };

  export const getHoldingId = async (req: Request, res: Response) => {
    try {
      const { codigo } = req.params
      const data = await holding_model.findOne({codigo: codigo}, omitirId);
      get_response("holding", data, codigo, res);
    } catch (error) {
      res.json({ msg: error });
    }
  };

  export const f8Holding = async (req: Request, res: Response) => {
    try {
      const { desde, cantidad } = req.params;
      let { dato } = req.query;
      const data = await holding_model
        .aggregate()
        .project({
          codigo:{$concat:[{$toString:["$codigo"]}]},
          descripcion:1,
          activa:1
        })
        .match({
          $or:[
            {codigo:{$regex:dato}},
            {descripcion:{$regex:dato, $options:"i"}},
          ]
        })
        .skip(Number(desde))
        .limit(Number(cantidad));
      get_all_response(data, res);
    } catch (error) {
      res.json({ msg: error });
    }
  };
  