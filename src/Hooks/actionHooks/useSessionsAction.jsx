import { useState, useEffect } from 'react';
import { useGlobalContext } from '../../contexts/GlobalContext';
import { useAuth } from '../../contexts/AuthProvider';

const useSessionsAction = () => {
    const { fetchWithAuth } = useAuth();
    const {pageSession}=useGlobalContext()
    const [sessionsIndex, setSessions] = useState();
    
    const fetchSessions = async () => {
            try {
                if(sessionsIndex){
                  if(pageSession>sessionsIndex.totalPages){
                    return
                }  
                }
                // Usa il fetchWithAuth centralizzato per ottenere le sessioni
                const sessions = await fetchWithAuth(`/sessions?page=${pageSession}&limit=10`);
                setSessions(sessions);
            } catch (err) {
                console.error(err);
            }
        };

    const addExerciseToSession = async (sessionId, exerciseData) => {
        try {
            return await fetchWithAuth(`/sessions/${sessionId}/exercises`, {
                method: 'POST',
                body: JSON.stringify(exerciseData),
            });
        } catch (error) {
            console.error('Errore durante l\'inserimento dell\'esercizio:', error.message);
            throw error;
        }
    };

    const addSetToWorkoutExercise = async (sessionId, workoutExerciseId, setData) => {
        try {
            return await fetchWithAuth(`/sessions/${sessionId}/exercises/${workoutExerciseId}/sets`, {
                method: 'POST',
                body: JSON.stringify(setData),
            });
        } catch (error) {
            console.error('Errore durante l\'inserimento del set:', error.message);
            throw error;
        }
    };
    
    useEffect(() => {
        if (fetchWithAuth) {
            fetchSessions();
        }
    }, [fetchWithAuth, pageSession]);

    return { 
        sessionsIndex,
        fetchSessions,
        addExerciseToSession,
        addSetToWorkoutExercise
    }
};

export default useSessionsAction;