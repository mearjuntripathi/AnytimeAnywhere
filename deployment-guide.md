# AAAI Coaching Website - Deployment Guide for Hostinger

## 🚀 Quick Deployment Steps

### 1. Download Your Website Files
The `dist` folder contains your production-ready website. You need to upload these files to your Hostinger hosting.

### 2. Access Your Hostinger Control Panel
1. Log in to your Hostinger account
2. Go to the hosting section
3. Find your domain and click "Manage"
4. Open File Manager

### 3. Upload Website Files
1. Navigate to `public_html` folder (this is your website's root directory)
2. Delete any existing files in public_html (like default index.html)
3. Upload ALL files from the `dist` folder to `public_html`
4. Make sure the file structure looks like this:
   ```
   public_html/
   ├── index.html
   ├── assets/
   │   ├── index-[hash].js
   │   ├── index-[hash].css
   │   └── other asset files
   └── .htaccess (if included)
   ```

### 4. Configure Domain Settings
1. Ensure your domain points to the `public_html` directory
2. If you have a subdomain, point it to the same directory

### 5. Test Your Website
1. Visit your domain (e.g., yourdomain.com)
2. Check that all pages load correctly:
   - Home page with course cards
   - Navigation works
   - Chat widget appears
   - Mobile responsiveness

## 🔧 Important Configuration

### Apache Configuration (.htaccess)
Create a `.htaccess` file in your `public_html` directory with this content:

```apache
RewriteEngine On

# Handle client-side routing for React Router
RewriteBase /
RewriteRule ^index\.html$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]

# Enable compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/xml
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE application/xml
    AddOutputFilterByType DEFLATE application/xhtml+xml
    AddOutputFilterByType DEFLATE application/rss+xml
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/x-javascript
</IfModule>

# Browser caching
<IfModule mod_expires.c>
    ExpiresActive on
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/gif "access plus 1 year"
</IfModule>
```

## 📱 Features Included

Your AAAI Coaching website includes:

✅ **Modern Coaching Design**
- Hero section with clear value proposition
- Course cards with pricing (₹25,000, ₹35,000, ₹45,000)
- Professional team member showcase
- "What We Provide" benefits section

✅ **Interactive Elements**
- Live chat widget (bottom right)
- Call button for immediate contact
- Expandable course modules
- Responsive mobile design

✅ **Content Sections**
- Certificate from foreign university
- IIT internship opportunities
- Placement assistance
- Educational visits to IITs
- Industry exposure
- Expert faculty credentials
- Special support for Nepali/Bhutani students

✅ **Team Showcase**
- Dr. Rishiraj Adhikary (Reliance Jio)
- Ashin Shanty (Google SW3)
- Chirag Modi (Turing Data Scientist)
- Rakesh Thakur (IISc Researcher)

## 🛠️ Troubleshooting

### Common Issues:

**1. Page Not Found (404) errors:**
- Ensure .htaccess file is uploaded
- Check that all files are in public_html directory

**2. Styles not loading:**
- Verify all files in assets/ folder are uploaded
- Check file permissions (755 for folders, 644 for files)

**3. Chat widget not working:**
- This is normal - it's a visual prototype
- You can connect it to actual chat service later

### Support Contacts:
- Hostinger Support: Available 24/7 via live chat
- For website modifications: Contact your developer

## 🎯 Next Steps After Deployment

1. **Test thoroughly** on different devices
2. **Set up analytics** (Google Analytics)
3. **Configure contact forms** to receive inquiries
4. **Add real phone numbers** in chat widget
5. **Connect payment processing** for course purchases
6. **Set up email marketing** for lead capture

Your professional AI coaching website is now ready to attract students and showcase your comprehensive curriculum!