import { dia_no_habil_model } from "../models/DNHABIL";

import { Response, Request } from "express";
import { delete_response, diacriticSensitiveRegex, edit_response, get_all_response, get_response, removeAccents } from "../global/global";

export const eliminarDia = async (req: Request, res: Response) => {
  try {
    const { ano } = req.params;
    const fecha = new Date(ano);
    const data = await dia_no_habil_model.deleteOne({ date: fecha });
    delete_response("dia_no_habil", data, ano, res);
  } catch (error) {
    res.json({ msg: error });
  }
};

export const agregarDia = async (req: Request, res: Response) => {
  try {
    // const data = await dia_no_habil_model.insertMany([])
    new dia_no_habil_model(req.body).save((err) => {
      if (err) res.json({ msg: err });
      else res.json({ N1: "guardado" });
    });
  } catch (error) {
    res.json({ msg: error });
  }
};

export const buscarDias = async (req: Request, res: Response) => {
  try {
    const data = await dia_no_habil_model.find({}, {});
    //console.log(data);
    get_all_response(data, res);
  } catch (error) {
    res.json({ msg: error });
  }
};
export const buscarDia = async (req: Request, res: Response) => {
  try {
    const { ano } = req.params;
    const data = await dia_no_habil_model
      .aggregate([
        {
          $project: {
            _id: 0,
            date: { $substr: ["$date", 0, 10] },
            descripcion: 1,
          },
        },
      ])
      .match({
        date: ano,
      });

    get_response("dia_no_habil", data[0], ano, res);
  } catch (error) {
    res.json({ msg: error });
  }
};

export const editarDia = async (req: Request, res: Response) => {
  try {
    let { date } = req.body;
    const newAno = new Date(date);
    const data = await dia_no_habil_model.updateOne({ date: newAno }, req.body);
    edit_response("dia_no_habil", data, date, res);
  } catch (error) {
    res.json({ msg: error });
  }
};

export const f8Dia = async (req: Request, res: Response) => {
  try {
    const { desde, cantidad } = req.params;
    const { dato } = req.query;

    //console.log(dato);

    // if (isNaN(Date.parse(dato))) {
    //   body = { descripcion: { $regex: dato, $options: "i" } };
    // } else {
    //   body = { date: { $regex: dato, $options: "i" } };
    // }

    const data = await dia_no_habil_model
      .aggregate([
        {
          $project: {
            _id: 0,
            date: { $substr: ["$date", 0, 10] },
            descripcion: 1,
          },
        },
      ])
      .match({
        $or: [{ descripcion: { $regex: dato, $options: "i" } }, { date: { $regex: dato, $options: "i" } }],
      })
      .skip(Number(desde))
      .limit(Number(cantidad));

    get_all_response(data, res);
  } catch (error) {
    res.json({ msg: error });
  }
};
