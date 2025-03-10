import mongoose, {Schema} from "mongoose";
import { CategoryDocument } from "src/infrastructure/types/category";
import { ProductModel } from "./product.model";

const categorySchema: Schema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
});

categorySchema.post("findOneAndDelete", async function (document) {
    if (document) {
        await ProductModel.updateMany(
            { categories: document._id },
            { $pull: { categories: document._id } },
        );
    }
});

export const CategoryModel = mongoose.model<CategoryDocument>('Category', categorySchema);