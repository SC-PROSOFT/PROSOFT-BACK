import { Schema, model } from "mongoose";

interface modul {
  contab: string;
  modulos: [];
}

const modul_schema = new Schema<modul>({
  contab: {
    type: String,
    required: true,
    unique:true
  },
  modulos: {
    type:[],
    required:true
  },
}, {versionKey:false});

export const modul_model = model<modul>("modul", modul_schema);
