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