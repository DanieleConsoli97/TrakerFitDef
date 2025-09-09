import { Card, CardBody, CardHeader, Progress } from "@heroui/react";
import { Icon } from "@iconify/react";
import { Button } from "@heroui/react";
import { useAuth } from "../contexts/AuthProvider";
import SessionsComponets from "../components/SessionsComponets";
import { useGlobalContext } from "../contexts/GlobalContext";
import { useRef } from "react";
import dayjs from "dayjs";

export const Sessions = () => {
  const { sessionsIndex, addNewSession, fetchSessions } = useAuth();
  const { pageSession, setPageSession } = useGlobalContext();
  const noteSessione = useRef();

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
      fetchSessions();
    } catch (error) {
      console.error("Errore in handleAddSession", error);
    }
  };

  return (
    <>
      {/* Sezione 1 - Lista Workout */}
      <div className="flex flex-col bg-violet-900 rounded-lg p-3 sm:p-4">
        <h1 className="text-xl sm:text-2xl font-bold text-center mb-3 sm:mb-4 text-white">
          Lista Workout 💪
        </h1>
        <div className="max-h-[310px] overflow-y-auto">
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
      
      <div className="flex flex-col bg-violet-900 rounded-lg p-3 sm:p-4">
        <h2 className="text-lg sm:text-xl font-bold text-center mb-3 sm:mb-4 mt-4 text-white">
          Aggiungi una sessione di allenamento
        </h2>
        <div className="space-y-3">
          <label className="text-white">Note sessione</label>
          <textarea
            ref={noteSessione}
            className="w-full p-2 rounded bg-white text-black"
            rows="3"
          />
          <Button className="w-full" onClick={handleAddSession}>Aggiungi sessione</Button>
        </div>
      </div>

    </>
  );
};