import mongoose from 'mongoose';
import { DB_NAME, DB_URL } from '../constants.js';

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(`${DB_URL}/${DB_NAME}`);
    console.log(`💾 MongoDB connected`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
