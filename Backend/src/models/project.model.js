import mongoose, { Schema } from 'mongoose';

const projectSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    projectPhoto: {
      _id: false,
      type: {
        url: String,
        fileId: String,
      },
      default: {},
      required: true,
    },
    technologies: {
      type: [String],
      default: [],
    },
    repoLink: {
      type: String,
      default: '',
    },
    hostedLink: {
      type: String,
      default: '',
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

export const Project = mongoose.model('Project', projectSchema);
