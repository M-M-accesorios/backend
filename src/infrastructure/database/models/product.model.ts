import mongoose, {Schema} from "mongoose";
import { ProductDocument } from "src/infrastructure/types/products";

const ProductSchema: Schema = new Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    ref: {
        type: String,
        required: true,
        unique:true,
    },
    image: {
        type: String,
        required: true,
    },
    categories:[
        {
            type: Schema.Types.ObjectId,
            required: true,
        },
    ],
});

export const ProductModel = mongoose.model<ProductDocument>('Product', ProductSchema);
