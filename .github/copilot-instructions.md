# Project Technology Stack & Architecture

- You can reference files using the @ symbol (e.g., @filename.ts)

## Core Technologies
1. Frontend
    - Next.js with Pages Router
    - React for UI components
    - TypeScript for type safety

2. Backend API
    - tRPC for type-safe API communication
    - Example implementation: [sessionRouter.ts](mdc:src/server/api/routers/sessionRouter.ts)
    - All endpoints are serverless (Vercel Functions)

3. Database
        - MySQL as the primary database
        - Prisma ORM for database operations
        - Database schema: [schema.prisma](mdc:prisma/schema.prisma)
        - Schema is shared between frontend/backend (monorepo structure)

4. Deployment & Infrastructure
    - Hosted on Vercel
    - Serverless architecture
        - All endpoints are stateless
        - No persistent server-side state

5. Authentication
    - JWT (JSON Web Tokens) based auth
    - Implementation details: [auth.ts](mdc:src/server/auth.ts)

7. Mobile-First Design & PWA
    - This is primarily a Progressive Web App (PWA) designed for mobile users
    - The landing page (index.tsx) should be responsive and look good on both mobile and desktop
    - All other pages should prioritize mobile UI/UX as they will primarily be accessed through the PWA
    - Design considerations:
        - Use mobile-friendly touch targets (min 44px height)
        - Ensure comfortable thumb-reachable interactions
        - Avoid hover-dependent interactions except on landing page
        - Maintain fixed viewport to prevent address bar issues
        - Support iOS safe areas and notches
        - Design for portrait orientation primarily
        - Keep navigation within thumb-friendly bottom area