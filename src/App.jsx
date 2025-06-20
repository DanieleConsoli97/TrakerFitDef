import { Routes, Route, Navigate } from "react-router-dom"
import Login from "./pages/Login"
import DefaultLayout from "./Layout/DefaultLayout"
import Contatti from './pages/Contatti'
import SingUp from './pages/SingUp'
import Home from "./pages/Home"
import ExerciseDetail from "./components/ExerciseDetail"
import ProtectedRoute from "./components/ProtectedRoute"
import Dashboard from "./pages/Dashboard"
import NotFound from "./pages/NotFound"
const App = () => {

    return (
        <Routes>
            <Route element={<DefaultLayout />}>
                <Route path={"/"} element={<Navigate to="/home" replace />} />
                <Route path={"/home"} element={<Home />} />
                <Route path={"/login"} element={<Login />} />
                <Route path={"/singup"} element={<SingUp />} />
                <Route path={"/contatti"} element={<Contatti />} />
                <Route path={"/esercizi"} element={<ExerciseDetail />} />
                
                {/* rotte protette */}
                <Route path="/dashboard"element={<ProtectedRoute><Dashboard /></ProtectedRoute>}/>
                
                <Route path="/NotFound" element={NotFound} />
                <Route path="*" element={<Navigate to="/NotFound" replace />} />
            </Route>
        </Routes>
    )
}

export default App