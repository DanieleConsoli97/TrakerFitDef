import { useState, useEffect } from 'react';
import useSessions from '../useSessions';
import { useGlobalContext } from '../../contexts/GlobalContext';

const useSessionData = (token) => {

    const { indexSessions } = useSessions(token);
    const {pageSession}=useGlobalContext()
    const [sessionsIndex, setSessions] = useState();
    
    useEffect(() => {
        const fetchSessions = async () => {
            try {
                if(sessionsIndex){
                  if(pageSession>sessionsIndex.totalPages){
                    return
                }  
                }
                
                const sessions = await indexSessions(pageSession,10);
                setSessions(sessions);
            } catch (err) {
                console.error(err);
            }
        };

        if (token) {
            fetchSessions();
        }
    }, [token,pageSession]);

    return { sessionsIndex }
};

export default useSessionData;