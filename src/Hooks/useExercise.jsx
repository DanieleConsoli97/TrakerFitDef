import { getAllExercises, addExerciseToSession, addSetToWorkoutExercise } from '../services/apiService';

const useExercise = () => {
    // Ora tutte le funzioni usano il servizio centralizzato che gestisce automaticamente l'autenticazione
    
    const indexExercises = async (page = 1) => {
        try {
            // La funzione getAllExercises usa fetchWithAuth internamente
            return await getAllExercises({ page, limit: 100 });
        } catch (error) {
            console.error('Errore nel recupero esercizi:', error.message);
            throw error;
        }
    };

    // Funzione per aggiungere un esercizio a una sessione
    const addExerciseToSessionHook = async (sessionId, exerciseData) => {
        try {
            // La funzione addExerciseToSession usa fetchWithAuth internamente
            return await addExerciseToSession(sessionId, exerciseData);
        } catch (error) {
            console.error('Errore durante l\'inserimento dell\'esercizio:', error.message);
            throw error;
        }
    };

    // Funzione per aggiungere un set
    const addSetToWorkoutExerciseHook = async (sessionId, workoutExerciseId, setData) => {
        try {
            // La funzione addSetToWorkoutExercise usa fetchWithAuth internamente
            return await addSetToWorkoutExercise(sessionId, workoutExerciseId, setData);
        } catch (error) {
            console.error('Errore durante l\'inserimento del set:', error.message);
            throw error;
        }
    };

    return { 
        indexExercises, 
        addExerciseToSession: addExerciseToSessionHook, 
        addSetToWorkoutExercise: addSetToWorkoutExerciseHook 
    };
};

export default useExercise;