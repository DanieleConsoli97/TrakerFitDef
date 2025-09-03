import { useState, useEffect } from 'react';
import { useGlobalContext } from '../../contexts/GlobalContext';
import { useAuth } from '../../contexts/AuthProvider';

const useSessionData = () => {
    const { fetchWithAuth } = useAuth();
    const {pageSession}=useGlobalContext()
    const [sessionsIndex, setSessions] = useState();
    
    const fetchSessions = async () => {
            try {
                if(sessionsIndex){
                  if(pageSession>sessionsIndex.totalPages){
                    return
                }  
                }
                // Usa il fetchWithAuth centralizzato per ottenere le sessioni
                const sessions = await fetchWithAuth(`/sessions?page=${pageSession}&limit=10`);
                setSessions(sessions);
            } catch (err) {
                console.error(err);
            }
        };
    
    useEffect(() => {
        if (fetchWithAuth) {
            fetchSessions();
        }
    }, [fetchWithAuth, pageSession]);

    return { sessionsIndex,fetchSessions }
};

export default useSessionData;