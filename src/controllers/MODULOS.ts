import { Request, Response } from "express";
import {
  delete_response,
  edit_response,
  get_all_response,
} from "../global/global";
import { asigna_modulos_model } from "../models/ASIGNAMODULOS";
import { config_model } from "../models/CONFIG";
import { modul_model } from "../models/MODUL";
import { modulos_schema } from "../models/MODULOS";

export const agregar_modulo = async (req: Request, res: Response) => {
  try {
    let body:any
    if(req.body.cod === "NOM"){
      body = {
        cod:req.body.cod,
        descripcion:req.body.descripcion,
        estado: false,
        modulos:[{nomina:"ADM"},
        {nomina:"CTL"}]
      }
    }else{
      body = {
        cod: req.body.cod,
        descripcion: req.body.descripcion,
        estado: false,
      }
    }
    
    new modulos_schema(body).save(async (err) => {
      if (err) res.send({ msg: err });
      else {
        const data = await modul_model.updateMany(
          {},
          {
            $push: {
              modulos: body,
            },
          }
        );

        const actualizarAsiganaModul = await asigna_modulos_model.updateMany(
          {},
          {
            $push: {
              modulos: body,
            },
          }
        );

        //console.log(data);
        res.json({ N1: "guardado" });
      }
    });
  } catch (error) {
    res.json({ msg: error });
  }
};

export const editar_modulo = async (req: Request, res: Response) => {
  try {
    const { cod } = req.body;

    const modulo = await modulos_schema.findOne({cod:cod})
    const data = await modulos_schema.updateOne(
      { cod: cod },
      {
        $set: {
          descripcion: req.body.descripcion,
          estado: req.body.estado,
        },
      }
    );

    if(! data.acknowledged === false){

      const editarModul  = await modul_model.updateMany({
        "modulos.cod":cod
      },{
        $set:{
          "modulos.$.descripcion": req.body.descripcion
        }
      })

      const editarAsignaModul  = await asigna_modulos_model.updateMany({
        "modulos.cod":cod
      },{
        $set:{
          "modulos.$.descripcion": req.body.descripcion
        }
      })
    }

    edit_response("modulo", data, cod, res);
  } catch (error) {
    res.json({ msg: error });
  }
};

export const eliminar_modulo = async (req: Request, res: Response) => {
  try {
    const { cod } = req.params;
    const modulo = await modulos_schema.findOne({ cod: cod });

    const data = await modulos_schema.deleteOne({ cod: cod });

    if (data.deletedCount > 0) {
      const eliminarModuloTrue = await modul_model.updateMany(
        {},
        {
          $pull: {
            modulos: {
              cod: modulo?.cod,
              descripcion: modulo?.descripcion,
              estado: false,
            },
          },
        }
      );

      const eliminarModuloFalse = await modul_model.updateMany(
        {},
        {
          $pull: {
            modulos: {
              cod: modulo?.cod,
              descripcion: modulo?.descripcion,
              estado: true,
            },
          },
        }
      );

      const eliminarAsiignaModuloTrue = await asigna_modulos_model.updateMany(
        {},
        {
          $pull: {
            modulos: {
              cod: modulo?.cod,
              descripcion: modulo?.descripcion,
              estado: false,
            },
          },
        }
      );

      const eliminarAsiignaModuloFalse = await asigna_modulos_model.updateMany(
        {},
        {
          $pull: {
            modulos: {
              cod: modulo?.cod,
              descripcion: modulo?.descripcion,
              estado: true,
            },
          },
        }
      );

      //console.log(eliminarModuloTrue);
    }

    delete_response("modulo", data, cod, res);
  } catch (error) {
    res.json({ msg: error });
  }
};

export const obtener_modulos = async (req: Request, res: Response) => {
  try {
    const data = await modulos_schema.find();

    get_all_response(data, res);
  } catch (error) {}
};
