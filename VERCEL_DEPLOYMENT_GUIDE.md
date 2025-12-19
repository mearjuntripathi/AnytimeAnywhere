# Vercel Deployment Guide for AAAI Coaching Website

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **GitHub Repository**: Your code needs to be in a GitHub repository
3. **Database Setup**: Set up a production database (recommended: Neon, PlanetScale, or Supabase)

## Step-by-Step Deployment

### 1. Prepare Your Repository

First, ensure your code is pushed to a GitHub repository:

```bash
git init
git add .
git commit -m "Initial commit - AAAI Coaching Website"
git branch -M main
git remote add origin https://github.com/yourusername/aaai-coaching-website.git
git push -u origin main
```

### 2. Database Setup

Since this application uses PostgreSQL, you'll need a production database. Here are recommended options:

#### Option A: Neon (Recommended)
1. Go to [neon.tech](https://neon.tech)
2. Create a free account
3. Create a new project
4. Copy the connection string

#### Option B: Supabase
1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Go to Settings > Database
4. Copy the connection string

#### Option C: PlanetScale
1. Go to [planetscale.com](https://planetscale.com)
2. Create a new database
3. Create a connection string

### 3. Deploy to Vercel

1. **Connect Repository**:
   - Go to [vercel.com/dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import your GitHub repository

2. **Configure Build Settings**:
   - Framework Preset: **Vite**
   - Root Directory: **/** (leave as default)
   - Build Command: **npm run build**
   - Output Directory: **dist**
   - Install Command: **npm install**

3. **Environment Variables**:
   Add these environment variables in Vercel dashboard:
   
   ```
   NODE_ENV=production
   DATABASE_URL=your_database_connection_string_here
   VITE_API_URL=https://your-app-name.vercel.app
   ```

4. **Deploy**:
   - Click "Deploy"
   - Wait for the build to complete

### 4. Database Migration

After deployment, you need to set up your database schema:

1. **Local Setup**:
   ```bash
   npm install -g drizzle-kit
   ```

2. **Update Database URL**:
   - Create a `.env` file locally with your production database URL
   ```
   DATABASE_URL=your_production_database_url
   ```

3. **Push Schema**:
   ```bash
   npm run db:push
   ```

### 5. Custom Domain (Optional)

To use your own domain:

1. Go to your Vercel project dashboard
2. Click "Settings" > "Domains"
3. Add your custom domain
4. Update your DNS records as instructed

## Important Notes

### File Structure for Vercel
- The `vercel.json` file configures the deployment
- The `api/[...slug].ts` file handles all API routes for Vercel's serverless functions
- Static files are served from the `dist` directory after build

### Environment Variables Required
Make sure to set these in Vercel dashboard:
- `DATABASE_URL`: Your PostgreSQL connection string
- `NODE_ENV`: Set to "production"
- `VITE_API_URL`: Your Vercel app URL (https://your-app.vercel.app)

### Database Considerations
- Use a managed PostgreSQL service (Neon, Supabase, PlanetScale)
- Ensure your database allows external connections
- Set up proper connection pooling if needed

### Performance Optimization
- The app uses Vite for fast builds
- Static assets are automatically optimized by Vercel
- API routes run as serverless functions

## Troubleshooting

### Build Errors
1. Check that all dependencies are in `package.json`
2. Ensure TypeScript compilation succeeds locally
3. Verify environment variables are set correctly

### Database Connection Issues
1. Verify the DATABASE_URL format
2. Check database firewall settings
3. Ensure SSL is enabled if required

### API Route Issues
1. Check the Vercel function logs
2. Verify the API endpoints work locally
3. Check CORS settings

## Support

If you encounter issues:
1. Check Vercel deployment logs
2. Test the application locally first
3. Verify all environment variables are set
4. Check database connectivity

## Post-Deployment Checklist

- [ ] Website loads correctly
- [ ] All course data displays properly
- [ ] Registration form works
- [ ] WhatsApp chat widget functions
- [ ] Database connections are stable
- [ ] SSL certificate is active
- [ ] Custom domain configured (if applicable)

Your AAAI Coaching Website is now live on Vercel! 🚀