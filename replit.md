# Study Tracker Application

## Overview

This is a React-based study tracking application that helps users monitor their daily, weekly, and monthly study goals with visual progress indicators. The app features a clean interface with glass cup visualizations for daily progress, weekly progress bars, and comprehensive study time management. Users can add 30-minute study sessions, create new weeks, and track their progress against predefined goals (6 hours daily, 12 hours weekly, 48 hours monthly).

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern development patterns
- **Build Tool**: Vite for fast development and optimized production builds
- **UI Framework**: Tailwind CSS with shadcn/ui component library providing consistent, accessible design patterns
- **State Management**: Custom React hooks with localStorage persistence for study tracking data
- **Routing**: Wouter for lightweight client-side routing
- **Data Fetching**: TanStack Query for server state management and caching

### Backend Architecture
- **Server**: Express.js with TypeScript providing RESTful API endpoints
- **Development**: Hot module replacement and development middleware integration
- **Session Management**: Express sessions with PostgreSQL session store support
- **Error Handling**: Centralized error middleware with structured error responses

### Data Storage Solutions
- **Database**: PostgreSQL with Neon serverless database integration
- **ORM**: Drizzle ORM for type-safe database operations and migrations
- **Local Storage**: Browser localStorage for client-side study tracking state persistence
- **Session Storage**: PostgreSQL-based session management using connect-pg-simple

### Authentication and Authorization
- **Session-Based**: Express sessions with PostgreSQL store for scalable session management
- **User Schema**: Basic username/password authentication with UUID-based user identification
- **Password Storage**: Secure password handling (implementation details in user schema)

### External Dependencies
- **Database Provider**: Neon serverless PostgreSQL for managed database hosting
- **UI Components**: Radix UI primitives for accessible, unstyled component foundations
- **Development Tools**: Replit integration with development banner and error overlay
- **Icons**: Lucide React for consistent iconography
- **Styling**: PostCSS with Tailwind CSS for utility-first styling approach
- **Build Optimization**: ESBuild for server-side code bundling and optimization

### Key Design Patterns
- **Component Composition**: Modular UI components with clear separation of concerns
- **Custom Hooks**: Reusable logic abstraction for study tracking functionality
- **Type Safety**: Comprehensive TypeScript coverage across client and server code
- **Responsive Design**: Mobile-first approach with adaptive layouts
- **Visual Progress Indicators**: Glass cup metaphors and progress bars for intuitive progress tracking
- **Local-First**: Client-side state management with localStorage for offline functionality