# MVP Store Frontend

Modern e-commerce frontend built with Next.js 14+ (App Router), TypeScript, and Tailwind CSS, integrated into a fault-tolerant microservices architecture.

## 🚀 Tech Stack

- **Framework**: Next.js 14+ with App Router
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 3.4
- **State Management**: Zustand + TanStack Query (React Query)
- **HTTP Client**: Axios with retry logic
- **Form Validation**: React Hook Form + Zod
- **UI Components**: Custom components with class-variance-authority
- **Icons**: Lucide React
- **Notifications**: Sonner

## 📁 Project Structure

```
mvp-store-frontend/
├── docker/                         # Docker configuration
│   ├── Dockerfile                  # Multi-stage production build
│   ├── docker-compose.yml          # Service orchestration
│   └── .dockerignore               # Docker ignore rules
├── src/
│   ├── app/                        # Next.js App Router
│   │   ├── (auth)/                 # Auth group routes
│   │   │   ├── login/              # Login page
│   │   │   └── register/           # Registration page
│   │   ├── products/               # Products catalog
│   │   │   └── [slug]/             # Product detail page
│   │   ├── cart/                   # Shopping cart
│   │   ├── api/                    # API routes (BFF)
│   │   │   └── health/             # Health check endpoint
│   │   ├── layout.tsx              # Root layout
│   │   ├── page.tsx                # Homepage
│   │   └── globals.css             # Global styles
│   ├── components/                 # React components
│   │   ├── layout/                 # Layout components
│   │   │   ├── header.tsx          # Header with navigation
│   │   │   ├── footer.tsx          # Footer
│   │   │   └── main-layout.tsx     # Main layout wrapper
│   │   ├── ui/                     # UI components
│   │   │   └── button.tsx          # Button component
│   │   └── providers.tsx           # React Query provider
│   ├── lib/                        # Utilities and helpers
│   │   ├── api/                    # API clients
│   │   │   ├── client.ts           # Axios client with retry
│   │   │   ├── auth.ts             # Auth API
│   │   │   ├── products.ts         # Products API
│   │   │   ├── cart.ts             # Cart API
│   │   │   ├── orders.ts           # Orders API
│   │   │   └── index.ts            # API exports
│   │   └── utils.ts                # Utility functions
│   └── types/                      # TypeScript types
│       └── index.ts                # Type definitions
├── public/                         # Static assets
├── Makefile                        # Development commands
├── package.json                    # Dependencies
├── tsconfig.json                   # TypeScript config
├── tailwind.config.ts              # Tailwind config
├── next.config.js                  # Next.js config
└── .env.local                      # Environment variables

```

## 🏗️ Architecture Integration

### API Gateway Flow

```
User → API Gateway (nginx:8090)
         ├─ / → Frontend (Next.js:3000)
         ├─ /_next/ → Frontend static assets
         ├─ /api/ → Backend API (Symfony)
         └─ /api/payment/ → Payment Service (Symfony)
```

### Key Features

1. **SSR (Server-Side Rendering)** - SEO-friendly pages
2. **Automatic Code Splitting** - Optimized bundle sizes
3. **Retry Logic** - 3 retries with exponential backoff
4. **JWT Authentication** - Automatic token management
5. **Health Checks** - Service monitoring
6. **Fault Tolerance** - Graceful error handling

## 🚀 Quick Start

### Prerequisites

- Node.js 20+
- npm or yarn
- Docker & Docker Compose
- Running infrastructure (API Gateway, Backend, Payment services)

### Local Development (Without Docker)

1. **Install dependencies:**
   ```bash
   cd mvp-store-frontend
   npm install
   ```

2. **Configure environment:**
   ```bash
   cp .env.local.example .env.local
   # Edit .env.local with your settings
   ```

3. **Start development server:**
   ```bash
   npm run dev
   # or
   make dev
   ```

4. **Access application:**
   - Frontend: http://localhost:3000
   - Health check: http://localhost:3000/api/health

### Docker Production Build

1. **Initialize and start service:**
   ```bash
   make init
   ```

2. **Or manually:**
   ```bash
   # Build image
   make build

   # Start service
   make up

   # Check health
   make health
   ```

3. **Access via API Gateway:**
   - Frontend: http://localhost:8090
   - API: http://localhost:8090/api/

## 📋 Available Commands

### Development
```bash
make dev              # Start local dev server
make install          # Install dependencies
make build-local      # Build Next.js locally
```

