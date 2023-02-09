import { Schema, model } from "mongoose";

interface modulo {
  cod: string;
  descripcion: string;
  estado: boolean;
  nominas: [];
}

const modulo_model = new Schema<modulo>({
  cod: {
    type: String,
    required: true,
    unique:true
  },
  descripcion: {
    type: String,
    required: true,
  },
  estado: {
    type: Boolean,
    default: false,
  },
  nominas: {
    type:[],
  }
}, {versionKey:false});


export const modulos_schema = model<modulo>("modulos", modulo_model)
