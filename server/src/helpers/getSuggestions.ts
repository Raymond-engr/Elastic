import elasticClient from '../services/elasticSearch';

export async function getSuggestions(partialInput: string) {
  const result = await elasticClient.search({
    index: 'search_index',
    body: {
      suggest: {
        term_suggestion: {
          prefix: partialInput,
          completion: {
            field: 'suggest',
            size: 5,
            fuzzy: {
              fuzziness: 'AUTO'
            }
          }
        }
      }
    }
  });

  return result.suggest.term_suggestion[0].options.map((option: any) => option.text);
};