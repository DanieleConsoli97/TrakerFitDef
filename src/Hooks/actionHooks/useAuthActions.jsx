import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from '../useLocalStorage';

const SERVER_URL_DEV = import.meta.env.VITE_SERVER_URL_DEV;

const useAuthActions = () => {
    const navigate = useNavigate();
    const [token, setToken] = useLocalStorage('accessToken', null);
    const [refreshToken, setRefreshToken] = useLocalStorage('refreshToken', null);

    const fetchWithAuth = useCallback(async (endpoint, options = {}) => {
        // Leggiamo sempre l'ultimo token salvato e lo PARSIAMO
        const currentToken = JSON.parse(localStorage.getItem('accessToken'));

        const headers = { 'Content-Type': 'application/json', ...options.headers };
        if (currentToken) {
            headers['Authorization'] = `Bearer ${currentToken}`;
        }

        let response = await fetch(`${SERVER_URL_DEV}/api${endpoint}`, { ...options, headers });

        if (response.status === 401) {
            console.log("Token scaduto, tento il refresh...");
            try {
                // Leggiamo e PARSIAMO anche il refresh token per rimuovere le virgolette
                const currentRefreshToken = JSON.parse(localStorage.getItem('refreshToken'));
                if (!currentRefreshToken) throw new Error('Refresh token non disponibile.');

                const refreshResponse = await fetch(`${SERVER_URL_DEV}/api/auth/refresh-token`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ refreshToken: currentRefreshToken }), // Ora inviamo il token pulito
                });

                const refreshData = await refreshResponse.json();
                if (!refreshResponse.ok) throw new Error(refreshData.message || 'Refresh token non valido.');

                setToken(refreshData.accessToken);
                headers['Authorization'] = `Bearer ${refreshData.accessToken}`;

                response = await fetch(`${SERVER_URL_DEV}/api${endpoint}`, { ...options, headers });
            } catch (error) {
                console.error("Refresh fallito, logout forzato:", error);
                setToken(null);
                setRefreshToken(null);
                navigate('/login');
                return Promise.reject(error);
            }
        }

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || `Errore HTTP: ${response.status}`);
        }
        if (response.status === 204) return;
        return response.json();

    }, [navigate, setToken, setRefreshToken]);

    const loginAction = async (credentials) => {
        const response = await fetch(`${SERVER_URL_DEV}/api/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials),
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Errore login');
        setToken(data.accessToken);
        setRefreshToken(data.refreshToken);
        navigate('/dashboard');
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

    return { loginAction, registerAction, logOutAction, token, refreshToken, fetchWithAuth };
};

export default useAuthActions;