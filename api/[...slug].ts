import type { VercelRequest, VercelResponse } from '@vercel/node';
import express, { Express } from 'express';
import { apiRoutes } from '../server/routes';

// Create Express app
const app: Express = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS headers
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Mount API routes at root since we're already under /api
app.use('/', apiRoutes);

// Export handler for Vercel
export default async (req: VercelRequest, res: VercelResponse) => {
  // Let Express handle the request
  return new Promise((resolve, reject) => {
    app(req as any, res as any, (err?: any) => {
      if (err) {
        reject(err);
      } else {
        resolve(undefined);
      }
    });
  });
};