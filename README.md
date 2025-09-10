# 🏋️ TrakerFitDef - Frontend React

Un'app web moderna e responsive per il tracciamento degli allenamenti, costruita con React e progettata per funzionare con l'API Fitness Control Backend. Interfaccia intuitiva per utenti e pannello di amministrazione completo.

## 🚀 Features Principali

### 💪 **Per Utenti**
- **Autenticazione sicura** con JWT dual-token
- **Dashboard personalizzata** con panoramica progressi
- **Sessioni di allenamento** complete con cronologia
- **Aggiunta esercizi** dal catalogo con ricerca/filtri
- **Tracciamento serie** dettagliato (ripetizioni + peso)
- **Massimali personali** e analisi progressi
- **Profilo utente** modificabile

### 👑 **Per Admin**
- **Gestione catalogo esercizi** (CRUD completo)
- **Organizzazione categorie** e tipi
- **Pannello controllo** avanzato
- **Gestione utenti** e permissions

### 🎨 **Design & UX**
- **UI moderna** con HeroUI + Tailwind CSS v3
- **Tema scuro/chiaro** con switch integrato
- **Design responsive** ottimizzato mobile/desktop
- **Animazioni fluide** e feedback visivo
- **Accessibilità** completa (ARIA, keyboard nav)

## 🛠️ Stack Tecnologico

- **Framework**: React 18+ con Vite
- **UI Library**: HeroUI (NextUI-based)
- **Styling**: Tailwind CSS v3
- **Routing**: React Router DOM v6
- **State Management**: React Context + Hooks
- **HTTP Client**: Fetch API con interceptors
- **Icons**: Lucide React / Hero Icons
- **Build Tool**: Vite
- **Package Manager**: npm/yarn

## ⚡ Quick Start

### 1. Installazione
```bash
git clone <repository>
cd TrakerFitDef
npm install
```

### 2. Configurazione Environment
Crea `.env` nella root:
```env
VITE_API_URL=http://localhost:3000/api
VITE_APP_NAME=TrakerFitDef
VITE_APP_VERSION=1.0.0
```

### 3. Avvio Development
```bash
npm run dev
```
App disponibile su `http://localhost:5173`

### 4. Build Production
```bash
npm run build
npm run preview  # Preview build
```

## 📁 Struttura Progetto

```
src/
├── components/           # Componenti riutilizzabili
│   ├── ui/              # UI base components
│   ├── layout/          # Layout components
│   └── common/          # Componenti comuni
├── pages/               # Route pages
│   ├── auth/           # Login, Register
│   ├── dashboard/      # Dashboard utente
│   ├── workouts/       # Gestione allenamenti
│   ├── exercises/      # Catalogo esercizi
│   ├── profile/        # Profilo utente
│   └── admin/          # Pannello admin
├── hooks/              # Custom React hooks
│   ├── useAuth.js      # Autenticazione
│   ├── useApi.js       # API calls
│   └── useTheme.js     # Gestione tema
├── contexts/           # React contexts
│   ├── AuthContext.jsx # Stato autenticazione
│   ├── ThemeContext.jsx # Tema scuro/chiaro
│   └── ApiContext.jsx   # Configurazione API
├── services/           # API services
│   ├── api.js          # Base API setup
│   ├── auth.js         # Auth endpoints
│   ├── workouts.js     # Workout endpoints
│   └── exercises.js    # Exercise endpoints
├── utils/              # Utilities
│   ├── constants.js    # Costanti app
│   ├── formatters.js   # Date/number formatters
│   └── validators.js   # Form validation
└── styles/             # Global styles
    └── globals.css     # CSS globale + Tailwind
```

## 🔐 Sistema Autenticazione

### JWT Dual-Token
- **Access Token**: Short-lived (15min)
- **Refresh Token**: Long-lived (7 giorni)
- **Auto-refresh**: Rinnovo automatico trasparente
- **Secure logout**: Invalidazione server-side

### AuthContext
```jsx
const { user, login, logout, isAuthenticated, loading } = useAuth();
```

### Protezione Route
```jsx
<ProtectedRoute>
  <Dashboard />
</ProtectedRoute>
```

