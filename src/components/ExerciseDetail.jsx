
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";
import { Card, CardBody, Button, Chip } from "@heroui/react";
import { Icon } from "@iconify/react";

const ExerciseDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { exercisesIndex } = useAuth();

    const getGroupIcon = (group) => {
        const icons = {
            'Gambe': 'fluent-emoji:leg',
            'Petto': 'fluent-emoji:flexed-biceps',
            'Schiena': 'fluent-emoji:person-rowing-boat',
            'Spalle': 'fluent-emoji:person-lifting-weights',
            'Braccia': 'fluent-emoji:flexed-biceps',
            'Core': 'fluent-emoji:person-doing-cartwheel'
        };
        return icons[group] || 'lucide:dumbbell';
    };

    // Stati di caricamento
    if (!exercisesIndex) {
        return (
            <div className="min-h-screen bg-background p-4 space-y-6">
                <div className="flex flex-col items-center justify-center py-12">
                    <Icon icon="lucide:loader-2" className="w-8 h-8 animate-spin text-default-400 mb-4" />
                    <p className="text-default-500">Caricamento esercizio...</p>
                </div>
            </div>
        );
    }

    // Cerca l'esercizio con quell'ID
    const exercise = exercisesIndex.exercises?.find(s => String(s.id) === id);

    // Esercizio non trovato
    if (!exercise) {
        return (
            <div className="min-h-screen bg-background p-4 space-y-6">
                <div className="flex items-center gap-2 mb-6">
                    <Button
                        variant="ghost"
                        onPress={() => navigate("/esercizi")}
                        startContent={<Icon icon="lucide:arrow-left" />}
                        className="text-default-600"
                    >
                        Torna agli esercizi
                    </Button>
                </div>
                <div className="flex flex-col items-center justify-center py-12">
                    <Icon icon="lucide:search-x" className="w-12 h-12 text-default-300 mx-auto mb-4" />
                    <p className="text-default-500 text-lg">Esercizio non trovato</p>
                    <p className="text-default-400 text-sm mt-2">L'esercizio richiesto non è disponibile</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background p-4 space-y-6">
            {/* Back Button */}
            <div className="flex items-center gap-2">
                <Button
                    variant="ghost"
                    onPress={() => navigate("/esercizi")}
                    startContent={<Icon icon="lucide:arrow-left" />}
                    className="text-default-600"
                >
                    Torna agli esercizi
                </Button>
            </div>

            {/* Page Title */}
            <div>
                <h1 className="text-3xl font-bold mb-2">Dettagli Esercizio</h1>
            </div>

            {/* Exercise Header Card */}
            <Card className="bg-content1 border border-default-200">
                <CardBody className="p-6">
                    <div className="flex justify-between items-start">
                        <div className="flex-1">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/20 rounded-xl flex items-center justify-center">
                                    <Icon 
                                        icon={getGroupIcon(exercise.gruppo_muscolare)} 
                                        className="w-8 h-8 text-blue-600 dark:text-blue-400" 
                                    />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-semibold mb-2">
                                        {exercise.nome}
                                    </h2>
                                    <div className="flex items-center gap-2">
                                        <Chip 
                                            size="sm" 
                                            variant="flat"
                                            className="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400"
                                        >
                                            {exercise.gruppo_muscolare}
                                        </Chip>
                                        {exercise.categoria_id && (
                                            <Chip 
                                                size="sm" 
                                                variant="flat"
                                                className="bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400"
                                            >
                                                Categoria {exercise.categoria_id}
                                            </Chip>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Exercise Description */}
                            {exercise.descrizione && (
                                <div className="bg-default-50 rounded-lg p-4 mb-4">
                                    <div className="flex items-start gap-2">
                                        <Icon icon="lucide:file-text" className="w-5 h-5 text-default-500 mt-0.5" />
                                        <div>
                                            <div className="text-sm text-default-500 mb-1">Descrizione</div>
                                            <div className="text-default-700">{exercise.descrizione}</div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Exercise Info Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                                    <Icon icon="lucide:target" className="w-6 h-6 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
                                    <div className="text-sm text-gray-600 dark:text-gray-400">Gruppo Muscolare</div>
                                    <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
                                        {exercise.gruppo_muscolare}
                                    </div>
                                </div>

                                {exercise.categoria_id && (
                                    <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                                        <Icon icon="lucide:folder" className="w-6 h-6 text-purple-600 dark:text-purple-400 mx-auto mb-2" />
                                        <div className="text-sm text-gray-600 dark:text-gray-400">Categoria</div>
                                        <div className="text-lg font-bold text-purple-600 dark:text-purple-400">
                                            {exercise.categoria_id}
                                        </div>
                                    </div>
                                )}

                                <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                                    <Icon icon="lucide:hash" className="w-6 h-6 text-green-600 dark:text-green-400 mx-auto mb-2" />
                                    <div className="text-sm text-gray-600 dark:text-gray-400">ID Esercizio</div>
                                    <div className="text-lg font-bold text-green-600 dark:text-green-400">
                                        #{exercise.id}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardBody>
            </Card>
        </div>
    );
}

export default ExerciseDetail