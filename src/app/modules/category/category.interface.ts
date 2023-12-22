import { Model, ObjectId } from 'mongoose';

export type ICategoryStatus = 'active' | 'inactive';

export type ICategory = {
    _id?: string | ObjectId;
    id: string | ObjectId;
    name: string;
    desc?: string;
    status: ICategoryStatus;
};

export type ICategoryFilters = {
    searchTerm: string;
};

export type CategoryModel = Model<ICategory, Record<string, unknown>>;
