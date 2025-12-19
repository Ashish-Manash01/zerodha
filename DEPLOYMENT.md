# Zerodha Clone - Deployment Guide

This guide covers deploying the Zerodha Clone application to various platforms.

## Pre-Deployment Checklist

- [ ] Run `npm run build` locally and verify no errors
- [ ] Test the application thoroughly: `npm run preview`
- [ ] Update environment variables
- [ ] Review security settings
- [ ] Check bundle size: `npm run build` and review output
- [ ] Verify all API endpoints are correct
- [ ] Test on different browsers and devices
- [ ] Set up monitoring and logging

## Environment Variables

Create a `.env.production` file:

```env
VITE_API_BASE_URL=https://your-api.com
VITE_APP_NAME=Zerodha Clone
VITE_LOG_LEVEL=error
```

## 1. Deploy to Vercel (Recommended)

### Method A: Using Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

Follow the prompts and Vercel will automatically:
- Detect Vite configuration
- Build the project
- Deploy to production

### Method B: GitHub Integration

1. Push code to GitHub repository
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Select "Vite" framework (auto-detected)
6. Add environment variables
7. Click "Deploy"

**Vercel automatically redeploys on every push to main branch**

### Vercel Configuration (vercel.json)

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "env": {
    "VITE_API_BASE_URL": "@api_base_url"
  }
}
```

## 2. Deploy to Netlify

### Method A: Using Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy
netlify deploy --prod --dir=dist
```

### Method B: Drag & Drop

