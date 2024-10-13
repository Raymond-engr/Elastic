import { Server } from 'socket.io';
import elasticClient from './elasticSearch';
import { getSuggestions } from '../helpers/getSuggestions';

export function setupWebSocket(io: Server) {
  io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('search_suggestion', async (partialInput: string) => {
      try {
        const suggestions = await getSuggestions(partialInput);
        socket.emit('search_suggestions', suggestions);
      } catch (error) {
        console.error('Error getting suggestions:', error);
        socket.emit('search_suggestions', []);
      }
    });

    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });
}

