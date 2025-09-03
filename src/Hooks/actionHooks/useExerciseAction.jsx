import { useState, useEffect } from 'react';
import useExercise from '../useExercise';
import { useAuth } from '../../contexts/AuthProvider';

const useSessionData = () => {
    const { isAuthenticated } = useAuth();
    const { indexExercises, addExerciseToSession, addSetToWorkoutExercise } = useExercise();

    const [exercisesIndex, setExercises] = useState();
    useEffect(() => {
        const fetchExercises = async () => {
            try {
                // Non passiamo più il token, la funzione usa il sistema centralizzato
                const exercises = await indexExercises();
                console.log(exercises);
                setExercises(exercises);
            } catch (err) {
                console.error(err);
            }
        };

        if (isAuthenticated) {
            fetchExercises();
        }
    }, [isAuthenticated, indexExercises]);

    return { exercisesIndex,addExerciseToSession,addSetToWorkoutExercise}
};

export default useSessionData;