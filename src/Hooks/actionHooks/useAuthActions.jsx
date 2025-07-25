
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from '../useLocalStorage';
const SERVER_URL_DEV= import.meta.env.VITE_SERVER_URL_DEV

const useAuthActions = () => {
     const navigate = useNavigate();
    // --- USA IL NUOVO HOOK! ---
    // Tutta la logica di localStorage è ora nascosta dentro useLocalStorage.
    // 'token' sarà automaticamente letto/scritto da/nel localStorage con la chiave 'accessToken'.
    const [token, setToken] = useLocalStorage('accessToken', null);
    const [refreshToken, setRefreshToken] = useLocalStorage('refreshToken', null);
    
    const loginAction = async (credentials) => {
        try {

            const response = await fetch(`${SERVER_URL_DEV}/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Errore durante il login');
            }

            const data = await response.json();
            setToken(data.accessToken);
            setRefreshToken(data.refreshToken);
            navigate('/dashboard');
        } catch (error) {
            console.error('Errore login:', error.message);
            // Qui puoi gestire un errore globale o restituirlo al componente
            throw error;
        }
    };

    const registerAction = async (formData) => {
        try {
            const response = await fetch(`${SERVER_URL_DEV}/api/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Errore durante la registrazione');
            }

            const data = await response.json();

            // Se il server restituisce token dopo la registrazione, puoi loggare subito:
            setToken(data.accessToken);
            setRefreshToken(data.refreshToken);
            navigate('/dashboard');
        } catch (error) {
            console.error('Errore registrazione:', error.message);
            throw error;
        }
    };
    const logOutAction = async () => {

        try {
            const response = await fetch(`${SERVER_URL_DEV}/api/auth/logout`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ "refreshToken": refreshToken }),
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Errore durante il logout');
            } else {
                console.log('Logout riuscito, refresh token eliminato dal server.');
            }

            // Impostando i token a null, il nostro hook useLocalStorage
            // si occuperà di rimuoverli dal localStorage.
            setToken(null);
            setRefreshToken(null);
            navigate('/login');
        } catch (error) {
            console.error('Errore logout:', error.message);
            // Qui puoi gestire un errore globale o restituirlo al componente
            throw error;
        }


        
    }
    return {loginAction, registerAction, logOutAction,token, refreshToken} 
}

export default useAuthActions