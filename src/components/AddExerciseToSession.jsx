import { useState, useRef } from "react";
import { Card, CardBody, Button, Select, SelectItem, Textarea } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useAuth } from "../contexts/AuthProvider";

const AddExerciseToSession = ({ sessionId, onExerciseAdded }) => {
  const { exercisesIndex, addExerciseToSession } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const exerciseSelectRef = useRef();
  const notesRef = useRef();

  const handleAddExercise = async () => {
    try {
      setLoading(true);
      setError(null);

      const selectedExerciseId = exerciseSelectRef.current?.value;
      const notes = notesRef.current?.value || "";

      if (!selectedExerciseId) {
        setError("Seleziona un esercizio");
        return;
      }

      const exerciseData = {
        esercizio_id: parseInt(selectedExerciseId),
        note: notes
      };

      await addExerciseToSession(sessionId, exerciseData);
      
      // Reset form
      if (exerciseSelectRef.current) exerciseSelectRef.current.value = "";
      if (notesRef.current) notesRef.current.value = "";
      
      // Notify parent component
      if (onExerciseAdded) {
        onExerciseAdded();
      }

    } catch (err) {
      console.error("Errore nell'aggiunta dell'esercizio:", err);
      setError("Errore durante l'aggiunta dell'esercizio. Riprova.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="bg-content1 border border-default-200">
      <CardBody className="p-6">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-violet-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <Icon icon="lucide:plus" className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-semibold">Aggiungi Esercizio</h3>
              <p className="text-sm text-default-500">Seleziona un esercizio da aggiungere a questa sessione</p>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-danger-50 dark:bg-danger-100/20 rounded-lg p-3 border border-danger-200 dark:border-danger-200/30">
              <div className="flex items-center gap-2">
                <Icon icon="lucide:alert-circle" className="w-4 h-4 text-danger-600" />
                <span className="text-sm text-danger-700 dark:text-danger-600">{error}</span>
              </div>
            </div>
          )}

          {/* Exercise Selection */}
          <div className="space-y-3">
            <Select
              ref={exerciseSelectRef}
              label="Seleziona Esercizio"
              placeholder="Scegli un esercizio..."
              isDisabled={loading || !exercisesIndex?.exercises}
              isRequired
            >
              {exercisesIndex?.exercises?.map((exercise) => (
                <SelectItem key={exercise.id} value={exercise.id}>
                  {exercise.nome}
                </SelectItem>
              ))}
            </Select>

            <Textarea
              ref={notesRef}
              label="Note (opzionale)"
              placeholder="Aggiungi note per questo esercizio..."
              minRows={2}
              maxRows={4}
              isDisabled={loading}
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <Button
              color="primary"
              onPress={handleAddExercise}
              isLoading={loading}
              isDisabled={!exercisesIndex?.exercises || loading}
              startContent={!loading && <Icon icon="lucide:plus" />}
              className="flex-1"
            >
              {loading ? "Aggiungendo..." : "Aggiungi alla Sessione"}
            </Button>
          </div>

          {/* Loading State for Exercises */}
          {!exercisesIndex && (
            <div className="text-center py-4">
              <Icon icon="lucide:loader-2" className="w-6 h-6 animate-spin mx-auto mb-2 text-default-400" />
              <p className="text-sm text-default-500">Caricamento esercizi...</p>
            </div>
          )}

          {/* Empty State */}
          {exercisesIndex?.exercises?.length === 0 && (
            <div className="text-center py-4">
              <Icon icon="lucide:dumbbell" className="w-8 h-8 mx-auto mb-2 text-default-300" />
              <p className="text-sm text-default-500">Nessun esercizio disponibile</p>
              <p className="text-xs text-default-400 mt-1">Aggiungi prima degli esercizi al database</p>
            </div>
          )}
        </div>
      </CardBody>
    </Card>
  );
};

export default AddExerciseToSession;