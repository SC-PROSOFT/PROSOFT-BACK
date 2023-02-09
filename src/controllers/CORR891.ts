import { Request, Response } from "express";
import { get_all_response, omitirId, get_response } from "../global/global";
import { corres_model } from "../models/CORRES";
//Corres

export const getCorr891F8 = async (req: Request, res: Response) => {
  try {
    const {desde,cantidad} = req.params;
    const {dato} = req.query;
    const data = await corres_model
    .aggregate([])
    .project({
        _id:0,
        llave:{
            $concat: [
              { $toString: ["$llave.anoLlave"] },
              { $toString: ["$llave.cont"] },
            ],
          },
        anoLlave:{ $toString: ["$llave.anoLlave"] },
        contLlave:{ $toString: ["$llave.cont"] },
        // cartera:,
    })
    .match({
        $or: [
          { llave: { $regex: dato, $options: "i" } },
        ]
    })
    .skip(Number(desde))
    .limit(Number(cantidad));

    get_all_response(data, res)
  } catch (error) {
    //console.log(error);
    res.json({ msg: error });
  }
};

export const getCorrId = async (req: Request, res: Response) => {
  try {
    const { dato } = req.query;

    const llave = {
      anoLlave: Number(dato?.toString().slice(0,4)),
      cont: Number(dato?.toString().slice(4,dato?.toString().length)),
    };
    //console.log(dato?.toString().slice(0,4))
    const data = await corres_model
    .aggregate()
    .project({
      _id: 0,
        llave: 1,
        llaveBusqueda: {
          $concat: [
            { $toString: ["$llave.anoLlave"] },
            { $toString: ["$llave.cont"] },
          ],
        },
        anoLlave: { $toString: ["$llave.anoLlave"] },
        contLlave: { $toString: ["$llave.cont"] },
        fecha: { $substr: ["$fecha", 0, 10] },
        hora: {
          $concat: [
            { $toString: { $hour: "$fecha" } },
            ":",
            { $toString: { $minute: "$fecha" } },
          ],
        },
        nit: { $concat: [{ $toString: ["$nit"] }] },
        tipoCorres: 1,
        descrip: 1,
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
    .match({llave:llave})
    get_response("corres", data[0], llave, res);
  } catch (error) {
    res.json({ msg: error });
  }
};