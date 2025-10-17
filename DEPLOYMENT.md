# Frontend Deployment Guide

## Vercel Deployment

### Prerequisites

- Vercel account (<https://vercel.com>)
- Vercel CLI installed: `npm i -g vercel`
- Backend API deployed and accessible

### Deployment Steps

#### 1. Install Vercel CLI

```bash
npm install -g vercel
```

#### 2. Login to Vercel

```bash
vercel login
```

#### 3. Link Project (First Time)

```bash
cd frontend
vercel link
```

Follow prompts:

- Set up and deploy: Y
- Which scope: Select your account/team
- Link to existing project: N (first time)
- Project name: top-programs-guide-frontend
- Directory: ./

#### 4. Set Environment Variables

```bash
# Set production API URL
vercel env add NEXT_PUBLIC_API_URL production

# Enter value: https://your-backend-url.railway.app

# Set environment type
vercel env add NEXT_PUBLIC_APP_ENV production
# Enter value: production
```

Or set via Vercel Dashboard:

1. Go to Project Settings → Environment Variables
2. Add:
   - `NEXT_PUBLIC_API_URL`: Your Railway backend URL
   - `NEXT_PUBLIC_APP_ENV`: `production`

#### 5. Deploy to Production

```bash
# Preview deployment
vercel

# Production deployment
vercel --prod
```

### Configuration Files

#### vercel.json

- Security headers (X-Content-Type-Options, X-Frame-Options, etc.)
- API proxying configuration
- Redirects and rewrites
- Function memory and duration settings

#### Environment Variables

- `NEXT_PUBLIC_API_URL`: Backend API URL (<https://api.yourdomain.com>)
- `NEXT_PUBLIC_APP_ENV`: Environment identifier (production/staging/development)

### Custom Domain Setup

#### 1. Add Domain in Vercel Dashboard

1. Go to Project Settings → Domains
2. Add your domain (e.g., `www.top-programs-guide.com`)
3. Configure DNS records as instructed

#### 2. DNS Configuration

Add the following records to your DNS provider:

**For www subdomain:**

```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

**For root domain:**

```
Type: A
Name: @
Value: 76.76.21.21
```

**Or use ALIAS/ANAME:**

```
Type: ALIAS
Name: @
Value: cname.vercel-dns.com
```

#### 3. SSL Certificate

- Vercel automatically provisions SSL certificates
- Wait 24-48 hours for propagation
- Certificate auto-renews

### Post-Deployment Checklist

- [ ] Verify environment variables are set correctly
- [ ] Test API connectivity (check browser console for errors)
- [ ] Verify routing works correctly
- [ ] Test all pages load properly
- [ ] Check SEO meta tags (View Page Source)
- [ ] Test mobile responsiveness
- [ ] Verify HTTPS is working
- [ ] Check performance with Lighthouse
- [ ] Test error pages (404, 500)
- [ ] Monitor Vercel Analytics

### Monitoring & Logs

#### View Deployment Logs

```bash
vercel logs [deployment-url]
```

#### Analytics

- Enable Vercel Analytics in Project Settings
- View real-time usage, performance metrics
- Track Core Web Vitals

#### Error Tracking

Consider integrating:

- Sentry (error tracking)
- LogRocket (session replay)
- Google Analytics (usage tracking)

### Rollback

If deployment has issues:

```bash
# List deployments
vercel ls

# Promote previous deployment to production
vercel promote [deployment-url]
```

Or use Vercel Dashboard:

1. Go to Deployments
2. Find stable deployment
3. Click "Promote to Production"

### Continuous Deployment

#### GitHub Integration

1. Connect repository in Vercel Dashboard
2. Enable automatic deployments:
   - Production: `main` branch
   - Preview: Pull requests
3. Configure branch protection rules

#### Deployment Triggers

- Push to `main` → Production deployment
- Pull request → Preview deployment
- Manual trigger → `vercel --prod`

### Environment-Specific Builds

For staging environment:

```bash
# Deploy to preview/staging
vercel --env NEXT_PUBLIC_APP_ENV=staging

# Set staging API URL
vercel env add NEXT_PUBLIC_API_URL preview
# Enter: https://staging-api.yourdomain.com
```

### Troubleshooting

#### Build Fails

- Check build logs in Vercel Dashboard
- Verify all dependencies in package.json
- Test build locally: `npm run build`

#### API Calls Fail

- Verify `NEXT_PUBLIC_API_URL` is set correctly
- Check CORS settings on backend
- Ensure backend is accessible (not localhost)

#### Slow Performance

- Enable Vercel Edge Network
- Optimize images (use Next.js Image component)
- Enable compression in next.config.js
- Monitor Web Vitals

#### 404 Errors

- Verify rewrites in vercel.json
- Check Next.js routing configuration
- Clear Vercel cache: `vercel --force`

### Performance Optimization

- Enable incremental static regeneration (ISR)
- Use Next.js Image optimization
- Implement code splitting
- Enable Edge Functions for API routes
- Configure caching headers
- Optimize bundle size

### Support Resources

- Vercel Documentation: <https://vercel.com/docs>
- Next.js Deployment: <https://nextjs.org/docs/deployment>
- Vercel Support: <support@vercel.com>
- Community: <https://github.com/vercel/vercel/discussions>
