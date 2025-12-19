# Download & Deploy Instructions

## Ready-to-Deploy Package

Your AAAI coaching website is completely ready for Vercel deployment. Here's how to get it live:

### Download Options
1. **ZIP File**: `aaai-coaching-website.zip` (complete project)
2. **All Files**: Available in this Replit workspace

### Quick Deploy Steps

#### 1. Download & Upload to GitHub
- Download the ZIP file or clone this repository
- Create a new GitHub repository
- Upload all files to your GitHub repo

#### 2. Deploy to Vercel
- Go to [vercel.com](https://vercel.com)
- Click "New Project" → Import from GitHub
- Select your repository
- Add environment variables:
  ```
  DATABASE_URL=your_postgresql_connection_string
  NODE_ENV=production
  VITE_API_URL=https://your-app-name.vercel.app
  ```

#### 3. Database Setup
- Create free PostgreSQL at [neon.tech](https://neon.tech)
- Copy connection string to DATABASE_URL
- After deployment, run: `npm run db:push`

### What You Get
- Professional AI coaching website
- 7 complete courses with pricing (₹25K-₹55K)
- Registration system with validation
- WhatsApp integration (+91 883 951 9103)
- Mobile-responsive design
- Production-ready configuration

### Support Files Included
- `vercel.json` - Deployment configuration
- `api/[...slug].ts` - Serverless API handler
- `.env.example` - Environment template
- Multiple deployment guides

Your website will be live within 5 minutes of following these steps!