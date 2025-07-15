import { useAuth } from "../contexts/AuthProvider";
import SessionsComponets from "../components/SessionsComponets";
import ExerciseList from "../components/ExerciseList";
import { useRef } from "react";
import { Button } from "@heroui/react";

const Dashboard = () => {

  const { sessionsIndex, exercisesIndex, addSetToWorkoutExercise, addExerciseToSession } = useAuth();

  const sessionValue = useRef()
  const exercisesValue = useRef()
  const serieValue = useRef()
  const ripetizioniValue = useRef()
  const pesoValue = useRef()

  const checkData = (data) => {
    if (data === null) {
      throw new Error(`value non può essere vuoto`)
    }
    if (typeof (data) != "number") {
      console.log(typeof (data) )
      throw new Error(" value dev'essere un numero")
    }
  }
  const handleSend = async () => {
    try {
     

     
      const sessionId = sessionValue.current.value
      const exercisesId = 1
      
      
      const data = {
        "serie_num": parseInt(serieValue.current.value),
        "ripetizioni": parseInt(ripetizioniValue.current.value),
        "peso": parseInt(pesoValue.current.value)
      }
      addSetToWorkoutExercise(parseInt(sessionId), parseInt(20), data)
      console.log("operazione riuscita")

     
    } catch (error) {
      console.log(error)
    }

  }

  const handleAddExe = async () => {
    try {
       const exercisesId = exercisesValue.current.value
      const sessionId = sessionValue.current.value
    console.log(exercisesId)
    checkData(parseInt(exercisesId))
    
    const data = {
      "esercizio_id": parseInt(exercisesId),
      "note": "Focus sulla fase negativa, 3 serie x 10 ripetizioni"
    }
    addExerciseToSession(sessionId, data)
    console.log("operazione riuscita")
    } catch (error) {
      console.log(error)
    }
    

  }
  return (
    <div className="p-2 sm:p-4">
      {/* Grid responsive: 1 colonna su mobile, 2 colonne su tablet+, 2x2 su desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 lg:grid-rows-2 lg:h-[calc(100vh-6rem)]">

        {/* Sezione 1 - Lista Workout */}
        <div className="flex flex-col bg-violet-900 rounded-lg p-3 sm:p-4 min-h-[300px] overflow-hidden">
          <h1 className="text-xl sm:text-2xl font-bold text-center mb-3 sm:mb-4 text-white flex-shrink-0">
            Lista Workout 💪
          </h1>
          <div className="flex-1 min-h-0">
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
        </div>

        {/* Sezione 2 - In alto a destra / seconda su mobile */}
        <div className="flex flex-col bg-violet-900 rounded-lg p-3 sm:p-4 min-h-[200px] lg:min-h-0">
          <h2 className="text-lg sm:text-xl font-bold text-center mb-3 sm:mb-4 text-white">
            ExerciseList
          </h2>
          <div className="flex-1 text-violet-200">

            {exercisesIndex === undefined && (
              <p className="text-center text-violet-200">Caricamento...</p>
            )}
            {exercisesIndex === null && (
              <p className="text-center text-red-300">Errore nel caricamento degli esericizi</p>
            )}
            {exercisesIndex && (
              <ExerciseList exercises={exercisesIndex?.exercises} ></ExerciseList>
            )}

          </div>
        </div>

        {/* Sezione 3 - In basso a sinistra / terza su mobile */}
        <div className="flex flex-col bg-violet-900 rounded-lg p-3 sm:p-4 min-h-[200px] lg:min-h-0">
          <h2 className="text-lg sm:text-xl font-bold text-center mb-3 sm:mb-4 text-white">
            Aggiungi un esercizio alla sessione
          </h2>
          <div className="flex-1 min-h-0">
            {sessionsIndex === undefined && (
              <p className="text-center text-violet-200">Caricamento...</p>
            )}
            {sessionsIndex === null && (
              <p className="text-center text-red-300">Errore nel caricamento delle sessioni</p>
            )}
            {sessionsIndex && (
              <select className="max-w-xs" ref={sessionValue} defaultValue={sessionValue}  >
                {
                  sessionsIndex.sessions.map((s) => {
                    return <option key={s.id} value={s.id} >{s.data_sessione}</option>
                  })
                }
              </select>
            )}

            {exercisesIndex === undefined && (
              <p className="text-center text-violet-200">Caricamento...</p>
            )}
            {exercisesIndex === null && (
              <p className="text-center text-red-300">Errore nel caricamento degli esericizi</p>
            )}
            {exercisesIndex && (
              <select className="max-w-xs" ref={exercisesValue} defaultValue={exercisesValue}>
                {exercisesIndex?.exercises.map((e) => {
                  return <option key={e.id} value={e.id} >{e.nome}</option>
                })}
              </select>
            )}

            <Button className="max-w-[120px]" onClick={handleAddExe} >aggiungi sessione</Button>
          </div>
        </div>

        {/* Sezione 4 - In basso a destra / ultima su mobile */}
        <div className="flex flex-col bg-violet-900 rounded-lg p-3 sm:p-4 min-h-[200px] lg:min-h-0">
          <h2 className="text-lg sm:text-xl font-bold text-center mb-3 sm:mb-4 text-white">
            Aggiungi un esercizio alla sessione
          </h2>
          <div className="flex-1 min-h-0">
            {sessionsIndex === undefined && (
              <p className="text-center text-violet-200">Caricamento...</p>
            )}
            {sessionsIndex === null && (
              <p className="text-center text-red-300">Errore nel caricamento delle sessioni</p>
            )}
            {sessionsIndex && (
              <select className="max-w-xs" ref={sessionValue} defaultValue={sessionValue}  >
                {
                  sessionsIndex.sessions.map((s) => {
                    return <option key={s.id} value={s.id} >{s.data_sessione}</option>
                  })
                }
              </select>
            )}

            {exercisesIndex === undefined && (
              <p className="text-center text-violet-200">Caricamento...</p>
            )}
            {exercisesIndex === null && (
              <p className="text-center text-red-300">Errore nel caricamento degli esericizi</p>
            )}
            {exercisesIndex && (
              <select className="max-w-xs" ref={exercisesValue} defaultValue={exercisesValue}>
                {exercisesIndex?.exercises.map((e) => {
                  return <option key={e.id} value={e.id} >{e.nome}</option>
                })}
              </select>
            )}
            <label htmlFor="">serie</label>
            <input className="max-w-[120px]" ref={serieValue} type="number" />
            <label htmlFor="">Ripetizioni</label>
            <input className="max-w-[120px]" ref={ripetizioniValue} type="number" />
            <label htmlFor="">Peso</label>
            <input className="max-w-[120px]" ref={pesoValue} type="number" />
            <Button className="max-w-[120px]" onClick={handleSend} >aggiungi sessione</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;