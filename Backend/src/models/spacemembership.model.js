import mongoose, { Schema } from 'mongoose';

const spaceMembershipSchema = new Schema(
  {
    space: {
      type: Schema.Types.ObjectId,
      ref: 'Space',
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

export const SpaceMembership = mongoose.model(
  'SpaceMembership',
  spaceMembershipSchema
);
