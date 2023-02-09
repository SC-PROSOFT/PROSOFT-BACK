import { Schema, model } from "mongoose";
interface config {
  ips: Object;
  ubicacion: [];
  fechaModif: Date;
  fechaCrea: Date;
  puerto: String;
}
const config_schema = new Schema<config>(
  {
    ips: {
      ipPublica: {
        type: String,
        required: true,
      },
      ipLocal: {
        type: String,
        required: true,
      },
    },
    ubicacion: [],
    fechaCrea: {
      type: Date,
    },
    fechaModif: {
      type: Date,
    },
    puerto: {
      type: String,
    },
  },
  { versionKey: false }
);

config_schema.pre("save", async function (next) {
  const data = await config_model.findOne({});

  if (data) next(new Error("Ya tiene configuracion"));
  else next();
});

config_schema.index({ ips: 1 }, { unique: true });

export const config_model = model<config>("config", config_schema);
