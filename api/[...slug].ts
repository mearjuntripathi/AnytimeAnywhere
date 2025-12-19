import type { VercelRequest, VercelResponse } from '@vercel/node';
import express from 'express';
import { apiRoutes } from '../server/routes.js';

// Create Express app
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Add CORS headers for production
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Mount API routes
app.use('/api', apiRoutes);

// Export the handler for Vercel
export default (req: VercelRequest, res: VercelResponse) => {
  return app(req, res);
};