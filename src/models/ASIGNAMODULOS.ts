import {Schema, model} from "mongoose";
import { modulos_schema } from "./MODULOS";


interface asigmodulos {
    llave:String,
    modulos:[]
}

const asigna_modulos_schema = new Schema<asigmodulos>({
    llave:{
        type:String,
        unique:true,
        required:true
    },
    modulos:{
        type:[],
    }
}, {versionKey:false})


asigna_modulos_schema.pre("save", async function (next) {
    const modulos = await modulos_schema.find()

    ////console.log(modulos)
    //this.modulos = [modulos]

    next()

})


export const asigna_modulos_model = model<asigmodulos>("asigmodulos", asigna_modulos_schema)
