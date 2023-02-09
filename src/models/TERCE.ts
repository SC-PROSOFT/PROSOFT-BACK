import mongoose, { Schema, model } from "mongoose";

mongoose.pluralize(null);

interface terce {
  ubicacion: string;
  direct: string;
  subdirect: string;
  codigo: number;
  descrip: string;
  direcc: string;
  dv: string;
  zona: string;
  ruta: string;
  orden: number;
  bloq: string;
  tipo: string;
  grado: string;
  calific: string;
  regIva: string;
  rut: string;
  convenio: string;
  plazo: number;
  telefono: string;
  nit: number;
  act: number;
  vendedor: string;
  entidad: string;
  retenedor: string;
  factor: number;
  codCiu: number;
  pago: number;
  exent: string;
  retIva: string;
  marcaVeh: string;
  empresaVeh: string;
  nroVeh: string;
  placaVeh: string;
  fechaAlinVeh: string;
  fechaNac: string;
  cant: number;
  cupo: number;
  refer1: string;
  refer2: string;
  refer3: string;
  cargo: string;
  seguro: string;
  datacre: string;
  fechaCre: string;
  apel1: string;
  apel2: string;
  nomb1a: string;
  nomb1b: string;
  nomRef1: string;
  dirRef1: string;
  telRef1: string;
  relRef1: string;
  nomRef2: string;
  dirRef2: string;
  telRef2: string;
  relRef2: string;
  nomRef3: string;
  dirRef3: string;
  telRef3: string;
  relRef3: string;
  nomTrab: string;
  dirTrab: string;
  telTrab: string;
  carTrab: string;
  sueTrab: number;
  antTrab: string;
  ciuExp: number;
  entidAfi: number;
  fechaAfi: string;
  emailTer2: string;
  granContrib: string;
  retIvaCompra: string;
  activIca: number;
  embargos: string;
  porcIca: number;
  extraCupo: number;
  acuePago: string;
  idReprLegal: number;
  reprLegal: string;
  idTesor: number;
  tesorero: string;
  emailRep: string;
  emailtes: string;
  capitado: string;
  tipoCupo: number;
  indicativo: string;
  asesor: string;
  nit1Cli: string;
  retIcav: string;
  adminMod: string;
  fechaMod: string;
  procesoMod: string;
  admiCre: string;
  regWeb: number;
  porcEstamp: number;
  email: string;
  descripCont: string;
  telCont: string;
  emailCont: string;
  proced: string;
  destino: string;
  nacional: string;
  habit: number;
  pasaport1: string;
  pasaport2: string;
  tablaAcomp: [
    {
      nombreAcomp: string;
      tipoIdAcomp: number;
      expIdAcomp: string;
      identAcomp: number;
      nacionAcomp: string;
    }
  ];
  tablaDirecciones: [
    {
      direccionExt: string;
      codCiuExt: number;
      telefonoExt: number;
      barrio: number;
    }
  ];
  nomComer: string;
  estado: number;
  exiva: string;
  fechaVfact: string;
  sucUfact: number;
  nroUfact: number;
  porcRet: number;
  vlrBaseRet: number;
  codVtas: number;
  clasificacion: string;
  orderReference: string;
  frecuencia: string;
  ordenRuta: number;
  contrato: string;
  activida: string;
  autorizacion: string;
}

