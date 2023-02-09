import mongoose, { Schema, model } from "mongoose";

mongoose.pluralize(null);

interface remidep {
  ubicacion: string;
  direct: string;
  subdirect: string;
  codigo: string;
  descripcion: string;
}

const remidep_schema = new Schema<remidep>({
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

remidep_schema.index({ codigo: 1 }, { unique: true });

export const remidep_model = model<remidep>("remidep", remidep_schema);