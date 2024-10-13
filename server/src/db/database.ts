import mongoose from 'mongoose';

const connectDB = async (retries = 5, delay = 5000): Promise<void> => {
  while (retries) {
    try {
      const conn = await mongoose.connect(process.env.MONGODB_URI as string);
      console.log(`MongoDB Connected: ${conn.connection.host}`);
      return;
    } catch (error: any) {
      console.error(`MongoDB connection failed. Retries left: ${retries - 1}. Error: ${error.message}`);
      retries -= 1;
      if (retries === 0) {
        console.error('All retries exhausted. Exiting...');
        process.exit(1);
      }
      console.log(`Retrying in ${delay / 1000} seconds...`);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
};

export default connectDB;