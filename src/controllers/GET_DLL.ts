import { Request, Response } from "express";
import FormData from "form-data";
import axios from "axios";
import { eliminarEspacios } from "./LOGIN_COBOL";

export const GET_DLL = async (req: Request, res: Response) => {
    try {
        
      let { data, metodo, url, ip } = req.body;
      let config = {};
  
      if (data) {

        let formData = new FormData();
        for (let [key, value] of Object.entries(data)) formData.append(key, value);
        config = {
          method: metodo,
          url: `http://${ip}/MAIN-ELECT/${url}`,
          data: formData,
        };
      } else {
        config = {
          method: metodo,
          url: url,
        };
      }
  
      axios(config)
        .then(function (respuesta: any) {
          typeof respuesta.data == "object" ? res.json(respuesta.data) : res.json(JSON.parse(eliminarEspacios(respuesta.data)));
        })
        .catch(function (error) {
          //console.error(error);
          res.json({ msg: error });
        });
    } catch (error) {
      //console.error(error);
      res.json({ msg: error });
    }
  };