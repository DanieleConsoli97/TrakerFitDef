// Session.jsx
import { useParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";
import { useEffect, useState } from "react";
import { useRef } from "react";
import { Button } from "@heroui/react";
import ExerciseItem from "./ExerciseItem"; // Importa il componente ExerciseItem

const SessionDetails = () => {
  const { id } = useParams();
  const { detailsSessions, sessionsIndex, exercisesIndex, addExerciseToSession, addSetToWorkoutExercise } = useAuth();
  const [session, setSession] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const exercisesValue = useRef();

  // Funzione per caricare i dettagli della sessione
  const fetchSessionDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await detailsSessions(id);
      setSession(data);
    } catch (err) {
      console.error("Errore nel recupero dei dettagli della sessione:", err);
      setError("Impossibile caricare i dettagli della sessione.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchSessionDetails();
    }
  }, [id, detailsSessions]);

  const handleAddExe = async () => {
    try {
      const exercisesId = exercisesValue.current.value;
      console.log("id esercizio", exercisesId);

      const data = {
        "esercizio_id": parseInt(exercisesId),
        "note": "Focus sulla fase negativa, 3 serie x 10 ripetizioni"
      };

      // Aggiungi l'esercizio alla sessione
      await addExerciseToSession(id, data);
      console.log("operazione riuscita");

      // Ricarica i dettagli della sessione per aggiornare l'interfaccia
      await fetchSessionDetails();
    } catch (error) {
      console.log(error);
      setError("Errore durante l'aggiunta dell'esercizio");
    }
  };

  if (loading) {
    return <p>Caricamento dettagli sessione...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!session) {
    return <p>Nessun dettaglio sessione trovato.</p>;
  }

  return (
    <>

      <h1 className="text-2xl font-bold">Dettaglio Sessione</h1>
      <div className="mt-4 space-y-4">
        <p>
          <strong>ID:</strong> {session.id}
        </p>
        <p>
          <strong>Data:</strong>{" "}
          {new Date(session.data_sessione).toLocaleDateString("it-IT")}
        </p>
        <p>
          <strong>Note:</strong> {session.note}
        </p>
        <div className="p-4">

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              {session.esercizi && session.esercizi.length > 0 ? (
                <>
                  <div className="text-2xl font-bold text-blue-600">{session.esercizi.length}</div>
                  <div className="text-sm text-gray-600">Esercizi</div>
                </>
              ) : (
                <>
                  <div className="text-2xl font-bold text-blue-600">0</div>
                  <div className="text-sm text-gray-600">Esercizi</div>
                </>
              )}

            </div>

            <div className="text-center p-4 bg-green-50 rounded-lg">
              {session.esercizi && session.esercizi.length > 0 ? (
                <>
                  <div className="text-2xl font-bold text-green-600">
                    {session.esercizi
                      .map(esercizio =>
                        (esercizio.sets || [])  // Fallback a array vuoto se sets non esiste
                          .reduce((sum, set) => sum + (set.serie_num || 0), 0)
                      )
                      .reduce((total, serieEsercizio) => total + serieEsercizio, 0)
                    }
                  </div>

                  <div className="text-sm text-gray-600">Serie Totali</div>
                </>
              ) : (
                <>
                  <div className="text-2xl font-bold text-green-600">
                    0
                  </div>

                  <div className="text-sm text-gray-600">Serie Totali</div>
                </>
              )}
            </div>

            <div className="text-center p-4 bg-orange-50 rounded-lg">
              {session.esercizi && session.esercizi.length > 0 ? (
                <>
                  <div className="text-2xl font-bold text-orange-600">
                    {session.esercizi
                      .map(esercizio =>
                        (esercizio.sets || []).reduce((sum, set) => sum + (set.ripetizioni || 0), 0)
                      )
                      .reduce((total, ripetizioniEsercizio) => total + ripetizioniEsercizio, 0)
                    }
                  </div>

                  <div className="text-sm text-gray-600">Ripetizioni Totali</div>
                </>
              ) : (
                <>
                  <div className="text-2xl font-bold text-orange-600">
                    0
                  </div>
                  <div className="text-sm text-gray-600">Ripetizioni Totali</div>
                </>
              )}
            </div>

            <div className="text-center p-4 bg-orange-50 rounded-lg">
              {session.esercizi && session.esercizi.length > 0 ? (
                <>
                  <div className="text-2xl font-bold text-purple-600">
                    {session.esercizi
                      .map(esercizio =>
                        (esercizio.sets || [])  // Fallback a array vuoto se sets non esiste
                          .reduce((vol, set) => vol + (set.ripetizioni * set.serie_num * set.peso), 0)
                      )
                      .reduce((total, ripetizioniEsercizio) => total + ripetizioniEsercizio, 0)
                    }
                  </div>

                  <div className="text-sm text-gray-600">Volume allenamento</div>
                </>
              ) : (
                <>
                  <div className="text-2xl font-bold text-purple-600">
                    0
                  </div>
                  <div className="text-sm text-gray-600">Volume allenamento</div>
                </>
              )}
            </div>

          </div>
          <div className="flex flex-col bg-violet-900 rounded-lg p-3 sm:p-4 min-h-[200px] lg:min-h-0">
            <h2 className="text-lg sm:text-xl font-bold text-center mb-3 sm:mb-4 text-white">
              Aggiungi un esercizio alla sessione
            </h2>
            <div className="flex-1 min-h-0">
              {sessionsIndex === undefined && (
                <p className="text-center text-violet-200">Caricamento...</p>
              )}
              {sessionsIndex === null && (
                <p className="text-center text-red-300">Errore nel caricamento delle sessioni</p>
              )}
              {exercisesIndex === undefined && (
                <p className="text-center text-violet-200">Caricamento...</p>
              )}
              {exercisesIndex === null && (
                <p className="text-center text-red-300">Errore nel caricamento degli esericizi</p>
              )}
              {exercisesIndex && (
                <select className="max-w-xs" ref={exercisesValue} defaultValue="">
                  <option value="" disabled>Scegli un esercizio</option>
                  {exercisesIndex?.exercises.map((e) => (
                    <option key={e.id} value={e.id}>{e.nome}</option>
                  ))}
                </select>
              )}

              <Button className="max-w-[120px]" onClick={handleAddExe}>
                Aggiungi esercizio
              </Button>
            </div>
          </div>

          {session.esercizi && session.esercizi.length > 0 ? (
            <div className="mt-4">
              <h2 className="text-xl font-semibold mb-2">Esercizi</h2>
              <div className="max-h-[600px] overflow-y-auto">
                {session.esercizi.map((esercizio) => (
                  <ExerciseItem
                    key={esercizio.workoutExerciseId}
                    esercizio={esercizio}
                    sessionId={id}
                    fetchSessionDetails={fetchSessionDetails}
                    addSetToWorkoutExercise={addSetToWorkoutExercise}
                    setError={setError}
                  />
                ))}
              </div>
            </div>
          ) : (
            <p className="text-gray-600">Nessun esercizio registrato per questa sessione.</p>
          )}
        </div>
      </div>
    </>
  );
}
export default SessionDetails;