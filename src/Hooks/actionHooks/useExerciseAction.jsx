import { useState, useEffect } from 'react';
import useExercise from '../useExercise';

const useSessionData = (token) => {

    const { indexExercises ,addExerciseToSession,addSetToWorkoutExercise} = useExercise(token);

    const [exercisesIndex, setExercises] = useState();
    useEffect(() => {
        const fetchExercises = async () => {
            try {
                const esercises= await indexExercises(token);
                console.log(esercises)
                setExercises(esercises);
            } catch (err) {
                console.error(err);
            }
        };

        if (token) {
            fetchExercises();
        }
    }, [token]);

    return { exercisesIndex,addExerciseToSession,addSetToWorkoutExercise}
};

export default useSessionData;