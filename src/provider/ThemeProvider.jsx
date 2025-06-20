import  { createContext, useContext } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage' // <-- importa il tuo hook personalizzato
import { useEffect } from 'react'
const ThemeContext = createContext()

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useLocalStorage('theme', 'light') // <-- usa il tuo hook

  // Aggiorna il DOM quando cambia il tema
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'))
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
