import { useState, useEffect } from 'react';
import { 
    Card, 
    CardBody, 
    CardHeader, 
    Input, 
    Button, 
    Modal, 
    ModalContent, 
    ModalHeader, 
    ModalBody, 
    ModalFooter, 
    useDisclosure,
    Divider,
    Avatar,
    Chip
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../contexts/AuthProvider';
import { getMyProfile, updateMyProfile, changeMyPassword } from '../services/apiService';
import dayjs from "dayjs";

export const UserProfile = () => {
    const { logOutAction } = useAuth();
    const navigate = useNavigate();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isOpen: isPasswordOpen, onOpen: onPasswordOpen, onClose: onPasswordClose } = useDisclosure();
    
    // Stati per il profilo
    const [userProfile, setUserProfile] = useState(null);
    const [isLoadingProfile, setIsLoadingProfile] = useState(true);
    const [isUpdating, setIsUpdating] = useState(false);
    const [isChangingPassword, setIsChangingPassword] = useState(false);
    const [message, setMessage] = useState({ text: '', type: '' });
    
    // Stati per il form profilo
    const [profileForm, setProfileForm] = useState({
        nome: '',
        cognome: '',
        email: ''
    });
    
    // Stati per il form password
    const [passwordForm, setPasswordForm] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    // Carica profilo utente
    useEffect(() => {
        const loadUserProfile = async () => {
            try {
                setIsLoadingProfile(true);
                const profile = await getMyProfile();
                setUserProfile(profile);
                setProfileForm({
                    nome: profile.nome || '',
                    cognome: profile.cognome || '',
                    email: profile.email || ''
                });
            } catch (error) {
                console.error('Errore nel caricamento del profilo:', error);
                setMessage({ text: 'Errore nel caricamento del profilo', type: 'error' });
            } finally {
                setIsLoadingProfile(false);
            }
        };

        loadUserProfile();
    }, []);

    // Pulisci messaggio dopo 3 secondi
    useEffect(() => {
        if (message.text) {
            const timer = setTimeout(() => setMessage({ text: '', type: '' }), 3000);
            return () => clearTimeout(timer);
        }
    }, [message]);

    const handleProfileUpdate = async () => {
        if (!profileForm.nome.trim() || !profileForm.cognome.trim() || !profileForm.email.trim()) {
            setMessage({ text: 'Tutti i campi sono obbligatori per aggiornare il profilo', type: 'error' });
            return;
        }

        try {
            setIsUpdating(true);
            await updateMyProfile(profileForm);
            
            // Aggiorna i dati locali
            setUserProfile(prev => ({ ...prev, ...profileForm }));
            
            setMessage({ text: 'Le informazioni del profilo sono state salvate con successo', type: 'success' });
            
            // Chiudi modal
            onClose();
            
        } catch (error) {
            console.error('Errore aggiornamento profilo:', error);
            setMessage({ text: error.message || 'Impossibile aggiornare il profilo. Riprova più tardi', type: 'error' });
        } finally {
            setIsUpdating(false);
        }
    };

    const handlePasswordChange = async () => {
        if (!passwordForm.currentPassword || !passwordForm.newPassword || !passwordForm.confirmPassword) {
            setMessage({ text: 'Tutti i campi password sono obbligatori', type: 'error' });
            return;
        }

        if (passwordForm.newPassword !== passwordForm.confirmPassword) {
            setMessage({ text: 'La nuova password e la conferma non coincidono', type: 'error' });
            return;
        }

        if (passwordForm.newPassword.length < 6) {
            setMessage({ text: 'La nuova password deve avere almeno 6 caratteri', type: 'error' });
            return;
        }

        try {
            setIsChangingPassword(true);
            await changeMyPassword({
                currentPassword: passwordForm.currentPassword,
                newPassword: passwordForm.newPassword
            });
            
            setMessage({ text: 'Password aggiornata con successo. Verrai disconnesso per sicurezza', type: 'success' });
            
            setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
            
            // Disconnetti l'utente dopo cambio password per sicurezza
            setTimeout(() => {
                onPasswordClose();
                logOutAction();
            }, 2000);
            
        } catch (error) {
            console.error('Errore cambio password:', error);
            setMessage({ text: error.message || 'Impossibile cambiare la password. Riprova più tardi', type: 'error' });
        } finally {
            setIsChangingPassword(false);
        }
    };

    const handleInputChange = (field, value) => {
        setProfileForm(prev => ({ ...prev, [field]: value }));
    };

    const handlePasswordInputChange = (field, value) => {
        setPasswordForm(prev => ({ ...prev, [field]: value }));
    };

    const getInitials = (nome, cognome) => {
        return `${(nome?.[0] || '').toUpperCase()}${(cognome?.[0] || '').toUpperCase()}`;
    };

    if (isLoadingProfile) {
        return (
            <div className="h-[calc(100vh-80px)] bg-background p-4 flex items-center justify-center">
                <div className="flex flex-col items-center">
                    <Icon icon="lucide:loader-2" className="w-8 h-8 animate-spin text-primary mb-4" />
                    <p className="text-default-500">Caricamento profilo...</p>
                </div>
            </div>
        );
    }

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

            {/* Messaggio di stato */}
            {message.text && (
                <div className={`border rounded-lg p-4 flex items-center gap-3 ${
                    message.type === 'success' 
                        ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
                        : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
                }`}>
                    <Icon 
                        icon={message.type === 'success' ? 'lucide:check-circle' : 'lucide:alert-circle'} 
                        className={`w-5 h-5 ${
                            message.type === 'success' 
                                ? 'text-green-600 dark:text-green-400'
                                : 'text-red-600 dark:text-red-400'
                        }`} 
                    />
                    <span className={`font-medium ${
                        message.type === 'success' 
                            ? 'text-green-700 dark:text-green-400'
                            : 'text-red-700 dark:text-red-400'
                    }`}>
                        {message.text}
                    </span>
                </div>
            )}

            <div className="w-full grid gap-6">
                {/* Header Profilo */}
                <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                    <CardBody className="p-6">
                        <div className="flex items-center gap-4">
                            <Avatar 
                                size="lg"
                                name={getInitials(userProfile?.nome, userProfile?.cognome)}
                                className="w-16 h-16 text-large bg-white text-primary font-bold"
                            />
                            <div className="flex-1">
                                <h1 className="text-2xl font-bold ps-1">
                                    {userProfile?.nome} {userProfile?.cognome}
                                </h1>
                                <p className="text-blue-100 text-sm ps-1">{userProfile?.email}</p>
                                <div className="flex items-center gap-4 mt-2">
                                    <Chip size="sm" variant="flat" className="bg-white/20 text-white p-5">
                                        <Icon icon="lucide:calendar" className="w-3 h-3 mr-1" />
                                        Membro dal {dayjs(userProfile?.data_registrazione).format('MM/YYYY')}
                                    </Chip>
                                    {userProfile?.ruolo === 'admin' && (
                                        <Chip size="sm" color="warning" variant="flat">
                                            <Icon icon="lucide:crown" className="w-3 h-3 mr-1" />
                                            Admin
                                        </Chip>
                                    )}
                                </div>
                            </div>
                        </div>
                    </CardBody>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Informazioni Profilo */}
                    <Card className="bg-content1 border border-default-200">
                        <CardHeader className="pb-3">
                            <div className="flex items-center justify-between w-full">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/20 rounded-xl flex items-center justify-center">
                                        <Icon icon="lucide:user" className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-default-800">Informazioni Personali</h3>
                                        <p className="text-xs text-default-500 mt-0.5">I tuoi dati personali</p>
                                    </div>
                                </div>
                                <Button 
                                    color="primary"
                                    variant="flat"
                                    size="sm"
                                    onPress={onOpen}
                                    startContent={<Icon icon="lucide:edit-2" className="w-4 h-4" />}
                                >
                                    Modifica
                                </Button>
                            </div>
                        </CardHeader>
                        <CardBody className="pt-0">
                            <div className="space-y-4">
                                <div>
                                    <label className="text-sm font-medium text-default-600">Nome</label>
                                    <p className="text-default-800 font-semibold">{userProfile?.nome}</p>
                                </div>
                                <Divider />
                                <div>
                                    <label className="text-sm font-medium text-default-600">Cognome</label>
                                    <p className="text-default-800 font-semibold">{userProfile?.cognome}</p>
                                </div>
                                <Divider />
                                <div>
                                    <label className="text-sm font-medium text-default-600">Email</label>
                                    <p className="text-default-800 font-semibold">{userProfile?.email}</p>
                                </div>
                            </div>
                        </CardBody>
                    </Card>

                    {/* Sicurezza */}
                    <Card className="bg-content1 border border-default-200">
                        <CardHeader className="pb-3">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-orange-50 dark:bg-orange-900/20 rounded-xl flex items-center justify-center">
                                    <Icon icon="lucide:shield" className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-default-800">Sicurezza</h3>
                                    <p className="text-xs text-default-500 mt-0.5">Gestisci la sicurezza del tuo account</p>
                                </div>
                            </div>
                        </CardHeader>
                        <CardBody className="pt-0">
                            <div className="space-y-4">
                                <Button 
                                    color="warning"
                                    variant="flat"
                                    className="w-full justify-start"
                                    onPress={onPasswordOpen}
                                    startContent={<Icon icon="lucide:key" className="w-4 h-4" />}
                                >
                                    Cambia Password
                                </Button>
                                <Button 
                                    color="danger"
                                    variant="flat"
                                    className="w-full justify-start"
                                    onPress={logOutAction}
                                    startContent={<Icon icon="lucide:log-out" className="w-4 h-4" />}
                                >
                                    Disconnetti
                                </Button>
                            </div>
                        </CardBody>
                    </Card>
                </div>
            </div>

            {/* Modal per modifica profilo */}
            <Modal isOpen={isOpen} onClose={onClose} size="md">
                <ModalContent>
                    <ModalHeader className="flex flex-col gap-1">
                        <h3 className="text-lg font-semibold">Modifica Profilo</h3>
                        <p className="text-sm text-default-500">Aggiorna le tue informazioni personali</p>
                    </ModalHeader>
                    <ModalBody>
                        {/* Messaggio di stato nel modal */}
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
                                label="Nome"
                                value={profileForm.nome}
                                onValueChange={(value) => handleInputChange('nome', value)}
                                isDisabled={isUpdating}
                            />
                            
                            <Input
                                label="Cognome"
                                value={profileForm.cognome}
                                onValueChange={(value) => handleInputChange('cognome', value)}
                                isDisabled={isUpdating}
                            />
                            
                            <Input
                                label="Email"
                                type="email"
                                value={profileForm.email}
                                onValueChange={(value) => handleInputChange('email', value)}
                                isDisabled={isUpdating}
                            />
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button 
                            color="danger" 
                            variant="flat" 
                            onPress={onClose}
                            isDisabled={isUpdating}
                        >
                            Annulla
                        </Button>
                        <Button 
                            color="primary" 
                            onPress={handleProfileUpdate}
                            isLoading={isUpdating}
                            isDisabled={isUpdating}
                        >
                            Salva Modifiche
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            {/* Modal per cambio password */}
            <Modal isOpen={isPasswordOpen} onClose={onPasswordClose} size="md">
                <ModalContent>
                    <ModalHeader className="flex flex-col gap-1">
                        <h3 className="text-lg font-semibold">Cambia Password</h3>
                        <p className="text-sm text-default-500">Aggiorna la tua password per mantenere l'account sicuro</p>
                    </ModalHeader>
                    <ModalBody>
                        {/* Messaggio di stato nel modal */}
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
                                label="Password attuale"
                                type="password"
                                value={passwordForm.currentPassword}
                                onValueChange={(value) => handlePasswordInputChange('currentPassword', value)}
                                isDisabled={isChangingPassword}
                            />
                            
                            <Input
                                label="Nuova password"
                                type="password"
                                value={passwordForm.newPassword}
                                onValueChange={(value) => handlePasswordInputChange('newPassword', value)}
                                isDisabled={isChangingPassword}
                                description="Minimo 6 caratteri"
                            />
                            
                            <Input
                                label="Conferma nuova password"
                                type="password"
                                value={passwordForm.confirmPassword}
                                onValueChange={(value) => handlePasswordInputChange('confirmPassword', value)}
                                isDisabled={isChangingPassword}
                            />
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button 
                            color="danger" 
                            variant="flat" 
                            onPress={onPasswordClose}
                            isDisabled={isChangingPassword}
                        >
                            Annulla
                        </Button>
                        <Button 
                            color="warning" 
                            onPress={handlePasswordChange}
                            isLoading={isChangingPassword}
                            isDisabled={isChangingPassword}
                        >
                            Cambia Password
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    );
};