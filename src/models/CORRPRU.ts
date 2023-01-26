import mongoose, { Schema, model } from "mongoose";

mongoose.pluralize(null);
interface corrpru {
  ubicacion: string;
  direct: string;
  subdirect: string;
  llave: { anoLlave: number; cont: number };
  fecha: Date;
  nit: number;
  tipoCorres: string;
  descrip: string;
  ser: string;
  operdiri: string;
  dep: string; //Esto es tipo number en DEPCO, en cobol se maneja asi pero es raro
  fol: string;
  fold: string;
  esta: number;
  anex: string;
  tipoAnexo: number;
  otroAnexo: string;
  nroFact: string;
  monto: number;
  fechaFact: Date;
  fechaEntre: Date;
  nroGuia: string;
  persentre: string;
  observ: string;
  tablaDep: [
    { depTap: string; estaTab: number },
    { depTap: string; estaTab: number },
    { depTap: string; estaTab: number },
    { depTap: string; estaTab: number },
    { depTap: string; estaTab: number }
  ];
  codAux: number;
  tablaOper: [
    { operdiri1: string },
    { operdiri1: string },
    { operdiri1: string },
    { operdiri1: string },
    { operdiri1: string }
  ];
  llaveResp: {
    anoRes: number;
    contResPon: number;
  };
  errorRips: [
    { nroRips: number },
    { nroRips: number },
    { nroRips: number },
    { nroRips: number },
    { nroRips: number },
    { nroRips: number },
    { nroRips: number },
    { nroRips: number },
    { nroRips: number },
    { nroRips: number },
    { nroRips: number }
  ];
  nroEnvio: number;
  proceden: number;
  deptoremi: number;
  manejo: number;
  holding: number;
  centroCos: string;
  ciudad: string;
  cargoOps: string;
  loteCau: string;
  comprobCau: string;
  fechaCau: Date;
  lotePag: string;
  comprobPag: string;
  fechaPag: Date;
  oper: string;
  operModi: string;
  fechaModi: Date;
  diasTipco: number;
  medioIng: number;
  contAtnt1: number;
  contAtnt2: number;
  contAtnt3: number;
}

const corrpru_schema = new Schema<corrpru>({
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
  llave: {
    anoLlave: {
      type: Number,
      required: true,
    },
    cont: {
      type: Number,
      required: true,
    },
    type: Object,
    unique: true,
  },
  fecha: {
    type: Date,
  },
  nit: {
    type: Number,
    default: 0,
  },
  tipoCorres: {
    type: String,
    default: "",
  },
  descrip: {
    type: String,
    default: "",
  },
  ser: {
    type: String,
    default: "",
  },
  operdiri: {
    type: String,
    default: "",
  },
  dep: {
    type: String,
    default: "",
  },
  fol: {
    type: String,
    default: "",
  },
  fold: {
    type: String,
    default: "",
  },
  esta: {
    type: Number,
    default: 0,
  },
  anex: {
    type: String,
    default: "",
  },
  tipoAnexo: {
    type: Number,
    default: 0,
  },
  otroAnexo: {
    type: String,
    default: "",
  },
  nroFact: {
    type: String,
    default: "",
  },
  monto: {
    type: Number,
    default: 0,
  },
  fechaFact: {
    type: Date,
  },
  fechaEntre: {
    type: Date,
  },
  nroGuia: {
    type: String,
    default: "",
  },
  persentre: {
    type: String,
    default: "",
  },
  observ: {
    type: String,
    default: "",
  },
  tablaDep: [
    {
      depTap: {
        type: String,
        default: "",
      },
      estaTab: {
        type: Number,
        default: 0,
      },
    },
    {
      depTap: {
        type: String,
        default: "",
      },
      estaTab: {
        type: Number,
        default: 0,
      },
    },
    {
      depTap: {
        type: String,
        default: "",
      },
      estaTab: {
        type: Number,
        default: 0,
      },
    },
    {
      depTap: {
        type: String,
        default: "",
      },
      estaTab: {
        type: Number,
        default: 0,
      },
    },
    {
      depTap: {
        type: String,
        default: "",
      },
      estaTab: {
        type: Number,
        default: 0,
      },
    },
  ],
  codAux: {
    type: Number,
    default: 0,
  },
  tablaOper: [
    {
      operdiri1: {
        type: String,
        default: "",
      },
    },
    {
      operdiri1: {
        type: String,
        default: "",
      },
    },
    {
      operdiri1: {
        type: String,
        default: "",
      },
    },
    {
      operdiri1: {
        type: String,
        default: "",
      },
    },
    {
      operdiri1: {
        type: String,
        default: "",
      },
    },
  ],
  llaveResp: {
    anoRes: {
      type: Number,
      default: 0,
    },
    contResPon: {
      type: Number,
      default: 0,
    },
  },
  errorRips: [
    {
      nroRips: {
        type: Number,
        default: 0,
      },
    },
    {
      nroRips: {
        type: Number,
        default: 0,
      },
    },
    {
      nroRips: {
        type: Number,
        default: 0,
      },
    },
    {
      nroRips: {
        type: Number,
        default: 0,
      },
    },
    {
      nroRips: {
        type: Number,
        default: 0,
      },
    },
    {
      nroRips: {
        type: Number,
        default: 0,
      },
    },
    {
      nroRips: {
        type: Number,
        default: 0,
      },
    },
    {
      nroRips: {
        type: Number,
        default: 0,
      },
    },
    {
      nroRips: {
        type: Number,
        default: 0,
      },
    },
    {
      nroRips: {
        type: Number,
        default: 0,
      },
    },
    {
      nroRips: {
        type: Number,
        default: 0,
      },
    },
  ],
  nroEnvio: {
    type: Number,
    default: 0,
  },
  proceden: {
    type: Number,
    default: 0,
  },
  deptoremi: {
    type: Number,
    default: 0,
  },
  manejo: {
    type: Number,
    default: 0,
  },
  holding: {
    type: Number,
    default: 0,
  },
  centroCos: {
    type: String,
    default: "",
  },
  ciudad: {
    type: String,
    default: "",
  },
  cargoOps: {
    type: String,
    default: "",
  },
  loteCau: {
    type: String,
    default: "",
  },
  comprobCau: {
    type: String,
    default: "",
  },
  fechaCau: Date,
  lotePag: {
    type: String,
    default: "",
  },
  comprobPag: {
    type: String,
    default: "",
  },
  fechaPag: Date,
  oper: {
    type: String,
    default: "",
  },
  operModi: {
    type: String,
    default: "",
  },
  fechaModi: Date,
  diasTipco: {
    type: Number,
    default: 0,
  },
  medioIng: {
    type: Number,
    default: 0,
  },
  contAtnt1: {
    type: Number,
    default: 0,
  },
  contAtnt2: {
    type: Number,
    default: 0,
  },
  contAtnt3: {
    type: Number,
    default: 0,
  },
});

//corres_schema.index({ llave: 1 }, { unique: true });

export const corrpru_model = model<corrpru>("corrpru", corrpru_schema);
