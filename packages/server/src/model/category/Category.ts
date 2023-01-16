import mongoose, { Document, Schema, Model } from 'mongoose';

export type CategoryDocument = Document & {
  id: String;
  name: string;
};

export const categorySchema = new Schema(
  {
    name: {
      type: Schema.Types.String,
      required: true,
    },
  },
  {
    collection: 'categories',
    timestamps: true,
  }
);

export const Category: Model<CategoryDocument> =
  mongoose.model<CategoryDocument>('Category', categorySchema);
