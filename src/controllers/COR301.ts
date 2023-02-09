import { Request, Response } from "express";
import { RestTypeNode } from "typescript";
import {
  concatenarCodigos,
  delete_response,
  diasHabilesTranscurridos,
  edit_response,
  fechaVence,
  get_all_response,
  get_response,
  omitirId,
  padStart,
} from "../global/global";
import { corres_model } from "../models/CORRES";
import { dia_no_habil_model } from "../models/DNHABIL";

export const getImpresionCorr = async (req: Request, res: Response) => {
  try {
    const {
      nit,
      dep,
      tipoCorr,
      fechaIni,
      fechaFin,
      jornada,
      proceden,
      manejo,
      estado,
    } = req.body;

    let nitt = {};
    let depp = {};
    let tipoCorrr = {};
    let jornadaa = {};
    let procedenn = {};
    let manejoo = {};
    let estadoo = {};

    if (nit != "99") nitt = { nit: Number(nit) };
    if (dep != "**") depp = { dep: Number(dep) };
    if (tipoCorr != "**") tipoCorrr = { tipoCorres: tipoCorr };
    if (jornada != "**") {
      if (jornada == "M")
        jornadaa =  { 
          $expr:
          { $lt: [ {$hour: "$fecha"}, 12 ] }
        }
      //$lt para que tome valores de 12 hacia atras, si le pongo la e tomaria el 12
      else jornadaa = { $expr:
        { $gte: [ {$hour: "$fecha"}, 12 ] } };
    }
    if (proceden != "**") procedenn = { proceden: Number(proceden) };
    if (manejo != "**") manejoo = { manejo: Number(manejo) };
    if (estado != "**" && estado != null) {
      estadoo = { esta: Number(estado) };
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
            from: "auxtip",
            localField: "codAux",
            foreignField: "codigo",
            as: "aux",
          },
        },

        {
          $lookup: {
            from: "serco",
            localField: "ser",
            foreignField: "codigo",
            as: "serc",
          },
        },

        {
          $lookup: {
            from: "rescorr",
            localField: "llave",
            foreignField: "codResp",
            as: "rescorr",
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
            from: "depco",
            let: { codigo: "$dep" },
            pipeline: [
              {
                $match: {
                  $expr: { $eq: ["$codigo", "$$codigo"] },
                },
              },
            ],
            as: "depc",
          },
        },
      ])

      .project({
        _id: 0,
        cont: { $concat: [{ $toString: ["$llave.cont"] }, " -E"] },
        anoLlave: { $concat: [{ $toString: ["$llave.anoLlave"] }] },
        fecha: 1,
        fechaR: { $substr: ["$fecha", 0, 10] },
        hora: {
          $concat: [padStart({ $toString: { $hour: "$fecha" } }, 2, "0"), ":", padStart({ $toString: { $minute: "$fecha" } }, 2, "0")],
        },
        esta: 1,
        dep: 1,
        estaR: {
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
        descrip: 1,
        nit: 1,
        descripTer: { $concat: [{ $arrayElemAt: ["$ter.descrip", 0] }] },
        dirTer: { $concat: [{ $arrayElemAt: ["$ter.direcc", 0] }] },
        emailTer: { $concat: [{ $arrayElemAt: ["$ter.email", 0] }] },
        telTer: { $concat: [{ $arrayElemAt: ["$ter.telefono", 0] }] },
        tipoCorres: 1,
        descripTipc: { $concat: [{ $arrayElemAt: ["$tipc.descripcion", 0] }] },
        diasTipc: {
          $let: {
            vars: {},
            in: { $add: [{ $arrayElemAt: ["$tipc.dias", 0] }] },
          },
        },
        fechaVence: {
          $dateAdd: {
            startDate: "$fecha",
            unit: "day",
            amount: { $arrayElemAt: ["$tipc.dias", 0] },
          },
        },
        // diasVence: {
        //   $dateDiff: {
        //     startDate: new Date(),
        //     endDate: {
        //       $dateAdd: {
        //         startDate: "$fecha",
        //         unit: "day",
        //         amount: { $arrayElemAt: ["$tipc.dias", 0] },
        //       },
        //     },
        //     unit: "day",
        //   },
        // },
        diasVence:1,
        descripAuxco: { $concat: [{ $arrayElemAt: ["$aux.descripcion", 0] }] },
        descripSerco: { $concat: [{ $arrayElemAt: ["$serc.descripcion", 0] }] },
        responsableDep: {
          $concat: [{ $arrayElemAt: ["$depc.responsable", 0] }],
        },
        correoRespDep: { $concat: [{ $arrayElemAt: ["$depc.correo", 0] }] },
        folios:{$concat:[
          "$fol"," de ","$fold"]}, 
        nroFact: 1,
        monto: 1,
        fecheFactR: { $substr: ["$fechaFact", 0, 10] },
        horaFechaFact: {
          $concat: [
            { $toString: { $hour: "$fechaFact" } },
            ":",
            { $toString: { $minute: "$fechaFact" } },
          ],
        },
        fecheEntreR: { $substr: ["$fechaEntre", 0, 10] },
        horaFechaEntre: {
          $concat: [
            { $toString: { $hour: "$fechaEntre" } },
            ":",
            { $toString: { $minute: "$fechaEntre" } },
          ],
        },
        oper: 1,
        manejo: 1,
        manejoR: {
          $switch: {
            branches: [
              { case: { $eq: ["$manejo", 1] }, then: "INFORMATIVO" },
              { case: { $eq: ["$manejo", 2] }, then: "RESOLUTIVO" },
            ],
            default: "SIN DEFINIR",
          },
        },
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
        llaveResp: {
          $let: {
            vars: {},
            in: { $add: [{ $arrayElemAt: ["$rescorr.codResp.anoLlave", 0] }] },
          },
        },
        contResp: { $concat: [{$toString:{
          $let: {
            vars: {},
            in: { $add: [{ $arrayElemAt: ["$rescorr.codResp.cont", 0] }] },
          },}
        }," -S"]//Tener esto pendiente, se hizo a solicitud del front pero es dudosa la argumentacion referente a que en electron coinciden todos los datos menos este al hacer comparacion de respuestas.
      },
        fechaRespuesta: {
          $substr: [
            {
              $let: {
                vars: {},
                in: { $add: [{ $arrayElemAt: ["$rescorr.fecha", 0] }] },
              },
            },
            0,
            10,
          ],
        },
        cargo: { $concat: [{ $arrayElemAt: ["$depc.cargo", 0] }] },
        medioIng: 1,
        medioIngR: {
          $switch: {
            branches: [
              { case: { $eq: ["$medioIng", 1] }, then: "CORREO CERTIFICADO" },
              { case: { $eq: ["$medioIng", 2] }, then: "E-MAIL" },
              { case: { $eq: ["$medioIng", 3] }, then: "PERSONAL" },
              { case: { $eq: ["$medioIng", 4] }, then: "PERSONAL ESCRITA" }, //Se consulto con encargado de correspondencia daniel, el numero 4 es resuelta tambien, igual que el 6 lo toman como resuelta.
              { case: { $eq: ["$medioIng", 5] }, then: "PERSONAL VERBAL" },
              { case: { $eq: ["$medioIng", 6] }, then: "PÁGINA WEB" },
            ],
            default: "SIN DEFINIR",
          },
        },
      })

      .match({
        $and: [
          nitt,
          depp,
          tipoCorrr,
          { fecha: { $gte: new Date(fechaIni) } },
          { fecha: { $lte: new Date(fechaFin) } },
          jornadaa,
          procedenn,
          manejoo,
          estadoo,
        ],
      });
    for (let i = 0; i < data.length; i++) {
      // if(typeof data[i].diasTipc != "object") //console.log(data[i].diasTipc)
      ////console.log(data[i].fecha);
      const fechaVenceD = await fechaVence(data[i].fecha, data[i].diasTipc);
      ////console.log("fecha: ", data[i].fecha, "dias: ", data[i].diasTipc);
      ////console.log(fechaVenceD, "DDD");
      if (fechaVenceD != 0) { //Esta validacion no deberia ser necesaria, revisar migracion.
        const guardarFecha = fechaVenceD.toISOString(); // Por alguna extraña razon, el setDate de la funcion diasHabilesTranscurridos cambia el valor de fechaVence, dejando la fecha acrtual
        data[i].fechaVence = new Date(guardarFecha); // Con esta variable solucione eso. (Desconozco si exite otra forma o lo estoy haciendo mal)
      } else {
        data[i].fechaVence = null;
      }
      const of =" de ";
      const max =" máximo ";
      const diasVence = await diasHabilesTranscurridos(fechaVenceD);
      // const diasTrans = await diasHabilesTranscurridos(fechaVenceD);
      data[i].diasTrans = diasVence;
      data[i].diasVence = diasVence + of + data[i].diasTipc + max;
    }
    get_all_response(data, res);
    // //console.log("RES en la validacion de COR301", res);
    // //console.log("DATA en la validacion de COR301", data);
  } catch (error) {
    res.json({ msg: error });
  }
};
