import { Schema, model } from 'mongoose';
import { CategoryModel, ICategory } from './category.interface';

const CategorySchema = new Schema<ICategory, CategoryModel>(
    {
        name: {
            type: String,
            required: [true, 'category name filed is required'],
        },
        desc: {
            type: String,
        },
        status: {
            type: String,
            enum: ["active", "inactive"],
            default: "active"
        },
    },
    {
        timestamps: true,
        toJSON: {
            virtuals: true,
        },
    }
);

export const Category = model<ICategory, CategoryModel>(
    'Category',
    CategorySchema
);
