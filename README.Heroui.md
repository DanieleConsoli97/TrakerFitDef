# HeroUI + React + Vite + Tailwind CSS - Guida Completa

Questa guida spiega come configurare HeroUI in un progetto React + Vite con Tailwind CSS.

## Prerequisiti

- Node.js installato
- Progetto React + Vite creato
- Tailwind CSS v3 (importante: HeroUI non è completamente compatibile con Tailwind v4)

## 1. Installazione delle dipendenze

### Tailwind CSS v3 (se hai v4, esegui il downgrade)

```bash
# Se hai Tailwind v4, disinstallalo prima
npm uninstall tailwindcss @tailwindcss/vite

# Installa Tailwind v3
npm install -D tailwindcss@^3.4.0 postcss autoprefixer

# Inizializza la configurazione
npx tailwindcss init -p
```

### HeroUI e dipendenze

```bash
npm install @heroui/react @heroui/theme framer-motion
```

## 2. Configurazione Tailwind CSS

### `tailwind.config.js`

```javascript
import { heroui } from '@heroui/react'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [heroui()],
}
```

### `postcss.config.js`

```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

### `src/index.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## 3. Configurazione HeroUI Provider

### `src/main.jsx`

```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { HeroUIProvider } from '@heroui/react'
import { ThemeProvider } from './ThemeProvider.jsx'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HeroUIProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </HeroUIProvider>
  </React.StrictMode>,
)
```

## 4. Configurazione Modalità Scura (Opzionale)

### `src/ThemeProvider.jsx`

```jsx
import React, { createContext, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext()

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light'
    setTheme(savedTheme)
    document.documentElement.classList.toggle('dark', savedTheme === 'dark')
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    document.documentElement.classList.toggle('dark', newTheme === 'dark')
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
```

## 5. Esempio di utilizzo

### `src/App.jsx`

```jsx
import { Button, Card, CardBody, CardHeader, Input, Switch } from '@heroui/react'
import { useTheme } from './ThemeProvider.jsx'

function App() {
  const { theme, toggleTheme } = useTheme()

  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <div className="max-w-md mx-auto space-y-4">
        
        {/* Header con toggle tema */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">La mia App</h1>
          <Switch 
            isSelected={theme === 'dark'}
            onValueChange={toggleTheme}
          >
            🌙 Modalità scura
          </Switch>
        </div>

        {/* Componenti di esempio */}
        <Card>
          <CardHeader>
            <h2 className="text-xl font-bold">Componenti HeroUI</h2>
          </CardHeader>
          <CardBody className="space-y-4">
            <Button color="primary" variant="shadow">
              Bottone Primario
            </Button>
            
            <Button color="success" variant="flat">
              Bottone Successo
            </Button>
            
            <Input 
              label="Email" 
              placeholder="test@example.com"
              variant="bordered"
            />
          </CardBody>
        </Card>
        
      </div>
    </div>
  )
}

export default App
```

## 6. Personalizzazione temi (Opzionale)

Puoi personalizzare i colori dei temi nel `tailwind.config.js`:

```javascript
plugins: [
  heroui({
    themes: {
      light: {
        colors: {
          background: "#FFFFFF",
          foreground: "#11181C",
          primary: {
            50: "#e6f1fe",
            500: "#0070f3",
            DEFAULT: "#0070f3",
          },
        },
      },
      dark: {
        colors: {
          background: "#000000",
          foreground: "#ECEDEE",
          primary: {
            50: "#3B096C",
            500: "#9353D3",
            DEFAULT: "#9353D3",
          },
        },
      },
    },
  }),
]
```

## 7. Componenti disponibili

Alcuni dei componenti più utilizzati:

```jsx
import {
  // Layout
  Card, CardBody, CardHeader, CardFooter,
  
  // Form
  Button, Input, Switch, Checkbox, Select,
  
  // Navigation
  Navbar, Tabs, Breadcrumbs,
  
  // Feedback
  Modal, Tooltip, Popover, Spinner,
  
  // Data Display
  Table, Avatar, Chip, Badge,
  
  // Others
  Divider, Spacer, Image
} from '@heroui/react'
```

## Troubleshooting

### Problema: Gli stili non vengono caricati

**Causa**: Spesso dovuto a Tailwind CSS v4 che non è completamente compatibile con HeroUI.

**Soluzione**: 
1. Disinstalla Tailwind v4: `npm uninstall tailwindcss @tailwindcss/vite`
2. Installa Tailwind v3: `npm install -D tailwindcss@^3.4.0`
3. Ricrea la configurazione: `npx tailwindcss init -p`

### Problema: Tailwind non funziona

**Verifica**:
1. Che `@tailwind` sia nel CSS principale
2. Che il CSS sia importato in `main.jsx`
3. Che `postcss.config.js` sia presente
4. Riavvia il server: `npm run dev`

### Problema: Modalità scura non funziona

**Verifica**:
1. Che `darkMode: "class"` sia nel `tailwind.config.js`
2. Che il `ThemeProvider` sia configurato correttamente
3. Che `useTheme` sia chiamato dentro il `ThemeProvider`

## Struttura finale del progetto

```
my-project/
├── src/
│   ├── App.jsx
│   ├── main.jsx
│   ├── index.css
│   └── ThemeProvider.jsx
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── vite.config.js
```

## Risorse utili

- [Documentazione HeroUI](https://heroui.com/docs/guide/introduction)
- [Componenti HeroUI](https://heroui.com/docs/components/button)
- [Documentazione Tailwind CSS v3](https://tailwindcss.com/docs)

---

**Nota importante**: Assicurati di usare Tailwind CSS v3.x per la piena compatibilità con HeroUI. La v4 è troppo recente e può causare problemi di compatibilità.