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

## Design System

### Modern UI Pattern (Updated 2025)
The app follows a **modern glassmorphism design** with consistent patterns across all pages:

**Layout Pattern:**
- **Height**: Always use `h-[calc(100vh-4rem-1px)]` to account for navbar height
- **Background**: Gradient backgrounds `bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-purple-950/20`
- **Split Screen**: Desktop uses 50/50 split with branding left, content right
- **Mobile**: Single column layout with reduced branding

**Card Design:**
- **Glassmorphism**: `bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg`
- **Borders**: `border border-white/20 dark:border-gray-700/30`
- **Shadows**: `shadow-2xl` for depth

**Input Styling:**
- **Variant**: Always use `variant="bordered"`
- **Background**: `bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm`
- **Icons**: Use Iconify icons in `startContent` for visual hierarchy
- **Labels**: Center with `label: "text-center !text-center w-full block"`
- **Input Text**: Center with `input: "bg-transparent text-center"`

**Animations:**
- **Framer Motion**: Use for page entrance animations
- **Staggered**: Implement sequential animations with delays
- **Hover Effects**: `hover:scale-105` for interactive elements

### Color Scheme
- **Primary**: Blue (#0070f3) light, Purple (#9353D3) dark
- **Gradients**: `from-primary-500 to-purple-600` for buttons
- **Backgrounds**: Maintain transparency levels (50/80) for glassmorphism

## Implementation Guidelines

### Adding New Pages
1. **Start with the modern template**:
   ```jsx
   return (
     <div className="h-[calc(100vh-4rem-1px)] bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-purple-950/20 flex">
       {/* Split screen layout */}
     </div>
   );
   ```

2. **Include required imports**:
   ```jsx
   import { motion } from "framer-motion";
   import { Icon } from "@iconify/react";
   ```

3. **Follow animation patterns**:
   - Left section: `initial={{ opacity: 0, x: -50 }}`
   - Right section: `initial={{ opacity: 0, y: 30 }}`
   - Sequential delays: `delay: 0.2, 0.4, 0.6...`

### Adding New Components
1. **Use HeroUI components** with custom styling
2. **Implement glassmorphism** for cards and overlays
3. **Add proper responsive breakpoints** (lg: for desktop split)
4. **Include loading states** and error handling
5. **Use Iconify icons** for consistency

### Form Best Practices
1. **Center all elements** including labels and inputs
2. **Use proper validation** with real-time feedback
3. **Implement loading states** during submission
4. **Add toast notifications** for user feedback
5. **Include social login options** when appropriate

### Feature Implementation Tips
1. **Data Flow**: Always use `fetchWithAuth` for API calls
2. **State Management**: Leverage existing hooks pattern
3. **Error Handling**: Implement consistent error boundaries
4. **Performance**: Use React.memo for heavy components
5. **Accessibility**: Include proper ARIA labels and keyboard navigation

## Important Notes

- Always use `fetchWithAuth` for authenticated API calls to ensure automatic token refresh
- The API expects parsed tokens (use `JSON.parse()` when reading from localStorage)
- HeroUI is used instead of NextUI - check HeroUI documentation for component usage
- Theme switching is handled via ThemeProvider context
- **Consistent Height**: Never use `min-h-screen`, always subtract navbar height
- **Glassmorphism**: Maintain transparency levels and backdrop-blur effects
- **Responsive Design**: Test on both mobile and desktop breakpoints