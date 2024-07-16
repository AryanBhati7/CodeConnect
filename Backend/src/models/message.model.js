import mongoose, { Schema } from 'mongoose';

const messageSchema = new Schema(
  {
    text: {
      type: String,
    },
    image: {
      type: {
        url: String,
        fileId: String,
      },
    },
    video: {
      type: {
        url: String,
        fileId: String,
      },
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {}
);

export const Message = mongoose.model('Message', messageSchema);
