// Il tuo hook, ma corretto e funzionante
const SERVER_URL_DEV = import.meta.env.VITE_SERVER_URL_DEV;

const useSessions = (token) => {

    const userToken = token || localStorage.getItem('token'); // Prendi il token dall'argomento o da localStorage

    const indexSessions = async (page,limit) => {

        try {
            // Ho aggiunto il parametro 'page' per la paginazione
            const response = await fetch(`${SERVER_URL_DEV}/api/sessions?page=${page}&limit=${limit}`, {
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

    const detailsSessions = async (id) => {
        console.log(userToken); // Per debug, puoi rimuoverlo in produzione
        try {
            const response = await fetch(`${SERVER_URL_DEV}/api/sessions/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userToken}`
                }
            });

            const data = await response.json();

            if (!response.ok) {
                // Se la risposta non è OK, il server ha inviato un errore.
                // Il messaggio di errore è direttamente in 'data.message'.
                throw new Error(data.message || 'Errore durante il recupero della sessione.');
            }

            // A questo punto, 'data' è direttamente l'oggetto della sessione (sessionDetails)
            // Non c'è bisogno di controllare data.sessions.length perché non è un array di sessioni.
            console.log("Dettagli sessione ricevuti:", data); // Per vedere la struttura esatta
            return data; // Restituisce l'oggetto sessione direttamente
        } catch (error) {
            console.error('Errore nel recupero dettagli sessione:', error.message);
            throw error; // Rilanciamo l'errore per farlo gestire dal componente SessionDetails
        }
    };
    const addNewSession = async (data) => {
        try {
            const response = await fetch(`${SERVER_URL_DEV}/api/sessions`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userToken}`
                },
                body: JSON.stringify(data),
            })
            return response
        } catch (error) {
            console.log(error)
        }
    }
    return { indexSessions, detailsSessions, addNewSession };
};


export default useSessions;