### Docker
```bash
make init             # Initialize service (first run)
make build            # Build Docker image
make up               # Start service
make down             # Stop service
make restart          # Restart service
make logs             # View logs
make exec_bash        # Access container shell
```

### Health & Monitoring
```bash
make health           # Check service health
make health-gateway   # Check via API Gateway
make stats            # Show resource usage
```

### Maintenance
```bash
make clean            # Clean containers & images
make clean-local      # Clean local build artifacts
make rebuild          # Full rebuild
```

## 🔧 Configuration

### Environment Variables

Create `.env.local` from `.env.local.example`:

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:8090
API_GATEWAY_URL=http://nginx:8090

# App Configuration
NEXT_PUBLIC_APP_NAME=MVP Store
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Docker Configuration

**docker/docker-compose.yml:**
- Port 3000 exposed for direct access
- Connected to `mvp_store_network`
- Health checks every 30s
- Depends on nginx (API Gateway)

## 🛠️ API Client Configuration

### Retry Logic

The API client includes automatic retry with:
- **Max retries**: 3
- **Initial delay**: 1000ms
- **Backoff**: Exponential (2x multiplier)
- **Retry on**: 500, 502, 503, 504 errors

### Authentication

JWT tokens are automatically:
- Added to request headers
- Stored in localStorage
- Refreshed when expired
- Cleared on 401 errors

### Example Usage

```typescript
import { productsApi, authApi } from "@/lib/api";

// Fetch products
const products = await productsApi.getProducts({ page: 1, limit: 20 });

// Login
const { token, user } = await authApi.login({
  email: "user@example.com",
  password: "password"
});
```

## 📄 Pages Structure

### Public Pages
- `/` - Homepage
- `/products` - Product catalog
- `/products/[slug]` - Product details
- `/login` - Login page
- `/register` - Registration page

### Protected Pages (Require Auth)
- `/profile` - User profile
- `/orders` - Order history
- `/cart` - Shopping cart
- `/checkout` - Checkout process

### Admin Pages
- `/admin/dashboard` - Admin dashboard
- `/admin/products` - Product management
- `/admin/orders` - Order management

## 🧪 Development Workflow

### Adding a New Page

1. Create page in `src/app/`:
   ```tsx
   // src/app/about/page.tsx
   import { MainLayout } from "@/components/layout/main-layout";

   export default function AboutPage() {
     return (
       <MainLayout>
         <div>About content</div>
       </MainLayout>
     );
   }
   ```

2. Navigation automatically works via Next.js routing

### Adding a New API Endpoint

1. Create API function:
   ```typescript
   // src/lib/api/categories.ts
   import { apiClient } from "./client";

   export const categoriesApi = {
     getCategories: async () => {
       const { data } = await apiClient.get("/api/categories");
       return data;
     }
   };
   ```

2. Export from index:
   ```typescript
   // src/lib/api/index.ts
   export * from "./categories";
   ```

### Using React Query

```typescript
"use client";

import { useQuery } from "@tanstack/react-query";
import { productsApi } from "@/lib/api";

export default function ProductsPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: () => productsApi.getProducts(),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading products</div>;

  return <div>{/* Render products */}</div>;
}
```

## 🔒 Security Features

1. **HTTPS Ready** - Configured for SSL/TLS
2. **CSRF Protection** - Built into Next.js
3. **XSS Prevention** - React's built-in protection
4. **Secure Headers** - Configured in API Gateway
5. **JWT Validation** - Token expiry checks
6. **Rate Limiting** - Applied at API Gateway

## 🐛 Troubleshooting

### Frontend not accessible via Gateway

```bash
# Check if Frontend is running
make health

# Check Gateway configuration
cd ../mvp-store-infrastructure
docker logs mvp-store-gateway

# Verify network connection
docker network inspect mvp_store_network
```

### API calls failing

```bash
# Check API Gateway is running
curl http://localhost:8090/health

# Check Backend is running
curl http://localhost:8090/api/health

# View Frontend logs
make logs
```

### Build errors

```bash
# Clean and rebuild
make clean
make rebuild

# Or locally
make clean-local
npm install
npm run build
```

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [TanStack Query](https://tanstack.com/query/latest/docs/framework/react/overview)
- [TypeScript](https://www.typescriptlang.org/docs/)

## 🤝 Contributing

When making changes:
1. Follow the existing code structure
2. Use TypeScript types
3. Add proper error handling
4. Test API integration
5. Update documentation

## 📝 License

This is a learning project - part of MVP Store microservices architecture.