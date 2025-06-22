
import { useState, useEffect } from 'react';
import useSessions from './useSessions';

const useSessionData = (token) => {
    const { indexSessions } = useSessions(token);
    const [sessions, setSessions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const fetchSessions = async () => {
        if (!token) return;

        setLoading(true);
        try {
            const data = await indexSessions(token);
            setSessions(data.sessions || []);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => { fetchSessions() }, [token]);

    return { sessions, loading, error, refresh: fetchSessions };
};

export default useSessionData;