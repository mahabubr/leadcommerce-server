import { Model, Schema } from 'mongoose';

export type IFaq = {
  title: string;
  description: string;
  ans: string;
  user_id: Schema.Types.ObjectId;
};

export type FaqModel = Model<IFaq, Record<string, unknown>>;

export type IFaqFilters = {
  searchTerm: string;
  user_id: string;
};

export const faqSearchableFields = ['title', 'description', 'ans'];
export const faqFilterableFields = ['searchTerm', 'user_id'];
