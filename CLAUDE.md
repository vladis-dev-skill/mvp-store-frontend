# CLAUDE.md - Frontend Service

This file provides guidance to Claude Code when working with the MVP Store Frontend application.

## Project Overview

This is a modern Next.js 15 frontend application built with React 19, TypeScript, and Tailwind CSS. It's part of a fault-tolerant microservices architecture with API Gateway integration.

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

## Important Notes for Claude Code

1. **Always use Server Components first** - Only add `'use client'` when necessary
2. **Prefer Server Actions** over API routes for mutations
3. **Follow Tailwind CSS patterns** - Use utility classes, avoid custom CSS
4. **TypeScript strict mode** - All code must be type-safe
5. **Integration with backend** - Always go through API Gateway
6. **Docker-first deployment** - Local dev can be without Docker, but production uses containers
7. **Health checks** - Implement for all services
8. **Error boundaries** - Add for robust error handling
9. **Accessibility** - Follow WCAG guidelines
10. **Mobile-first** - Responsive design is mandatory