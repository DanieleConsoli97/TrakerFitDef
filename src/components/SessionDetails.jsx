import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";
import { useEffect, useState } from "react";
import { Button, Card, CardBody, CardHeader, Chip, Accordion, AccordionItem } from "@heroui/react";
import { Icon } from "@iconify/react";
import AddExerciseToSession from "./AddExerciseToSession";
import AddSetToExercise from "./AddSetToExercise";

const SessionDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { detailsSessions } = useAuth();
  const [session, setSession] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Funzioni per calcolare statistiche dai dati reali
  const calculateSessionStats = (sessionData) => {
    if (!sessionData || !sessionData.esercizi) {
      return {
        totalExercises: 0,
        totalSets: 0,
        totalReps: 0,
        totalVolume: 0
      };
    }

    const totalExercises = sessionData.esercizi.length;
    const totalSets = sessionData.esercizi.reduce((total, esercizio) => {
      return total + (esercizio.sets?.length || 0);
    }, 0);
    const totalReps = sessionData.esercizi.reduce((total, esercizio) => {
      return total + (esercizio.sets?.reduce((repsSum, set) => repsSum + (set.ripetizioni || 0), 0) || 0);
    }, 0);
    const totalVolume = sessionData.esercizi.reduce((total, esercizio) => {
      return total + (esercizio.sets?.reduce((volSum, set) => volSum + ((set.ripetizioni || 0) * (set.peso || 0)), 0) || 0);
    }, 0);

    return { totalExercises, totalSets, totalReps, totalVolume };
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('it-IT', { 
      weekday: 'long',
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
  };

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
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <Icon icon="lucide:loader-2" className="w-8 h-8 animate-spin mx-auto mb-4" />
          <p>Caricamento dettagli sessione...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center text-red-500">
          <Icon icon="lucide:alert-circle" className="w-8 h-8 mx-auto mb-4" />
          <p>{error}</p>
        </div>
      </div>
    );
  }

  const sessionStats = calculateSessionStats(session);

  return (
    <div className="bg-background p-4 space-y-6 max-w-7xl xl:max-w-[100rem] mx-auto">
      {/* Back Buttons */}
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          onPress={() => navigate("/dashboard")}
          startContent={<Icon icon="lucide:home" />}
          className="text-default-600"
        >
          Torna alla Dashboard
        </Button>
        <Button
          variant="ghost"
          onPress={() => navigate("/sessions")}
          startContent={<Icon icon="lucide:arrow-left" />}
          className="text-default-600"
        >
          Torna alle sessioni
        </Button>
      </div>

      {/* Page Title */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Dettagli Sessione</h1>
      </div>

      {/* Session Header Card */}
      <Card className="bg-content1 border border-default-200">
        <CardBody className="p-6">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-6">
                <h2 className="text-2xl font-semibold">
                  {session.note || `Sessione #${session.id}`}
                </h2>
                <Button 
                  size="sm" 
                  variant="flat" 
                  startContent={<Icon icon="lucide:edit" />}
                >
                  Modifica
                </Button>
              </div>

              {/* Date and Time Info */}
              <div className="flex items-center gap-6 text-default-600 mb-4">
                <div className="flex items-center gap-2">
                  <Icon icon="lucide:calendar" className="w-4 h-4" />
                  <span className="text-sm">{formatDate(session.data_sessione)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon icon="lucide:clock" className="w-4 h-4" />
                  <span className="text-sm">18:30 - 19:45</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon icon="lucide:zap" className="w-4 h-4" />
                  <span className="text-sm">1h 15m</span>
                </div>
              </div>

              {/* Colored Stats Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <Icon icon="lucide:dumbbell" className="w-6 h-6 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {sessionStats.totalExercises}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Esercizi</div>
                </div>

                <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <Icon icon="lucide:layers" className="w-6 h-6 text-green-600 dark:text-green-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {sessionStats.totalSets}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Serie Totali</div>
                </div>

                <div className="text-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                  <Icon icon="lucide:repeat" className="w-6 h-6 text-orange-600 dark:text-orange-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                    {sessionStats.totalReps}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Ripetizioni Totali</div>
                </div>

                <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <Icon icon="lucide:weight" className="w-6 h-6 text-purple-600 dark:text-purple-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                    {sessionStats.totalVolume.toLocaleString()}kg
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Volume allenamento</div>
                </div>
              </div>

              {/* Session Notes */}
              {session.note && (
                <div className="bg-default-50 rounded-lg p-4">
                  <div className="flex items-start gap-2">
                    <Icon icon="lucide:sticky-note" className="w-5 h-5 text-default-500 mt-0.5" />
                    <div>
                      <div className="text-sm text-default-500 mb-1">Note della sessione</div>
                      <div className="text-default-700">{session.note}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Add Exercise to Session */}
      <AddExerciseToSession 
        sessionId={id} 
        onExerciseAdded={fetchSessionDetails}
      />

      {/* Exercises Section */}
      {session.esercizi && session.esercizi.length > 0 ? (
        <div>
          <h2 className="text-xl font-semibold mb-4">Esercizi ({session.esercizi.length})</h2>
          
          <Accordion variant="splitted" className="px-0">
            {session.esercizi.map((esercizio, index) => {
              const exerciseVolume = esercizio.sets?.reduce((vol, set) => vol + ((set.ripetizioni || 0) * (set.peso || 0)), 0) || 0;
              const avgWeight = esercizio.sets?.length ? 
                (esercizio.sets.reduce((sum, set) => sum + (set.peso || 0), 0) / esercizio.sets.length).toFixed(0) : 0;
              const avgReps = esercizio.sets?.length ?
                (esercizio.sets.reduce((sum, set) => sum + (set.ripetizioni || 0), 0) / esercizio.sets.length).toFixed(0) : 0;
              
              return (
                <AccordionItem
                  key={esercizio.workoutExerciseId}
                  aria-label={`${index + 1}. ${esercizio.nomeEsercizio}`}
                  title={
                    <div className="flex justify-between items-center w-full">
                      <div className="flex items-center gap-3">
                        <span className="text-lg font-semibold">{index + 1}. {esercizio.nomeEsercizio}</span>
                      </div>
                      <div className="flex gap-2 text-sm">
                        <Chip size="sm" color="primary" variant="flat">{esercizio.sets?.length || 0} serie</Chip>
                        <Chip size="sm" color="secondary" variant="flat">{avgReps} rip</Chip>
                        <Chip size="sm" color="success" variant="flat">{avgWeight}kg</Chip>
                      </div>
                    </div>
                  }
              className="bg-content1/50 border border-default-200"
            >
              <div className="p-4 space-y-4">
                {/* Exercise Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex items-center gap-2">
                    <Icon icon="lucide:layers" className="w-4 h-4 text-default-500" />
                    <div>
                      <div className="text-xs text-default-500">Serie</div>
                      <div className="font-semibold">{esercizio.sets?.length || 0}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Icon icon="lucide:repeat" className="w-4 h-4 text-default-500" />
                    <div>
                      <div className="text-xs text-default-500">Media Ripetizioni</div>
                      <div className="font-semibold">{avgReps}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Icon icon="lucide:weight" className="w-4 h-4 text-default-500" />
                    <div>
                      <div className="text-xs text-default-500">Peso Medio</div>
                      <div className="font-semibold">{avgWeight}kg</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Icon icon="lucide:clock" className="w-4 h-4 text-default-500" />
                    <div>
                      <div className="text-xs text-default-500">Recupero</div>
                      <div className="font-semibold">2-3m</div>
                    </div>
                  </div>
                </div>

                <div className="text-sm text-default-600">
                  Volume: <span className="font-semibold">{exerciseVolume.toLocaleString()}kg</span>
                </div>

                {/* Sets Detail Table */}
                {esercizio.sets && esercizio.sets.length > 0 && (
                  <div className="bg-default-50 dark:bg-default-100/20 rounded-lg p-4">
                    <h4 className="text-sm font-semibold mb-3 text-default-700">Dettaglio Set</h4>
                    <div className="space-y-2">
                      {esercizio.sets.map((set, setIndex) => (
                        <div key={setIndex} className="flex items-center justify-between p-2 bg-content1 rounded border">
                          <div className="flex items-center gap-4 text-sm">
                            <div className="flex items-center gap-2">
                              <Icon icon="lucide:hash" className="w-3 h-3 text-default-400" />
                              <span className="font-medium">Set {set.serie_num || setIndex + 1}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Icon icon="lucide:repeat" className="w-3 h-3 text-default-400" />
                              <span>{set.ripetizioni} rip</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Icon icon="lucide:weight" className="w-3 h-3 text-default-400" />
                              <span>{set.peso}kg</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Icon icon="lucide:clock" className="w-3 h-3 text-default-400" />
                              <span>2m 30s</span>
                            </div>
                          </div>
                          <div className="text-sm text-default-500">
                            Vol: {((set.ripetizioni || 0) * (set.peso || 0)).toLocaleString()}kg
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Exercise Notes */}
                {esercizio.noteEsercizio && (
                  <div className="bg-warning-50 dark:bg-warning-100/20 rounded-lg p-3 border border-warning-200 dark:border-warning-200/30">
                    <div className="flex items-start gap-2">
                      <Icon icon="lucide:sticky-note" className="w-4 h-4 text-warning-600 mt-0.5" />
                      <div>
                        <div className="text-sm font-medium text-warning-800 dark:text-warning-600 mb-1">Note</div>
                        <div className="text-sm text-warning-700 dark:text-warning-600 italic">{esercizio.noteEsercizio}</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Add Set Component */}
                <AddSetToExercise 
                  sessionId={id}
                  workoutExerciseId={esercizio.workoutExerciseId}
                  onSetAdded={fetchSessionDetails}
                />
              </div>
                </AccordionItem>
              );
            })}
          </Accordion>
        </div>
      ) : (
        <div className="text-center py-12">
          <Icon icon="lucide:dumbbell" className="w-12 h-12 text-default-300 mx-auto mb-4" />
          <p className="text-default-500 text-lg">Nessun esercizio registrato per questa sessione.</p>
        </div>
      )}
    </div>
  );
}
export default SessionDetails;