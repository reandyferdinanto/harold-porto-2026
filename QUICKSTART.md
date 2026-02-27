# 🚀 Quick Start Guide

Welcome to Harold's Portfolio Next.js version! Follow these steps to get started.

## Prerequisites

Ensure you have installed:
- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **npm** (v9 or higher) - comes with Node.js
- **Git** - [Download](https://git-scm.com/)

Check your versions:
```bash
node --version
npm --version
git --version
```

## Installation (5 minutes)

### 1. Navigate to Project Directory
```bash
cd C:\reandy\ekot\harold-portfolio-nextjs
```

### 2. Install Dependencies
```bash
npm install
```

This will install:
- Next.js framework
- React and React DOM
- Tailwind CSS
- TypeScript
- ESLint
- All other dependencies

**Time**: ~2-3 minutes depending on internet speed

### 3. Start Development Server
```bash
npm run dev
```

You should see:
```
  ▲ Next.js 16.1.6
  - Local:        http://localhost:3000
  - Environments: .env.local

 ✓ Ready in 2.3s
```

### 4. Open in Browser
Open [http://localhost:3000](http://localhost:3000) and you should see the portfolio!

## Project Structure (Understanding the Layout)

```
harold-portfolio-nextjs/
├── app/                    # Next.js App Router directory
│   ├── layout.tsx         # Main layout wrapper
│   ├── page.tsx           # Home page component
│   └── globals.css        # Global styles
│
├── components/            # Reusable React components
│   ├── Navbar.tsx         # Navigation header
│   ├── Hero.tsx           # Hero/banner section
│   ├── About.tsx          # About section
│   ├── Experience.tsx     # Experience & education
│   ├── Skills.tsx         # Skills display
│   ├── Portfolio.tsx      # Portfolio grid
│   ├── PortfolioModal.tsx # Modal for portfolio items
│   ├── Contact.tsx        # Contact form
│   └── Footer.tsx         # Footer
│
├── public/                # Static files (images, fonts, etc.)
│   ├── img/               # Portfolio images
│   └── ... other assets
│
├── package.json           # Dependencies and scripts
├── tsconfig.json          # TypeScript configuration
├── tailwind.config.ts     # Tailwind CSS configuration
└── next.config.ts         # Next.js configuration
```

## Common Commands

```bash
# Start development server (with hot reload)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint

# Type check with TypeScript
npx tsc --noEmit
```

## Editing Content

### Edit Hero Section
**File**: `components/Hero.tsx`

```typescript
<h2 className="text-5xl font-bold">Your Name Here</h2>
```

### Edit About Section
**File**: `components/About.tsx`

Update the text directly in the JSX.

### Edit Experience & Education
**File**: `components/Experience.tsx`

Modify the `experienceData` and `educationData` arrays:

```typescript
const experienceData = [
  {
    year: '2022',
    items: ['Your experience here']
  },
  // ... more items
];
```

### Add Portfolio Items
**File**: `components/Portfolio.tsx`

Add to the `portfolioItems` array:

```typescript
{
  id: '15',
  category: '3D-Art',
  title: 'Your Project Title',
  image: '/img/your-image.jpg',
  description: 'Project description...'
}
```

### Update Contact Information
**File**: `components/Contact.tsx` and `components/Footer.tsx`

Edit phone numbers, emails, and social links directly in the component.

## Styling with Tailwind CSS

All styling is done with Tailwind CSS utility classes. No need to write CSS files!

### Common Tailwind Classes

```
Spacing: m-4 (margin), p-4 (padding), gap-8 (gap)
Sizing: w-full (width), h-64 (height)
Display: flex, grid, hidden, block
Colors: bg-blue-600, text-gray-700
Responsive: md:grid-cols-2, lg:text-4xl
```

**Resources**:
- [Tailwind CSS Docs](https://tailwindcss.com)
- [Tailwind CSS Cheatsheet](https://nerdcave.com/tailwind-cheat-sheet)

## Adding Images

1. Add image to `/public/img/`
2. Use in component:

```typescript
import Image from 'next/image';

<Image
  src="/img/my-image.jpg"
  alt="Description"
  width={400}
  height={300}
/>
```

## TypeScript Tips

The project uses TypeScript for type safety. You'll see interfaces like:

```typescript
interface PortfolioItem {
  id: string;
  title: string;
  // ... other properties
}
```

Hover over variables in your editor to see their types!

## Troubleshooting

### Port 3000 Already in Use
```bash
# Windows PowerShell: Find and kill the process
Get-Process -Name "node" | Stop-Process -Force

# Or use a different port
npm run dev -- -p 3001
```

### Build Errors
```bash
# Clear cache and reinstall
rm -r node_modules .next
npm install
npm run build
```

### Images Not Loading
- Check file path is correct: `/img/filename.jpg`
- Ensure image file exists in `/public/img/`
- Check file extension (jpg, png, webp, etc.)

### Styles Not Applying
- Make sure you're using Tailwind classes (e.g., `bg-blue-600`)
- Don't use Bootstrap classes
- Run `npm run dev` to rebuild Tailwind

## Next Steps

1. **Customize Content**: Update text, images, and information
2. **Add Your Colors**: Edit `tailwind.config.ts` for brand colors
3. **Set up Email**: Connect contact form to email service
4. **Deploy**: Follow [DEPLOYMENT.md](./DEPLOYMENT.md) guide
5. **Add Features**: Blog, animations, dark mode, etc.

## File Editing Tips

- Use VS Code ([Download](https://code.visualstudio.com/))
- Install "ES7+ React/Redux/React-Native snippets" extension
- Install "Tailwind CSS IntelliSense" extension
- Use Prettier for code formatting

## Performance Tips

- Optimize images before adding (use TinyPNG, ImageOptim)
- Keep component files focused and small
- Use React.memo for static components
- Profile performance with DevTools

## Getting Help

- **Documentation**: [Next.js Docs](https://nextjs.org/docs)
- **Community**: [Next.js Discussions](https://github.com/vercel/next.js/discussions)
- **Tailwind**: [Tailwind Docs](https://tailwindcss.com/docs)
- **Contact**: haroldsdesigns@gmail.com

## What's Different from Original?

| Aspect | Original | New |
|--------|----------|-----|
| Framework | Static HTML | React + Next.js |
| Styling | Bootstrap | Tailwind CSS |
| Build | Gulp | Turbopack |
| Performance | ~450KB | ~150KB |
| Development | Manual refresh | Hot reload |
| Deployment | Simple hosting | Vercel/Node.js |

## Quick Customization Checklist

- [ ] Update hero section text
- [ ] Add your images to `/public/img/`
- [ ] Update about section
- [ ] Add your projects to portfolio
- [ ] Update contact information
- [ ] Change color scheme (optional)
- [ ] Add favicon
- [ ] Test on mobile
- [ ] Build for production: `npm run build`
- [ ] Deploy to Vercel or hosting

---

**Ready to go!** Start by running `npm run dev` and visit http://localhost:3000

Happy building! 🎉

