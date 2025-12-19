# Complete Deployment Package - Ready for Vercel

## What's Included ✅

Your AAAI coaching website is 100% ready with all files needed for deployment:

### Core Website
- Complete AI coaching platform with 7 courses
- Professional instructor profiles (IIT experts)
- Course pricing (₹25K-₹55K) and registration system
- WhatsApp integration (+91 883 951 9103)
- Mobile-responsive design with animations

### Deployment Files
- `vercel.json` - Vercel configuration
- `api/[...slug].ts` - Serverless API handler
- `.env.example` - Environment variables template
- Production build tested and working

## One-Click Deploy Options

### Option 1: Direct GitHub Import (Easiest)
1. Download this project as ZIP
2. Create new GitHub repository
3. Upload files to GitHub
4. Go to vercel.com → Import from GitHub
5. Add environment variables (DATABASE_URL, NODE_ENV, VITE_API_URL)
6. Deploy!

### Option 2: Git Command Line
```bash
# Initialize git repository
git init
git add .
git commit -m "AAAI Coaching Website - Ready for deployment"

# Add your GitHub repository
git remote add origin https://github.com/yourusername/aaai-coaching.git
git push -u origin main

# Then import to Vercel from GitHub
```

## Database Setup (Required)

### Free PostgreSQL Database
1. Go to [neon.tech](https://neon.tech)
2. Sign up free
3. Create new project
4. Copy connection string
5. Add to Vercel environment variables as DATABASE_URL

## Environment Variables for Vercel

Add these in Vercel dashboard:
```
DATABASE_URL=postgresql://username:password@host/database
NODE_ENV=production
VITE_API_URL=https://your-app-name.vercel.app
```

## After Deployment

Run once to set up database:
```bash
npm run db:push
```

## Your Website Will Have:
- Professional domain: `https://aaai-coaching-[random].vercel.app`
- SSL certificate automatically
- Global CDN for fast loading
- All features working perfectly

**Everything is ready - you just need to connect it to your accounts!**