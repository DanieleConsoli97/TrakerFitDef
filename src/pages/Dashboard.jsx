import { useAuth } from "../contexts/AuthProvider";
import SessionsComponets from "../components/SessionsComponets";
import ExerciseList from "../components/ExerciseList";
import { useRef } from "react";
import { Button } from "@heroui/react";
import dayjs from 'dayjs';
import { useGlobalContext } from "../contexts/GlobalContext";
import { Card, CardFooter, Image } from "@heroui/react";
import imageExercise from "../assets/exer.png";

const Dashboard = () => {
  const { sessionsIndex, exercisesIndex, addSetToWorkoutExercise, addExerciseToSession, addNewSession, fetchSessions } = useAuth();
  const { pageSession, setPageSession } = useGlobalContext();

  const sessionValue = useRef();
  const exercisesValue = useRef();
  const serieValue = useRef();
  const ripetizioniValue = useRef();
  const pesoValue = useRef();
  const exercisesValue2 = useRef();



  const handleSend = async () => {
    try {
      const sessionId = sessionValue.current.value;
      const data = {
        "serie_num": parseInt(serieValue.current.value),
        "ripetizioni": parseInt(ripetizioniValue.current.value),
        "peso": parseInt(pesoValue.current.value)
      };
      addSetToWorkoutExercise(parseInt(sessionId), parseInt(20), data);
      console.log("operazione riuscita");
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddExe = async () => {
    try {
      const exercisesId = exercisesValue.current.value;
      const sessionId = sessionValue.current.value;
      console.log("id esercizio", exercisesId);

      const data = {
        "esercizio_id": parseInt(exercisesId),
        "note": "Focus sulla fase negativa, 3 serie x 10 ripetizioni"
      };
      addExerciseToSession(sessionId, data);
      console.log("operazione riuscita");
    } catch (error) {
      console.log(error);
    }
  };

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
    <div className="md:container space-y-6 md:p-6 p-2">
      {/* Header con saluto e streak */}
      <div className="bg-gradient-to-r from-blue-600 to-orange-500 rounded-2xl p-6 text-white">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold mb-1">Ciao, Atleta! 💪</h2>
            <p className="text-blue-100 mb-4">Sei in ottima forma oggi!</p>
            <div className="flex items-center space-x-4">

            </div>
          </div>
          <div className="text-right">

            <div className="text-sm text-blue-100">Allenamenti</div>
          </div>
        </div>
      </div>
      {/* Grid: 1 colonna su mobile, 1 colonne su desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
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

        {/* Sezione 2 - ExerciseList */}
        <div className="flex flex-col bg-violet-900 rounded-lg p-3 sm:p-4">
          <h2 className="text-lg sm:text-xl font-bold text-center mb-3 sm:mb-4 text-white">
            ExerciseList
          </h2>
          <div className="max-h-[300px] overflow-y-auto">
            {exercisesIndex === undefined && (
              <p className="text-center text-violet-200">Caricamento...</p>
            )}
            {exercisesIndex === null && (
              <p className="text-center text-red-300">Errore nel caricamento degli esercizi</p>
            )}
            {exercisesIndex && (
              <ExerciseList exercises={exercisesIndex?.exercises} />
            )}
          </div>
        </div>

        {/* Sezione 3 - Aggiungi esercizio alla sessione */}
        <div className="flex flex-col bg-violet-900 rounded-lg p-3 sm:p-4">
          <h2 className="text-lg sm:text-xl font-bold text-center mb-3 sm:mb-4 text-white">
            Aggiungi un esercizio alla sessione
          </h2>
          <div className="space-y-3">
            {sessionsIndex && (
              <select className="w-full p-2 rounded bg-white text-black" ref={sessionValue}>
                {sessionsIndex.sessions.map((s) => (
                  <option key={s.id} value={s.id}>{s.data_sessione}</option>
                ))}
              </select>
            )}
            {exercisesIndex && (
              <select className="w-full p-2 rounded bg-white text-black" ref={exercisesValue}>
                {exercisesIndex?.exercises.map((e) => (
                  <option key={e.id} value={e.id}>{e.nome}</option>
                ))}
              </select>
            )}
            <Button className="w-full" onClick={handleAddExe}>Aggiungi esercizio</Button>
          </div>

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

        {/* Sezione 4 - Aggiungi set esercizio */}
        <div className="flex flex-col bg-violet-900 rounded-lg p-3 sm:p-4">
          <h2 className="text-lg sm:text-xl font-bold text-center mb-3 sm:mb-4 text-white">
            Aggiungi set esercizio
          </h2>
          <div className="space-y-3">
            {sessionsIndex && (
              <select className="w-full p-2 rounded bg-white text-black" ref={sessionValue}>
                {sessionsIndex.sessions.map((s) => (
                  <option key={s.id} value={s.id}>{s.data_sessione}</option>
                ))}
              </select>
            )}
            {exercisesIndex && (
              <select className="w-full p-2 rounded bg-white text-black" ref={exercisesValue2}>
                {exercisesIndex?.exercises.map((e) => (
                  <option key={e.id} value={e.id}>{e.nome}</option>
                ))}
              </select>
            )}
            <div className="space-y-2">
              <label className="text-white">Serie</label>
              <input className="w-full p-2 rounded bg-white text-black" ref={serieValue} type="number" />

              <label className="text-white">Ripetizioni</label>
              <input className="w-full p-2 rounded bg-white text-black" ref={ripetizioniValue} type="number" />

              <label className="text-white">Peso</label>
              <input className="w-full p-2 rounded bg-white text-black" ref={pesoValue} type="number" />
            </div>
            <Button className="w-full" onClick={handleSend}>Aggiungi set</Button>
          </div>
        </div>
      </div>
      {/* Sezione 5 - Card go to Sessions,Exercises, Progressi */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card
          isFooterBlurred
          className="border-none aspect-[16/9]"
          radius="lg"
        >
          <Image
            alt="Woman listening to music"
            className="object-cover object-top"
            src={imageExercise}
          />
          <CardFooter
            className="absolute bottom-1 left-1 w-[calc(100%_-_8px)]
               py-2 rounded-large border border-white/20
               before:bg-white/10 before:rounded-xl
               shadow-small z-10
                justify-center " // centratura testo
          >
            <p className="text-tiny text-white/80 text-center ">
              Lista Esercizi
            </p>
          </CardFooter>
        </Card>
        <Card isFooterBlurred className="border-none aspect-[16/9]" radius="lg">
          <Image
            alt="Woman listing to music"
            className="object-cover object-top"

            src={imageExercise}

          />
          <CardFooter className="justify-center  before:bg-white/10 border-white/20 border-1 overflow-hidden py-2 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
            <p className="text-tiny text-white/80">Lista Sessioni</p>
          </CardFooter>
        </Card>
        <Card isFooterBlurred className="border-none aspect-[16/9]" radius="lg">
          <Image
            alt="Woman listing to music"
            className=" object-cover object-top "
            height={"100%"}
            src={imageExercise}
            width={"100%"}
          />
          <CardFooter className="justify-center  before:bg-white/10 border-white/20 border-1 overflow-hidden py-2 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
            <p className="text-tiny text-white/80"> Lista Massimali</p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;