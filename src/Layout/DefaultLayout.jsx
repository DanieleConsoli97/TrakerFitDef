import { Outlet } from 'react-router-dom'
import NavBar from '../components/NavBar'

const DefaultLayout = () => {
 
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <NavBar />
      
      {/* Main content area */}
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  )
}

export default DefaultLayout