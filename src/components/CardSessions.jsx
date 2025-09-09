import { Card, CardBody, Chip, Button } from "@heroui/react";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

export default function CardSessions({ sessions }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('it-IT', { 
      weekday: 'long',
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
  };

  // Calculate real session statistics from backend data
  const calculateSessionStats = (sessionData) => {
    if (!sessionData || !sessionData.esercizi) {
      return {
        totalExercises: 0,
        totalSets: 0,
        totalReps: 0,
        totalVolume: 0,
        exerciseNames: []
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

    // Get first few exercise names for display
    const exerciseNames = sessionData.esercizi.slice(0, 3).map(ex => ex.nomeEsercizio);
    if (sessionData.esercizi.length > 3) {
      exerciseNames.push(`+${sessionData.esercizi.length - 3} altri`);
    }

    return { totalExercises, totalSets, totalReps, totalVolume, exerciseNames };
  };

  return (
    <div className="space-y-4">
      {sessions?.map((session, index) => {
        const sessionStats = calculateSessionStats(session);
        
        return (
          <Card 
            key={session.id} 
            className="w-full bg-content1/50 border border-default-200 hover:shadow-lg transition-all duration-200"
          >
            <CardBody className="p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  {/* Header */}
                  <div className="flex items-center gap-2 mb-3">
                    <h2 className="text-xl font-semibold text-foreground">
                      {session.note || `Sessione #${session.id}`}
                    </h2>
                  </div>
                  
                  {/* Date and Time Info */}
                  <div className="flex items-center gap-6 text-default-600 mb-4">
                    <div className="flex items-center gap-2">
                      <Icon icon="lucide:calendar" className="w-4 h-4" />
                      <span className="text-sm">{formatDate(session.data_sessione)}</span>
                    </div>
                    {sessionStats.totalExercises > 0 && (
                      <>
                        <div className="flex items-center gap-2">
                          <Icon icon="lucide:dumbbell" className="w-4 h-4" />
                          <span className="text-sm">{sessionStats.totalExercises} esercizi</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Icon icon="lucide:layers" className="w-4 h-4" />
                          <span className="text-sm">{sessionStats.totalSets} serie</span>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Stats */}
                  <div className="flex items-center gap-6 mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-primary">{sessionStats.totalReps}</span>
                      <span className="text-sm text-default-600">ripetizioni</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-primary">{sessionStats.totalVolume.toLocaleString()}kg</span>
                      <span className="text-sm text-default-600">volume</span>
                    </div>
                  </div>

                  {/* Exercise Tags */}
                  {sessionStats.exerciseNames.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {sessionStats.exerciseNames.map((exerciseName, idx) => (
                        <Chip 
                          key={idx}
                          size="sm" 
                          variant="flat" 
                          color="default"
                          className="text-xs"
                        >
                          {exerciseName}
                        </Chip>
                      ))}
                    </div>
                  )}
                </div>

                {/* Navigation Arrow */}
                <Button
                  as={Link}
                  to={`/session/${session.id}`}
                  isIconOnly
                  variant="light"
                  size="lg"
                  className="ml-4"
                >
                  <Icon icon="lucide:chevron-right" className="w-5 h-5" />
                </Button>
              </div>
            </CardBody>
          </Card>
        );
      })}
      
      {/* Empty state */}
      {sessions?.length === 0 && (
        <div className="text-center py-12">
          <Icon icon="lucide:calendar-x" className="w-12 h-12 text-default-300 mx-auto mb-4" />
          <p className="text-default-500 text-lg">
            Nessuna sessione disponibile
          </p>
          <p className="text-default-400 text-sm mt-2">
            Inizia il tuo primo allenamento per vedere le tue sessioni qui
          </p>
        </div>
      )}
    </div>
  );
}