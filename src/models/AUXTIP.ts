import mongoose, { Schema, model } from "mongoose";

mongoose.pluralize(null);

interface auxtip {
  ubicacion: string;
  direct: string;
  subdirect: string;
  codigo: number;
  codSerco: string;
  descripcion: string;
}

const auxtip_schema = new Schema<auxtip>({
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
      type: Number,
      required: true,
      unique: true,
  },
  codSerco: {
      type: String,
      required: true,
  },
  descripcion: {
    type: String,
    required: true,
  },
});

auxtip_schema.index({ codigo: 1 }, { unique: true });

export const auxtip_model = model<auxtip>("auxtip", auxtip_schema);
