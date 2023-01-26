import { Request, Response } from "express";
import { get_all_response, get_response } from "../global/global";
import { rescorr_model } from "../models/RESCORR";
//Rescorr, Terce, Tipco

export const getRescorrF8 = async (req: Request, res: Response) => {
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
            as: "ter",
          },
        },

        {
          $lookup: {
            from: "tipco",
            let: { tipoCorres: { $toString: "$tipoCorres" } },
            pipeline: [
              {
                $match: {
                  $expr: { $eq: ["$codigo", "$$tipoCorres"] },
                },
              },
            ],
            as: "tipco",
          },
        },
      ])

      .project({
        _id: 0,
        codResp: {
          $concat: [
            { $toString: ["$codResp.anoLlave"] },
            { $toString: ["$codResp.cont"] },
          ],
        },
        anoLlave: { $concat: [{ $toString: ["$codResp.anoLlave"] }] },
        contLlave: { $concat: [{ $toString: ["$codResp.cont"] }] },
        swRadi: 1,
        fecha: 1,
        fechaR: { $substr: ["$fecha", 0, 10] },
        hora: {
          $concat: [
            { $toString: { $hour: "$fecha" } },
            ":",
            { $toString: { $minute: "$fecha" } },
          ],
        },
        firma: 1,
        codigoMacro: 1,
        asunto: 1,
        tabla: 1,
        respon: 1,
        cargo: 1,
        llaveRadi: { $concat: [{ $toString: ["$anoRadi"] }, "$contRadi"] },
        fechaRadi: 1,
        fechaRadiR: { $substr: ["$fechaRadi", 0, 10] },
        horaRadi: {
          $concat: [
            { $toString: { $hour: "$fechaRadi" } },
            ":",
            { $toString: { $minute: "$fechaRadi" } },
          ],
        },
        nit: { $concat: [{ $toString: ["$nit"] }] }, //Para filtrar se convierte a string para que el regex funciones
        tipoCorres: 1,
        descripTipco: {
          $concat: [{ $arrayElemAt: ["$tipco.descripcion", 0] }],
        },
        descrip: 1,
        descripTer: { $concat: [{ $arrayElemAt: ["$ter.descrip", 0] }] },
        ser: 1,
        operdiri: 1,
        dep: 1,
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
        codAuxco: 1,
        codUnifun: 1,
        proceden: 1,
        procedenR: {
          $switch: {
            branches: [
              { case: { $eq: ["$proceden", 1] }, then: "EXTERNO" },
              { case: { $eq: ["$proceden", 2] }, then: "INTERNO" },
            ],
            default: "SIN DEFINIR",
          },
        },
        oper: 1,
        operModi: 1,
        fechaModi: 1,
        horaModi: {
          $concat: [
            { $toString: { $hour: "$fechaModi" } },
            ":",
            { $toString: { $minute: "$fechaModi" } },
          ],
        },
        medio: 1,
        numeroFact: 1,
        nroGuia: 1,
        perRec: 1,
        monto: 1,
      })
      .match({
        $or: [
          { codResp: { $regex: dato, $options: "i" } },
          { nit: { $regex: dato } },
          { descripEsta: { $regex: dato, $options: "i" } },
          { descrip: { $regex: dato, $options: "i" } },
          { asunto: { $regex: dato, $options: "i" } },
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

export const getRescorr = async (req: Request, res: Response) => {
  try {
    const { anoLlave, cont } = req.params;
    const codResp = {
      anoLlave: Number(anoLlave),
      cont: Number(cont),
    };
    const data = await rescorr_model
      .aggregate([
        {
          $lookup: {
            from: "terce",
            localField: "nit",
            foreignField: "codigo",
            as: "ter",
          },
        },

        {
          $lookup: {
            from: "tipco",
            let: { tipoCorres: { $toString: "$tipoCorres" } },
            pipeline: [
              {
                $match: {
                  $expr: { $eq: ["$codigo", "$$tipoCorres"] },
                },
              },
            ],
            as: "tipco",
          },
        },
      ])

      .project({
        _id: 0,
        codResp2: {
          $concat: [
            { $toString: ["$codResp.anoLlave"] },
            { $toString: ["$codResp.cont"] },
          ],
        },
        codResp: 1,
        anoLlave: { $concat: [{ $toString: ["$codResp.anoLlave"] }] },
        contLlave: { $concat: [{ $toString: ["$codResp.cont"] }] },
        swRadi: 1,
        fecha: 1,
        hora: {$concat:[{$toString:{ $hour: "$fecha" }},":",{$toString:{ $minute: "$fecha" }}]},
        firma: 1,
        codigoMacro: 1,
        asunto: 1,
        tabla: 1,
        respon: 1,
        cargo: 1,
        llaveRadi: { $concat: [{ $toString: ["$anoRadi"] }, "$contRadi"] },
        fechaRadi: 1,
        horaRadi: { $hour: "$fechaRadi" },
        nit: { $concat: [{ $toString: ["$nit"] }] }, //Para filtrar se convierte a string para que el regex funciones
        tipoCorres: 1,
        descripTipco: {
          $concat: [{ $arrayElemAt: ["$tipco.descripcion", 0] }],
        },
        descrip: 1,
        descripTer: { $concat: [{ $arrayElemAt: ["$ter.descrip", 0] }] },
        ser: 1,
        operdiri: 1,
        dep: 1,
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
        codAuxco: 1,
        codUnifun: 1,
        proceden: 1,
        oper: 1,
        operModi: 1,
        fechaModi: 1,
        medio: 1,
        numeroFact: 1,
        nroGuia: 1,
        perRec: 1,
        monto: 1,
      })
      .match({
        codResp: codResp,
      });

    get_response("rescor", data[0], anoLlave, res);
  } catch (error) {
    console.log(error);
    res.json({ msg: error });
  }
};
