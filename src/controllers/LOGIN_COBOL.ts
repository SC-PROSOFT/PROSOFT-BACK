import { Request, Response } from "express";
import axios from "axios";
import FormData from "form-data";
import { generarJwt } from "../global/global";

export const login_cobol = (req: Request, res: Response) => {
  try {
    const { usuario, clave, modulo } = req.query;
    const datosh = {
      datosh: `${usuario}|${clave}|${modulo}`,
    };
    var formData = new FormData();
    for (var [key, value] of Object.entries(datosh))
      formData.append(key, value);

    var config = {
      method: "POST",
      url: "http://34.234.185.158/MAIN-ELECT/app/INDEX/INDEX.dll",
      data: formData,
    };
    axios(config)
      .then(async function (response) {
        if(response.data.STATUS == "00"){
          const jwt = await generarJwt(usuario?.toString())
          response.data.TOKEN = jwt
        }
        res.json(response.data)
      })
      .catch(function (error) {
        res.json({msg:error})
      });
  } catch (error) {}
};