import { Card, CardBody, Chip, Button } from "@heroui/react";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

export default function CardSessions({ sessions }) {
  // Mock data for demonstration - replace with real backend data when available
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('it-IT', { 
      weekday: 'long',
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
  };

  const mockSessionData = (session, index) => ({
    ...session,
    sessionNumber: index + 1,
    startTime: '18:30',
    endTime: '19:45',
    duration: '1h 15m',
    exerciseCount: Math.floor(Math.random() * 5) + 3, // 3-7 exercises
    totalVolume: Math.floor(Math.random() * 3000) + 2000, // 2000-5000kg
    exercises: [
      'Panca Piana',
      'Squat', 
      'Rematore con Bilanciere',
      '+1 altri'
    ].slice(0, Math.floor(Math.random() * 3) + 2)
  });

  return (
    <div className="space-y-4">
      {sessions?.map((session, index) => {
        const sessionData = mockSessionData(session, index);
        
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
                      {session.note || `Sessione #${sessionData.sessionNumber}`}
                    </h2>
                  </div>
                  
                  {/* Date and Time Info */}
                  <div className="flex items-center gap-6 text-default-600 mb-4">
                    <div className="flex items-center gap-2">
                      <Icon icon="lucide:calendar" className="w-4 h-4" />
                      <span className="text-sm">{formatDate(session.data_sessione)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon icon="lucide:clock" className="w-4 h-4" />
                      <span className="text-sm">{sessionData.startTime} - {sessionData.endTime}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon icon="lucide:zap" className="w-4 h-4" />
                      <span className="text-sm">{sessionData.duration}</span>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center gap-6 mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-primary">{sessionData.exerciseCount}</span>
                      <span className="text-sm text-default-600">esercizi</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-primary">{sessionData.totalVolume}kg</span>
                      <span className="text-sm text-default-600">volume</span>
                    </div>
                  </div>

                  {/* Exercise Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {sessionData.exercises.map((exercise, idx) => (
                      <Chip 
                        key={idx}
                        size="sm" 
                        variant="flat" 
                        color="default"
                        className="text-xs"
                      >
                        {exercise}
                      </Chip>
                    ))}
                  </div>

                  {/* Notes - rimuoviamo dato che ora è nel titolo */}
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