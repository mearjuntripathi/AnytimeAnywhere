# AAAI Coaching Website - Hostinger Deployment Guide

## 📦 Download Your Website

Your website is packaged as **`aaai-coaching-website.zip`** - download this file from your Replit project.

## 🚀 Step-by-Step Hostinger Deployment

### Step 1: Access Hostinger Control Panel
1. Log into your Hostinger account at [hostinger.com](https://hostinger.com)
2. Navigate to **Hosting** → **Manage** for your domain
3. Click **File Manager** (or use **hPanel** → **File Manager**)

### Step 2: Prepare Your Domain Directory
1. In File Manager, navigate to **`public_html`** folder
   - This is your website's root directory
   - If you're using a subdomain, navigate to its specific folder
2. **Delete all existing files** in public_html (backup if needed):
   - Remove default index.html
   - Remove any placeholder files
   - Clear the directory completely

### Step 3: Upload Your Website
1. Click **Upload Files** or **Upload** button in File Manager
2. Select your downloaded **`aaai-coaching-website.zip`** file
3. Upload and **Extract** the zip file
4. Move all extracted files directly to public_html root:
   ```
   public_html/
   ├── index.html
   ├── assets/
   │   ├── index-[hash].css
   │   ├── index-[hash].js
   │   └── [other assets]
   └── .htaccess
   ```

### Step 4: Verify File Permissions
1. Right-click on folders → **Permissions** → Set to **755**
2. Right-click on files → **Permissions** → Set to **644**
3. Ensure .htaccess file is visible (enable "Show Hidden Files" if needed)

### Step 5: Test Your Website
1. Visit your domain: `https://yourdomain.com`
2. Check all features work:
   - Homepage loads with course cards
   - Navigation between sections
   - Chat widget appears (bottom right)
   - Mobile responsiveness
   - Course pricing displays correctly

## 🔧 Important Configuration Files

### .htaccess File (Already Included)
This file handles URL routing and is critical for your React website:
```apache
RewriteEngine On
RewriteBase /
RewriteRule ^index\.html$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]
```

### SSL Certificate
1. In Hostinger panel, go to **SSL** section
2. Enable **Free SSL Certificate** for your domain
3. Wait for activation (usually 10-15 minutes)

## 📱 Your Website Features

✅ **Professional Coaching Design**
- Hero section with AAAI branding
- 7 Complete AI Courses (Foundation to Quantum AI)
- Course pricing: ₹25,000 to ₹50,000 with detailed modules
- Expandable course modules
- Responsive mobile design

✅ **Interactive Elements**
- Live chat widget (red "Live" badge)
- Call button (green "New" badge)
- Smooth scrolling navigation
- Hover effects on cards

✅ **Content Sections**
- What We Provide (certificates, internships, placement)
- Meet Our Team (IIT experts)
- 7 AI Topics: Foundation, ML, DL, GenAI, LLMs, Multimodal, Quantum
- 70 Comprehensive Projects (10 per topic)
- Course benefits and detailed pricing
- Special support for international students

✅ **Team Profiles Included**
- Dr. Rishiraj Adhikary (Reliance Jio Research Scientist)
- Ashin Shanty (Google SW3)
- Chirag Modi (Turing Data Scientist)
- Rakesh Thakur (IISc Researcher)

## 🛠️ Troubleshooting

### Common Issues:

**1. "Page Not Found" (404) Errors:**
- Verify .htaccess file is uploaded and in public_html root
- Check file permissions (644 for .htaccess)
- Ensure index.html is in public_html root

**2. Styling Not Loading:**
- Confirm assets/ folder uploaded completely
- Check assets folder permissions (755)
- Verify all CSS/JS files have 644 permissions

**3. Chat Widget Not Responding:**
- This is normal - it's a visual prototype
- To connect real chat: Replace with Tawk.to, Intercom, or similar service

**4. Mobile View Issues:**
- Clear browser cache
- Test on actual mobile devices
- Ensure viewport meta tag in HTML

### File Structure Checklist:
```
public_html/
├── index.html ✓
├── .htaccess ✓
└── assets/ ✓
    ├── index-[hash].css ✓
    ├── index-[hash].js ✓
    └── [other files] ✓
```

## 🎯 Post-Deployment Customization

### 1. Update Contact Information
The chat widget currently shows demo content. To customize:
- Replace phone numbers in chat component
- Connect to real live chat service
- Update contact forms with your email

### 2. Connect Payment Processing
- Integrate Razorpay for Indian payments
- Add course enrollment forms
- Set up automated email confirmations

### 3. Analytics & SEO
- Add Google Analytics code
- Configure Google Search Console
- Optimize meta descriptions and titles

### 4. Domain & Email Setup
- Configure professional email addresses
- Set up domain forwarding if needed
- Enable email forwarding for inquiries

## 📞 Support Resources

**Hostinger Support:**
- 24/7 Live Chat available
- Knowledge base: hostinger.com/tutorials
- Video guides for File Manager

**Website Support:**
- All code is standard HTML/CSS/JavaScript
- Mobile-responsive and SEO-friendly
- Fast loading with optimized assets

## ✅ Final Checklist

□ Downloaded aaai-coaching-website.zip
□ Logged into Hostinger File Manager  
□ Cleared public_html directory
□ Uploaded and extracted website files
□ Set correct file permissions
□ Verified .htaccess file present
□ Tested website on domain
□ Confirmed mobile responsiveness
□ Chat widget visible and styled correctly
□ All course information displays properly
□ SSL certificate activated
□ Ready to accept student inquiries!

---

**Your professional AAAI coaching website is now live and ready to attract students worldwide!**

For technical modifications or additional features, contact your development team.