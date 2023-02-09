import mongoose, { Schema, model } from "mongoose";

mongoose.pluralize(null);

interface usuar {
	ubicacion: string;
	direct: string;
	subdirect: string;
	nombre: string;
	nit: number;
	dv: number;
	direcc: string;
	codCiu: {
		dpt: number;
		ciu: number;
	};
	tel: string;
	nuir: string;
	prefijo: string;
	listaPol: string;
	ivaS: string;
	nombreAlterno: string;
	nitAlt: number;
	dvAlt: number;
	direccAlt: string;
	codCiuAlt: number;
	// tel: string;  SE ESTA REPITIENDO ESTA VARIABLE
	prefijoAlt: string;
	listaPolAlt: string;
	ivaSAlt: string;
	limiCosto: string;
	extenFac: string;
	ctaEfect: string;
	retail: string;
	aprox: string;
	repetido: string;
	descto: string;
	retenedor: string;
	contado: string;
	presup: string;
	ctlCheq: string;
	depInven: string;
	formatoRbo: number;
	separaCajaAlt: string;
	limitVenta: string;
	cuadre: string;
	costo: string;
	ctl: string;
	invent: string;
	cartera: string;
	tipoCod: number;
	copia: string;
	puc: string;
	directorio: string;
	archmae: string;
	archter: string;
	barras: string;
	pos: string;
	asumeIva: string;
	asumeVlr: string;
	iva: number;
	iva2: number;
	iva3: number;
	autoret: string;
	resolDian: string;
	clave: string;
	claveNit: string;
	claveInv: string;
	claveMen: string;
	claveCon: string;
	claveCar: string;
	claveOtr: string;
	claveMenInv: string;
	clave2: string;
	barrasFact: string;
	activ: string;
	claveCorrec: string;
	retFact: string;
	porcCree: number;
	nomEgreso: string;
	formatoEgr: string;
	fLiqBaseFact: number;
	despacho: string;
	niif: string;
	costoArt: string;
	multRubro: string;
	dirDian: string;
	factInfCosto: string;
	deprecDifNiif: string;
	alertaTransp: string;
	perIniNiif: number;
	salMin: number;
	mensMenu: string;
	ley1429: string;
	menuSuc: string;
	supDeventa: string;
	loteFarm: string;
	tipCaj: number;
	notaEntrega: string;
	placa: string;
	cuotas: string;
	restricEx: string;
	maxMora: number;
	contabPos: string;
	reteiva: string;
	pedido: string;
	autocree: string;
	dirInv: string;
	tipoEmpr: string;
	email: string;
	servEmail: string;
	claveEmail: string;
	sslEmail: string;
	itemMax: number;
	impFact: string;
	impCot: string;
	impOrd: string;
	listaPrecio: string;
	emailFact: string;
	servEmailFact: string;
	claveEmailFact: string;
	sslEmailFact: string;
	emailNom: string;
	servEmailNom: string;
	claveEmailNom: string;
	sslEmailNom: string;
	costoDeud: string;
	rutaEstampilla: string;
	autorteica: string;
	retCree: string;
	convIycAnual: string;
	convIycBimes: string;
	directorioAnt: string;
	actaRemi: string;
	claveIyc: string;
	precioSuc: string;
	ipLocal: string;
	ipPublica: string;
	usuarioSql: string;
	claveSql: string;
	ley1943: string;
	controlFormu: string;
	ampDeta: string;
	ctaTdebito: string;
	ctaTcredito: string;
	ctaCheque: string;
	facPedi: string;
	facCoti: string;
	facRemi: string;
	facAlis: string;
	terceVentana: string;
	alertaCumple: string;
	tiqueteRegalo: string;
	contabDcto: number;
	demandaInduc: string;
	interfazCorres: string;
	prefijoUrg: string;
	prefijoConsExt: string;
	prefijoTransi: string;
};

