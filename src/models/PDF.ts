import { Schema, model } from "mongoose";

interface pdf {
  llave: Object;
  archivo: String;
}

const pdf_schema = new Schema<pdf>(
  {
    llave: {
      anoLlave: {
        type: Number,
      },
      cont: {
        type: Number,
      },
      type: Object,
      unique: true,
      required: true,
    },
    archivo: {
      type: String,
      required: true,
    },
  },
  { versionKey: false }
);

export const pdf_model = model<pdf>("pdf", pdf_schema);
