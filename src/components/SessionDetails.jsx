// Session.jsx
import { useParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";
import { useEffect, useState } from "react";
import { useRef } from "react";
import { Button } from "@heroui/react";

const SessionDetails = () => {
  const { id } = useParams();
  const { detailsSessions, sessionsIndex, exercisesIndex, addExerciseToSession } = useAuth();
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
      <div className="p-4">
        <h1 className="text-2xl font-bold">Dettaglio Sessione</h1>
        <div className="mt-4 space-y-2">
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
              {session.esercizi.map((esercizio, index) => (
                <div key={index} className="border p-4 rounded-lg mb-4 shadow-sm">
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
                  <div>
                    <Button>Aggiungi una serie</Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">Nessun esercizio registrato per questa sessione.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default SessionDetails;