const terce_schema = new Schema<terce>({
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
  },
  descrip: {
    type: String,
    default: "",
  },
  direcc: {
    type: String,
    default: "",
  },
  dv: {
    type: String,
    default: "",
  },
  zona: {
    type: String,
    default: "",
  },
  ruta: {
    type: String,
    default: "",
  },
  orden: {
    type: Number,
    default: 0,
  },
  bloq: {
    type: String,
    default: "",
  },
  tipo: {
    type: String,
    default: "",
  },
  grado: {
    type: String,
    default: "",
  },
  calific: {
    type: String,
    default: "",
  },
  regIva: {
    type: String,
    default: "",
  },
  rut: {
    type: String,
    default: "",
  },
  convenio: {
    type: String,
    default: "",
  },
  plazo: {
    type: Number,
    default: 0,
  },
  telefono: {
    type: String,
    default: "",
  },
  nit: {
    type: Number,
    default: 0,
  },
  act: {
    type: Number,
    default: 0,
  },
  vendedor: {
    type: String,
    default: "",
  },
  entidad: {
    type: String,
    default: "",
  },
  retenedor: {
    type: String,
    default: "",
  },
  factor: {
    type: Number,
    default: 0,
  },
  codCiu: {
    type: Number,
    default: 0,
  },
  pago: {
    type: Number,
    default: 0,
  },
  exent: {
    type: String,
    default: "",
  },
  retIva: {
    type: String,
    default: "",
  },
  marcaVeh: {
    type: String,
    default: "",
  },
  empresaVeh: {
    type: String,
    default: "",
  },
  nroVeh: {
    type: String,
    default: "",
  },
  placaVeh: {
    type: String,
    default: "",
  },
  fechaAlinVeh: {
    type: String,
    default: "",
  },
  fechaNac: {
    type: String,
    default: "",
  },
  cant: {
    type: Number,
    default: 0,
  },
  cupo: {
    type: Number,
    default: 0,
  },
  refer1: {
    type: String,
    default: "",
  },
  refer2: {
    type: String,
    default: "",
  },
  refer3: {
    type: String,
    default: "",
  },
  cargo: {
    type: String,
    default: "",
  },
  seguro: {
    type: String,
    default: "",
  },
  datacre: {
    type: String,
    default: "",
  },
  fechaCre: {
    type: String,
    default: "",
  },
  apel1: {
    type: String,
    default: "",
  },
  apel2: {
    type: String,
    default: "",
  },
  nomb1a: {
    type: String,
    default: "",
  },
  nomb1b: {
    type: String,
    default: "",
  },
  nomRef1: {
    type: String,
    default: "",
  },
  dirRef1: {
    type: String,
    default: "",
  },
  telRef1: {
    type: String,
    default: "",
  },
  relRef1: {
    type: String,
    default: "",
  },
  nomRef2: {
    type: String,
    default: "",
  },
  dirRef2: {
    type: String,
    default: "",
  },
  telRef2: {
    type: String,
    default: "",
  },
  relRef2: {
    type: String,
    default: "",
  },
  nomRef3: {
    type: String,
    default: "",
  },
  dirRef3: {
    type: String,
    default: "",
  },
  telRef3: {
    type: String,
    default: "",
  },
  relRef3: {
    type: String,
    default: "",
  },
  nomTrab: {
    type: String,
    default: "",
  },
  dirTrab: {
    type: String,
    default: "",
  },
  telTrab: {
    type: String,
    default: "",
  },
  carTrab: {
    type: String,
    default: "",
  },
  sueTrab: {
    type: Number,
    default: 0,
  },
  antTrab: {
    type: String,
    default: "",
  },
  ciuExp: {
    type: Number,
    default: 0,
  },
  entidAfi: {
    type: Number,
    default: 0,
  },
  fechaAfi: {
    type: String,
    default: "",
  },
  emailTer2: {
    type: String,
    default: "",
  },
  granContrib: {
    type: String,
    default: "",
  },
  retIvaCompra: {
    type: String,
    default: "",
  },
  activIca: {
    type: Number,
    default: 0,
  },
  embargos: {
    type: String,
    default: "",
  },
  porcIca: {
    type: Number,
    default: 0,
  },
  extraCupo: {
    type: Number,
    default: 0,
  },
  acuePago: {
    type: String,
    default: "",
  },
  idReprLegal: {
    type: Number,
    default: 0,
  },
  reprLegal: {
    type: String,
    default: "",
  },
  idTesor: {
    type: Number,
    default: 0,
  },
  tesorero: {
    type: String,
    default: "",
  },
  emailRep: {
    type: String,
    default: "",
  },
  emailtes: {
    type: String,
    default: "",
  },
  capitado: {
    type: String,
    default: "",
  },
  tipoCupo: {
    type: Number,
    default: 0,
  },
  indicativo: {
    type: String,
    default: "",
  },
  asesor: {
    type: String,
    default: "",
  },
  nit1Cli: {
    type: String,
    default: "",
  },
  retIcav: {
    type: String,
    default: "",
  },
  adminMod: {
    type: String,
    default: "",
  },
  fechaMod: {
    type: String,
    default: "",
  },
  procesoMod: {
    type: String,
    default: "",
  },
  admiCre: {
    type: String,
    default: "",
  },
  regWeb: {
    type: Number,
    default: 0,
  },
  porcEstamp: {
    type: Number,
    default: 0,
  },
  email: {
    type: String,
    default: "",
  },
  descripCont: {
    type: String,
    default: "",
  },
  telCont: {
    type: String,
    default: "",
  },
  emailCont: {
    type: String,
    default: "",
  },
  proced: {
    type: String,
    default: "",
  },
  destino: {
    type: String,
    default: "",
  },
  nacional: {
    type: String,
    default: "",
  },
  habit: {
    type: Number,
    default: 0,
  },
  pasaport1: {
    type: String,
    default: "",
  },
  pasaport2: {
    type: String,
    default: "",
  },
  tablaAcomp: [
    {
      nombreAcomp: {
        type: String,
        default: "",
      },
      tipoIdAcomp: {
        type: Number,
        default: 0,
      },
      expIdAcomp: {
        type: String,
        default: "",
      },
      identAcomp: {
        type: Number,
        default: 0,
      },
      nacionAcomp: {
        type: String,
        default: "",
      },
    },
  ],
  tablaDirecciones: [
    {
      direccionExt: {
        type: String,
        default: "",
      },
      codCiuExt: {
        type: Number,
        default: 0,
      },
      telefonoExt: {
        type: Number,
        default: 0,
      },
      barrio: {
        type: Number,
        default: 0,
      },
    },
  ],
  nomComer: {
    type: String,
    default: "",
  },
  estado: {
    type: Number,
    default: 0,
  },
  exiva: {
    type: String,
    default: "",
  },
  fechaVfact: {
    type: String,
    default: "",
  },
  sucUfact: {
    type: Number,
    default: 0,
  },
  nroUfact: {
    type: Number,
    default: 0,
  },
  porcRet: {
    type: Number,
    default: 0,
  },
  vlrBaseRet: {
    type: Number,
    default: 0,
  },
  codVtas: {
    type: Number,
    default: 0,
  },
  clasificacion: {
    type: String,
    default: "",
  },
  orderReference: {
    type: String,
    default: "",
  },
  frecuencia: {
    type: String,
    default: "",
  },
  ordenRuta: {
    type: Number,
    default: 0,
  },
  contrato: {
    type: String,
    default: "",
  },
  activida: {
    type: String,
    default: "",
  },
  autorizacion: {
    type: String,
    default: "",
  },
});

terce_schema.index({ codigo: 1 }, { unique: true });

export const terce_model = model<terce>("terce", terce_schema);
