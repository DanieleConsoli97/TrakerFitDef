import { Card, CardBody, CardHeader, Progress } from "@heroui/react";
import { Icon } from "@iconify/react";
import { Button } from "@heroui/react";
import { useAuth } from "../contexts/AuthProvider";
import SessionsComponets from "../components/SessionsComponets";
import { useGlobalContext } from "../contexts/GlobalContext";

export const Sessions = () => {
    const { sessionsIndex, exercisesIndex, addSetToWorkoutExercise, addExerciseToSession, addNewSession, fetchSessions } = useAuth();
    const { pageSession, setPageSession } = useGlobalContext();
    
    return (
        <>
        {/* Sezione 1 - Lista Workout */}
        <div className="flex flex-col bg-violet-900 rounded-lg p-3 sm:p-4">
          <h1 className="text-xl sm:text-2xl font-bold text-center mb-3 sm:mb-4 text-white">
            Lista Workout 💪
          </h1>
          <div className="max-h-[300px] overflow-y-auto">
            {sessionsIndex === undefined && (
              <p className="text-center text-violet-200">Caricamento...</p>
            )}
            {sessionsIndex === null && (
              <p className="text-center text-red-300">Errore nel caricamento delle sessioni</p>
            )}
            {sessionsIndex && (
              <SessionsComponets sessions={sessionsIndex.sessions} />
            )}
          </div>
          {sessionsIndex && (
            <div className="flex justify-center items-center gap-2 mt-3">
              <Button disabled={pageSession === 1} onClick={() => setPageSession(c => c - 1)}>+</Button>
              <Button disabled={pageSession >= sessionsIndex.totalPages} onClick={() => setPageSession(c => c + 1)}>-</Button>
            </div>
          )}
        </div>
        <Card>
            <CardHeader>
                <h2 className="text-xl font-semibold">Statistiche Allenamento</h2>
            </CardHeader>
            <CardBody className="space-y-4">
                <div>
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">Sessioni Completate</span>
                        <span className="text-sm font-bold">8/10</span>
                    </div>
                    <Progress value={80} color="success" />
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <Icon icon="lucide:flame" className="text-danger mr-2" />
                        <span>Calorie Bruciate</span>
                    </div>
                    <span className="font-bold">2,500 kcal</span>
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <Icon icon="lucide:clock" className="text-primary mr-2" />
                        <span>Tempo Totale</span>
                    </div>
                    <span className="font-bold">12h 30m</span>
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <Icon icon="lucide:dumbbell" className="text-secondary mr-2" />
                        <span>Tipo Più Frequente</span>
                    </div>
                    <span className="font-bold">Allenamento Gambe</span>
                </div>
            </CardBody>
        </Card>
        </>
    );
};