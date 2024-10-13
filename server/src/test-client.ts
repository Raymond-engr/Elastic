import { io } from 'socket.io-client';

// Connect to the socket.io server
const socket = io('http://localhost:3000'); // Adjust to your WebSocket server URL

// When the connection is established
socket.on('connect', () => {
  console.log('Connected to the WebSocket server');

  // Emit a 'search_suggestion' event with a test search term
  socket.emit('search_suggestion', 'play');
});

// Listen for the 'search_suggestions' event for responses from the server
socket.on('search_suggestions', (data) => {
  console.log('Received suggestions:', data);
});

// Handle errors
socket.on('connect_error', (error) => {
  console.error('Connection error:', error);
});

// Handle disconnection
socket.on('disconnect', () => {
  console.log('Disconnected from the server');
});