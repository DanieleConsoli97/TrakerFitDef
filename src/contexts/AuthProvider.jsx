import React, { createContext, useContext } from 'react';
import useAuthActions from '../Hooks/useAuthActions';
import useSessionData from '../Hooks/useSessionData';
const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {


    const { loginAction, registerAction, logOutAction, token, refreshToken } = useAuthActions();
    const { sessionsIndex } = useSessionData(token);

    const contextValue = {
        token, // L'accessToken per le chiamate API
        refreshToken, // Il refreshToken se ci servirà in futuro
        loginAction,
        logOutAction,
        registerAction,
        isAuthenticated: !!token,// Booleano che indica se l'utente è autenticato
        sessionsIndex, // Dati delle sessioni recuperati
    };
    console.log(contextValue)
    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
}


const useAuth = () => {
    return useContext(AuthContext);
}

export { AuthProvider, useAuth }