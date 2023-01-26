import { Request, Response } from "express";
import { edit_response, get_response } from "../global/global";
import { asigna_modulos_model } from "../models/ASIGNAMODULOS";
import { modulos_schema } from "../models/MODULOS";
import { usuvue_model } from "../models/USUVUE";

export const asignar_modulos_operadores = async () => {
  try {
    const modulos = await modulos_schema.find();
    const usuvue = await usuvue_model.find();
    const modulos_asignados = await asigna_modulos_model.find();
    if (modulos_asignados.length != usuvue.length) {
      for (let i = 0; i < usuvue.length; i++) {
        new asigna_modulos_model({
          llave: usuvue[i].llaveOper,
          modulos: modulos,
        }).save();
      }
    }
  } catch (error) {}
};

export const asigar_modulo = async (req: Request, res: Response) => {
  try {
    const { llave, codModulo, estado } = req.body;
    const data = await asigna_modulos_model.updateOne(
      { $and: [{ llave: llave }, { "modulos.cod": codModulo }] },
      {
        $set: {
          "modulos.$.estado": estado,
        },
      }
    );
    edit_response("maestro", data, llave, res);
  } catch (error) {
    console.log(error);
    res.json({ msg: error });
  }
};

export const consultar_modulos_asignados =async (req:Request, res:Response) => {
  try {
    const {llave} = req.params
    const data = await asigna_modulos_model.findOne({llave}, {_id:0})
    get_response("asignamodul", data, llave, res)
  } catch (error) {
    res.json({msg:error})
  }
  
}