## 🎨 Sistema Temi

### Theme Provider
```jsx
const { theme, toggleTheme, isDark } = useTheme();
```

### Personalizzazione
```js
// tailwind.config.js
theme: {
  extend: {
    colors: {
      primary: {...},
      secondary: {...}
    }
  }
}
```

## 📱 Componenti Principali

### Dashboard
- Panoramica allenamenti recenti
- Grafici progressi
- Quick actions

### Workout Manager
- Lista sessioni con paginazione
- Dettaglio sessione completa
- Editor esercizi/serie

### Exercise Catalog
- Ricerca avanzata con filtri
- Vista griglia/lista
- Dettagli esercizio con tipi

### Profile Manager
- Modifica dati personali
- Cambio password sicuro
- Preferenze app

### Admin Panel
- CRUD esercizi completo
- Gestione categorie/tipi
- Dashboard amministrativa

## 🧪 Testing & QA

### Comandi Testing
```bash
npm run test          # Unit tests
npm run test:watch    # Watch mode
npm run test:coverage # Coverage report
```

### Linting & Formatting
```bash
npm run lint          # ESLint check
npm run lint:fix      # Fix automatico
npm run format        # Prettier format
```

## 🚀 Deploy & Production

### Vercel (Raccomandato)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Upload dist/ folder
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 5173
CMD ["npm", "run", "preview"]
```

## 🔄 Workflow Utente

### Nuovo Utente
1. **Registrazione** → Email/Password + Dati personali
2. **Verifica** → Login automatico con JWT
3. **Onboarding** → Tour guidato features
4. **Prima sessione** → Crea primo allenamento

### Sessione Allenamento
1. **Crea sessione** → Data + Note opzionali
2. **Aggiungi esercizi** → Search dal catalogo
3. **Registra serie** → Ripetizioni + Peso
4. **Salva risultati** → Auto-save + Sync
5. **Aggiorna massimali** → Tracking automatico PR

## 🛡️ Sicurezza Frontend

- **XSS Protection**: Sanitizzazione input
- **CSRF Protection**: Token validation
- **Secure Storage**: JWT in httpOnly cookies
- **Input Validation**: Client + Server validation
- **Error Handling**: No sensitive data in errors

## 📊 Performance

### Ottimizzazioni
- **Code Splitting**: React.lazy + Suspense
- **Lazy Loading**: Immagini e componenti
- **Memoization**: React.memo + useMemo
- **Bundle Analysis**: Bundle analyzer integrato

### Metriche Target
- **First Paint**: < 1.5s
- **Time to Interactive**: < 2.5s
- **Bundle Size**: < 500KB gzipped
- **Lighthouse Score**: > 90

## 🔧 Configurazione Avanzata

### Environment Variables
```env
# API Configuration
VITE_API_URL=https://api.fitnesscontrol.com/api
VITE_API_TIMEOUT=10000

# App Configuration
VITE_APP_NAME=TrakerFitDef
VITE_APP_VERSION=1.0.0
VITE_DEBUG=false

# Feature Flags
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_DARK_MODE=true
```

### Build Customization
```js
// vite.config.js
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['@heroui/react']
        }
      }
    }
  }
})
```

## 🤝 Sviluppo Collaborativo

### Git Workflow
```bash
git checkout -b feature/new-feature
git commit -m "feat: add new feature"
git push origin feature/new-feature
# Create PR
```

### Conventional Commits
- `feat:` - Nuova feature
- `fix:` - Bug fix
- `docs:` - Documentazione
- `style:` - Styling changes
- `refactor:` - Code refactoring
- `test:` - Tests
- `chore:` - Maintenance

## 📄 License

MIT License - vedi `LICENSE` file.

---

## 🔗 Collegamenti

- **Backend API**: [BackendFitnessControl](../BackendFitnessControl/)
- **API Documentation**: `../BackendFitnessControl/API_DOCUMENTATION.md`
- **Design System**: [HeroUI Docs](https://heroui.com/)
- **Tailwind CSS**: [Tailwind Docs](https://tailwindcss.com/)

---

⚡ **App moderna, sicura e pronta per l'uso!** ⚡