const usuar_schema = new Schema<usuar>({
    ubicacion: {
      type: String,
      default: " "
    },
    direct: {
      type: String,
      default: " "
    },
    subdirect: {
      type: String,
      default: " "
    },
    nombre: {
      type: String,
      default: " "
    },
    nit: {
      type: Number,
      default: 0,
    },
    dv: {
      type: Number,
      default: 0,
    },
    direcc: {
      type: String,
      default: " "
    },
    codCiu: {
      dpt: {
        type: Number,
        default:0,
      },
      ciu: {
        type: Number,
        default:0,
      },
    },
    tel: {
      type: String,
      default: " "
    },
    nuir: {
      type: String,
      default: " "
    },
    prefijo: {
      type: String,
      default: " "
    },
    listaPol: {
      type: String,
      default: " "
    },
    ivaS: {
      type: String,
      default: " "
    },
    nombreAlterno: {
      type: String,
      default: " "
    },
    nitAlt: {
      type: Number,
      default:0,
    },
    dvAlt: {
      type: Number,
      default:0,
    },
    direccAlt: {
      type: String,
      default: " "
    },
    codCiuAlt: {
      type: Number,
      default:0,
    },
    // tel: {
    //   type: String,
    //   default: " "
    // },
    prefijoAlt: {
      type: String,
      default: " "
    },
    listaPolAlt: {
      type: String,
      default: " "
    },
    ivaSAlt: {
      type: String,
      default: " "
    },
    limiCosto: {
      type: String,
      default: " "
    },
    extenFac: {
      type: String,
      default: " "
    },
    ctaEfect: {
      type: String,
      default: " "
    },
    retail: {
      type: String,
      default: " "
    },
    aprox: {
      type: String,
      default: " "
    },
    repetido: {
      type: String,
      default: " "
    },
    descto: {
      type: String,
      default: " "
    },
    retenedor: {
      type: String,
      default: " "
    },
    contado: {
      type: String,
      default: " "
    },
    presup: {
      type: String,
      default: " "
    },
    ctlCheq: {
      type: String,
      default: " "
    },
    depInven: {
      type: String,
      default: " "
    },
    formatoRbo: {
      type: Number,
      default: 0,
    },
    separaCajaAlt: {
      type: String,
      default: " "
    },
    limitVenta: {
      type: String,
      default: " "
    },
    cuadre: {
      type: String,
      default: " "
    },
    costo: {
      type: String,
      default: " "
    },
    ctl: {
      type: String,
      default: " "
    },
    invent: {
      type: String,
      default: " "
    },
    cartera: {
      type: String,
      default: " "
    },
    tipoCod: {
      type: Number,
      default: 0
    },
    copia: {
      type: String,
      default: " "
    },
    puc: {
      type: String,
      default: " "
    },
    directorio: {
      type: String,
      default: " "
    },
    archmae: {
      type: String,
      default: " "
    },
    archter: {
      type: String,
      default: " "
    },
    barras: {
      type: String,
      default: " "
    },
    pos: {
      type: String,
      default: " "
    },
    asumeIva: {
      type: String,
      default: " "
    },
    asumeVlr: {
      type: String,
      default: " "
    },
    iva: {
      type: Number,
      default:0,
    },
    iva2: {
      type: Number,
      default:0,
    },
    iva3: {
      type: Number,
      default:0,
    },
    autoret: {
      type: String,
      default: " "
    },
    resolDian: {
      type: String,
      default: " "
    },
    clave: {
      type: String,
      default: " "
    },
    claveNit: {
      type: String,
      default: " "
    },
    claveInv: {
      type: String,
      default: " "
    },
    claveMen: {
      type: String,
      default: " "
    },
    claveCon: {
      type: String,
      default: " "
    },
    claveCar: {
      type: String,
      default: " "
    },
    claveOtr: {
      type: String,
      default: " "
    },
    claveMenInv: {
      type: String,
      default: " "
    },
    clave2: {
      type: String,
      default: " "
    },
    barrasFact: {
      type: String,
      default: " "
    },
    activ: {
      type: String,
      default: " "
    },
    claveCorrec: {
      type: String,
      default: " "
    },
    retFact: {
      type: String,
      default: " "
    },
    porcCree: {
      type: Number,
      default:0,
    },
    nomEgreso: {
      type: String,
      default: " "
    },
    formatoEgr: {
      type: String,
      default: " "
    },
    fLiqBaseFact: {
      type: Number,
      default:0,
    },
    despacho: {
      type: String,
      default: " "
    },
    niif: {
      type: String,
      default: " "
    },
    costoArt: {
      type: String,
      default: " "
    },
    multRubro: {
      type: String,
      default: " "
    },
    dirDian: {
      type: String,
      default: " "
    },
    factInfCosto: {
      type: String,
      default: " "
    },
    deprecDifNiif: {
      type: String,
      default: " "
    },
    alertaTransp: {
      type: String,
      default: " "
    },
    perIniNiif: {
      type: Number,
      default:0,
    },
    salMin: {
      type: Number,
      default:0,
    },
    mensMenu: {
      type: String,
      default: " "
    },
    ley1429: {
      type: String,
      default: " "
    },
    menuSuc: {
      type: String,
      default: " "
    },
    supDeventa: {
      type: String,
      default: " "
    },
    loteFarm: {
      type: String,
      default: " "
    },
    tipCaj: {
      type: Number,
      default: 0
    },
    notaEntrega: {
      type: String,
      default: " "
    },
    placa: {
      type: String,
      default: " "
    },
    cuotas: {
      type: String,
      default: " "
    },
    restricEx: {
      type: String,
      default: " "
    },
    maxMora: {
      type: Number,
      default:0,
    },
    contabPos: {
      type: String,
      default: " "
    },
    reteiva: {
      type: String,
      default: " "
    },
    pedido: {
      type: String,
      default: " "
    },
    autocree: {
      type: String,
      default: " "
    },
    dirInv: {
      type: String,
      default: " "
    },
    tipoEmpr: {
      type: String,
      default: " "
    },
    email: {
      type: String,
      default: " "
    },
    servEmail: {
      type: String,
      default: " "
    },
    claveEmail: {
      type: String,
      default: " "
    },
    sslEmail: {
      type: String,
      default: " "
    },
    itemMax: {
      type: Number,
      default:0,
    },
    impFact: {
      type: String,
      default: " "
    },
    impCot: {
      type: String,
      default: " "
    },
    impOrd: {
      type: String,
      default: " "
    },
    listaPrecio: {
      type: String,
      default: " "
    },
    emailFact: {
      type: String,
      default: " "
    },
    servEmailFact: {
      type: String,
      default: " "
    },
    claveEmailFact: {
      type: String,
      default: " "
    },
    sslEmailFact: {
      type: String,
      default: " "
    },
    emailNom: {
      type: String,
      default: " "
    },
    servEmailNom: {
      type: String,
      default: " "
    },
    claveEmailNom: {
      type: String,
      default: " "
    },
    sslEmailNom: {
      type: String,
      default: " "
    },
    costoDeud: {
      type: String,
      default: " "
    },
    rutaEstampilla: {
      type: String,
      default: " "
    },
    autorteica: {
      type: String,
      default: " "
    },
    retCree: {
      type: String,
      default: " "
    },
    convIycAnual: {
      type: String,
      default: " "
    },
    convIycBimes: {
      type: String,
      default: " "
    },
    directorioAnt: {
      type: String,
      default: " "
    },
    actaRemi: {
      type: String,
      default: " "
    },
    claveIyc: {
      type: String,
      default: " "
    },
    precioSuc: {
      type: String,
      default: " "
    },
    ipLocal: {
      type: String,
      default: " "
    },
    ipPublica: {
      type: String,
      default: " "
    },
    usuarioSql: {
      type: String,
      default: " "
    },
    claveSql: {
      type: String,
      default: " "
    },
    ley1943: {
      type: String,
      default: " "
    },
    controlFormu: {
      type: String,
      default: " "
    },
    ampDeta: {
      type: String,
      default: " "
    },
    ctaTdebito: {
      type: String,
      default: " "
    },
    ctaTcredito: {
      type: String,
      default: " "
    },
    ctaCheque: {
      type: String,
      default: " "
    },
    facPedi: {
      type: String,
      default: " "
    },
    facCoti: {
      type: String,
      default: " "
    },
    facRemi: {
      type: String,
      default: " "
    },
    facAlis: {
      type: String,
      default: " "
    },
    terceVentana: {
      type: String,
      default: " "
    },
    alertaCumple: {
      type: String,
      default: " "
    },
    tiqueteRegalo: {
      type: String,
      default: " "
    },
    contabDcto: {
      type: Number,
      default: 0
    },
    demandaInduc: {
      type: String,
      default: " "
    },
    interfazCorres: {
      type: String,
      default: " "
    },
    prefijoUrg: {
      type: String,
      default: " "
    },
    prefijoConsExt: {
      type: String,
      default: " "
    },
    prefijoTransi: {
      type: String,
      default: " "
    },
  })

usuar_schema.index({ codigo: 1 }, { unique: true });

export const usuar_model = model<usuar>("usuar", usuar_schema);