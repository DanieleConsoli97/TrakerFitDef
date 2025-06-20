import React, { createContext, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from '../hooks/useLocalStorage';

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const navigate = useNavigate();

    // --- USA IL NUOVO HOOK! ---
    // Tutta la logica di localStorage è ora nascosta dentro useLocalStorage.
    // 'token' sarà automaticamente letto/scritto da/nel localStorage con la chiave 'accessToken'.
    const [token, setToken] = useLocalStorage('accessToken', null);
    const [refreshToken, setRefreshToken] = useLocalStorage('refreshToken', null);

    // La nostra logica di business ora è molto più pulita.
    // Si preoccupa solo di impostare lo stato, non di come viene salvato.
    const loginAction = (data) => {
        setToken(data.accessToken);
        setRefreshToken(data.refreshToken);
        navigate('/dashboard');
    };

    const logOutAction = () => {
        // Impostando i token a null, il nostro hook useLocalStorage
        // si occuperà di rimuoverli dal localStorage.
        setToken(null);
        setRefreshToken(null);
        navigate('/login');
    };

    const contextValue = {
        token, // L'accessToken per le chiamate API
        refreshToken, // Il refreshToken se ci servirà in futuro
        loginAction,
        logOutAction
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
}


const useAuth = () => {
    return useContext(AuthContext);
}

export  {AuthProvider, useAuth}