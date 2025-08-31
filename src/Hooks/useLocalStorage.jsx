import { useState, useEffect } from 'react';

export function useLocalStorage(key, initialValue) {
    const [value, setValue] = useState(() => {
        try {
            const item = localStorage.getItem(key);
            if (item === null || typeof item === 'undefined' || item === "undefined") {
                return initialValue instanceof Function ? initialValue() : initialValue;
            }
            return JSON.parse(item);
        } catch (error) {
            console.error(`Errore nel parsing del localStorage per la chiave "${key}"`, error);
            return initialValue instanceof Function ? initialValue() : initialValue;
        }
    });

    useEffect(() => {
        try {
            if (value === undefined || value === null) {
                localStorage.removeItem(key);
            } else {
                localStorage.setItem(key, JSON.stringify(value));
            }
        } catch (error) {
            console.error(`Errore nel salvare nel localStorage per la chiave "${key}"`, error);
        }
    }, [key, value]);

    return [value, setValue];
}