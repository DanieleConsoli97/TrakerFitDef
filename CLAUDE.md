# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Start development server**: `npm run dev` (runs on port 5173)
- **Build for production**: `npm run build`
- **Lint code**: `npm run lint`
- **Preview production build**: `npm run preview`

## Environment Setup

The application requires a `.env` file with:
```
VITE_SERVER_URL_DEV=http://localhost:3000
```
This points to the backend API server.

## Architecture Overview

### Tech Stack
- **Frontend**: React 19 + Vite
- **UI Library**: HeroUI (NextUI alternative) + Tailwind CSS v3
- **Routing**: React Router DOM v7
- **Icons**: Lucide React + Iconify React
- **Animations**: Framer Motion
- **Date handling**: Day.js

### Project Structure

```
src/
├── components/          # Reusable UI components
├── contexts/           # React Context providers
├── Hooks/              # Custom hooks
│   └── actionHooks/    # Action-specific hooks
├── Layout/             # Layout components
├── pages/              # Page components
├── provider/           # Additional providers
├── services/           # API service layer
└── assets/             # Static assets and design files
```

### Key Architectural Patterns

**Authentication Flow:**
- Uses JWT tokens with automatic refresh via `fetchWithAuth` interceptor
- AuthProvider combines authentication state with app data (sessions, exercises)
- ProtectedRoute component wraps authenticated routes

**Data Management:**
- Custom hooks pattern for data fetching (`useSessions`, `useExercise`)
- Action hooks (`useAuthActions`, `useSessionsAction`) handle CRUD operations
- All API calls go through `src/services/apiService.js` with automatic token refresh

**State Architecture:**
- AuthProvider (`src/contexts/AuthProvider.jsx`) acts as the main state container
- Combines auth state with business data using custom hooks
- useAuth() hook provides access to all app state and actions

**API Integration:**
- `fetchWithAuth()` function handles automatic token refresh on 401 errors
- API base URL configured via `VITE_SERVER_URL_DEV` environment variable
- Centralized API functions in `apiService.js`

### Routing Structure
- Public routes: `/home`, `/login`, `/signup`, `/contatti`, `/esercizi`
- Protected routes: `/dashboard`, `/sessions`, `/session/:id`, `/exercise/:id`
- All protected routes wrapped with ProtectedRoute component

### Custom Hooks

**Core Hooks:**
- `useAuthActions`: Authentication actions (login, logout, token refresh)
- `useSessions`: Session data management with fetchWithAuth integration
- `useLocalStorage`: Persistent state storage

**Pattern:**
Data hooks receive `fetchWithAuth` function from auth hook, enabling automatic token handling across all API calls.

### UI Framework
- HeroUI components (successor to NextUI)
- Tailwind CSS v3 for styling
- ThemeProvider for light/dark mode switching
- Custom theme configuration in `tailwind.config.js`

## Important Notes

- Always use `fetchWithAuth` for authenticated API calls to ensure automatic token refresh
- The API expects parsed tokens (use `JSON.parse()` when reading from localStorage)
- HeroUI is used instead of NextUI - check HeroUI documentation for component usage
- Theme switching is handled via ThemeProvider context