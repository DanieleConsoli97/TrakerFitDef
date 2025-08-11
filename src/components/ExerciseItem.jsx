import React, { useState } from 'react';
import { Button } from '@heroui/react';

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
    <div className="p-3 mb-3 rounded-lg border shadow-sm">
      <div className="mb-2">

        <p className="text-sm ">
          {esercizio.gruppo_muscolare}
        </p>
        {esercizio.noteEsercizio && (
          <p className="text-xs italic">
            Note: {esercizio.noteEsercizio}
          </p>
        )}
      </div>

      {esercizio.sets && esercizio.sets.length > 0 ? (
        <div className="mb-3 space-y-2">
          {esercizio.sets.map((set, index) => (
            <div key={index} className="grid grid-cols-3 gap-2">
              <div className="text-center p-2 bg-green-50 rounded">
                <div className="text-lg font-bold text-green-600">
                  {set.serie_num}
                </div>
                <div className="text-xs text-gray-500">Serie</div>
              </div>

              <div className="text-center p-2 bg-orange-50 rounded">
                <div className="text-lg font-bold text-orange-600">
                  {set.ripetizioni}
                </div>
                <div className="text-xs text-gray-500">Ripetizioni</div>
              </div>

              <div className="text-center p-2 bg-purple-50 rounded">
                <div className="text-lg font-bold text-purple-600">
                  {set.peso}<span className="text-xs"> kg</span>
                </div>
                <div className="text-xs text-gray-500">Peso</div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-xs text-gray-400 mb-3">
          Nessuna serie registrata
        </p>
      )}

      <div className="flex flex-col sm:flex-row gap-2 items-end">
        {/* Container degli input (rimane sempre in linea) */}
        <div className="flex flex-row gap-2 w-full">
          {/* Input Serie */}
          <div className="flex-1">
            <label className="block text-xs font-medium text-gray-600 mb-1">Serie</label>
            <input
              type="number"
              value={serie}
              onChange={(e) => setSerie(parseInt(e.target.value) || 0)}
              className="w-full p-1 text-sm border rounded"
              min="0"
            />
          </div>

          {/* Input Ripetizioni */}
          <div className="flex-1">
            <label className="block text-xs font-medium text-gray-600 mb-1">Ripetizioni</label>
            <input
              type="number"
              value={ripetizioni}
              onChange={(e) => setRipetizioni(parseInt(e.target.value) || 0)}
              className="w-full p-1 text-sm border rounded"
              min="0"
            />
          </div>

          {/* Input Peso */}
          <div className="flex-1">
            <label className="block text-xs font-medium text-gray-600 mb-1">Peso (kg)</label>
            <input
              type="number"
              value={peso}
              onChange={(e) => setPeso(parseInt(e.target.value) || 0)}
              className="w-full p-1 text-sm border rounded"
              min="0"
              step="0.5"
            />
          </div>
        </div>

        {/* Pulsante Aggiungi (scende sotto su mobile) */}
        <div className="w-full sm:w-auto">
          <Button
            onClick={handleAddSet}
            className="w-full sm:w-auto py-1 text-sm"
            size="sm"
          >
            Aggiungi
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ExerciseItem;