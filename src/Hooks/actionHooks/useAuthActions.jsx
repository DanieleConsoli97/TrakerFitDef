import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from '../useLocalStorage';
import { fetchWithAuth, setNavigationCallback, setTokenUpdateCallback, login, register, logout } from '../../services/apiService';


const useAuthActions = () => {
    const navigate = useNavigate();
    const [token, setToken] = useLocalStorage('accessToken', null);
    const [refreshToken, setRefreshToken] = useLocalStorage('refreshToken', null);

    // Imposta i callback per il servizio API centralizzato
    useEffect(() => {
        setNavigationCallback(navigate);
        setTokenUpdateCallback(setToken);
    }, [navigate, setToken]);

    // Wrapper per il fetchWithAuth centralizzato che gestisce automaticamente i token
    const fetchWithAuthWrapper = useCallback(async (endpoint, options = {}) => {
        return fetchWithAuth(endpoint, options);
    }, []);

    const loginAction = async (credentials) => {
        try {
            console.log('🚀 [LOGIN] Inizio login con credenziali:', { email: credentials.email });
            const response = await login(credentials);
            console.log('📡 [LOGIN] Risposta ricevuta:', response.status, response.statusText);
            
            const data = await response.json();
            console.log('📦 [LOGIN] Dati ricevuti:', data);
            
            if (!response.ok) throw new Error(data.message || 'Errore login');
            
            console.log('💾 [LOGIN] Salvataggio token in localStorage...');
            setToken(data.accessToken);
            setRefreshToken(data.refreshToken);
            
            console.log('🎯 [LOGIN] Redirect a dashboard...');
            navigate('/dashboard');
        } catch (error) {
            console.error('❌ [LOGIN] Errore login:', error.message);
            throw error;
        }
    };

    const registerAction = async (formData) => {
        try {
            const response = await register(formData);
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.message || 'Errore durante la registrazione');
            }

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
            const response = await logout(refreshToken);
            
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                console.warn('Errore durante il logout dal server:', errorData.message);
                // Non blocchiamo il logout lato client anche se il server fallisce
            } else {
                console.log('Logout riuscito, refresh token eliminato dal server.');
            }
        } catch (error) {
            console.warn('Errore chiamata logout server:', error.message);
            // Non blocchiamo il logout lato client anche se il server fallisce
        } finally {
            // Puliamo sempre i token lato client indipendentemente dalla risposta del server
            setToken(null);
            setRefreshToken(null);
            navigate('/login');
        }
    }

    return { loginAction, registerAction, logOutAction, token, refreshToken, fetchWithAuth: fetchWithAuthWrapper };
};

export default useAuthActions;