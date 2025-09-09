import { Button, Card, CardBody } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useAuth } from "../contexts/AuthProvider";
import SessionsComponets from "../components/SessionsComponets";
import { useGlobalContext } from "../contexts/GlobalContext";
import { useRef, useEffect } from "react";
import dayjs from "dayjs";

export const Sessions = () => {
  const { sessionsIndex, addNewSession, fetchSessions } = useAuth();
  const { pageSession, setPageSession } = useGlobalContext();
  const noteSessione = useRef();

  // Effetto per ricaricare i dati quando cambia la pagina
  useEffect(() => {
    fetchSessions(pageSession);
  }, [pageSession, fetchSessions]);


  const handleAddSession = async () => {
    try {
      const note = noteSessione.current.value;
      const formattedDate = dayjs().format("YYYY-MM-DD");
      const data = {
        data_sessione: formattedDate,
        note,
      };
      await addNewSession(data);
      noteSessione.current.value = "";
      setPageSession((p) => p);
      console.log("Sessione aggiunta:", data);
      fetchSessions(pageSession);
    } catch (error) {
      console.error("Errore in handleAddSession", error);
    }
  };

  return (
    <div className="h-[calc(100vh-80px)] bg-background p-4 flex flex-col gap-6 ">
      {/* Sezione 1 - Aggiungi Sessione */}
      <Card className="bg-content1 border border-default-200 flex-shrink-0">
        <CardBody className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 rounded-xl flex items-center justify-center">
              <Icon icon="lucide:plus-circle" className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold">
                Nuova Sessione
              </h2>
              <p className="text-default-600 text-sm">
                Inizia il tuo allenamento di oggi
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            <div className="md:col-span-3">
              <label className="block text-default-700 text-sm font-medium mb-2">
                Note della sessione
              </label>
              <textarea
                ref={noteSessione}
                className="w-full p-3 rounded-lg bg-default-50 border border-default-200 text-default-700 placeholder-default-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder="Descrivi il tuo allenamento di oggi..."
                rows="2"
              />
            </div>
            <div className="md:col-span-1">
              <Button 
                color="primary"
                className="w-full font-semibold" 
                onClick={handleAddSession}
                startContent={<Icon icon="lucide:dumbbell" className="w-4 h-4" />}
              >
                Inizia Workout
              </Button>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Sezione 2 - Lista Workout */}
      <Card className="bg-content1 border border-default-200 flex-1 overflow-hidden min-h-0">
        <CardBody className="p-0 h-full flex flex-col">
          <div className="p-6 border-b border-default-200 flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-50 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                <Icon icon="lucide:calendar" className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h1 className="text-2xl font-semibold">
                  Le Tue Sessioni
                </h1>
                <p className="text-default-600 text-sm">
                  Visualizza e gestisci i tuoi allenamenti
                </p>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6 min-h-0">
            {sessionsIndex === undefined && (
              <div className="flex flex-col items-center justify-center py-12">
                <Icon icon="lucide:loader-2" className="w-8 h-8 animate-spin text-default-400 mb-4" />
                <p className="text-default-500">Caricamento sessioni...</p>
              </div>
            )}
            {sessionsIndex === null && (
              <div className="flex flex-col items-center justify-center py-12">
                <Icon icon="lucide:alert-circle" className="w-8 h-8 text-orange-600 dark:text-orange-400 mb-4" />
                <p className="text-orange-600 dark:text-orange-400">Errore nel caricamento delle sessioni</p>
              </div>
            )}
            {sessionsIndex && (
              <SessionsComponets sessions={sessionsIndex.sessions} />
            )}
          </div>

          {/* Paginazione */}
          {sessionsIndex && (
            <div className="p-6 border-t border-default-200 flex-shrink-0">
              <div className="flex justify-center items-center gap-3">
                <Button 
                  disabled={pageSession === 1} 
                  onClick={() => setPageSession(c => c - 1)}
                  variant="flat"
                  isIconOnly
                >
                  <Icon icon="lucide:chevron-left" className="w-4 h-4" />
                </Button>
                <span className="px-4 py-2 text-sm text-default-600">
                  Pagina {pageSession} di {sessionsIndex.totalPages}
                </span>
                <Button 
                  disabled={pageSession >= sessionsIndex.totalPages} 
                  onClick={() => setPageSession(c => c + 1)}
                  variant="flat"
                  isIconOnly
                >
                  <Icon icon="lucide:chevron-right" className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
};