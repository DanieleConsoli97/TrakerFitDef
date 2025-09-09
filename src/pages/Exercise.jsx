
import { useAuth } from "../contexts/AuthProvider";
import ExerciseList from "../components/ExerciseList";
import SearchAndFilter from "../components/SearchAndFilter";
import { useState, useMemo } from "react";
import { Card, CardBody } from "@heroui/react";
import { Icon } from "@iconify/react";

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
        <div className=" bg-background p-4 space-y-6">
            {/* Page Title */}
            <div>
                <h1 className="text-3xl font-bold mb-2">Database Esercizi</h1>
                <p className="text-default-600">Gestisci e visualizza tutti gli esercizi disponibili</p>
            </div>

            {/* Main Content Card */}
            <Card className="bg-content1 border border-default-200 flex-1 min-h-0">
                <CardBody className="p-0 h-full flex flex-col">
                    {/* Header con stats */}
                    <div className="p-6 border-b border-default-200 flex-shrink-0">
                        <div className="flex items-center gap-3 justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-purple-50 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
                                    <Icon icon="lucide:database" className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-semibold">
                                        Esercizi Disponibili
                                    </h2>
                                    <p className="text-default-600 text-sm">
                                        {exercisesIndex?.exercises ? 
                                            `${filteredAndSortedExercises.length} di ${exercisesIndex.exercises.length} esercizi` :
                                            'Caricamento esercizi...'
                                        }
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Content Area */}
                    <div className="flex-1 overflow-y-auto p-6 min-h-0">
                        {isLoadingExercises && (
                            <div className="flex flex-col items-center justify-center py-12">
                                <Icon icon="lucide:loader-2" className="w-8 h-8 animate-spin text-default-400 mb-4" />
                                <p className="text-default-500">Caricamento esercizi...</p>
                            </div>
                        )}
                        {errorExercises && (
                            <div className="flex flex-col items-center justify-center py-12">
                                <Icon icon="lucide:alert-circle" className="w-8 h-8 text-orange-600 dark:text-orange-400 mb-4" />
                                <p className="text-orange-600 dark:text-orange-400">Errore nel caricamento degli esercizi</p>
                            </div>
                        )}
                        {exercisesIndex && exercisesIndex.exercises && (
                            <div className="space-y-6">
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
                            </div>
                        )}
                    </div>

                    {/* qui andrà il componente per aggiungere un esercizio alla lista */}
                </CardBody>
            </Card>
        </div>
    )
}

export default Exercise