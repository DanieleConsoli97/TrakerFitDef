import { Outlet } from 'react-router-dom'
import NavBar from '../components/NavBar'
import { Switch } from '@heroui/react'
import { useTheme } from '../provider/ThemeProvider'

const DefaultLayout = () => {
  const { theme, toggleTheme } = useTheme()
  
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      {/* Main content area */}
      <main className="flex-1">
        <Outlet />
      </main>
      
      {/* Theme toggle - posizionato in modo da non interferire */}
      <div className="fixed bottom-4 right-4 z-50">
        <Switch
          isSelected={theme === 'dark'}
          onValueChange={toggleTheme}
          size="sm"
          className="bg-content1 border border-divider rounded-full p-2 shadow-lg"
        >
          🌙
        </Switch>
      </div>
    </div>
  )
}

export default DefaultLayout