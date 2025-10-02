# Machinery Vision - Heavy Equipment Marketplace

A modern Next.js application for buying, selling, and renting heavy machinery and equipment across the Middle East.

## 🚀 Features

- **Equipment Marketplace**: Browse and search heavy machinery and equipment
- **Advanced Search**: Filter by category, location, price, and specifications
- **Verified Dealers**: Connect with trusted equipment dealers
- **Responsive Design**: Optimized for desktop and mobile devices
- **Modern UI**: Built with Tailwind CSS and Radix UI components
- **Type Safety**: Full TypeScript support with strict configuration

## 🛠️ Tech Stack

- **Framework**: Next.js 15.5.4 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **State Management**: React Query (TanStack Query)
- **Forms**: React Hook Form with Zod validation
- **Icons**: Lucide React
- **Development**: ESLint, TypeScript strict mode

## 📁 Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── equipment/         # Equipment detail pages
│   ├── search/           # Search results page
│   ├── layout.tsx        # Root layout
│   ├── page.tsx          # Home page
│   └── providers.tsx     # App providers
├── src/
│   ├── components/       # Reusable UI components
│   │   └── ui/          # Base UI components (shadcn/ui)
│   ├── features/        # Feature-based components
│   │   ├── categories/  # Equipment categories
│   │   ├── equipment/   # Equipment-related components
│   │   ├── layout/      # Layout components
│   │   └── search/      # Search functionality
│   ├── config/          # Configuration files
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Utility functions
│   ├── services/        # API services
│   └── types/           # TypeScript type definitions
└── public/              # Static assets
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, or bun

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd machinery-vision
```

2. Install dependencies:

```bash
npm install
# or
yarn install
# or
bun install
```

3. Start the development server:

```bash
npm run dev
# or
yarn dev
# or
bun dev
```

## 🔐 Supabase + Vercel Integration

This project uses Supabase for data. Categories are fetched server-side and exposed via a secure API route, following best practices to avoid leaking secrets.

### Environment Variables

- Create `.env.local` (not committed) and set:

```
SUPABASE_URL="https://YOUR_PROJECT_ID.supabase.co"
SUPABASE_ANON_KEY="YOUR_ANON_KEY"
```

- In Vercel → Project Settings → Environment Variables, add the same keys for Development, Preview, and Production.
- Do not expose `SUPABASE_SERVICE_ROLE_KEY` to the browser. If you need admin operations, only use it server-side (e.g., in background jobs or server actions).

### Security Best Practices

- Enable Row Level Security (RLS) on your `categories` table and allow read access for anonymous users if the data is public:

```sql
-- In Supabase SQL editor
alter table public.categories enable row level security;
create policy "Public read for categories" on public.categories
  for select using (true);
```

- Never commit real keys; use `.env.local` for dev and Vercel env vars for deployment.
- Avoid creating Supabase clients in client-side (browser) code for sensitive data. This project queries categories on the server via `app/api/categories/route.ts`.
- Cache safe responses: the categories API is configured with `revalidate = 300` (5 minutes) to reduce load. Client-side fetch uses `cache: 'force-cache'`.

### Project Files

- `src/shared/lib/supabaseServer.ts`: Server-only Supabase client using `SUPABASE_URL` and `SUPABASE_ANON_KEY`.
- `src/shared/services/categories.ts`: Server service that fetches `id, name, icon` and maps icons to `/assets/categories/<icon>`.
- `app/api/categories/route.ts`: API route returning `{ categories }` as JSON.
- `src/features/categories/components/Categories.tsx`: Client component that fetches `/api/categories` and renders names/icons, falling back to static content when unavailable.

### Icon Naming

- Store the PNG file name (e.g., `excavators.png`) in `categories.icon`.
- Place matching images under `public/assets/categories/`.

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📜 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues automatically
- `npm run type-check` - Run TypeScript type checking
- `npm run clean` - Clean build artifacts
- `npm run preview` - Build and preview production build

## 🎯 Pre-commit Hooks

This project uses **Husky** and **lint-staged** to ensure code quality before commits:

### What Runs on Pre-commit

1. **Lint-staged**: Runs ESLint and Prettier on staged files
2. **TypeScript Check**: Validates TypeScript types across the entire project

### Configuration

- **Husky**: Manages Git hooks in `.husky/pre-commit`
- **lint-staged**: Configured in `package.json` to run:
  - `eslint --fix` on JavaScript/TypeScript files
  - `prettier --write` on supported files (JS, TS, JSON, CSS, MD)

### Benefits

- ✅ Catches linting errors before commit
- ✅ Automatically formats code
- ✅ Ensures type safety
- ✅ Prevents broken code from entering the repository

### Manual Testing

You can test the hooks manually:

```bash
# Test linting
npm run lint

# Test type checking
npm run type-check

# Test both (like pre-commit)
npm run lint && npm run type-check
```

## 🔧 Development Guidelines

### Code Quality

- **TypeScript**: Strict mode enabled for better type safety
- **ESLint**: Comprehensive rules for code consistency
- **Component Structure**: Feature-based organization
- **Naming Conventions**: PascalCase for components, camelCase for functions

### Best Practices

1. **Components**: Keep components small and focused
2. **Types**: Define proper TypeScript interfaces
3. **Hooks**: Use custom hooks for reusable logic
4. **Styling**: Use Tailwind CSS utility classes
5. **Performance**: Implement proper loading states and error handling

## 🎨 UI Components

This project uses a combination of:

- **Radix UI**: Accessible, unstyled components
- **Tailwind CSS**: Utility-first CSS framework
- **Custom Components**: Built on top of Radix UI primitives

## 📱 Responsive Design

The application is fully responsive and optimized for:

- Desktop (1024px+)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

## 🔍 Search & Filtering

- **Text Search**: Search by equipment name, brand, or model
- **Location Filter**: Filter by emirate or city
- **Category Filter**: Browse by equipment type
- **Price Range**: Filter by price range
- **Advanced Filters**: Year, condition, dealer verification

## 🚀 Deployment

The application can be deployed on:

- **Vercel** (recommended for Next.js)
- **Netlify**
- **AWS Amplify**
- **Docker containers**

### Build for Production

```bash
npm run build
npm run start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.
