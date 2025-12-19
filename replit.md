# Anytime Anywhere AI (AAAI) - Master AI Curriculum Platform

## Overview

This is a comprehensive AI education platform called "Anytime Anywhere AI (AAAI)" that provides structured learning paths across 7 core AI domains: Foundation, Machine Learning, Deep Learning, Generative AI, LLM, Multimodal AI, and Quantum AI. The platform serves as an end-to-end curriculum delivery system with interactive courses, hands-on projects, code laboratories, and comprehensive documentation.

The application is designed as a full-stack web platform that enables learners to progress through a structured AI curriculum with practical, production-ready project templates and interactive coding environments.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript using Vite as the build tool
- **UI Library**: Shadcn/ui components built on Radix UI primitives with Tailwind CSS for styling
- **Routing**: Wouter for client-side routing with pages for courses, projects, labs, and documentation
- **State Management**: TanStack Query (React Query) for server state management and caching
- **Styling**: Tailwind CSS with custom design tokens and CSS variables for theming

### Backend Architecture
- **Runtime**: Node.js with Express.js server
- **Language**: TypeScript throughout the entire stack
- **API Design**: RESTful API endpoints for courses, projects, code labs, and documentation
- **Development**: Hot module replacement with Vite integration for development workflow

### Data Storage Solutions
- **Database**: PostgreSQL as the primary database
- **ORM**: Drizzle ORM for type-safe database operations with schema-first approach
- **Schema Management**: Drizzle Kit for migrations and database schema management
- **Data Validation**: Zod schemas for runtime type validation and data integrity

### Authentication and Authorization
- Session-based authentication (infrastructure present but implementation pending)
- User progress tracking and achievement system
- Role-based access patterns in the database schema

### External Dependencies

#### Database and ORM
- **Neon Database**: Serverless PostgreSQL database using @neondatabase/serverless
- **Drizzle ORM**: Type-safe database toolkit with PostgreSQL dialect
- **Connect PG Simple**: PostgreSQL session store for Express sessions

#### UI and Components
- **Radix UI**: Comprehensive set of accessible, unstyled UI primitives
- **Lucide React**: Icon library for consistent iconography
- **Embla Carousel**: Touch-friendly carousel component
- **Class Variance Authority**: Utility for managing conditional CSS classes
- **TailwindCSS**: Utility-first CSS framework with PostCSS integration

#### Development Tools
- **Vite**: Fast build tool with ESModule support and React plugin
- **ESBuild**: JavaScript bundler for production builds
- **TSX**: TypeScript execution for development server
- **Replit Integration**: Development environment integration with cartographer plugin

#### Data and Validation
- **Date-fns**: Date utility library for formatting and manipulation
- **React Hook Form**: Form state management with Hookform resolvers
- **Zod**: Schema validation library integrated with Drizzle ORM

The architecture follows a monorepo pattern with shared TypeScript schemas between frontend and backend, ensuring type safety across the entire application stack.

## Deployment Configuration

### Vercel Deployment Ready
The application is fully configured for Vercel deployment with:
- `vercel.json` configuration file for serverless deployment
- `api/[...slug].ts` handler for API routes compatibility
- Production build optimizations with Vite
- Environment variable template (`.env.example`)
- Comprehensive deployment guides (`VERCEL_DEPLOYMENT_GUIDE.md`, `QUICK_DEPLOY.md`)

### Database Requirements
- PostgreSQL database (recommended: Neon, Supabase, or PlanetScale)
- Environment variables: DATABASE_URL, NODE_ENV, VITE_API_URL
- Schema migration via Drizzle Kit (`npm run db:push`)

### Production Features
- SSL/HTTPS ready configuration
- Static asset optimization
- API routes as serverless functions
- Mobile-responsive design
- SEO optimization
- Professional course pricing (₹25K-₹55K)
- WhatsApp integration (+91 883 951 9103)

## Payment Integration

### Stripe Payment Gateway
The application has a fully integrated Stripe payment gateway for course enrollment:

**Backend Components:**
- `server/stripeClient.ts` - Stripe API client with Replit connector integration
- `server/stripeService.ts` - Stripe operations (checkout sessions, products, prices)
- `server/webhookHandlers.ts` - Webhook processing for payment events

**API Endpoints:**
- `GET /api/stripe/publishable-key` - Get Stripe publishable key for frontend
- `GET /api/stripe/products` - List Stripe products with prices
- `POST /api/checkout` - Create checkout session for course purchase
- `POST /api/stripe/webhook/:uuid` - Stripe webhook handler

**Frontend Components:**
- Registration form (`client/src/components/registration-form.tsx`) - Collects user info and redirects to Stripe
- Payment success page (`client/src/pages/payment-success.tsx`) - Post-payment confirmation
- Payment cancel page (`client/src/pages/payment-cancel.tsx`) - Payment cancellation handling

**Payment Flow:**
1. User fills registration form with personal details and course selection
2. Form submits to `/api/checkout` which creates Stripe product/price if needed
3. User is redirected to Stripe hosted checkout page
4. After payment, user returns to success or cancel page
5. Webhook processes payment confirmation and syncs data

**Course Pricing (INR):**
- Foundation Course: ₹25,000
- Machine Learning: ₹35,000
- Deep Learning: ₹45,000
- Generative AI: ₹42,000
- Large Language Models: ₹48,000
- Multimodal AI: ₹46,000
- Quantum AI: ₹50,000