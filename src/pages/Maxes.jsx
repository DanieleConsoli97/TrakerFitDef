import { useState, useEffect, useRef } from 'react';
import { Button, Card, CardBody, CardHeader, Input, Select, SelectItem, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, addToast } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import { getAllExercises } from '../services/apiService';
import { useAuth } from '../contexts/AuthProvider';
import dayjs from "dayjs";

export const Maxes = () => {
    const { maxesIndex, isLoading, message, addNewMax, updateMax, deleteMax, clearMessage, fetchWithAuth } = useAuth();
    const navigate = useNavigate();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure();
    
    // Stati per il form
    const [exerciseCatalog, setExerciseCatalog] = useState([]);
    const [selectedExerciseId, setSelectedExerciseId] = useState('');
    const [peso, setPeso] = useState('');
    const [dataRegistrata, setDataRegistrata] = useState(dayjs().format('YYYY-MM-DD'));
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    // Stati per l'editing
    const [editingMax, setEditingMax] = useState(null);
    const [editPeso, setEditPeso] = useState('');
    const [editData, setEditData] = useState('');

    // Carica catalogo esercizi
    useEffect(() => {
        const fetchExercises = async () => {
            if (!fetchWithAuth) return;
            try {
                const allExercises = await getAllExercises({ fetchAll: true });
                // Con fetchAll=true, la risposta è direttamente un array di esercizi
                const exercisesList = Array.isArray(allExercises) ? allExercises : [];
                setExerciseCatalog(Array.isArray(exercisesList) ? exercisesList : []);
            } catch (err) {
                console.error("Impossibile caricare gli esercizi.", err);
                setExerciseCatalog([]); // Fallback a array vuoto
                addToast({
                    type: "error",
                    title: "Errore",
                    message: "Impossibile caricare gli esercizi",
                    timeout: 3000,
                    shouldShowTimeoutProgress: true,
                    color: "danger"
                });
            }
        };
        fetchExercises();
    }, [fetchWithAuth]);

    // Pulisci messaggio dopo 3 secondi
    useEffect(() => {
        if (message.text) {
            const timer = setTimeout(() => clearMessage(), 3000);
            return () => clearTimeout(timer);
        }
    }, [message, clearMessage]);

    const handleAddMax = async () => {
        if (!selectedExerciseId || !peso || !dataRegistrata) {
            addToast({
                type: "error",
                title: "Validazione",
                message: "Tutti i campi sono obbligatori",
                timeout: 3000,
                shouldShowTimeoutProgress: true,
                color: "danger"
            });
            return;
        }

        try {
            setIsSubmitting(true);
            await addNewMax({
                esercizio_id: selectedExerciseId,
                peso_massimale: parseFloat(peso),
                data_registrata: dataRegistrata
            });
            
            addToast({
                type: "success",
                title: "Massimale Aggiunto",
                message: "🏆 Nuovo massimale registrato con successo!",
                timeout: 3000,
                shouldShowTimeoutProgress: true,
                color: "success"
            });
            
            // Reset form
            setSelectedExerciseId('');
            setPeso('');
            setDataRegistrata(dayjs().format('YYYY-MM-DD'));
            onClose();
        } catch (error) {
            console.error("Errore nell'aggiunta del massimale:", error);
            addToast({
                type: "error",
                title: "Errore",
                message: "Errore nell'aggiunta del massimale. Riprova.",
                timeout: 3000,
                shouldShowTimeoutProgress: true,
                color: "danger"
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleEditMax = (maxRecord) => {
        setEditingMax(maxRecord);
        setEditPeso(maxRecord.peso_massimale.toString());
        setEditData(dayjs(maxRecord.data_registrata).format('YYYY-MM-DD'));
        onEditOpen();
    };

    const handleUpdateMax = async () => {
        if (!editingMax || !editPeso || !editData) {
            addToast({
                type: "error",
                title: "Validazione",
                message: "Tutti i campi sono obbligatori",
                timeout: 3000,
                shouldShowTimeoutProgress: true,
                color: "danger"
            });
            return;
        }

        try {
            setIsSubmitting(true);
            await updateMax(editingMax.id, {
                peso_massimale: parseFloat(editPeso),
                data_registrata: editData
            });
            
            addToast({
                type: "success",
                title: "Massimale Aggiornato",
                message: "✨ Massimale aggiornato con successo!",
                timeout: 3000,
                shouldShowTimeoutProgress: true,
                color: "success"
            });
            
            onEditClose();
        } catch (error) {
            console.error("Errore nell'aggiornamento del massimale:", error);
            addToast({
                type: "error",
                title: "Errore",
                message: "Errore nell'aggiornamento del massimale. Riprova.",
                timeout: 3000,
                shouldShowTimeoutProgress: true,
                color: "danger"
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDeleteMax = async (id) => {
        if (window.confirm('Sei sicuro di voler eliminare questo massimale?')) {
            try {
                await deleteMax(id);
                addToast({
                    type: "success",
                    title: "Massimale Eliminato",
                    message: "🗑️ Massimale eliminato con successo!",
                    timeout: 3000,
                    shouldShowTimeoutProgress: true,
                    color: "success"
                });
            } catch (error) {
                console.error("Errore nell'eliminazione del massimale:", error);
                addToast({
                    type: "error",
                    title: "Errore",
                    message: "Errore nell'eliminazione del massimale. Riprova.",
                    timeout: 3000,
                    shouldShowTimeoutProgress: true,
                    color: "danger"
                });
            }
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
            {/* Sezione 1 - Aggiungi Massimale */}
            <Card className="bg-content1 border border-default-200 flex-shrink-0">
                <CardHeader className="pb-3">
                    <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-orange-50 dark:bg-orange-900/20 rounded-xl flex items-center justify-center">
                                <Icon icon="lucide:trophy" className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-default-800">I Tuoi Massimali</h3>
                                <p className="text-xs text-default-500 mt-0.5">Registra e gestisci i tuoi record personali</p>
                            </div>
                        </div>
                        <Button 
                            color="primary"
                            onPress={onOpen}
                            startContent={<Icon icon="lucide:plus" className="w-4 h-4" />}
                        >
                            Nuovo Massimale
                        </Button>
                    </div>
                </CardHeader>
            </Card>

            {/* Sezione 2 - Lista Massimali */}
            <Card className="bg-content1 border border-default-200 flex-1 overflow-hidden min-h-0">
                <CardBody className="p-0 h-full flex flex-col">
                    <div className="p-6 border-b border-default-200 flex-shrink-0">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-green-50 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                                <Icon icon="lucide:list" className="w-5 h-5 text-green-600 dark:text-green-400" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-semibold">
                                    I Tuoi Record
                                </h1>
                                <p className="text-default-600 text-sm">
                                    Visualizza e gestisci i tuoi massimali personali
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto p-6 min-h-0">
                        {isLoading && !maxesIndex && (
                            <div className="flex flex-col items-center justify-center py-12">
                                <Icon icon="lucide:loader-2" className="w-8 h-8 animate-spin text-default-400 mb-4" />
                                <p className="text-default-500">Caricamento massimali...</p>
                            </div>
                        )}
                        
                        {!isLoading && maxesIndex && maxesIndex.length === 0 && (
                            <div className="flex flex-col items-center justify-center py-12">
                                <Icon icon="lucide:trophy" className="w-12 h-12 text-default-300 mb-4" />
                                <h3 className="text-lg font-semibold text-default-600 mb-2">Nessun massimale registrato</h3>
                                <p className="text-default-500 text-center mb-4">
                                    Non hai ancora registrato alcun massimale.<br />
                                    Inizia aggiungendo il tuo primo record!
                                </p>
                                <Button color="primary" onPress={onOpen}>
                                    Aggiungi il primo massimale
                                </Button>
                            </div>
                        )}

                        {maxesIndex && maxesIndex.length > 0 && (
                            <div className="grid gap-4">
                                {maxesIndex.map((max) => (
                                    <Card key={max.id} className="bg-content2 border border-default-100">
                                        <CardBody className="p-4">
                                            <div className="flex items-center justify-between">
                                                <div className="flex-1">
                                                    <h4 className="text-lg font-semibold text-default-800 mb-1">
                                                        {max.nome_esercizio}
                                                    </h4>
                                                    <div className="flex items-center gap-4 text-sm text-default-600">
                                                        <div className="flex items-center gap-1">
                                                            <Icon icon="lucide:weight" className="w-4 h-4" />
                                                            <span className="font-semibold text-primary">
                                                                {max.peso_massimale} kg
                                                            </span>
                                                        </div>
                                                        <div className="flex items-center gap-1">
                                                            <Icon icon="lucide:calendar" className="w-4 h-4" />
                                                            <span>
                                                                {dayjs(max.data_registrata).format('DD/MM/YYYY')}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Button 
                                                        size="sm" 
                                                        variant="flat" 
                                                        color="primary"
                                                        isIconOnly
                                                        onPress={() => handleEditMax(max)}
                                                    >
                                                        <Icon icon="lucide:edit-2" className="w-4 h-4" />
                                                    </Button>
                                                    <Button 
                                                        size="sm" 
                                                        variant="flat" 
                                                        color="danger"
                                                        isIconOnly
                                                        onPress={() => handleDeleteMax(max.id)}
                                                    >
                                                        <Icon icon="lucide:trash-2" className="w-4 h-4" />
                                                    </Button>
                                                </div>
                                            </div>
                                        </CardBody>
                                    </Card>
                                ))}
                            </div>
                        )}
                    </div>
                </CardBody>
            </Card>

            {/* Modal per aggiungere nuovo massimale */}
            <Modal isOpen={isOpen} onClose={onClose} size="md">
                <ModalContent>
                    <ModalHeader className="flex flex-col gap-1">
                        <h3 className="text-lg font-semibold">Nuovo Massimale</h3>
                        <p className="text-sm text-default-500">Registra un nuovo record personale</p>
                    </ModalHeader>
                    <ModalBody>
                        <div className="space-y-4">
                            <Select
                                label="Esercizio"
                                placeholder="Seleziona un esercizio"
                                selectedKeys={selectedExerciseId ? [selectedExerciseId] : []}
                                onSelectionChange={(keys) => setSelectedExerciseId(Array.from(keys)[0])}
                            >
                                {Array.isArray(exerciseCatalog) && exerciseCatalog.map((exercise) => (
                                    <SelectItem key={exercise.id} value={exercise.id}>
                                        {exercise.nome}
                                    </SelectItem>
                                ))}
                            </Select>
                            
                            <Input
                                type="number"
                                label="Peso massimale (kg)"
                                placeholder="0.00"
                                value={peso}
                                onValueChange={setPeso}
                                step="0.1"
                                min="0"
                            />
                            
                            <Input
                                type="date"
                                label="Data registrazione"
                                value={dataRegistrata}
                                onValueChange={setDataRegistrata}
                            />
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" variant="flat" onPress={onClose}>
                            Annulla
                        </Button>
                        <Button 
                            color="primary" 
                            onPress={handleAddMax}
                            isLoading={isSubmitting}
                            isDisabled={!selectedExerciseId || !peso || !dataRegistrata}
                        >
                            Registra Massimale
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            {/* Modal per modificare massimale */}
            <Modal isOpen={isEditOpen} onClose={onEditClose} size="md">
                <ModalContent>
                    <ModalHeader className="flex flex-col gap-1">
                        <h3 className="text-lg font-semibold">Modifica Massimale</h3>
                        <p className="text-sm text-default-500">
                            {editingMax?.nome_esercizio}
                        </p>
                    </ModalHeader>
                    <ModalBody>
                        <div className="space-y-4">
                            <Input
                                type="number"
                                label="Peso massimale (kg)"
                                placeholder="0.00"
                                value={editPeso}
                                onValueChange={setEditPeso}
                                step="0.1"
                                min="0"
                            />
                            
                            <Input
                                type="date"
                                label="Data registrazione"
                                value={editData}
                                onValueChange={setEditData}
                            />
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" variant="flat" onPress={onEditClose}>
                            Annulla
                        </Button>
                        <Button 
                            color="primary" 
                            onPress={handleUpdateMax}
                            isLoading={isSubmitting}
                            isDisabled={!editPeso || !editData}
                        >
                            Aggiorna Massimale
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    );
};