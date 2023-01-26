import { Request, Response } from "express";
import { get_all_response, get_response, edit_response, delete_response, omitirId } from "../global/global";
import { terce_model } from "../models/TERCE";

export const getTerce = async (req: Request, res: Response) => {
  try {
    const data = await terce_model.find({}, omitirId);
    get_all_response(data, res);
    console.log(data.length);
  } catch (error) {
    console.error(error);
    res.json({ msg: error });
  }
};

export const postTerce = async (req: Request, res: Response) => {
  try {
    new terce_model(req.body).save((err) => {
      if (err) res.json({ msg: err.message });
      else res.json({ N1: "guardado" });
    });
  } catch (error) {
    console.error(error);
    res.json({ msg: error });
  }
};

export const putTerce = async (req: Request, res: Response) => {
  try {
    const { codigo } = req.params;
    const body = req.body;
    delete body.codigo;
    const data = await terce_model.updateOne({ codigo: codigo }, body, { runValidators: true });
    edit_response("terce", data, codigo, res);
  } catch (error) {
    console.error(error);
    res.json({ msg: error });
  }
};

export const deleteTerce = async (req: Request, res: Response) => {
  try {
    const { codigo } = req.params;
    const data = await terce_model.deleteOne({ codigo: codigo });
    delete_response("terce", data, codigo, res);
  } catch (error) {
    console.error(error);
    res.json({ msg: error });
  }
};

export const getTerceId = async (req: Request, res: Response) => {
  try {
    const { codigo } = req.params;
    const data = await terce_model
      .aggregate([
        {
          $lookup: {
            from: "ciuda",
            let: { codCiu: "$codCiu" },
            pipeline: [
              {
                $match: {
                  $expr: { $eq: [{ $concat: ["$codCiu.dptCiu", "$codCiu.ciuCiu"] }, "$$codCiu"] },
                },
              },
            ],
            as: "ciudad2",
          },
        },
        {
          $lookup: {
            from: "activ",
            let: { activ: "$act" },
            pipeline: [
              {
                $match: {
                  $expr: { $eq: [{ $toInt: "$codigo" }, "$$activ"] },
                },
              },
            ],
            as: "actividad",
          },
        },
      ])
      .project({
        _id: 0,
        codigo: { $toString: ["$codigo"] },
        descrip: 1,
        direcc: 1,
        dv: 1,
        emailTer2: 1,
        telefono: 1,
        ciudad: { $concat: [{ $arrayElemAt: ["$ciudad2.nombre", 0] }] },
        factor: 1,
        act: 1,
        email: 1,
        nomb1a: 1,
        nomb1b: 1,
        apel1: 1,
        apel2: 1,
        tipo: 1,
        tipoR: {
          $switch: {
            branches: [
              { case: { $eq: ["$tipo", "CC"] }, then: 1 },
              { case: { $eq: ["$tipo", "CE"] }, then: 2 },
              { case: { $eq: ["$tipo", "PA"] }, then: 3 },
              { case: { $eq: ["$tipo", "RC"] }, then: 4 },
              { case: { $eq: ["$tipo", "TI"] }, then: 5 },
              { case: { $eq: ["$tipo", "NU"] }, then: 6 },
              { case: { $eq: ["$tipo", "NI"] }, then: 7 },
            ],
            default: "SIN DESCRIPCION DE ESTADO",
          },
        },
        actividad: { $concat: [{ $arrayElemAt: ["$actividad.nombre", 0] }] },
        entidad: 1,
        embargos: 1,
        exent: 1,
      })
      .match({ codigo: codigo });

    get_response("terce", data[0], codigo, res);
  } catch (error) {
    console.error(error);
    res.json({ msg: error });
  }
};
