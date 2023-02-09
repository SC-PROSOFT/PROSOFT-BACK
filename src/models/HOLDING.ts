import mongoose, { Schema, model } from "mongoose";

mongoose.pluralize(null);

interface holding {
  ubicacion: string;
  direct: string;
  subdirect: string;
  codigo: number;//Es tipo number en migracion
  descripcion: string;
  activa: string;
}

const holding_schema = new Schema<holding>({
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
  descripcion: {
    type: String,
    required: true,
  },
  activa: {
    type: String,
    required: true,
  },
});

holding_schema.index({ codigo: 1 }, { unique: true });

export const holding_model = model<holding>("holding", holding_schema);