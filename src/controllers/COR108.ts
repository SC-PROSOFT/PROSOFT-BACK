import { Request, Response } from "express";
import {
  concatenarCodigos,
  delete_response,
  edit_response,
  get_all_response,
  get_response,
  omitirId,
} from "../global/global";
import { cargops_model } from "../models/CARGOPS";

export const getCargops = async (req: Request, res: Response) => {
    try {
      const data = await cargops_model.find({}, omitirId);
      get_all_response(data, res)
    } catch (error) {
      res.json({ msg: error });
    }
  };

  export const postCargops = async (req: Request, res: Response) => {
    try {
      new cargops_model(req.body).save((err) => {
        if (err) res.json({ msg: err.message });
        else res.json({ N1: "guardado" });
      });
    } catch (error) {
      res.json({ meg: error });
    }
  };

  export const putCargops = async (req: Request, res: Response) => {
    try {
      const {codigo} = req.params;
      const body = req.body;
      delete body.codigo;
      const data = await cargops_model.updateOne({codigo: codigo}, body, { runValidators: true });
      edit_response("cargops", data, codigo, res);
    } catch (error) {
      res.json({ msg: error });
    }
  };

  export const deleteCargops = async (req: Request, res: Response) => {
    try {
      const { codigo } = req.params;
      const data = await cargops_model.deleteOne({ codigo: codigo });
      delete_response("cargops", data, codigo, res)
    } catch (error) {
      res.json({ msg: error });
    }
  };

  export const getCargopsId = async (req: Request, res: Response) => {
    try {
      const { codigo } = req.params
      const data = await cargops_model.findOne({codigo: codigo}, omitirId);
      get_response("cargops", data, codigo, res);
    } catch (error) {
      res.json({ msg: error });
    }
  };

  export const f8Cargops = async (req: Request, res: Response) => {
    try {
      const { desde, cantidad } = req.params;
      let { dato } = req.query;
      const data = await cargops_model
        .find({ $or: [
          { codigo: { $regex: dato, $options: "ix" } },
          { descripcion: { $regex: dato, $options: "i" } },
        ] }, omitirId)
        .skip(Number(desde))
        .limit(Number(cantidad));
      get_all_response(data, res);
    } catch (error) { 
      res.json({ msg: error });
    }
  };
  