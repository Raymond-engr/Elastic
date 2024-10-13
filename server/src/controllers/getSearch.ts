import { Request, Response } from 'express';
import asyncHandler from '../utils/asyncHandler';
import elasticClient from '../services/elasticSearch';
import { generateResponse } from '../services/geminiService';
import { ISearch } from '../models/searchModel';
import { saveToMongoAndElastic } from '../helpers/saveToMongoAndElastic';

export const getSearch = asyncHandler(async (req: Request, res: Response) => {
  const { q } = req.query;
  if (!q || typeof q !== 'string') {
    return res.status(400).json({ success: false, error: 'Invalid query' });
  }

  // Search in Elasticsearch
  const elasticResult = await elasticClient.search({
    index: 'search_index',
    body: {
      query: {
        multi_match: {
          query: q,
          fields: ['title', 'content'],
          fuzziness: 'AUTO',
          operator: 'and'
        }
      }
    }
  });

  let results = elasticResult.hits.hits.map(hit => ({
    title: hit._source.title,
    content: hit._source.content,
    score: hit._score
  }));

  if (results.length === 0 || results[0].score < 0.5) {
    // Generate response using Gemini AI
    const aiResponse = await generateResponse(q);
    
    // Save to Elasticsearch & MongoDb for future queries
    const dataToSave: ISearch = {
    title: q,
    content: aiResponse,
    score: 1,
    suggest: {
      input: q.split(' '),
      weight: 10
    },
    createdAt: new Date()
  };
    
    await saveToMongoAndElastic(dataToSave);
    
    results = [{ title: q, content: aiResponse, score: 1 }];
  }

  res.status(200).json({ success: true, data: results });
});