import React, { useState } from 'react';
import { Button } from '@heroui/react';
// Componente separato per gestire ogni esercizio
const ExerciseItem = ({ esercizio, sessionId, fetchSessionDetails, addSetToWorkoutExercise, setError }) => {
  const [serie, setSerie] = useState(0);
  const [ripetizioni, setRipetizioni] = useState(0);
  const [peso, setPeso] = useState(0);

  const handleAddSet = async () => {
    try {
      const data = {
        "serie_num": serie,
        "ripetizioni": ripetizioni,
        "peso": peso
      };

      await addSetToWorkoutExercise(sessionId, esercizio.workoutExerciseId, data);
      await fetchSessionDetails();
    } catch (error) {
      console.log(error);
      setError("Errore durante l'aggiunta del set");
    }
  };

  return (
    <div className=" flex items-center justify-between p-4 mb-4  rounded-lg border shadow-sm">
      <div>
        <p>id: {esercizio.workoutExerciseId}</p>
        <p className="font-bold text-lg mb-1">
          Esercizio: {esercizio.nomeEsercizio}
        </p>
        <p>
          <strong>Gruppo muscolare:</strong> {esercizio.gruppo_muscolare}
        </p>
        {esercizio.noteEsercizio && (
          <p>
            <strong>Note Esercizio:</strong> {esercizio.noteEsercizio}
          </p>
        )}

        {esercizio.sets && esercizio.sets.length > 0 ? (
          <div className="mt-2 pl-4 border-l-2 border-gray-200">
            <h3 className="font-semibold mb-1">Serie:</h3>
            {esercizio.sets.map((set, setIndex) => (
              <p key={setIndex} className="text-sm">
                Serie {set.serie_num}: {set.ripetizioni} rip. @ {set.peso} kg
              </p>
            ))}
          </div>
        ) : (
          <p className="mt-2 text-sm text-gray-500">Nessuna serie registrata per questo esercizio.</p>
        )}

        <div className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Serie</label>
            <input
              type="number"
              value={serie}
              onChange={(e) => setSerie(parseInt(e.target.value) || 0)}
              className="w-full p-2 border rounded"
              min="0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Ripetizioni</label>
            <input
              type="number"
              value={ripetizioni}
              onChange={(e) => setRipetizioni(parseInt(e.target.value) || 0)}
              className="w-full p-2 border rounded"
              min="0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Peso (kg)</label>
            <input
              type="number"
              value={peso}
              onChange={(e) => setPeso(parseInt(e.target.value) || 0)}
              className="w-full p-2 border rounded"
              min="0"
              step="0.5"
            />
          </div>

          <div>
            <Button
              onClick={handleAddSet}
              className="w-full"
            >
              Aggiungi serie
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ExerciseItem;