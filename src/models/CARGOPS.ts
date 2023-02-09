import mongoose, { Schema, model } from "mongoose";

mongoose.pluralize(null);

interface cargops {
  ubicacion: string;
  direct: string;
  subdirect: string;
  codigo: string;
  descripcion: string;
}

const cargops_schema = new Schema<cargops>({
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
});

cargops_schema.index({ codigo: 1 }, { unique: true });

export const cargops_model = model<cargops>("cargops", cargops_schema);