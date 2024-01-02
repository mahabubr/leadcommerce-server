import { Schema, Types, model } from 'mongoose';
import { FaqModel, IFaq } from './faq.interface';

const faqSchema = new Schema<IFaq>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    ans: { type: String },
    user_id: {
      type: Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

const Faq = model<IFaq, FaqModel>('Faq', faqSchema);

export default Faq;
