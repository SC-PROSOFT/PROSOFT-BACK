import { Request, Response } from "express";
import { get_all_response } from "../global/global";
import { corres_model } from "../models/CORRES";

export const getCorr869F8 = async (req: Request, res: Response) => {
  try {
    const { desde, cantidad } = req.params;
    const { dato } = req.query;
    const data = await corres_model
      .aggregate([
        {
          $lookup: {
            from: "serco",
            localField: "ser",
            foreignField: "codigo",
            as: "serc",
          },
        },
      ])

      .project({
        _id: 0,
        llave: {
          $concat: [{ $toString: ["$llave.anoLlave"] }, { $toString: ["$llave.cont"] }],
        },
        fecha: 1,
        hora: { $hour: "$fecha" },
        minutos: { $minute: "$fecha" },
        ser: 1,
        descripSerco: { $concat: [{ $arrayElemAt: ["$serc.descripcion", 0] }] },
        esta: { $toString: ["$esta"] },
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
          { llave: { $regex: dato, $options: "i" } },
          { esta: { $regex: dato, $options: "i" } },
          { descripEsta: { $regex: dato, $options: "i" } },
        ],
      })
      .skip(Number(desde))
      .limit(Number(cantidad));

    get_all_response(data, res);
  } catch (error) {
    //console.log(error);
    res.json({ msg: error });
  }
};
export const getCorr869 = async (req: Request, res: Response) => {
  try {
    const { anio } = req.params;
    //console.log(req.params)
    const data = await corres_model
      .aggregate([
        {
          $lookup: {
            from: "serco",
            localField: "ser",
            foreignField: "codigo",
            as: "serc",
          },
        },
      ])

      .project({
        _id: 0,
        llave: {
          $concat: [{ $toString: ["$llave.anoLlave"] }, { $toString: ["$llave.cont"] }],
        },
        ano: {$concat: [{$toString:["$llave.anoLlave"]}]},
        // fecha: 1,
        fechaR:{$substr:["$fecha",0,10]},
        hora: {$concat:[{ $toString:{$hour: "$fecha"} },":",{$toString:{$minute: "$fecha"} }]},
        ser: 1,
        descripSerco: { $concat: [{ $arrayElemAt: ["$serc.descripcion", 0] }] },
        esta:1,
        estaR:{
        $switch: {
          branches: [
            { case: { $eq: ["$esta", 1] }, then: "EN TRAMITE" },
            { case: { $eq: ["$esta", 2] }, then: "VENCIDA" },
            { case: { $eq: ["$esta", 3] }, then: "RESUELTA" },
            { case: { $eq: ["$esta", 4] }, then: "RESUELTA" }, //Se consulto con encargado de correspondencia daniel, el numero 4 es resuelta tambien, igual que el 6 lo toman como resuelta.
            { case: { $eq: ["$esta", 5] }, then: "PRORROGA" },
            { case: { $eq: ["$esta", 6] }, then: "ANULADO" },
          ],
          default: "SIN DEFINIR",
        },
      },
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
      .match({ ano : anio });

    get_all_response(data, res);
  } catch (error) {
    //console.log(error);
    res.json({ msg: error });
  }
};
