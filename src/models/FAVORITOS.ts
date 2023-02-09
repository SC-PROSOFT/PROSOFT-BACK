import mongoose from "mongoose";
import { Schema, model } from "mongoose";

mongoose.pluralize(null);

export interface favoritos {
  usuario: string;
  contabilidad: Object;
  nomina:Object;
  correspondencia:Object;
}

const favoritos_schema = new Schema<favoritos>(
  {
    usuario: {
      type: String,
      unique: true,
    },
    contabilidad: {
      type: Object,
      default: [],
    },
    nomina: {
      type: Object,
      default: [],
    },
    correspondencia: {
      type: Object,
      default: [],
    },
  },
  { versionKey: false }
);


export const favoritos_model = model<favoritos>("favoritos", favoritos_schema);
