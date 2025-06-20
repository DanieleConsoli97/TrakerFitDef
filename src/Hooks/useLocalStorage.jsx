import { useState, useEffect } from 'react';

export function useLocalStorage(key, initialValue) {
    // Usiamo la forma "lazy initializer" di useState.
    // Questa funzione viene eseguita SOLO al primo render del componente.
    const [value, setValue] = useState(() => {
        try {
            const item = localStorage.getItem(key);
            // Se l'item non esiste (è null) o è esplicitamente la stringa "undefined",
            // allora restituisci il valore iniziale fornito all'hook.
            if (item === null || item === "undefined") {
                return initialValue instanceof Function ? initialValue() : initialValue;
            }
            // Se troviamo qualcosa, proviamo a fare il parsing.
            return JSON.parse(item);
        } catch (error) {

            // Se il parsing fallisce (es. dati corrotti), logghiamo l'errore
            // e restituiamo comunque il valore iniziale come fallback sicuro.
            console.error(`Errore nel parsing del localStorage per la chiave "${key}"`, error);
            return initialValue instanceof Function ? initialValue() : initialValue;

        }
    });

    // Usiamo useEffect per sincronizzare lo stato con localStorage quando 'value' cambia.
    useEffect(() => {
        try {
            // Se il valore è undefined, lo trattiamo come una richiesta di rimozione.
            if (value === undefined) {
                localStorage.removeItem(key);
            } else {
                localStorage.setItem(key, JSON.stringify(value));
            }
        } catch (error) {
            console.error(`Errore nel salvare nel localStorage per la chiave "${key}"`, error);
        }
    }, [key, value]); // L'effetto si riesegue solo se 'key' o 'value' cambiano

    return [value, setValue];
}