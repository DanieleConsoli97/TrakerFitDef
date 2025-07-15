import React from 'react'
const SERVER_URL_DEV = import.meta.env.VITE_SERVER_URL_DEV;
const useExercise = (token) => {
    
    const userToken = token || localStorage.getItem('token'); // Prendi il token dall'argomento o da localStorage
    
    const indexExercises = async (page = 1) => {
        try {
            // Ho aggiunto il parametro 'page' per la paginazione
            const response = await fetch(`${SERVER_URL_DEV}/api/exercises?page=1&limit=100`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userToken}`
                }
            });

            // Leggiamo il corpo della risposta UNA SOLA VOLTA
            const data = await response.json();

            // Se la risposta non era OK, ora possiamo leggere il messaggio dall'oggetto 'data'
            if (!response.ok) {
                console.log(response)
                throw new Error(data.message || 'Errore durante il recupero delle esercizi');
            }

            // Il controllo sulla lunghezza ora viene fatto sull'array di dati effettivo
            if (data.exercises.length === 0) {
                // Non lanciamo un errore, ma restituiamo i dati vuoti,
                // così il componente può mostrare "Nessuna sessione trovata".
                return data;
            }
            return data;

        } catch (error) {
            console.error('Errore nel recupero esercizi:', error.message);
            throw error; // Rilanciamo l'errore per farlo gestire dal componente
        }
    };


    // Funzione helper per gestire la risposta



    // Chiamata per aggiungere un esercizio a una sessione, richiede il token
    const addExerciseToSession = async (sessionId, exerciseData) => {
        try {
            const response = await fetch(`${SERVER_URL_DEV}/api/sessions/${sessionId}/exercises`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userToken}`
                },
                body: JSON.stringify(exerciseData),
            })
            const data = await response.json()
            if (!response.ok) {
                console.log(response)
                throw new Error(data.message || 'Errore durante l inserimento dell esercizi');
            }
            return data.message

        } catch (error) {
            console.log(error)
        }


    };

    // Chiamata per aggiungere un set, richiede il token
    const addSetToWorkoutExercise = async ( sessionId, workoutExerciseId, setData) => {
        
        const response = await fetch(`${SERVER_URL_DEV}/api/sessions/${sessionId}/exercises/${workoutExerciseId}/sets`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userToken}`
            },
            body: JSON.stringify(setData),
        })
            const data = await response.json()
            if (!response.ok) {
                console.log(response)
                throw new Error(data.message || 'Errore durante l inserimento dell esercizi');
            }

            return data.message
    };
    return { indexExercises,addExerciseToSession,addSetToWorkoutExercise };
}
export default useExercise