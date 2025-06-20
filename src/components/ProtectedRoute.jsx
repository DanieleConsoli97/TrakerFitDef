
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthProvider';

const ProtectedRoute = ({ children }) => {
    console.log("protected route")
    const { token } = useAuth();
    const location = useLocation();

    // Se non c'è il token, reindirizza l'utente alla pagina di login.
    // Salviamo la posizione attuale in 'state' per poter reindirizzare
    // l'utente alla pagina che voleva visitare dopo il login.
    if (!token) {
        return <Navigate to="/login" replace state={{ from: location }} />;
    }

    // Se c'è il token, mostra il componente figlio (la pagina protetta).
    return children;
};

export default ProtectedRoute;