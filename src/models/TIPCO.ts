import mongoose, { Schema, model } from "mongoose";

mongoose.pluralize(null);

interface tipco {
  ubicacion: string;
  direct: string;
  subdirect: string;
  codigo: string;
  descripcion: string;
  dias: number;
}

const tipco_schema = new Schema<tipco>({
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
  codigo: {
    type: String,
    required: true,
    unique: true,
  },
  descripcion: {
      type: String,
      required: true,
  },
  dias: {
    type: Number,
    required: true,
  },
});

tipco_schema.index({ codigo: 1 }, { unique: true });

export const tipco_model = model<tipco>("tipco", tipco_schema);