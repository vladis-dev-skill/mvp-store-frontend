# CLAUDE.md - Frontend Service

This file provides service-specific guidance to Claude Code when working with the MVP Store Frontend application.

## Project Overview

**MVP Store Frontend** is a modern Next.js 15 application built with React 19, TypeScript, and Tailwind CSS. It serves as the user-facing interface for the e-commerce platform, consuming APIs from the Backend and Payment services through the API Gateway.

**Role in Architecture**: User interface layer that provides responsive, modern UI/UX for the MVP Store platform.

**Related Services**:
- Backend API: `mvp-store-backend/` - Main business logic API
- Payment Service: `mvp-store-payment-service/` - Payment processing API
- Infrastructure: `mvp-store-infrastructure/` - API Gateway for unified access

For complete system architecture, see [Root CLAUDE.md](../CLAUDE.md).

## Tech Stack (Current Versions)

### Core Dependencies
- **Next.js**: 15.5.5 (App Router, Server Components, Server Actions)
- **React**: 19.0.0 (with new hooks and features)
- **React DOM**: 19.0.0
- **TypeScript**: 5.7.2
- **Tailwind CSS**: 3.4.17

### Development Tools
- **ESLint**: 9.18.0 (flat config system)
- **PostCSS**: 8.4.49
- **Autoprefixer**: 10.4.20

### Type Definitions
- `@types/node`: 22.10.5
- `@types/react`: 19.0.6
- `@types/react-dom`: 19.0.2

### React 19 Features
- **Server Components**: Default for all components in App Router
- **Server Actions**: Direct server-side functions without API routes
- **Async Components**: Native support for async Server Components
- **New Hooks**: `use()`, `useOptimistic()`, `useFormStatus()`
- **Enhanced useTransition**: Better handling of concurrent features

### Next.js 15 Features
- **Turbopack**: Fast bundler for development (stable)
- **Partial Prerendering**: Hybrid static/dynamic rendering
- **Enhanced Caching**: Granular cache control
- **Improved Image Component**: Better performance and features
- **Server Actions Enhancements**: First-class support with improved DX

### API Integration

**API Gateway Routes:**
- Frontend: `http://localhost:8090/`
- Backend API: `http://localhost:8090/api/`
- Payment API: `http://localhost:8090/api/payment/`

### Environment Variables

**Required environment variables:**
```bash
# .env.local
NEXT_PUBLIC_API_URL=http://localhost:8090/api
NEXT_PUBLIC_PAYMENT_API_URL=http://localhost:8090/api/payment
```

**Usage:**
- `NEXT_PUBLIC_*` variables are exposed to the browser
- Other variables are server-only
- Access via `process.env.VARIABLE_NAME`

## Docker Integration

### Commands
```bash
# Docker development
make init          # First time setup
make up           # Start containers
make down         # Stop containers

# Via API Gateway (production-like)
cd ../mvp-store-infrastructure
make up           # Start infrastructure
cd ../mvp-store-frontend
make up           # Connect to gateway
```

### State Management Patterns
- **Server State**: React Server Components + Server Actions
- **Client State**: React 19 hooks (`useState`, `useReducer`)
- **Form State**: `useFormStatus()` + `useOptimistic()`
- **Async State**: `use()` hook for suspense
- **URL State**: Next.js searchParams

### Testing Considerations
- Jest for unit tests
- React Testing Library for component tests
- Playwright/Cypress for E2E tests
- Mock API Gateway endpoints

## Code Style Guidelines

### File Naming
- Components: PascalCase (`ProductCard.tsx`)
- Utils/Hooks: camelCase (`useCart.ts`)
- API routes: lowercase (`route.ts`)
- Server Actions: camelCase with `Action` suffix (`addToCartAction.ts`)

### Import Order
1. React/Next.js imports
2. External libraries
3. Internal components
4. Utils/types
5. Styles

### Component Structure
1. Imports
2. Types/Interfaces
3. Server Component (default export)
4. Helper functions (if needed)

## Performance Best Practices

