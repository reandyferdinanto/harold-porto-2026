# 🚀 Deployment Guide

This guide covers deploying Harold's Portfolio to various platforms.

## Vercel (Recommended)

Vercel is the company behind Next.js and provides seamless deployment.

### Quick Deploy
1. Push your code to GitHub/GitLab/Bitbucket
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Select your repository
5. Click "Deploy"

### Environment Variables on Vercel
1. Go to Project Settings > Environment Variables
2. Add your variables (same as `.env.local`)
3. Redeploy

### Custom Domain
1. Go to Settings > Domains
2. Add your custom domain
3. Follow DNS configuration steps

---

## Netlify

### Connect with Git
1. Go to [netlify.com](https://netlify.com)
2. Click "New site from Git"
3. Select your repository
4. Configure:
   - Build command: `npm run build`
   - Publish directory: `.next`
5. Click "Deploy site"

### Environment Variables
1. Site settings > Build & deploy > Environment
2. Add variables
3. Redeploy

---

## Docker Deployment

### Dockerfile
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
```

### docker-compose.yml
```yaml
version: '3.8'
services:
  portfolio:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Build and Run
```bash
docker build -t harold-portfolio .
docker run -p 3000:3000 harold-portfolio
```

---

## Self-Hosted (Linux/Ubuntu)

### Prerequisites
- Node.js 18+
- npm or yarn
- Nginx or Apache (reverse proxy)

### Installation Steps

1. **Clone repository**
```bash
git clone <your-repo-url>
cd harold-portfolio-nextjs
```

2. **Install and build**
```bash
npm install
npm run build
```

3. **Create PM2 ecosystem file** (`ecosystem.config.js`)
```javascript
module.exports = {
  apps: [{
    name: "harold-portfolio",
    script: "./node_modules/.bin/next",
    args: "start",
    instances: "max",
    exec_mode: "cluster",
    env: {
      NODE_ENV: "production",
      NEXT_PUBLIC_SITE_URL: "https://yourdomain.com"
    }
  }]
};
```

4. **Install PM2 globally**
```bash
sudo npm install -g pm2
```

5. **Start with PM2**
```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

6. **Configure Nginx reverse proxy** (`/etc/nginx/sites-available/default`)
```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

7. **Setup SSL with Let's Encrypt**
```bash
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

---

## GitHub Pages (Static Export)

### Note
GitHub Pages requires static generation. To use this method:

1. **Update next.config.ts**
```typescript
const nextConfig = {
  output: 'export',
};
export default nextConfig;
```

2. **Build**
```bash
npm run build
```

3. **Deploy**
```bash
git add out/
git commit -m "Deploy to GitHub Pages"
git push
```

### Configure in GitHub
1. Go to Settings > Pages
2. Select `gh-pages` branch as source
3. Save

---

## AWS Amplify

### Steps
1. Go to [AWS Amplify Console](https://console.aws.amazon.com/amplify)
2. Select "Get Started"
3. Connect your Git repository
4. Configure build settings:
   - Build command: `npm run build`
   - Start command: `npm start`
5. Add environment variables if needed
6. Deploy

---

## Performance Tips

### Before Deployment
- [ ] Run `npm run build` locally to ensure no errors
- [ ] Test with `npm start`
- [ ] Check for console warnings/errors
- [ ] Optimize images in `/public/img`
- [ ] Review and update environment variables

### Post-Deployment
- [ ] Set up monitoring/logging
- [ ] Configure backups
- [ ] Set up SSL/HTTPS
- [ ] Enable caching headers
- [ ] Monitor performance with Lighthouse

### Lighthouse Optimization
```bash
npm install -g lighthouse
lighthouse https://yourdomain.com --view
```

---

## Environment Variables for Production

```env
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
NEXT_PUBLIC_SITE_NAME=Harold's Portfolio
NODE_ENV=production
```

---

## Troubleshooting

### Build fails
```bash
rm -rf .next node_modules
npm install
npm run build
```

### Port already in use
```bash
# Find process on port 3000
lsof -i :3000
# Kill process
kill -9 <PID>
```

### Environment variables not working
- Ensure variables are prefixed with `NEXT_PUBLIC_` to be available client-side
- Restart dev/build process after changing `.env.local`
- Check environment variables in deployment platform

---

## Monitoring & Maintenance

### Uptime Monitoring
- [UptimeRobot](https://uptimerobot.com)
- [Pingdom](https://www.solarwindsmsp.com/products/pingdom)

### Performance Monitoring
- [New Relic](https://newrelic.com)
- [Datadog](https://www.datadoghq.com)

### Log Aggregation
- [Loggly](https://www.loggly.com)
- [Papertrail](https://www.papertrail.com)

---

## Support

For issues or questions:
- Check [Next.js Docs](https://nextjs.org/docs)
- Open an issue on GitHub
- Contact: haroldsdesigns@gmail.com


