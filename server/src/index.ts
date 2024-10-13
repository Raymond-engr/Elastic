import app from './app';
import connectDB from './db/database';
import connectElasticDB from './db/connectElasticDb';
import elasticClient from './services/elasticSearch';
import dotenv from 'dotenv';
dotenv.config();

const PORT: number = parseInt(process.env.PORT || '3000', 10);

const connectToDatabases = async (): Promise<void> => {
  try {
    await connectDB();
    await connectElasticDB();
  } catch (error) {
    console.error('Failed to connect to databases:', error);
    process.exit(1);
  }
};

connectToDatabases().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
  });
});