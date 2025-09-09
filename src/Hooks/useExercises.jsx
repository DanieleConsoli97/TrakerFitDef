import { useState, useCallback } from 'react';

const useExercises = (fetchWithAuth) => {
    const [exercisesData, setExercisesData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchExercises = useCallback(async (page = 1) => {
        if (!fetchWithAuth) return;
        setIsLoading(true);
        setError(null);
        try {
            const data = await fetchWithAuth(`/exercises?page=${page}&limit=100`);
            setExercisesData(data);
        } catch (err) {
            setError(err);
            setExercisesData(null);
        } finally {
            setIsLoading(false);
        }
    }, [fetchWithAuth]);

    const getExerciseById = useCallback(async (exerciseId) => {
        if (!fetchWithAuth) return;
        return fetchWithAuth(`/exercises/${exerciseId}`);
    }, [fetchWithAuth]);

    return { 
        exercisesIndex: exercisesData,
        isLoadingExercises: isLoading,
        errorExercises: error,
        fetchExercises,
        getExerciseById
    };
};

export default useExercises;