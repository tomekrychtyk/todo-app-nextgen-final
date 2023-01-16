import mongoose, { Document, Schema, Model } from 'mongoose';

export type ProjectDocument = Document & {
  id: string;
  name: string;
};

export const projectSchema = new Schema(
  {
    name: {
      type: Schema.Types.String,
      required: true,
    },
  },
  {
    collection: 'projects',
    timestamps: true,
  }
);

export const Project: Model<ProjectDocument> = mongoose.model<ProjectDocument>(
  'Project',
  projectSchema
);
