import { useState, useEffect } from 'react';
// Importiamo le nostre funzioni API aggiornate
import { getAllExercises, addExerciseToSession, addSetToWorkoutExercise } from '../services/apiService';
// Importiamo useAuth per accedere al token
import { useAuth } from '../contexts/AuthProvider';
import { SelectItem } from '@heroui/react';



import { Input, Select, Button } from "@heroui/react";
import { Icon } from "@iconify/react";

function AddExerciseWithSetsForm({ sessionId, onComplete }) {
    // Otteniamo la funzione fetchWithAuth dal nostro contesto di autenticazione
    const { fetchWithAuth } = useAuth();

    // Gli stati del componente rimangono identici
    const [exerciseCatalog, setExerciseCatalog] = useState([]);
    const [selectedExerciseId, setSelectedExerciseId] = useState('');
    const [sets, setSets] = useState([{ serie_num: 1, ripetizioni: '', peso: '' }]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchExercises = async () => {
            if (!fetchWithAuth) return; // Non fare nulla se non c'è la funzione
            try {
                // Usiamo la funzione centralizzata che gestisce automaticamente i token
                const allExercises = await getAllExercises();
                setExerciseCatalog(allExercises);
            } catch (err) {
                setError("Impossibile caricare gli esercizi.", err);
            }
        };
        fetchExercises();
    }, [fetchWithAuth]); // L'effetto dipende dalla funzione fetchWithAuth

    // Le funzioni handleSetChange, handleAddSet, handleRemoveSet rimangono identiche

    const handleSetChange = (index, event) => {
        const newSets = [...sets];
        newSets[index][event.target.name] = event.target.value;
        setSets(newSets);
    };

    const handleAddSet = () => {
        setSets([...sets, { serie_num: sets.length + 1, ripetizioni: '', peso: '' }]);
    };

    const handleRemoveSet = (index) => {
        const newSets = sets.filter((_, i) => i !== index);
        const renumeratedSets = newSets.map((set, i) => ({ ...set, serie_num: i + 1 }));
        setSets(renumeratedSets);
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedExerciseId) {
            setError('Per favore, seleziona un esercizio.');
            return;
        }
        setIsSubmitting(true);
        setError('');

        try {
            // **FASE 1: Usiamo le funzioni API centralizzate che gestiscono automaticamente i token**
            const exerciseResponse = await addExerciseToSession(sessionId, {
                esercizio_id: selectedExerciseId
            });
            const { workoutExerciseId } = exerciseResponse;

            if (!workoutExerciseId) {
                throw new Error("La risposta del server non ha fornito un ID per l'esercizio nella sessione.");
            }

            // **FASE 2: Aggiungiamo i set usando le funzioni centralizzate**
            for (const set of sets) {
                if (set.ripetizioni && set.peso) {
                    await addSetToWorkoutExercise(sessionId, workoutExerciseId, set);
                }
            }

            alert('Esercizio e set aggiunti con successo!');
            if (onComplete) onComplete();

            // Resetta il form
            setSelectedExerciseId('');
            setSets([{ serie_num: 1, ripetizioni: '', peso: '' }]);

        } catch (err) {
            setError(err.message || "Si è verificato un errore imprevisto.");
        } finally {
            setIsSubmitting(false);
        }
    };

    // Il JSX del form rimane identico
    return (
        <form onSubmit={handleSubmit} style={{ border: '1px solid #ccc', padding: '16px', borderRadius: '8px' }}>
            {/* ... il tuo JSX per il form non cambia ... */}
            <h3>Aggiungi Esercizio alla Sessionef</h3>
            {error && <p style={{ color: 'red' }}>{error}</p>}

            <div>
                <label>Scegli Esercizio:</label>
                <Select value={selectedExerciseId} onChange={(e) => setSelectedExerciseId(e.target.value)} required>
                    <SelectItem value="">-- Seleziona un esercizio </SelectItem>
                    {exerciseCatalog.map(ex => (
                        <option key={ex.id} value={ex.id}>{ex.nome}</option>
                    ))}
                </Select>
            </div>

            <hr />

            <div>
                <label>Registra i Set:</label>
                {sets.map((set, index) => (
                    <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                        <span>Serie {set.serie_num}:</span>
                        <input type="number" name="ripetizioni" value={set.ripetizioni} onChange={(e) => handleSetChange(index, e)} placeholder="Reps" style={{ margin: '0 8px' }} />
                        <input type="number" step="0.25" name="peso" value={set.peso} onChange={(e) => handleSetChange(index, e)} placeholder="Peso (kg)" style={{ margin: '0 8px' }} />
                        {sets.length > 1 && <button type="button" onClick={() => handleRemoveSet(index)}>X</button>}
                    </div>
                ))}
                <button type="button" onClick={handleAddSet}>+ Aggiungi Set</button>
            </div>

            <hr />

            <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Salvataggio in corso...' : 'Salva Esercizio'}
            </button>
        </form>
    );
}

export default AddExerciseWithSetsForm;