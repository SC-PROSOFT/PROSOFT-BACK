import { Request, Response } from "express";
import {
  concatenarCodigos,
  delete_response,
  get_response,
  get_all_response,
  edit_response,
  omitirId,
} from "../global/global";
import { macorr_model } from "../models/MACORR";

export const getMacorr = async (req: Request, res: Response) => {
  try {
    const data = await macorr_model.find({}, omitirId);
    get_all_response(data, res);
  } catch (error) {
    res.json({ msg: error });
  }
};

export const postMacorr = async (req: Request, res: Response) => {
  try {
    new macorr_model(req.body).save((err) => {
      if (err) res.json({ msg: err.message });
      else res.json({ N1: "guardado" });
    });
  } catch (error) {
    res.json({ msg: error });
  }
};

export const putMacorr = async (req: Request, res: Response) => {
  try {
    const { cl, codigo } = req.params;
    console.log(cl, codigo);
    const llave = {
      cl: cl,
      codigo: Number(codigo),
    };
    const body = req.body;
    delete body.llave;
    const data = await macorr_model.updateOne({ llave: llave }, body, {
      runValidators: true,
    });
    edit_response("macorr", data, `${llave.cl}${llave.codigo}`, res);
  } catch (error) {
    console.log(error);
    res.json({ msg: error });
  }
};

export const deleteMacorr = async (req: Request, res: Response) => {
  try {
    const { cl, codigo } = req.params;
    console.log(cl, codigo);
    const llave = {
      cl: cl,
      codigo: Number(codigo),
    };
    const data = await macorr_model.deleteOne({ llave: llave });
    delete_response("macorr", data, `${llave.cl}${llave.codigo}`, res);
  } catch (error) {
    res.json({ msg: error });
  }
};

export const getMacorrId = async (req: Request, res: Response) => {
  try {
    const { cl, codigo } = req.params;
    console.log(req.params);
    const llave = {
      cl: cl,
      codigo: Number(codigo),
    };
    console.log(llave);
    const data = await macorr_model.findOne({ llave: llave }, omitirId);
    get_response("macorr", data, `${llave.cl}${llave.codigo}`, res);
  } catch (error) {
    res.json({ msg: error });
  }
};

export const f8Macorr = async (req: Request, res: Response) => {
  try {
    const { desde, cantidad } = req.params;
    let { dato, tipo } = req.query;

    console.log(dato, tipo)

    let body = {};

    if (tipo) {
      body = {
        $and: [
          { tipo: tipo },
          {
            $or: [
              { llaveR: { $regex: dato } },
              { detalle: { $regex: dato, $options: "ix" } },
              { oper: { $regex: dato, $options: "ix" } },
            ],
          },
        ],
      };
    } else {
      body = {
        $or: [
          { llaveR: { $regex: dato } },
          { detalle: { $regex: dato, $options: "ix" } },
          { oper: { $regex: dato, $options: "ix" } },
        ],
      };
    }
    const data = await macorr_model
      .aggregate()
      .project({
        _id: 0,
        llave:1,
        llaveR: {$concat: [{$toString:["$llave.cl"]},{$toString:["$llave.codigo"]}]},
        tipo: { $concat: ["$llave.cl"] },
        detalle: 1,
        tabla: 1,
        oper: 1,
        fechOper:{$substr:["$fechOper",0,10]}
      })
      .match(body)
      .skip(Number(desde))
      .limit(Number(cantidad));
    get_all_response(data, res);
  } catch (error) {
    console.log(error);
    res.json({ msg: error });
  }
};
