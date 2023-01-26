import { Request, Response } from "express";
import { get_all_response, get_response, padStart } from "../global/global";
import { corres_model } from "../models/CORRES";
//Corres, terce, tipco

export const getCorresF8 = async (req: Request, res: Response) => {
  try {
    const { desde, cantidad } = req.params;
    const { dato, columna } = req.query;

    let body: any;
    body = { [`${columna}`]: { $regex: dato, $options: "i" } };
    if (!dato) body = {};

    if (columna === "llave") {
      const llave = {
        anoLlave: Number(dato?.toString().slice(0, 4)),
        cont: Number(dato?.toString().slice(4, dato?.toString().length)),
      };
      body = { llave: llave };
    }
    const data = await corres_model
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
            as: "tipc",
          },
        },
        {
          $lookup: {
            from: "remidep",
            let: { codigoRemidep: { $toString: "$deptoremi" } },
            pipeline: [
              {
                $match: {
                  $expr: { $eq: ["$codigo", "$$codigoRemidep"] },
                },
              },
            ],
            as: "remidep",
          },
        },
        {
          $lookup: {
            from: "auxtip",
            localField: "codAux",
            foreignField: "codigo",
            as: "auxtip",
          },
        },
        {
          $lookup: {
            from: "serco",
            localField: "ser",
            foreignField: "codigo",
            as: "serco",
          },
        },
        {
          $lookup: {
            from: "depco",
            localField: "dep",
            foreignField: "codigo",
            as: "depco",
          },
        },
      ])
      .project({
        _id: 0,
        llave: 1,
        llaveBusqueda: {
          $concat: [{ $toString: ["$llave.anoLlave"] }, { $toString: ["$llave.cont"] }],
        },
        anoLlave: { $toString: ["$llave.anoLlave"] },
        contLlave: { $toString: ["$llave.cont"] },
        fecha: { $substr: ["$fecha", 0, 10] },
        hora: {
          $concat: [padStart({ $toString: { $hour: "$fecha" } }, 2, "0"), ":", padStart({ $toString: { $minute: "$fecha" } }, 2, "0")],
        },
        nit: { $concat: [{ $toString: "$nit" }] },
        tipoCorres: 1,
        descripDep: {
          $concat: [{ $arrayElemAt: ["$depco.descripcion", 0] }],
        },
        cargoDep: {
          $concat: [{ $arrayElemAt: ["$depco.cargo", 0] }],
        },
        responsableDep: {
          $concat: [{ $arrayElemAt: ["$depco.responsable", 0] }],
        },
        correoDep: {
          $concat: [{ $arrayElemAt: ["$depco.correo", 0] }],
        },
        descripTipco: {
          $concat: [{ $arrayElemAt: ["$tipc.descripcion", 0] }],
        },
        descripSer: {
          $concat: [{ $arrayElemAt: ["$serco.descripcion", 0] }],
        },
        descripAux: {
          $concat: [{ $arrayElemAt: ["$auxtip.descripcion", 0] }],
        },
        descripDeptoremi: {
          $concat: [{ $arrayElemAt: ["$remidep.descripcion", 0] }],
        },
        descrip: 1,
        descripTer: { $concat: [{ $arrayElemAt: ["$ter.descrip", 0] }] },
        correoTer: { $concat: [{ $arrayElemAt: ["$ter.email", 0] }] },
        ser: 1,
        operdiri: 1,
        dep: 1,
        fol: 1,
        fold: 1,
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
        anex: 1,
        tipoAnexo: 1,
        otroAnexo: 1,
        nroFact: 1,
        monto: 1,
        fechaFact: { $substr: ["$fechaFact", 0, 10] },
        fechaEntre: { $substr: ["$fechaEntre", 0, 10] },
        nroGuia: 1,
        persentre: 1,
        observ: 1,
        tablaDep: 1,
        codAux: 1,
        tablaOper: 1,
        llaveResp: 1,
        errorRips: 1,
        nroEnvio: 1,
        proceden: 1,
        deptoremi: 1,
        manejo: 1,
        holding: 1,
        centroCos: 1,
        ciudad: 1,
        cargoOps: 1,
        llaveCausa: { $concat: ["$loteCau", "$comprobCau"] },
        fechaCau: { $substr: ["$fechaCau", 0, 10] },
        llavePago: { $concat: ["$lotePag", "$comprobPag"] },
        fechaPag: { $substr: ["$fechaPag", 0, 10] },
        oper: 1,
        operModi: 1,
        fechaModi: { $substr: ["$fechaModi", 0, 10] },
        diasTipco: 1,
        medioIng: 1,
        contAtnt1: 1,
        contAtnt2: 1,
        contAtnt3: 1,
      })
      .match(body)
      .skip(Number(desde))
      .limit(Number(cantidad));

    get_all_response(data, res);
  } catch (error) {
    console.error(error);
    res.json({ msg: error });
  }
};
