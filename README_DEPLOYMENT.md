# AAAI Coaching Website - Deployment Instructions

## Quick Deployment to Vercel

### Option 1: One-Click Deploy (Recommended)

1. **Fork/Clone Repository**: Get the code into your GitHub account

2. **Database Setup**: 
   - Create a free PostgreSQL database at [Neon.tech](https://neon.tech)
   - Copy the connection string

3. **Deploy to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Set environment variables:
     ```
     DATABASE_URL=your_neon_database_url
     NODE_ENV=production
     VITE_API_URL=https://your-app.vercel.app
     ```
   - Click Deploy!

### Option 2: Manual Setup

Follow the detailed guide in `VERCEL_DEPLOYMENT_GUIDE.md`

## What's Included

✅ **Complete AI Coaching Website**
- 7 comprehensive AI/ML courses (Foundation to Quantum AI)
- Expert instructor profiles with IIT credentials
- Course pricing (₹25K-₹55K range)
- Registration form with validation
- WhatsApp integration (+91 883 951 9103)
- Responsive design with animations

✅ **Production Ready**
- Optimized build configuration
- Database schema included
- API routes configured for Vercel
- Environment variable setup
- Error handling and validation

✅ **Professional Features**
- SSL/HTTPS ready
- SEO optimized
- Mobile responsive
- Fast loading with Vite
- Type-safe with TypeScript

## Post-Deployment Steps

1. **Set up Database Schema**:
   ```bash
   npm run db:push
   ```

2. **Test Registration Form**: Verify the WhatsApp integration works

3. **Add Custom Domain** (optional): Configure in Vercel dashboard

## Support

The website is fully functional and ready for production use. All course content, instructor profiles, and pricing are professionally designed for your AI coaching business.

**Live Features**:
- Course browsing and selection
- Student registration with course preferences
- WhatsApp support integration
- Mobile-optimized experience
- Professional instructor showcases

Your AI coaching platform is ready to accept students! 🎓