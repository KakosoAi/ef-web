# Machinery Vision - Project Structure

This document provides a comprehensive overview of the project structure and explains the purpose of each folder and file.

## 📁 Root Directory

### Configuration Files

- **`.env.example`** - Template for environment variables (database URLs, API keys, etc.)
- **`.eslintrc.json`** - ESLint configuration for code linting and formatting rules
- **`.gitignore`** - Specifies files and directories to ignore in version control
- **`components.json`** - Configuration for shadcn/ui component library
- **`next.config.js`** - Next.js configuration file for build settings and optimizations
- **`package.json`** - Project dependencies, scripts, and metadata
- **`package-lock.json`** - Locked dependency versions for consistent installs
- **`postcss.config.js`** - PostCSS configuration for CSS processing
- **`tailwind.config.ts`** - Tailwind CSS configuration and theme customization
- **`tsconfig.json`** - TypeScript compiler configuration

### Documentation

- **`README.md`** - Project overview, setup instructions, and usage guide

## 📁 app/ (Next.js App Router)

Next.js 13+ App Router directory structure for routing and layouts.

### Core Files

- **`globals.css`** - Global CSS styles and Tailwind imports
- **`layout.tsx`** - Root layout component wrapping all pages
- **`page.tsx`** - Homepage component (landing page)
- **`providers.tsx`** - React context providers (theme, query client, etc.)
- **`not-found.tsx`** - Custom 404 error page

### Routes

- **`products/[type]/[slug]/[id]/page.tsx`** - Dynamic route for individual equipment details
- **`search/page.tsx`** - Equipment search and filtering page

## 📁 public/

Static assets served directly by the web server.

### Assets Organization

- **`assets/cars/`** - Car-related images (if applicable)
- **`assets/categories/`** - Equipment category icons
  - `crane-icon.jpg`, `excavator-icon.jpg`, `loader-icon.jpg`, `truck-icon.jpg`
- **`assets/equipment/`** - Individual equipment photos
  - Various Caterpillar, Liebherr, and other machinery images
- **`assets/hero/`** - Hero section images
- **`hero-equipment.jpg`** - Main hero banner image

### Standard Files

- **`favicon.ico`** - Website favicon
- **`placeholder.svg`** - Placeholder image for missing content
- **`robots.txt`** - Search engine crawling instructions

## 📁 src/

Main source code directory organized by feature and purpose.

### 📁 src/components/ui/

Reusable UI components from shadcn/ui library. These are low-level, unstyled components that can be composed into larger features.

**Key Components:**

- **`button.tsx`** - Button component with variants
- **`card.tsx`** - Card container component
- **`input.tsx`** - Form input component
- **`dialog.tsx`** - Modal dialog component
- **`carousel.tsx`** - Image carousel component
- **`badge.tsx`** - Status/category badge component
- **`separator.tsx`** - Visual divider component
- **`skeleton.tsx`** - Loading placeholder component
- **`toast.tsx`** & **`toaster.tsx`** - Notification system
- And many more UI primitives...

### 📁 src/config/

Application configuration and constants.

- **`index.ts`** - Main configuration exports
- **`site.ts`** - Site metadata, navigation, and global settings

### 📁 src/features/

Feature-based component organization. Each feature contains components related to a specific domain.

#### 📁 src/features/categories/

- **`Categories.tsx`** - Equipment categories grid/list component

#### 📁 src/features/equipment/

- **`EquipmentDetail.tsx`** - Individual equipment detail view
- **`FeaturedEquipment.tsx`** - Featured equipment showcase component

#### 📁 src/features/layout/

- **`Footer.tsx`** - Site footer with links and company info
- **`Header.tsx`** - Site header with navigation and branding

#### 📁 src/features/search/

- **`Hero.tsx`** - Homepage hero section with search functionality

### 📁 src/hooks/

Custom React hooks for reusable logic.

- **`use-mobile.tsx`** - Hook for detecting mobile devices
- **`use-toast.ts`** - Hook for managing toast notifications

### 📁 src/lib/

Utility libraries and helper functions.

- **`utils.ts`** - Common utility functions (className merging, formatting, etc.)

### 📁 src/services/

API services and data fetching logic.

- **`equipment.ts`** - Equipment-related API calls and data operations
- **`index.ts`** - Service exports and configuration

### 📁 src/types/

TypeScript type definitions organized by domain.

- **`categories.ts`** - Equipment category type definitions
- **`equipment.ts`** - Equipment model and related types
- **`search.ts`** - Search-related type definitions
- **`index.ts`** - Main type exports

## 🏗️ Architecture Overview

### Design Patterns

1. **Feature-Based Organization** - Components grouped by business domain
2. **Separation of Concerns** - Clear separation between UI, business logic, and data
3. **Component Composition** - Building complex UIs from simple, reusable components
4. **Type Safety** - Comprehensive TypeScript coverage

### Technology Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui (Radix UI primitives)
- **State Management**: React Query for server state
- **Form Handling**: React Hook Form with Zod validation
- **Icons**: Lucide React

### Key Features

- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **Server-Side Rendering** - Next.js App Router for optimal performance
- **Type Safety** - Full TypeScript coverage with strict configuration
- **Modern UI** - shadcn/ui components for consistent, accessible design
- **Equipment Catalog** - Browse, search, and view detailed equipment information
- **Category Filtering** - Organize equipment by type and category
- **Image Galleries** - Showcase equipment with multiple photos

This structure promotes maintainability, scalability, and developer experience while following modern React and Next.js best practices.
