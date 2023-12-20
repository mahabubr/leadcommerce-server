import { Model } from 'mongoose';

export type ICategoryStatus = 'active' | 'inactive';

export type ICategory = {
    name: string;
    status: ICategoryStatus;
};

export type ICategoryFilters = {
    searchTerm: string;
};

export type CategoryModel = Model<ICategory, Record<string, unknown>>;
