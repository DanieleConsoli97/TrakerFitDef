// src/services/apiService.js
// Servizio API centralizzato per gestire tutte le richieste HTTP
// Include il refresh automatico dei token JWT e la gestione dell'autenticazione

// URL base dell'API da variabile d'ambiente con fallback
const API_URL = import.meta.env.VITE_SERVER_URL_DEV || 'http://localhost:3000/api';

/**
 * Funzione interceptor HTTP che wrappa fetch nativo con autenticazione
 * Gestisce automaticamente il refresh del JWT quando l'access token scade (errore 401)
 * @param {string} endpoint - Percorso dell'endpoint API (es. '/users/me')
 * @param {object} options - Opzioni standard di fetch (method, body, headers, ecc.)
 * @returns {Promise} - Promise che risolve con la risposta JSON parsata
 */
async function fetchWithAuth(endpoint, options = {}) {
    // Recupera l'access token dal localStorage
    const token = localStorage.getItem('accessToken');

    // Prepara gli header con Content-Type e unisce eventuali header forniti
    const headers = {
        'Content-Type': 'application/json',
        ...options.headers,
    };

    // Aggiunge l'header Authorization se il token esiste
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    // Esegue la richiesta API iniziale
    let response = await fetch(`${API_URL}${endpoint}`, { ...options, headers });

    // Gestisce la scadenza del token (401 Unauthorized)
    if (response.status === 401) {
        console.log("Access token scaduto. Tentativo di refresh...");
        try {
            // Recupera il refresh token dal localStorage
            const storedRefreshToken = localStorage.getItem('refreshToken');
            if (!storedRefreshToken) throw new Error('Refresh token non disponibile.');

            // Fa il parsing del refresh token per rimuovere le virgolette extra
            const refreshToken = JSON.parse(storedRefreshToken);

            // Richiede un nuovo access token usando il refresh token
            const refreshResponse = await fetch(`${API_URL}/auth/refresh-token`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ refreshToken }),
            });

            const refreshData = await refreshResponse.json();
            if (!refreshResponse.ok) throw new Error('Refresh token non valido.');

            // Aggiorna il localStorage con il nuovo access token
            localStorage.setItem('accessToken', refreshData.accessToken);
            headers['Authorization'] = `Bearer ${refreshData.accessToken}`;

            // Riprova la richiesta originale con il nuovo token
            console.log("Ritento la richiesta originale...");
            response = await fetch(`${API_URL}${endpoint}`, { ...options, headers });
        } catch (error) {
            // Refresh fallito - forza logout e redirect al login
            console.error("Refresh fallito, logout forzato:", error);
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            window.location.href = '/login';
            return Promise.reject(error);
        }
    }

    // Gestisce le risposte non-2xx
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Errore HTTP: ${response.status}`);
    }

    // Gestisce le risposte 204 No Content
    if (response.status === 204) return;

    // Restituisce la risposta JSON parsata
    return response.json();
}


// === Funzioni API Esportate ===

// --- Autenticazione ---
// Nota: login e register usano fetch diretto perché non necessitano di token
export const login = (credentials) =>
    fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
    }).then(res => res.json());

export const register = (userData) =>
    fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
    }).then(res => res.json());

export const logout = (refreshToken) =>
    fetch(`${API_URL}/auth/logout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken })
    });


// Ottiene il catalogo esercizi
export const getAllExercises = (options = {}) => {
    const params = new URLSearchParams();
    if (options.fetchAll) {
        params.append('fetchAll', 'true');
    } else {
        params.append('page', options.page || 1);
        params.append('limit', options.limit || 100);
    }
    return fetchWithAuth(`/exercises?${params.toString()}`);
};

// Aggiunge un esercizio a una sessione
export const addExerciseToSession = (sessionId, exerciseData) => {
    return fetchWithAuth(`/sessions/${sessionId}/exercises`, {
        method: 'POST',
        body: JSON.stringify(exerciseData),
    });
};

// Aggiunge un set a un esercizio in una sessione
export const addSetToWorkoutExercise = (sessionId, workoutExerciseId, setData) => {
    return fetchWithAuth(`/sessions/${sessionId}/exercises/${workoutExerciseId}/sets`, {
        method: 'POST',
        body: JSON.stringify(setData),
    });
};
// --- Utenti (protetto) ---
// Recupera il profilo dell'utente autenticato
export const getMyProfile = () => fetchWithAuth('/users/me');

// --- Sessioni (protetto) ---
// Recupera le sessioni dell'utente con paginazione
export const getMySessions = (page = 1, limit = 10) =>
    fetchWithAuth(`/sessions?page=${page}&limit=${limit}`);

// Esporta fetchWithAuth per uso nei custom hooks
export { fetchWithAuth };

// TODO: Aggiungi qui altre funzioni API necessarie per l'applicazione