import { Routes, Route, Navigate } from "react-router-dom"
import Login from "./pages/Login"
import DefaultLayout from "./Layout/DefaultLayout"
import Contatti from './pages/Contatti'
import SingUp from './pages/SignUp'
import Home from "./pages/Home"
import ExerciseDetail from "./components/ExerciseDetail"
import ProtectedRoute from "./components/ProtectedRoute"
import Dashboard from "./pages/Dashboard"
import NotFound from "./pages/NotFound"
import SessionsComponets from "./components/SessionsComponets"
import SessionDetails from "./components/SessionDetails"
import { Sessions } from "./pages/Sessions"
const App = () => {

    return (
        <Routes>
            <Route element={<DefaultLayout />}>
                <Route path={"/"} element={<Navigate to="/home" replace />} />
                <Route path={"/home"} element={<Home />} />
                <Route path={"/login"} element={<Login />} />
                <Route path={"/signup"} element={<SingUp />} />
                <Route path={"/contatti"} element={<Contatti />} />
                <Route path={"/esercizi"} element={<ExerciseDetail />} />
                <Route path={"/sessions"} element={<Sessions />} />
                {/* rotte protette */}
                <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                <Route path="/session/:id" element={<ProtectedRoute><SessionDetails /></ProtectedRoute>} />
                <Route path="/exercise/:id" element={<ProtectedRoute><ExerciseDetail /></ProtectedRoute>} />
                <Route path="/NotFound" element={<NotFound />} />
                <Route path="*" element={<Navigate to="/NotFound" replace />} />
            </Route>
        </Routes>
    )
}

export default App