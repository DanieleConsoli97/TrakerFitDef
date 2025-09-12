import { useState, useEffect } from 'react';

const useMaxesAction = (fetchWithAuth) => {
    const [maxesIndex, setMaxes] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState({ text: '', type: '' });
    
    const fetchMaxes = async () => {
        try {
            setIsLoading(true);
            const maxes = await fetchWithAuth('/maxes');
            setMaxes(maxes);
        } catch (err) {
            console.error('Errore durante il recupero dei massimali:', err);
            setMessage({ text: 'Errore durante il caricamento dei massimali', type: 'error' });
        } finally {
            setIsLoading(false);
        }
    };

    const addNewMax = async (maxData) => {
        try {
            setIsLoading(true);
            await fetchWithAuth('/maxes', {
                method: 'POST',
                body: JSON.stringify(maxData),
            });
            setMessage({ text: 'Massimale registrato con successo!', type: 'success' });
            await fetchMaxes(); // Ricarica la lista
        } catch (error) {
            console.error('Errore durante la creazione del massimale:', error.message);
            setMessage({ text: error.message || 'Errore durante la registrazione del massimale', type: 'error' });
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const updateMax = async (id, maxData) => {
        try {
            setIsLoading(true);
            await fetchWithAuth(`/maxes/${id}`, {
                method: 'PUT',
                body: JSON.stringify(maxData),
            });
            setMessage({ text: 'Massimale aggiornato con successo!', type: 'success' });
            await fetchMaxes(); // Ricarica la lista
        } catch (error) {
            console.error('Errore durante l\'aggiornamento del massimale:', error.message);
            setMessage({ text: error.message || 'Errore durante l\'aggiornamento del massimale', type: 'error' });
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const deleteMax = async (id) => {
        try {
            setIsLoading(true);
            await fetchWithAuth(`/maxes/${id}`, {
                method: 'DELETE',
            });
            setMessage({ text: 'Massimale eliminato con successo!', type: 'success' });
            await fetchMaxes(); // Ricarica la lista
        } catch (error) {
            console.error('Errore durante l\'eliminazione del massimale:', error.message);
            setMessage({ text: error.message || 'Errore durante l\'eliminazione del massimale', type: 'error' });
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const clearMessage = () => {
        setMessage({ text: '', type: '' });
    };
    
    useEffect(() => {
        if (fetchWithAuth) {
            fetchMaxes();
        }
    }, [fetchWithAuth]);

    return { 
        maxesIndex,
        isLoading,
        message,
        fetchMaxes,
        addNewMax,
        updateMax,
        deleteMax,
        clearMessage
    };
};

export default useMaxesAction;