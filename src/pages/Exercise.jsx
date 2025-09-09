
import { useAuth } from "../contexts/AuthProvider";
import ExerciseList from "../components/ExerciseList";

const Exercise = () => {
    const { exercisesIndex, isLoadingExercises, errorExercises } = useAuth();

    return (
        <div className="flex flex-col bg-violet-900 rounded-lg p-3 sm:p-4">
            <h2 className="text-lg sm:text-xl font-bold text-center mb-3 sm:mb-4 text-white">
                ExerciseList
            </h2>
            <div className="max-h-[300px] overflow-y-auto">
                {isLoadingExercises && (
                    <p className="text-center text-violet-200">Caricamento...</p>
                )}
                {errorExercises && (
                    <p className="text-center text-red-300">Errore nel caricamento degli esercizi</p>
                )}
                {exercisesIndex && exercisesIndex.exercises && (
                    <ExerciseList exercises={exercisesIndex.exercises} />
                )}
            </div>
            {/* qui andrà il componente per aggiungere un esercizio alla lista */}
        </div>
    
    )
}

export default Exercise