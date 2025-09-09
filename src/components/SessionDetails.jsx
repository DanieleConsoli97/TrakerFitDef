import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";
import { useEffect, useState } from "react";
import { Button, Card, CardBody, CardHeader, Chip } from "@heroui/react";
import { Icon } from "@iconify/react";

const SessionDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { detailsSessions } = useAuth();
  const [session, setSession] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mock data per dimostrazione - sostituire con dati reali del backend
  const mockSessionData = {
    sessionNumber: 1,
    date: 'venerdì 19 gennaio 2024',
    startTime: '18:30',
    endTime: '19:45',
    duration: '1h 15m',
    totalVolume: '5250kg',
    notes: 'Ottima sessione, energia alta',
    exercises: [
      {
        id: 1,
        name: 'Panca Piana',
        series: 4,
        reps: 8,
        weight: '80kg',
        volume: '2560kg',
        recovery: '3m 0s',
        notes: 'Form perfetta, aumentare peso la prossima volta'
      },
      {
        id: 2, 
        name: 'Squat',
        series: 4,
        reps: 10,
        weight: '100kg',
        volume: '4000kg',
        recovery: '4m 0s',
        notes: null
      },
      {
        id: 3,
        name: 'Rematore con Bilanciere', 
        series: 3,
        reps: 10,
        weight: '70kg',
        volume: '2100kg',
        recovery: '2m 0s',
        notes: null
      },
      {
        id: 4,
        name: 'Military Press',
        series: 3,
        reps: 8, 
        weight: '50kg',
        volume: '1200kg',
        recovery: '2m 30s',
        notes: null
      }
    ]
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

  return (
    <div className="min-h-screen bg-background p-4 space-y-6">
      {/* Back Button */}
      <div className="flex items-center gap-2">
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
                <h2 className="text-2xl font-semibold">Sessione #{mockSessionData.sessionNumber}</h2>
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
                  <span className="text-sm">{mockSessionData.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon icon="lucide:clock" className="w-4 h-4" />
                  <span className="text-sm">{mockSessionData.startTime} - {mockSessionData.endTime}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon icon="lucide:zap" className="w-4 h-4" />
                  <span className="text-sm">{mockSessionData.duration}</span>
                </div>
              </div>

              {/* Colored Stats Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {mockSessionData.exercises.length}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Esercizi</div>
                </div>

                <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {mockSessionData.exercises.reduce((total, ex) => total + ex.series, 0)}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Serie Totali</div>
                </div>

                <div className="text-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                    {mockSessionData.exercises.reduce((total, ex) => total + (ex.series * ex.reps), 0)}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Ripetizioni Totali</div>
                </div>

                <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                    {mockSessionData.totalVolume}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Volume allenamento</div>
                </div>
              </div>

              {/* Session Notes */}
              {mockSessionData.notes && (
                <div className="bg-default-50 rounded-lg p-4">
                  <div className="flex items-start gap-2">
                    <Icon icon="lucide:sticky-note" className="w-5 h-5 text-default-500 mt-0.5" />
                    <div>
                      <div className="text-sm text-default-500 mb-1">Note della sessione</div>
                      <div className="text-default-700">{mockSessionData.notes}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Exercises Section */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Esercizi ({mockSessionData.exercises.length})</h2>
        
        <div className="space-y-4">
          {mockSessionData.exercises.map((exercise, index) => (
            <Card key={exercise.id} className="bg-content1/50 border border-default-200">
              <CardBody className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">{index + 1}. {exercise.name}</h3>
                  </div>
                  <div className="flex gap-3 text-sm">
                    <Chip size="sm" color="primary" variant="flat">{exercise.series} serie</Chip>
                    <Chip size="sm" color="secondary" variant="flat">{exercise.reps} rip</Chip>
                    <Chip size="sm" color="success" variant="flat">{exercise.weight}</Chip>
                  </div>
                </div>

                {/* Exercise Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <Icon icon="lucide:layers" className="w-4 h-4 text-default-500" />
                    <div>
                      <div className="text-xs text-default-500">Serie</div>
                      <div className="font-semibold">{exercise.series}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Icon icon="lucide:repeat" className="w-4 h-4 text-default-500" />
                    <div>
                      <div className="text-xs text-default-500">Ripetizioni</div>
                      <div className="font-semibold">{exercise.reps}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Icon icon="lucide:weight" className="w-4 h-4 text-default-500" />
                    <div>
                      <div className="text-xs text-default-500">Peso</div>
                      <div className="font-semibold">{exercise.weight}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Icon icon="lucide:clock" className="w-4 h-4 text-default-500" />
                    <div>
                      <div className="text-xs text-default-500">Recupero</div>
                      <div className="font-semibold">{exercise.recovery}</div>
                    </div>
                  </div>
                </div>

                <div className="text-sm text-default-600 mb-3">
                  Volume: <span className="font-semibold">{exercise.volume}</span>
                </div>

                {/* Exercise Notes */}
                {exercise.notes && (
                  <div className="text-sm text-default-600">
                    <strong>Note</strong>
                    <div className="mt-1 italic">{exercise.notes}</div>
                  </div>
                )}
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
export default SessionDetails;