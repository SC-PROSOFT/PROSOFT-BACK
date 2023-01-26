import { Schema, model } from "mongoose";

interface image {
    codigo: Number;
    imagen: String;
}

const image_schema = new Schema<image>(
{
    codigo:{
        type: Number,
        required: true,
    },
    imagen:{
        type: String,
        required: true,
    }
}
);

export const image_model = model<image>("image", image_schema);