1. **Use Server Components by default** - Only use Client Components when needed
2. **Implement Streaming** - Use Suspense boundaries for progressive loading
3. **Optimize Images** - Use Next.js Image component
4. **Code Splitting** - Leverage dynamic imports
5. **Cache API responses** - Use Next.js caching strategies
6. **Minimize JavaScript** - Keep client bundle small

## Debugging

### Development Tools
- Next.js DevTools (built-in)
- React DevTools (browser extension)
- TypeScript errors in IDE
- ESLint warnings/errors

### Common Issues
- **Hydration errors**: Ensure server/client HTML matches
- **'use client' boundary**: Add directive when using hooks
- **Build errors**: Check TypeScript types and imports
- **API errors**: Verify backend services are running

## Migration Notes (v14 → v15)

### Breaking Changes Handled
- Updated to React 19 (stable)
- ESLint config migrated to v9 flat config
- TypeScript target set to ES2017
- Next.js config updated for v15 features

### New Features Available
- Turbopack (stable) - Use with `next dev --turbo`
- Partial Prerendering - Enable in next.config.js
- Enhanced Server Actions
- Improved Caching API

## Resources
- [Next.js 15 Documentation](https://nextjs.org/docs)
- [React 19 Documentation](https://react.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Project Architecture (Root CLAUDE.md)](../CLAUDE.md)

## Development Commands

### Local Development (Non-Docker)
```bash
npm install           # Install dependencies
npm run dev          # Start dev server (http://localhost:3000)
npm run build        # Production build
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Check TypeScript types
```

### Docker Development
```bash
# Full system with API Gateway
cd ../mvp-store-infrastructure && make init
cd ../mvp-store-frontend && make up

# Access: http://localhost:8090 (via API Gateway)

# Standalone (for testing)
make init            # First time setup
make up             # Start container
make down           # Stop container
```

## Project Structure

```
mvp-store-frontend/
├── docker/                      # Docker configuration
│   ├── Dockerfile              # Multi-stage build
│   ├── docker-compose.yml      # Container setup
│   └── .dockerignore           # Docker ignore rules
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (auth)/            # Auth route group
│   │   ├── (shop)/            # Shop route group
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx           # Homepage
│   │   └── globals.css        # Global styles
│   ├── components/            # React components
│   │   ├── ui/               # Reusable UI components
│   │   ├── features/         # Feature-specific components
│   │   └── layouts/          # Layout components
│   ├── lib/                  # Utility libraries
│   │   ├── api/             # API client functions
│   │   ├── utils/           # Helper functions
│   │   └── hooks/           # Custom React hooks
│   └── types/               # TypeScript type definitions
├── public/                  # Static assets
├── .env.local              # Local environment (gitignored)
├── .env.example            # Environment template
├── next.config.ts          # Next.js configuration
├── tailwind.config.ts      # Tailwind CSS config
├── tsconfig.json           # TypeScript config
├── Makefile               # Development commands
└── package.json           # Dependencies
```

## Development Workflow

### Creating New Pages
```typescript
// src/app/products/page.tsx
export default async function ProductsPage() {
  // Server Component - can fetch data directly
  const products = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`)
    .then(res => res.json());

  return <ProductList products={products} />;
}
```

### Creating Client Components
```typescript
// src/components/ui/AddToCartButton.tsx
'use client';

import { useState } from 'react';

export function AddToCartButton({ productId }: { productId: string }) {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    // API call logic
    setLoading(false);
  };

  return <button onClick={handleClick} disabled={loading}>Add to Cart</button>;
}
```

### Using Server Actions
```typescript
// src/app/actions/cartActions.ts
'use server';

