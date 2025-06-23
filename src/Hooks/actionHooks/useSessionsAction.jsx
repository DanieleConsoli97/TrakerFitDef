import { useState, useEffect } from 'react';
import useSessions from '../useSessions';

const useSessionData = (token) => {

    const { indexSessions } = useSessions(token);

    const [sessionsIndex, setSessions] = useState();
    useEffect(() => {
        const fetchSessions = async () => {
            try {
                const sessions = await indexSessions(token);
                setSessions(sessions);
            } catch (err) {
                console.error(err);
            }
        };

        if (token) {
            fetchSessions();
        }
    }, [token]);

    return { sessionsIndex }
};

export default useSessionData;