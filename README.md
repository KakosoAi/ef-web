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
