import { Request, Response } from "express";
import { usuar_model } from "../models/USUAR";
import { get_all_response, omitirId } from "../global/global";

export const getUsuar = async (req: Request, res: Response) => {
  try {
    const data = await usuar_model.find({}, omitirId);
    get_all_response(data, res);
  } catch (error) {
    console.log(error);
    res.json({ msg: error });
  }
};
