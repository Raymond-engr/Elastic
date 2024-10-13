import { Client } from '@elastic/elasticsearch';

const elasticClient = new Client({
  node: process.env.ELASTICSEARCH_NODE || 'http://localhost:9200',
  auth: {
    username: process.env.ELASTICSEARCH_USERNAME as string,
    password: process.env.ELASTICSEARCH_PASSWORD as string,
  },
});

async function initializeElasticsearchIndex() {
  try {
    const indexExists = await elasticClient.indices.exists({ index: 'search_index' });
    
    if (!indexExists) {
      await elasticClient.indices.create({
        index: 'search_index',
        body: {
          mappings: {
            properties: {
              title: { type: 'text' },
              content: { type: 'text' },
              suggest: {
                type: 'completion',
                analyzer: 'simple',
                preserve_separators: true,
                preserve_position_increments: true,
                max_input_length: 50
              }
            }
          }
        }
      });
      console.log('Elasticsearch index "search_index" created successfully');
    } else {
      console.log('Elasticsearch index "search_index" already exists');
    }
  } catch (error) {
    console.error('Error initializing Elasticsearch index:', error);
  }
}

initializeElasticsearchIndex();

export default elasticClient;