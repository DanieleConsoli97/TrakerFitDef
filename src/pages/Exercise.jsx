
import { useAuth } from "../contexts/AuthProvider";
import ExerciseList from "../components/ExerciseList";
import SearchAndFilter from "../components/SearchAndFilter";
import { useState, useMemo } from "react";

const Exercise = () => {
    const { exercisesIndex, isLoadingExercises, errorExercises } = useAuth();
    const [searchTerm, setSearchTerm] = useState("");
    const [sortBy, setSortBy] = useState("nome");
    const [filterGroup, setFilterGroup] = useState("all");

    // Filter and sort exercises
    const filteredAndSortedExercises = useMemo(() => {
        if (!exercisesIndex?.exercises) return [];
        
        let filtered = exercisesIndex.exercises.filter(exercise => {
            const matchesSearch = exercise.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                 exercise.gruppo_muscolare.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesGroup = filterGroup === "all" || exercise.gruppo_muscolare === filterGroup;
            return matchesSearch && matchesGroup;
        });

        // Sort exercises
        filtered.sort((a, b) => {
            if (sortBy === "nome") {
                return a.nome.localeCompare(b.nome);
            } else if (sortBy === "gruppo_muscolare") {
                return a.gruppo_muscolare.localeCompare(b.gruppo_muscolare);
            }
            return 0;
        });

        return filtered;
    }, [exercisesIndex, searchTerm, filterGroup, sortBy]);

    return (
        <div className="flex flex-col bg-violet-900 rounded-lg p-3 sm:p-4">
            <h2 className="text-lg sm:text-xl font-bold text-center mb-3 sm:mb-4 text-white">
                Database Esercizi
            </h2>
            
            {isLoadingExercises && (
                <p className="text-center text-violet-200">Caricamento...</p>
            )}
            {errorExercises && (
                <p className="text-center text-red-300">Errore nel caricamento degli esercizi</p>
            )}
            {exercisesIndex && exercisesIndex.exercises && (
                <>
                    <SearchAndFilter 
                        exercises={exercisesIndex.exercises}
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        sortBy={sortBy}
                        setSortBy={setSortBy}
                        filterGroup={filterGroup}
                        setFilterGroup={setFilterGroup}
                        filteredCount={filteredAndSortedExercises.length}
                    />
                    <ExerciseList exercises={filteredAndSortedExercises} />
                </>
            )}
            
            {/* qui andrà il componente per aggiungere un esercizio alla lista */}
        </div>
    )
}

export default Exercise