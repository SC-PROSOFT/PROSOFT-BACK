import { Request, Response } from "express";
import {
  concatenarCodigos,
  delete_response,
  edit_response,
  get_all_response,
  get_response,
  omitirId,
} from "../global/global";
import { tipco_model } from "../models/TIPCO";

export const getTipco = async (req: Request, res: Response) => {
  try {
    const data = await tipco_model.find({}, omitirId);
    get_all_response(data, res)
  } catch (error) {
    res.json({ msg: error });
  }
};

export const postTipco = async (req: Request, res: Response) => {
  try {
    new tipco_model(req.body).save((err) => {
      if (err) res.json({ msg: err.message });
      else res.json({ N1: "guardado" });
    });
  } catch (error) {
    res.json({ meg: error });
  }
};

export const putTipco = async (req: Request, res: Response) => {
  try {
    const {codigo} = req.params
    const body = req.body;
    delete body.codigo
    const data = await tipco_model.updateOne({codigo: codigo}, body, { runValidators: true });
    edit_response("tipco", data, codigo, res);
  } catch (error) {
    res.json({ msg: error });
  }
};

export const deleteTipco = async (req: Request, res: Response) => {
  try {
    const { codigo } = req.params;
    const data = await tipco_model.deleteOne({ codigo: codigo });
    delete_response("tipco", data, codigo, res);
  } catch (error) {
    res.json({ msg: error });
  }
};

export const getTipcoId = async (req: Request, res: Response) => {
  try {
    const { codigo } = req.params
    const data = await tipco_model.findOne({codigo: codigo}, omitirId);
    get_response("tipco", data, codigo, res);
  } catch (error) {
    res.json({ msg: error });
  }
};

export const f8Tipco = async (req: Request, res: Response) => {
  try {
    const { desde, cantidad } = req.params;
    let { dato } = req.query;
    const data = await tipco_model
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
