import { Button, Card, CardBody, CardHeader, addToast } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useAuth } from "../contexts/AuthProvider";
import SessionsComponets from "../components/SessionsComponets";
import { useGlobalContext } from "../contexts/GlobalContext";
import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

export const Sessions = () => {
  const { sessionsIndex, addNewSession, fetchSessions } = useAuth();
  const { pageSession, setPageSession } = useGlobalContext();
  const navigate = useNavigate();
  const noteSessione = useRef();
  const [isAddingSession, setIsAddingSession] = useState(false);

  // Effetto per ricaricare i dati quando cambia la pagina
  useEffect(() => {
    fetchSessions(pageSession);
  }, [pageSession, fetchSessions]);


  const handleAddSession = async () => {
    try {
      setIsAddingSession(true);
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
      await fetchSessions(pageSession);

      // Mostra toast di successo
      addToast({
        type: "success",
        title: "Successo",
        message: "✨ Sessione aggiunta con successo!",
        timeout: 3000,
        shouldShowTimeoutProgress: true,
        color: "success"
      });
    } catch (error) {
      console.error("Errore in handleAddSession", error);
      addToast({
        type: "error",
        title: "Errore",
        message: "Errore durante l'aggiunta della sessione. Riprova.",
        timeout: 3000,
        shouldShowTimeoutProgress: true,
        color: "danger"
      });
    } finally {
      setIsAddingSession(false);
    }
  };

  return (
    <div className="h-[calc(100vh-80px)] bg-background p-4 flex flex-col gap-6 max-w-7xl xl:max-w-[100rem] mx-auto">
      {/* Back to Dashboard Button */}
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          onPress={() => navigate("/dashboard")}
          startContent={<Icon icon="lucide:arrow-left" />}
          className="text-default-600"
        >
          Torna alla Dashboard
        </Button>
      </div>


      {/* Sezione 1 - Aggiungi Sessione */}
      <Card className="bg-content1 border border-default-200 flex-shrink-0">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/20 rounded-xl flex items-center justify-center">
              <Icon icon="lucide:plus-circle" className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-default-800">Nuova Sessione</h3>
              <p className="text-xs text-default-500 mt-0.5">Inizia il tuo allenamento di oggi</p>
            </div>
          </div>
        </CardHeader>
        <CardBody className="pt-0 p-4">
          <div className="flex items-stretch gap-3 justify-between">
            {/* Parte sinistra: Textarea */}
            <div className="flex-1">
              <textarea
                ref={noteSessione}
                className="w-full h-12 p-3 rounded-lg bg-default-50 border border-default-200 text-default-700 placeholder-default-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder={isAddingSession ? "Aggiungendo sessione..." : "Aggiungi note per la nuova sessione..."}
                rows="1"
                disabled={isAddingSession}
              />
            </div>

            {/* Parte destra: Bottone */}
            <div className="flex-shrink-0">
              <Button
                color="primary"
                className="font-semibold px-6 h-12"
                onClick={handleAddSession}
                isLoading={isAddingSession}
                isDisabled={isAddingSession}
                startContent={!isAddingSession && <Icon icon="lucide:plus" className="w-4 h-4" />}
              >
                {isAddingSession ? "Aggiungendo..." : "Aggiungi Sessione"}
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