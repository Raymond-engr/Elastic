import elasticClient from './services/elasticSearch';

const connectElasticDB = async (retries = 5, delay = 5000): Promise<void> => {
  while (retries) {
    try {
      await elasticClient.ping();
      console.log('Elasticsearch Connected!');
      return;
    } catch (error) {
      console.error(`Elasticsearch connection failed. Retries left: ${retries - 1}. Error: ${error.message}`);
      retries -= 1;
      if (retries === 0) {
        console.error('All retries for Elasticsearch exhausted. Exiting...');
        process.exit(1);
      }
      console.log(`Retrying Elasticsearch in ${delay / 1000} seconds...`);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
};

export default connectElasticDB;