1. Build locally: `npm run build`
2. Go to [netlify.com](https://netlify.com)
3. Drag and drop the `dist` folder
4. Your site is live!

### Method C: GitHub Integration

1. Push code to GitHub
2. Go to [netlify.com](https://netlify.com)
3. Click "New site from Git"
4. Select GitHub and your repository
5. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Add environment variables
7. Click "Deploy site"

### Netlify Configuration (netlify.toml)

```toml
[build]
command = "npm run build"
publish = "dist"

[build.environment]
NODE_VERSION = "18"

[[redirects]]
from = "/*"
to = "/index.html"
status = 200

[[headers]]
for = "/*"
[headers.values]
X-Frame-Options = "SAMEORIGIN"
X-Content-Type-Options = "nosniff"
X-XSS-Protection = "1; mode=block"
```

## 3. Deploy to AWS

### Using AWS Amplify

1. Go to AWS Amplify Console
2. Connect your GitHub repository
3. Configure build settings:
   - Build command: `npm run build`
   - Output directory: `dist`
4. Deploy

### Using AWS S3 + CloudFront

```bash
# Build
npm run build

# Create S3 bucket
aws s3 mb s3://zerodha-clone-bucket

# Upload files
aws s3 sync dist/ s3://zerodha-clone-bucket/

# Create CloudFront distribution
# (Configure in AWS Console)
```

## 4. Deploy with Docker

### Create Dockerfile

```dockerfile
# Build stage
FROM node:18-alpine as builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Production stage
FROM node:18-alpine

WORKDIR /app

RUN npm install -g serve

COPY --from=builder /app/dist ./dist

EXPOSE 3000

CMD ["serve", "-s", "dist", "-l", "3000"]
```

### Build and Run

```bash
# Build image
docker build -t zerodha-clone:latest .

# Run container
docker run -p 3000:3000 zerodha-clone:latest

# Test
curl http://localhost:3000
```

### Docker Compose

```yaml
version: '3.8'

services:
  zerodha-clone:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - VITE_API_BASE_URL=${API_BASE_URL}
```

Run with: `docker-compose up`

## 5. Deploy to Traditional Hosting (Shared Hosting / VPS)

### Build Locally

```bash
npm run build
```

### Upload to Server

```bash
# Using SCP
scp -r dist/* user@your-server.com:/var/www/your-app/

# Or using SFTP
sftp user@your-server.com
put -r dist/* /var/www/your-app/
```

### Configure Web Server (Nginx)

```nginx
server {
    listen 80;
    server_name your-domain.com;

    # Redirect HTTP to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name your-domain.com;

    ssl_certificate /etc/ssl/certs/your-cert.crt;
    ssl_certificate_key /etc/ssl/private/your-key.key;

    root /var/www/your-app;
    index index.html;

    # SPA routing
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Gzip compression
    gzip on;
    gzip_types text/plain text/css text/javascript application/javascript application/json;
}
```

### Configure Apache

```apache
<VirtualHost *:80>
    ServerName your-domain.com
    DocumentRoot /var/www/your-app

    <Directory /var/www/your-app>
        RewriteEngine On
        RewriteBase /
        RewriteRule ^index\.html$ - [L]
        RewriteCond %{REQUEST_FILENAME} !-f
        RewriteCond %{REQUEST_FILENAME} !-d
        RewriteRule . /index.html [L]
    </Directory>
</VirtualHost>
```

## 6. Deploy to Heroku

### Using Heroku CLI

```bash
# Login to Heroku
heroku login

# Create app
heroku create your-app-name

# Configure buildpacks
heroku buildpacks:add heroku/nodejs

# Deploy
git push heroku main

# Open app
heroku open
```

### Procfile

```
web: npm run preview
```

## 7. Setup Custom Domain

### For Vercel/Netlify

1. Go to domain settings in your dashboard
2. Add custom domain
3. Update DNS records:
   - Point to `alias.vercel.com` (Vercel)
   - Or follow Netlify DNS configuration

### For Traditional Hosting

1. Update DNS A record to your server IP
2. Configure SSL certificate (Let's Encrypt recommended)
3. Wait for DNS propagation (24-48 hours)

## Performance Optimization

### Enable Caching

```javascript
// In your web server config
Cache-Control: public, max-age=31536000, immutable  // for versioned assets
Cache-Control: public, max-age=3600  // for index.html
```

### Enable Gzip Compression

Most hosting platforms enable this automatically.

### Use CDN

- **Vercel**: Built-in edge network
- **Netlify**: Built-in edge network
- **Cloudflare**: Add your domain for global CDN

### Monitor Bundle Size

```bash
npm run build -- --analyze
```

## Security Headers

Add these headers to your server configuration:

```
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Strict-Transport-Security: max-age=31536000; includeSubDomains
Content-Security-Policy: default-src 'self'
```

## Monitoring & Logging

### Setup Error Tracking

```bash
npm install sentry
```

Configure in your app:
```typescript
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "your-sentry-dsn",
  environment: process.env.NODE_ENV,
});
```

### Enable Analytics

Use services like:
- Google Analytics
- Mixpanel
- Amplitude

## Backup & Disaster Recovery

- Keep code backed up to GitHub
- Backup database regularly
- Test recovery procedures
- Document deployment process

## Troubleshooting

### White Screen After Deploy

- Check browser console for errors
- Verify build completed successfully
- Check if static assets loaded correctly
- Clear browser cache

### CSS/JS Not Loading

- Verify `dist` folder uploaded completely
- Check web server static file configuration
- Verify CDN caching settings

### Environment Variables Not Working

- Rebuild and redeploy after updating env vars
- Verify variable names in code
- Check platform's env var configuration

## Post-Deployment

1. **Verify Deployment**
   - Test all major features
   - Check on different devices/browsers
   - Monitor error logs

2. **Setup Monitoring**
   - Enable error tracking
   - Setup uptime monitoring
   - Configure alerts

3. **Performance Testing**
   - Run Lighthouse audit
   - Check Core Web Vitals
   - Monitor load times

4. **Security Check**
   - Run security scanner
   - Verify SSL certificate
   - Check security headers

## Continuous Deployment (CI/CD)

### GitHub Actions Example

```yaml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v3

    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'

    - name: Install dependencies
      run: npm ci

    - name: Build
      run: npm run build

    - name: Deploy to Vercel
      uses: amondnet/vercel-action@v20
      with:
        vercel-token: ${{ secrets.VERCEL_TOKEN }}
        vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
        vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
```

## Support & Resources

- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [React Deployment](https://create-react-app.dev/deployment/)
- [MDN: Deploying Web Apps](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/Deployment)

---

**Choose the deployment platform based on your needs:**
- **Vercel**: Best for Vite/Next.js projects
- **Netlify**: Great for static sites with serverless functions
- **AWS**: For enterprise-scale applications
- **Docker**: For containerized deployments
- **Traditional Hosting**: For maximum control and cost-effectiveness
