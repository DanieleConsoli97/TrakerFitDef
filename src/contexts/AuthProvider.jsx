import React, { createContext, useContext } from 'react';
import useAuthActions from '../Hooks/useAuthActions';
import useSessions from '../Hooks/useSessions';
const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {


    const { loginAction, registerAction, logOutAction, token, refreshToken } = useAuthActions();
    const { indexSessions } = useSessions();

    const contextValue = {
        token, // L'accessToken per le chiamate API
        refreshToken, // Il refreshToken se ci servirà in futuro
        loginAction,
        logOutAction,
        registerAction,
        isAuthenticated: !!token,// Booleano che indica se l'utente è autenticato
        indexSessions
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