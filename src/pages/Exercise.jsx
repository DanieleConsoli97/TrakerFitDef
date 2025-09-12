
import { useAuth } from "../contexts/AuthProvider";
import ExerciseList from "../components/ExerciseList";
import SearchAndFilter from "../components/SearchAndFilter";
import { useState, useMemo } from "react";
import { Card, CardBody, Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Input, Select, SelectItem, addToast } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import { createExercise } from "../services/apiService";

const Exercise = () => {
    const { exercisesIndex, isLoadingExercises, errorExercises, fetchExercises } = useAuth();
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
    const [sortBy, setSortBy] = useState("nome");
    const [filterGroup, setFilterGroup] = useState("all");
    
    // Stati per il form di creazione esercizio
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isCreating, setIsCreating] = useState(false);
    const [message, setMessage] = useState({ text: '', type: '' });
    const [formData, setFormData] = useState({
        nome: '',
        gruppo_muscolare: ''
    });

    // Gruppi muscolari disponibili (potresti recuperarli dall'API)
    const muscleGroups = [
        "Petto", "Schiena", "Spalle", "Bicipiti", "Tricipiti", 
        "Quadricipiti", "Femorali", "Glutei", "Polpacci", 
        "Addominali", "Avambracci", "Collo"
    ];

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

    // Gestione del form
    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleCreateExercise = async () => {
        if (!formData.nome.trim() || !formData.gruppo_muscolare) {
            setMessage({ text: 'Nome e gruppo muscolare sono obbligatori', type: 'error' });
            addToast({
                type: "error",
                title: "Validazione",
                message: "Nome e gruppo muscolare sono obbligatori",
                timeout: 3000,
                shouldShowTimeoutProgress: true,
                color: "danger"
            });
            return;
        }

        try {
            setIsCreating(true);
            await createExercise({
                nome: formData.nome.trim(),
                gruppo_muscolare: formData.gruppo_muscolare
            });
            
            setMessage({ text: 'Esercizio creato con successo!', type: 'success' });
            addToast({
                type: "success",
                title: "Esercizio Creato",
                message: "✨ Esercizio creato con successo!",
                timeout: 3000,
                shouldShowTimeoutProgress: true,
                color: "success"
            });
            setFormData({ nome: '', gruppo_muscolare: '' });
            
            // Ricarica la lista degli esercizi
            await fetchExercises();
            
            // Chiudi modal dopo un breve delay per mostrare il messaggio
            setTimeout(() => {
                onClose();
                setMessage({ text: '', type: '' });
            }, 1500);
            
        } catch (error) {
            console.error('Errore creazione esercizio:', error);
            setMessage({ 
                text: error.message || 'Errore durante la creazione dell\'esercizio', 
                type: 'error' 
            });
            addToast({
                type: "error",
                title: "Errore",
                message: error.message || 'Errore durante la creazione dell\'esercizio',
                timeout: 3000,
                shouldShowTimeoutProgress: true,
                color: "danger"
            });
        } finally {
            setIsCreating(false);
        }
    };

    const handleCloseModal = () => {
        setFormData({ nome: '', gruppo_muscolare: '' });
        setMessage({ text: '', type: '' });
        onClose();
    };

    return (
        <div className="bg-background p-4 space-y-6 max-w-7xl xl:max-w-[100rem] mx-auto">
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
                            <Button 
                                color="primary"
                                onPress={onOpen}
                                startContent={<Icon icon="lucide:plus" className="w-4 h-4" />}
                            >
                                Aggiungi Esercizio
                            </Button>
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
            
            {/* Modal per aggiungere nuovo esercizio */}
            <Modal isOpen={isOpen} onClose={handleCloseModal} size="md">
                <ModalContent>
                    <ModalHeader className="flex flex-col gap-1">
                        <h3 className="text-lg font-semibold">Nuovo Esercizio</h3>
                        <p className="text-sm text-default-500">Aggiungi un nuovo esercizio al database</p>
                    </ModalHeader>
                    <ModalBody>
                        {/* Messaggio di stato */}
                        {message.text && (
                            <div className={`border rounded-lg p-3 flex items-center gap-2 ${
                                message.type === 'success' 
                                    ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
                                    : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
                            }`}>
                                <Icon 
                                    icon={message.type === 'success' ? 'lucide:check-circle' : 'lucide:alert-circle'} 
                                    className={`w-4 h-4 ${
                                        message.type === 'success' 
                                            ? 'text-green-600 dark:text-green-400'
                                            : 'text-red-600 dark:text-red-400'
                                    }`} 
                                />
                                <span className={`text-sm font-medium ${
                                    message.type === 'success' 
                                        ? 'text-green-700 dark:text-green-400'
                                        : 'text-red-700 dark:text-red-400'
                                }`}>
                                    {message.text}
                                </span>
                            </div>
                        )}
                        
                        <div className="space-y-4">
                            <Input
                                label="Nome esercizio"
                                placeholder="Es. Panca piana"
                                value={formData.nome}
                                onValueChange={(value) => handleInputChange('nome', value)}
                                isDisabled={isCreating}
                            />
                            
                            <Select
                                label="Gruppo muscolare"
                                placeholder="Seleziona gruppo muscolare"
                                selectedKeys={formData.gruppo_muscolare ? [formData.gruppo_muscolare] : []}
                                onSelectionChange={(keys) => handleInputChange('gruppo_muscolare', Array.from(keys)[0])}
                                isDisabled={isCreating}
                            >
                                {muscleGroups.map((group) => (
                                    <SelectItem key={group} value={group}>
                                        {group}
                                    </SelectItem>
                                ))}
                            </Select>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button 
                            color="danger" 
                            variant="flat" 
                            onPress={handleCloseModal}
                            isDisabled={isCreating}
                        >
                            Annulla
                        </Button>
                        <Button 
                            color="primary" 
                            onPress={handleCreateExercise}
                            isLoading={isCreating}
                            isDisabled={!formData.nome.trim() || !formData.gruppo_muscolare || isCreating}
                        >
                            Crea Esercizio
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    )
}

export default Exercise