export async function addToCartAction(productId: string, quantity: number) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ productId, quantity }),
  });

  return response.json();
}
```

### API Integration Pattern
```typescript
// src/lib/api/products.ts
export async function getProducts() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const response = await fetch(`${apiUrl}/products`, {
    next: { revalidate: 60 } // Cache for 60 seconds
  });

  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }

  return response.json();
}
```

## Styling with Tailwind CSS

### Component Example
```typescript
export function ProductCard({ product }) {
  return (
    <div className="rounded-lg border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow">
      <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
      <p className="mt-2 text-sm text-gray-600">{product.description}</p>
      <div className="mt-4 flex items-center justify-between">
        <span className="text-xl font-bold text-blue-600">${product.price}</span>
        <button className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
          Add to Cart
        </button>
      </div>
    </div>
  );
}
```

### Custom Tailwind Configuration
```typescript
// tailwind.config.ts
export default {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#3b82f6',
          secondary: '#1e40af',
        }
      }
    }
  }
}
```

## TypeScript Best Practices

### Type Definitions
```typescript
// src/types/product.ts
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  stock: number;
  category: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
```

### Component Props
```typescript
interface ProductCardProps {
  product: Product;
  onAddToCart?: (productId: string) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  // Component implementation
}
```

## Error Handling

### Error Boundaries
```typescript
// src/app/error.tsx
'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h2 className="text-2xl font-bold">Something went wrong!</h2>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}
```

### Loading States
```typescript
// src/app/products/loading.tsx
export default function Loading() {
  return <div className="flex items-center justify-center">Loading...</div>;
}
```

## API Gateway Integration

### Environment Setup
All API calls go through the API Gateway:
```bash
# .env.local
NEXT_PUBLIC_API_URL=http://localhost:8090/api
NEXT_PUBLIC_PAYMENT_API_URL=http://localhost:8090/api/payment
```

### Making API Calls
```typescript
// Always use environment variables
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

// GET request
const data = await fetch(`${apiUrl}/products`).then(res => res.json());

// POST request
const result = await fetch(`${apiUrl}/orders`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(orderData),
});
```

## Troubleshooting

### Common Issues

**Hydration Mismatch:**
```typescript
// BAD: Using Date.now() causes hydration errors
export default function BadComponent() {
  return <div>{Date.now()}</div>;
}

// GOOD: Mark as client component or use useEffect
'use client';
import { useEffect, useState } from 'react';

export default function GoodComponent() {
  const [time, setTime] = useState<number | null>(null);

  useEffect(() => {
    setTime(Date.now());
  }, []);

  return <div>{time}</div>;
}
```

**API Connection Issues:**
```bash
# Check API Gateway is running
curl http://localhost:8090/health

# Check backend is accessible
curl http://localhost:8090/api/health

# Verify environment variables
npm run dev  # Check console output for env vars
```

**Build Errors:**
```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Check TypeScript errors
npm run type-check
```

## Performance Optimization

### Image Optimization
```typescript
import Image from 'next/image';

export function ProductImage({ src, alt }: { src: string; alt: string }) {
  return (
    <Image
      src={src}
      alt={alt}
      width={400}
      height={400}
      className="object-cover"
      priority={false} // Set true for above-the-fold images
    />
  );
}
```

### Dynamic Imports
```typescript
// Lazy load heavy components
import dynamic from 'next/dynamic';

const HeavyChart = dynamic(() => import('@/components/HeavyChart'), {
  loading: () => <p>Loading chart...</p>,
  ssr: false, // Don't render on server
});
```

### Caching Strategy
```typescript
// Static data - revalidate every hour
fetch(url, { next: { revalidate: 3600 } });

// Dynamic data - no cache
fetch(url, { cache: 'no-store' });

// Force cache
fetch(url, { cache: 'force-cache' });
```

## Claude Code Guidelines

When working on this service:
1. **Server Components First** - Default to Server Components, add `'use client'` only when necessary (hooks, event handlers)
2. **Type Everything** - Use TypeScript strictly, no `any` types
3. **Tailwind Only** - Don't write custom CSS, use Tailwind utilities
4. **API Gateway** - Always route through API Gateway, never direct service calls
5. **Error Boundaries** - Add error.tsx for route segments that might fail
6. **Loading States** - Provide loading.tsx for better UX
7. **Responsive Design** - Mobile-first approach with Tailwind breakpoints
8. **Accessibility** - Use semantic HTML and ARIA attributes
9. **Performance** - Optimize images, implement code splitting, use caching
10. **Testing** - Consider test coverage when adding features