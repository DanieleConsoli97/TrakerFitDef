import { createContext, useContext, } from 'react';
import useAuthActions from '../Hooks/actionHooks/useAuthActions';
import useSessionsAction from '../Hooks/actionHooks/useSessionsAction';
import useExercisesAction from '../Hooks/actionHooks/useExerciseAction';
import useSessions from '../Hooks/useSessions';
const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {


    const { loginAction, registerAction, logOutAction, token, refreshToken } = useAuthActions();
    const { sessionsIndex,fetchSessions } = useSessionsAction(token);
    const { exercisesIndex, addExerciseToSession, addSetToWorkoutExercise } = useExercisesAction(token);
    const { detailsSessions,addNewSession } = useSessions(token)

    const contextValue = {
        token, // L'accessToken per le chiamate API
        refreshToken, // Il refreshToken se ci servirà in futuro
        loginAction,
        logOutAction,
        registerAction,
        isAuthenticated: !!token,// Booleano che indica se l'utente è autenticato
        sessionsIndex,
        exercisesIndex,
        addExerciseToSession,
        addSetToWorkoutExercise,
        detailsSessions,
        addNewSession,
        fetchSessions
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