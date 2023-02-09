import { Request, Response } from "express";
import { get_response, get_all_response, omitirId, generarJwt, edit_response } from "../global/global";
import { usuvue_model } from "../models/USUVUE";
import bcrypt from "bcrypt";

export const getusuvue = async (req: Request, res: Response) => {
  try {
    let clave: any;
    let llaveResp: any;
    llaveResp = req.query.llave;
    clave = req.query.clave;
    //console.log(llaveResp, clave);
    if (!clave) clave = "TlVFVk8xMjM=";
    const data = await usuvue_model
      .aggregate([
        {
          $lookup: {
            from: "restr",
            let: { llave: "$llaveOper" },
            pipeline: [
              {
                $match: {
                  $expr: { $eq: ["$llaveRest.oper", "$$llave"] },
                },
              },
              {
                $project: {
                  _id: 0,
                  opc: {
                    $concat: [
                      {
                        $replaceAll: {
                          input: "$llaveRest.opc",
                          find: " ",
                          replacement: "",
                        },
                      },
                    ],
                  },
                },
              },
            ],
            as: "restr",
          },
        },
        {
          $lookup: {
            from: "asigmodulos",
            localField: "llaveOper",
            foreignField: "llave",
            as: "modulos",
          },
        },
        {
          $unwind: "$modulos",
        },
        {
          $match: {
            llaveOper: llaveResp,
          },
        },
      ])
      .project({
        //"modulos.llave": 0,
        //"modulos": 0,

        "modulos.modulos": {
          $filter: {
            input: "$modulos.modulos",
            as: "item",
            cond: { $eq: ["$$item.estado", true] },
          },
        },
        ubicacion: 1,
        direct: 1,
        subdirect: 1,
        llaveOper: 1,
        clave: 1,
        nombre: 1,
        fecha: 1,
        admin: 1,
        dias: 1,
        restr: 1,
        depen: 1,
        ser: 1,
        serial: 1,
        id: 1,
        bloq: 1,
        sucur: 1,
        vend: 1,
      });
    if (data[0]) {
      if (data[0].clave == atob(clave) || (await bcrypt.compare(atob(clave), data[0].clave))) {
        const token = await generarJwt(data[0].llaveOper);
        if (atob(clave) === "NUEVO123") {
          delete data[0].clave;
          res.json({ data: data[0], token, changePassword: true });
        } else res.json({ data: data[0], token });
      } else res.json({ msg: "USER" });
    } else {
      get_response("usuvue", data, "", res);
    }
  } catch (error) {
    //console.log(error);
    res.json({ msg: error });
  }
};

export const cambiarContra = async (req: Request, res: Response) => {
  try {
    const { nueva_pass, llave } = req.params;
    const user = await usuvue_model.findOne({
      $and: [{ llaveOper: llave }],
    });

    if (user) {
      const new_password = await bcrypt.hash(atob(nueva_pass), 10);
      //console.log(llave);
      const data = await usuvue_model.updateOne({ llaveOper: llave }, { $set: { clave: new_password } });
      //console.log(data);
      edit_response("usuvue", data, llave, res);
    } else {
      res.json({ msg: "error perro" });
    }
  } catch (error) {
    res.json({ msg: error });
  }
};

export const getUsuvueLlave = async (req: Request, res: Response) => {
  try {
    const { llaveOper } = req.params;
    const data = await usuvue_model.findOne({ llaveOper: llaveOper }, omitirId);
    get_response("usuvue", data, llaveOper, res);
  } catch (error) {
    res.json({ msg: error });
  }
};
export const getUsuarios = async (req: Request, res: Response) => {
  try {
    const data = await usuvue_model.find({}, omitirId);
    get_all_response(data, res);
  } catch (error) {
    res.json({ msg: error });
  }
};
export const agregarModuloUsu = async (req: Request, res: Response) => {
  try {
    const data = await usuvue_model.find({}, omitirId);
    get_all_response(data, res);
  } catch (error) {
    res.json({ msg: error });
  }
};

export const f8Usuvue = async (req: Request, res: Response) => {
  try {
    const { desde, cantidad } = req.params;
    let { dato } = req.query;
    const data = await usuvue_model
      .find(
        {
          $or: [{ llaveOper: { $regex: dato, $options: "ix" } }, { nombre: { $regex: dato, $options: "i" } }],
        },
        {
          subdirect: 0,
          direct: 0,
          ubicacion: 0,
          clave: 0,
        }
      )
      .skip(Number(desde))
      .limit(Number(cantidad));
    get_all_response(data, res);
  } catch (error) {
    res.json({ msg: error });
  }
};
