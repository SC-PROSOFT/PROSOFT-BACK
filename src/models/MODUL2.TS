import { Schema, model } from "mongoose";

interface modul2 {
  cod: string;
  descripcion: string;
  estado: false;
  nominas: [];
}


const modul2 = new Schema<modul2>({
  cod: {
    type:String,
    required:true
  },
  descripcion: {
    type:String,
    required:true
  },
  estado: {
    type:Boolean,
    required:true
  },
  nominas: {
    type:[],
    required:true
  }
},{versionKey:false})