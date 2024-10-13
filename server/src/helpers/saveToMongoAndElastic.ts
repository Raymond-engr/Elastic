import elasticClient from '../services/elasticSearch';
import Search, { ISearch } from '../models/searchModel';

export const saveToMongoAndElastic = async (data: ISearch) => {
  try {
    // Save to MongoDB
    const mongoResult = await SearchResult.create(data);
    console.log('Saved to MongoDB:', mongoResult);

    // Save to Elasticsearch
    const elasticResult = await elasticClient.index({
      index: 'search_index',
      body: data
    });
    console.log('Saved to Elasticsearch:', elasticResult);

    return { mongoResult, elasticResult };
  } catch (error) {
    console.error('Error saving to MongoDB or Elasticsearch:', error);
    throw new Error('Failed to save data to both MongoDB and Elasticsearch');
  }
};