import { Request, Response } from "express";
import { get_all_response } from "../global/global";
import { auxtip_model } from "../models/AUXTIP";
//Tipco, Auxtip

export const getCorr871F8 = async (req:Request, res:Response) => {
    try {
        const {desde, cantidad} = req.params;
        const {dato} = req.query;
        const data = await auxtip_model
        .aggregate([])
        .project({
            _id:0,
            codigo:{ $toString: ["$codigo"]},
            descripcion:1,
            codSerco:1,
        })
        .match({
            $or:[
                {codigo:{$regex:dato, $options:"ix"}},
                {descripcion:{$regex:dato, $options:"i"}},
                {codSerco:{$regex:dato, $options:"i"}},
              ]
        })
        .skip(Number(desde))
        .limit(Number(cantidad));

        get_all_response(data, res)
    }catch (error){
        //console.log(error)
        res.json({ msg:error })
    }
}