import mongoose, { Schema, model } from "mongoose";

mongoose.pluralize(null);

interface ciuda {
  ubicacion: string;
  direct: string;
  subdirect: string;
  codCiu: {
    dptCiu: string;
    ciuCiu: string;
  };
  nombre: string;
  pais: string;
  actbarrios: string;
  increm: number;
}

const ciuda_schema = new Schema<ciuda>({
  ubicacion: {
    type: String,
    default: "",
  },
  direct: {
    type: String,
    default: "",
  },
  subdirect: {
    type: String,
    default: "",
  },
  codCiu: {
    dptCiu: {
      type: String,
      required: true,
    },
    ciuCiu: {
      type: String,
      required: true,
    },
  },
  nombre: {
    type: String,
    required: true,
  },
  pais: {
    type: String,
    required: true,
  },
  actbarrios: {
    type: String,
    required: true,
  },
  increm: {
    type: Number,
    required: true,
  },
});

ciuda_schema.index({ llave: 1 }, { unique: true });

export const ciuda_model = model<ciuda>("ciuda", ciuda_schema);
