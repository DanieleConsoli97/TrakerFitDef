import React, { createContext, useContext, useEffect } from 'react';
import useAuthActions from '../Hooks/actionHooks/useAuthActions';
import useSessions from '../Hooks/useSessions';
import useExercises from '../Hooks/useExercises';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    // 1. L'hook di autenticazione è il cuore di tutto
    const auth = useAuthActions();

    // 2. Gli hooks per i dati ricevono la funzione fetchWithAuth dall'hook di auth
    const sessions = useSessions(auth.fetchWithAuth);
    const exercises = useExercises(auth.fetchWithAuth);

    // Effetto per caricare i dati iniziali una volta che l'utente è autenticato
    useEffect(() => {
        // Se c'è un token e non abbiamo ancora caricato le sessioni
        if (auth.token && !sessions.sessionsIndex) {
            sessions.fetchSessions();
        }
        // Se c'è un token e non abbiamo ancora caricato gli esercizi
        if (auth.token && !exercises.exercisesIndex) {
            exercises.fetchExercises();
        }
    }, [auth.token, sessions.sessionsIndex, sessions.fetchSessions, exercises.exercisesIndex, exercises.fetchExercises]);

    // 3. Uniamo tutto in un unico grande oggetto per il contesto
    const contextValue = {
        ...auth, // token, refreshToken, loginAction, etc.
        ...sessions, // sessionsIndex, isLoadingSessions, fetchSessions, etc.
        ...exercises, // exercisesIndex, isLoadingExercises, fetchExercises, etc.
        isAuthenticated: !!auth.token
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}