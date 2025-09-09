import { useState, useCallback } from 'react';

// NOTA: Questo hook ora riceve la funzione fetchWithAuth come argomento
// per renderlo testabile e disaccoppiato dal contesto.
const useSessions = (fetchWithAuth) => {
    const [sessionsData, setSessionsData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchSessions = useCallback(async (page = 1) => {
        if (!fetchWithAuth) return; // Non fare nulla se la funzione non è pronta
        setIsLoading(true);
        setError(null);
        try {
            const data = await fetchWithAuth(`/sessions?page=${page}`);
            setSessionsData(data);
        } catch (err) {
            setError(err);
        } finally {
            setIsLoading(false);
        }
    }, [fetchWithAuth]);

    const detailsSessions = useCallback(async (sessionId) => {
        if (!fetchWithAuth) return;
        return fetchWithAuth(`/sessions/${sessionId}`);
    }, [fetchWithAuth]);

    const addNewSession = useCallback(async (sessionData) => {
        if (!fetchWithAuth) return;
        return fetchWithAuth('/sessions', {
            method: 'POST',
            body: JSON.stringify(sessionData),
        });
    }, [fetchWithAuth]);

    const addExerciseToSession = useCallback(async (sessionId, exerciseData) => {
        if (!fetchWithAuth) return;
        return fetchWithAuth(`/sessions/${sessionId}/exercises`, {
            method: 'POST',
            body: JSON.stringify(exerciseData),
        });
    }, [fetchWithAuth]);

    const addSetToWorkoutExercise = useCallback(async (sessionId, workoutExerciseId, setData) => {
        if (!fetchWithAuth) return;
        return fetchWithAuth(`/sessions/${sessionId}/exercises/${workoutExerciseId}/sets`, {
            method: 'POST',
            body: JSON.stringify(setData),
        });
    }, [fetchWithAuth]);

    return { 
        sessionsIndex: sessionsData, // Manteniamo il nome che usi
        isLoadingSessions: isLoading,
        errorSessions: error,
        fetchSessions,
        detailsSessions,
        addNewSession,
        addExerciseToSession,
        addSetToWorkoutExercise
    };
};

export default useSessions;