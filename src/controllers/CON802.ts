import { Request, Response } from "express";
import { get_all_response } from "../global/global";
import { terce_model } from "../models/TERCE";

export const getTerceroF8 = async (req: Request, res: Response) => {
  try {
    const { desde, cantidad } = req.params;
    const { dato } = req.query;

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
        tipo:1,
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
      .match({
        $or: [
          { codigo: { $regex: dato, $options: "i" } },
          { ciudad: { $regex: dato, $options: "i" } },
          { actividad: { $regex: dato, $options: "i" } },
          { descrip: { $regex: dato, $options: "i" } },
        ],
      })
      .skip(Number(desde))
      .limit(Number(cantidad));

    get_all_response(data, res);
  } catch (error) {
    console.error(error);
    res.json({ msg: error });
  }
};
