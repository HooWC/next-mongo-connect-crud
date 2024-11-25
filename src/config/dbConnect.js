import mongoose from 'mongoose';

const MONGODB_URI = 'mongodb://localhost:27017/nextdb'; // 修改为你的 MongoDB URI ， 如果没有这个数据库，会自动创建

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

let isConnected = false;

export async function dbConnect() {
  if (isConnected) {
    console.log('Using existing database connection');
    return;
  }

  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error: ', error);
    process.exit(1); // Exit the process if connection fails
  }
}