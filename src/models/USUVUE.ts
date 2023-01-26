import mongoose, { Schema, model } from "mongoose";

mongoose.pluralize(null);

interface usuvue {
  ubicacion: string;
  direct: string;
  subdirect: string;
  llaveOper: string;
  clave: string;
  nombre: string;
  fecha: Date;
  admin: string;
  dias: number;
  depen: number;
  ser: string;
  serial: string;
  id: number;
  bloq: string;
  sucur: string;
  vend: string;
}

const usuvue_schema = new Schema<usuvue>({
    ubicacion: {
        type: String,
        default:""
    },
  direct: {
    type: String,
    default:""
  },
  subdirect: {
    type: String,
    default:""
  },
  llaveOper: {
    type: String,
    unique:true
  },
  clave: {
    type: String,
    default:""
  },
  nombre: {
    type: String,
    required:true,
    default:""
  },
  fecha: {
    type: Date,
  },
  admin: {
    type: String,
    default:""
  },
  dias: {
    type: Number,
  },
  depen: {
    type: Number,
  },
  ser: {
    type: String,
    default:""
  },
  serial: {
    type: String,
    default:""
  },
  id: {
    type: Number,
  },
  bloq: {
    type: String,
    default:""
  },
  sucur: {
    type: String,
    default:""
  },
  vend: {
    type: String,
    default:""
  },
})

usuvue_schema.index({ llaveRest: 1 }, { unique: true });

export const usuvue_model = model<usuvue>("usuvue", usuvue_schema);