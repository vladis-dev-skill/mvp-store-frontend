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

## Project Structure

```
mvp-store-frontend/
├── docker/                      # Docker configuration
│   ├── Dockerfile              # Multi-stage build
│   ├── docker-compose.yml      # Container setup
│   └── .dockerignore           # Docker ignore rules
├── src/
│   ├── app/                    # Next.js App Router
│   ├── components/            # React components
│   ├── lib/                  # Utility libraries
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

## API Gateway Integration

### Environment Setup
All API calls go through the API Gateway:
```bash
# .env.local
NEXT_PUBLIC_API_URL=http://localhost:8090/api
NEXT_PUBLIC_PAYMENT_API_URL=http://localhost:8090/api/payment
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