import { Schema, model } from "mongoose";

interface pdf_res {
  llave: Object;
  archivo: String;
}

const pdf_res_schema = new Schema<pdf_res>(
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

export const pdf_res_model = model<pdf_res>("pdf_res", pdf_res_schema);
