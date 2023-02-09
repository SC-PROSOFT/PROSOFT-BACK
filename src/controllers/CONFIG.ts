import { Request, Response } from "express";
import { edit_response, get_response } from "../global/global";
import { config_model } from "../models/CONFIG";
import { modul_model } from "../models/MODUL";
import { modulos_schema } from "../models/MODULOS";

export const create_config = async (req: Request, res: Response) => {
  try {
    new config_model(req.body).save((err) => {
      if (err) res.json({ msg: err.message });
      else res.json({ N1: "guaradado" });
    });
  } catch (error) {
    res.json({ msg: error });
  }
};

export const agregar_contabilidad = async (req: Request, res: Response) => {
  try {
    const { contabilidad } = req.params;
    const data = await config_model.updateOne(
      {},
      { $push: { ubicacion: { contab: contabilidad } } }
    );

    const modulos = await modulos_schema.find();

    new modul_model({
      contab: contabilidad,
      modulos: modulos,
    }).save((err) => {
      if (err) res.json({ msg: "contab-01" });
      else edit_response("cofig", data, "", res);
    });
  } catch (error) {
    res.json({ msg: error });
  }
};

export const eliminar_contabilidad = async (req: Request, res: Response) => {
  try {
    const { contabilidad } = req.params;
    const data = await config_model.updateOne(
      {},
      { $pull: { ubicacion: { contab: contabilidad } } }
    );
    edit_response("cofig", data, "", res);
  } catch (error) {
    res.json({ msg: error });
  }
};

export const edit_config = async (req: Request, res: Response) => {
  try {
    const data = await config_model.updateOne({}, req.body);
    edit_response("config", data, "", res);
  } catch (error) {
    res.json({ msg: error });
  }
};

export const get_config = async (req: Request, res: Response) => {
  try {
    const data = await config_model
      .aggregate([
        {
          $lookup: {
            from: "modul",
            foreignField: "contab",
            localField: "ubicacion.contab",
            as: "contab",
          },
        },
      ])
      .project({
        _id: 0,
      });
    res.json(data[0]);
  } catch (error) {
    console.log(error);
    res.json({ msg: error });
  }
};

export const editar_estado_modulos = async (req: Request, res: Response) => {
  try {
    const { modulo, contab, estado } = req.params;

    let estadoP = true;

    if (estado == "true") estadoP = true;
    else estadoP = false;

    const data = await modul_model.updateOne(
      { contab: contab, "modulos.cod": modulo },
      {
        $set: {
          "modulos.$.estado": estadoP,
        },
      }
    );

    res.json(data);
  } catch (error) {
    console.log(error);
    res.json({ msg: error });
  }
};

export const agregar_modulos_mod = async (req: Request, res: Response) => {
  try {
    const { contab, modulo } = req.params;

    const data = await modul_model.updateOne(
      { contab: contab, "modulos.cod": "NOM" },
      {
        $push: { "modulos.$.modulos": modulo },
      }
    );
    res.json(data);
  } catch (error) {
    console.log(error);
    res.json({ msg: error });
  }
};

export const eliminar_modulos_mod = async (req: Request, res: Response) => {
  try {
    const { contab, modulo } = req.params;

    const data = await modul_model.updateOne(
      { contab: contab, "modulos.cod": "NOM" },
      {
        $pull: { "modulos.$.modulos": { nomina: modulo } },
      }
    );
    res.json(data);
  } catch (error) {
    console.log(error);
    res.json({ msg: error });
  }
};

export const modulos_por_contabilidad = async (req: Request, res: Response) => {
  try {
    const { contab } = req.params;
    console.log(contab);
    const data = await modul_model.aggregate([
      {$match: {contab: contab}},
      {$project: {
          modulos: {$filter: {
              input: '$modulos',
              as: 'modulos',
              cond: {$eq: ['$$modulos.estado', true]}
          }},
          contab:1,
          _id: 0
      }}
    ])
    get_response("modul", data[0], contab, res);
  } catch (error) {
    console.log(error);
    res.json({ msg: error });
  }
};
