import { Request, Response } from "express";
import { get_all_response } from "../global/global";
import { rescorr_model } from "../models/RESCORR";
//Rescorr, Terce

export const getCorr881F8 = async (req: Request, res: Response) => {
  try {
    const { desde, cantidad } = req.params;
    const { dato } = req.query;
    const data = await rescorr_model
      .aggregate([
        {
          $lookup: {
            from: "terce",
            localField: "nit",
            foreignField: "codigo",
            as: "terc",
          },
        },
      ])
      .project({
        _id: 0,
        codigo: { $toString: ["$codResp.cont"] },
        codResp: {
          $concat: [
            { $toString: ["$codResp.anoLlave"] },
            { $toString: ["$codResp.cont"] },
          ],
        },
        consecutivo: { $toString: ["$codResp.cont"] }, //Es el mismo codigo de arriba
        clMacro: 1, //tipo
        descrip: 1,
        operdiri: 1, //destino
        fecha: 1, //plazo
        anoLlave: { $toString: ["$codResp.anoLlave"] },
        swRadi: 1,
        esta: 1,
        descripEsta: {
          $switch: {
            branches: [
              { case: { $eq: ["$esta", 1] }, then: "PENDIENTE LEER" },
              { case: { $eq: ["$esta", 2] }, then: "LEÍDA SIN RESPUESTA" },
              { case: { $eq: ["$esta", 3] }, then: "LEÍDA CON ÉXITO" },
              { case: { $eq: ["$esta", 4] }, then: "RESPUESTA CONFIRMADA" },
            ],
            default: "SIN DESCRIPCION DE ESTADO",
          },
        },
      })
      .match({
        $or: [
          { anoLlave: { $regex: dato, $options: "i" } },
          { clMacro: { $regex: dato, $options: "ix" } },
          { descripEsta: { $regex: dato, $options: "i" } },
          { descrip: { $regex: dato, $options: "i" } },
        ],
      })
      .skip(Number(desde))
      .limit(Number(cantidad));

    get_all_response(data, res);
  } catch (error) {
    console.log(error);
    res.json({ msg: error });
  }
};
