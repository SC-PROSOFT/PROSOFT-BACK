import mongoose, { Schema, model } from "mongoose";

mongoose.pluralize(null);

interface unifun {
  ubicacion: string;
  direct: string;
  subdirect: string;
  codigo: string;
  descripcion: string;
}

const unifun_schema = new Schema<unifun>({
  ubicacion: {
    type: String,
    default:"",
  },
  direct: {
    type: String,
    default:"",
  },
  subdirect: {
    type: String,
    default:"",
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

unifun_schema.index({ codigo: 1 }, { unique: true });

export const unifun_model = model<unifun>("unifun", unifun_schema);