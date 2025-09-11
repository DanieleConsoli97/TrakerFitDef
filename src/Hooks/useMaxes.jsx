import { useState, useCallback } from 'react';

const useMaxes = (fetchWithAuth) => {
    const [maxesData, setMaxesData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchMaxes = useCallback(async () => {
        if (!fetchWithAuth) return;
        setIsLoading(true);
        setError(null);
        try {
            const data = await fetchWithAuth('/maxes');
            setMaxesData(data);
        } catch (err) {
            setError(err);
        } finally {
            setIsLoading(false);
        }
    }, [fetchWithAuth]);

    const addNewMax = useCallback(async (maxData) => {
        if (!fetchWithAuth) return;
        return fetchWithAuth('/maxes', {
            method: 'POST',
            body: JSON.stringify(maxData),
        });
    }, [fetchWithAuth]);

    const updateMax = useCallback(async (id, maxData) => {
        if (!fetchWithAuth) return;
        return fetchWithAuth(`/maxes/${id}`, {
            method: 'PUT',
            body: JSON.stringify(maxData),
        });
    }, [fetchWithAuth]);

    const deleteMax = useCallback(async (id) => {
        if (!fetchWithAuth) return;
        return fetchWithAuth(`/maxes/${id}`, {
            method: 'DELETE',
        });
    }, [fetchWithAuth]);

    return { 
        maxesIndex: maxesData,
        isLoadingMaxes: isLoading,
        errorMaxes: error,
        fetchMaxes,
        addNewMax,
        updateMax,
        deleteMax
    };
};

export default useMaxes;