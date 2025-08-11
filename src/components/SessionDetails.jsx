// Session.jsx
import { useParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";
import { useEffect, useState } from "react";
import { useRef } from "react";
import { Accordion, AccordionItem, Button } from "@heroui/react";
import ExerciseItem from "./ExerciseItem"; // Importa il componente ExerciseItem
import { Calendar1, ChevronLeft } from "lucide-react";
import { Input, Select, SelectItem } from "@heroui/react";
import { Icon } from "@iconify/react";

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


      <div className="md:container mt-4 space-y-4 md:p-6 p-2  ">

        <div className="md:p-6  ">
          <button className="flex items-center text-2xl font-bold mb-5"><ChevronLeft /> Torna alle sessioni</button>
          <h1 className="text-2xl font-bold mb-4">{session.note}</h1>
          <p className="flex items-center text-2xl ">
            <strong className="flex items-center text-2xl font-bold mb-5"> <Calendar1 className="mr-2" />  {new Date(session.data_sessione).toLocaleDateString("it-IT")} </strong>

          </p>
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
                    }<span className="text-sm"> kg</span>
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

          <div className=" dark:bg-violet-900 light:bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-xl border border-violet-700/30 dark:border-violet-700/30 light:border-gray-200">
            <div className="space-y-6">
              {/* Header con icona */}
              <div className="flex items-center justify-center space-x-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-violet-500 to-purple-600 dark:from-violet-400 dark:to-purple-500 light:from-blue-500 light:to-indigo-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 " fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                  </svg>
                </div>
                <div className="text-center">
                  <h2 className="text-lg sm:text-xl lg:text-2xl font-bold  dark:text-white light:text-gray-900">
                    Aggiungi Esercizio
                  </h2>
                  <p className=" dark:text-violet-200 light:text-gray-600 text-sm sm:text-base hidden sm:block">
                    Seleziona un esercizio per questa sessione
                  </p>
                </div>
              </div>

              {/* Content Area */}
              <div className="space-y-4 sm:space-y-6">
                {/* Loading States */}
                {(sessionsIndex === undefined || exercisesIndex === undefined) && (
                  <div className="text-center py-6 sm:py-8">
                    <div className="inline-flex items-center space-x-3  dark:text-violet-200 light:text-gray-600">
                      <div className="w-5 h-5 sm:w-6 sm:h-6 border-2 sm:border-3 border-violet-300 dark:border-violet-300 light:border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                      <span className="text-sm sm:text-base font-medium">
                        {sessionsIndex === undefined ? "Caricamento sessioni..." : "Caricamento esercizi..."}
                      </span>
                    </div>
                  </div>
                )}

                {/* Error States */}
                {(sessionsIndex === null || exercisesIndex === null) && (
                  <div className="text-center p-4 bg-red-500/10 dark:bg-red-500/10 light:bg-red-50 rounded-xl sm:rounded-2xl border border-red-400/30 dark:border-red-400/30 light:border-red-200 backdrop-blur-sm">
                    <div className="flex items-center justify-center space-x-2">
                      <svg className="w-5 h-5 text-red-400 dark:text-red-400 light:text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="text-red-300 dark:text-red-300 light:text-red-600 text-sm sm:text-base font-medium">
                        {sessionsIndex === null ? "Errore nel caricamento delle sessioni" : "Errore nel caricamento degli esercizi"}
                      </p>
                    </div>
                  </div>
                )}

                {/* Exercise Selection */}
                {exercisesIndex && (
                  <div className="space-y-4 sm:space-y-6">
                    <div className="space-y-3">
                      <label className="block text-sm font-semibold dark:text-violet-200 light:text-gray-700 uppercase tracking-wider text-center sm:text-left">
                        Seleziona Esercizio
                      </label>
                      <Select
                        className="w-full px-4 sm:px-5 py-3 sm:py-4 
                         bg-white/10 dark:bg-white/10 light:bg-gray-50 
                         backdrop-blur-sm border-2 
                         border-violet-500/30 dark:border-violet-500/30 light:border-gray-300 
                         rounded-xl sm:rounded-2xl 
                          dark:text-white light:text-gray-900 
                         font-medium focus:outline-none 
                         focus:ring-4 focus:ring-violet-400/50 dark:focus:ring-violet-400/50 light:focus:ring-blue-400/50 
                         focus:border-violet-400 dark:focus:border-violet-400 light:focus:border-blue-500 
                         transition-all duration-200 cursor-pointer 
                         hover:bg-white/15 dark:hover:bg-white/15 light:hover:bg-gray-100 
                         shadow-lg text-sm sm:text-base"
                        ref={exercisesValue}
                        defaultValue=""
                        label="Scegli un esercizio..."

                      >
                        <SelectItem value="" disabled className="bg-violet-800 dark:bg-violet-800 light:bg-gray-100 text-violet-300 dark:text-violet-300 light:text-gray-500">
                          Scegli un esercizio...
                        </SelectItem>
                        {exercisesIndex?.exercises.map((e) => (
                          <SelectItem key={e.id} value={e.id} className="bg-violet-800 dark:bg-violet-800 light:bg-white text-white dark:text-white light:text-gray-900 py-2">
                            {e.nome}
                          </SelectItem>
                        ))}
                      </Select>
                    </div>

                    {/* Add Button */}
                    <Button
                      className="group relative overflow-hidden w-full 
                       bg-gradient-to-r from-violet-500 to-purple-600 
                       dark:from-violet-500 dark:to-purple-600 
                       light:from-blue-500 light:to-indigo-600 
                       text-white px-4 sm:px-6 py-3 sm:py-4 
                       rounded-xl sm:rounded-2xl font-semibold 
                       shadow-xl hover:shadow-2xl 
                       transform hover:scale-95 transition-all duration-300 
                       active:scale-85 border-0 text-sm sm:text-base lg:text-lg"
                      onClick={handleAddExe}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r 
                            from-violet-400 to-purple-500 
                            dark:from-violet-400 dark:to-purple-500 
                            light:from-blue-400 light:to-indigo-500 
                            opacity-0 group-hover:opacity-100 
                            transition-opacity duration-300"></div>
                      <div className="relative flex items-center justify-center space-x-2 sm:space-x-3">
                        <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-white bg-opacity-20 flex items-center justify-center group-hover:rotate-90 transition-transform duration-300">
                          <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                          </svg>
                        </div>
                        <span>Aggiungi alla Sessione</span>
                        <div className="w-2 h-2 bg-white bg-opacity-40 rounded-full group-hover:scale-150 transition-transform duration-300"></div>
                      </div>
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {session.esercizi && session.esercizi.length > 0 ? (
            <div className="mt-4">
              <div>
                <h2 className="text-xl font-semibold mb-2">Esercizi</h2>
              </div>

              <div className="max-h-[600px]  overflow-y-auto">
                <Accordion className="p-0 " variant="splitted">
                  {session.esercizi.map((esercizio, index) => (
                    <AccordionItem  key={esercizio.workoutExerciseId} aria-label={esercizio.nomeEsercizio?.trim() || `Esercizio ${index + 1}`} title={esercizio.nomeEsercizio || `Esercizio ${index + 1}`}>
                      <ExerciseItem
                        esercizio={esercizio}
                        sessionId={id}
                        fetchSessionDetails={fetchSessionDetails}
                        addSetToWorkoutExercise={addSetToWorkoutExercise}
                        setError={setError}
                      />
                    </AccordionItem>
                  ))}
                </Accordion>
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