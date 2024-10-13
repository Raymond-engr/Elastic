import express, { Application } from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import routes from './routes';
import errorHandler from './middleware/errorHandler';
import notFound from './middleware/notFound';
import { setupWebSocket } from './services/websocketService';

const app: Application = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Temporarily allow all origins
    methods: ['GET', 'POST'],
    // origin: process.env.FRONTEND_URL || 'http://localhost:3000'
  }
});

 {/* const helmetOptions = {
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", 'trusted.com'],
    },
  },
  dnsPrefetchControl: { allow: false },
  frameguard: { action: 'deny' },
  hsts: { maxAge: 31536000 },
  hidePoweredBy: { setTo: 'Django' },
  referrerPolicy: { policy: 'no-referrer' },
  noSniff: true,
};*/}

{/* const corsOptions = {
  origin: process.env.FRONTEND_URL,
  optionsSuccessStatus: 200
};*/}
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1', routes);

app.use(notFound);
app.use(errorHandler);

setupWebSocket(io);

export default app;