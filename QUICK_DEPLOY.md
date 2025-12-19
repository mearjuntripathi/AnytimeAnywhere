# 🚀 Quick Deploy to Vercel - AAAI Coaching Website

## Ready to Deploy! ✅

Your AI coaching website is fully prepared for Vercel deployment with:

### ✅ What's Complete
- Professional coaching website with 7 AI/ML courses
- Registration form with course selection and pricing
- WhatsApp integration (+91 883 951 9103)
- Expert instructor profiles with real credentials
- Mobile-responsive design with animations
- Production-ready configuration files

### 🎯 Simple 3-Step Deployment

#### Step 1: Get a Database (2 minutes)
1. Go to [neon.tech](https://neon.tech) → Sign up free
2. Create new project → Copy connection string
3. Keep this handy for Step 3

#### Step 2: Deploy to Vercel (1 minute)
1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project
3. Import your GitHub repository

#### Step 3: Add Environment Variables (1 minute)
In Vercel dashboard, add these variables:
```
DATABASE_URL=your_neon_connection_string
NODE_ENV=production
VITE_API_URL=https://your-app-name.vercel.app
```

Click Deploy! Your site will be live in ~2 minutes.

### 🔧 After Deployment
Run this once to set up your database:
```bash
npm run db:push
```

### 📁 Files Included for Deployment
- `vercel.json` - Vercel configuration
- `api/[...slug].ts` - API handler for serverless functions
- `.env.example` - Environment variable template
- Build files in `dist/` directory

### 💡 Need Help?
- Detailed guide: `VERCEL_DEPLOYMENT_GUIDE.md`
- Issues? Check Vercel deployment logs
- Database problems? Verify connection string format

**Your professional AI coaching platform is ready to go live! 🎓**