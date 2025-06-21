// Il tuo hook, ma corretto e funzionante
const SERVER_URL_DEV = import.meta.env.VITE_SERVER_URL_DEV;

const useSessions = () => {
    const indexSessions = async (token, page = 1) => {
        try {
            // Ho aggiunto il parametro 'page' per la paginazione
            const response = await fetch(`${SERVER_URL_DEV}/api/sessions`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            // Leggiamo il corpo della risposta UNA SOLA VOLTA
            const data = await response.json();

            // Se la risposta non era OK, ora possiamo leggere il messaggio dall'oggetto 'data'
            if (!response.ok) {
                throw new Error(data.message || 'Errore durante il recupero delle sessioni');
            }
            
            // Il controllo sulla lunghezza ora viene fatto sull'array di dati effettivo
            if (data.sessions.length === 0) {
                // Non lanciamo un errore, ma restituiamo i dati vuoti,
                // così il componente può mostrare "Nessuna sessione trovata".
                return data; 
            }
            console.log(data)
            return data;

        } catch (error) {
            console.error('Errore nel recupero sessioni:', error.message);
            throw error; // Rilanciamo l'errore per farlo gestire dal componente
        }
    };
    return { indexSessions };
};

export default useSessions;