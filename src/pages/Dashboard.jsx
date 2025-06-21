
import { useEffect } from "react";
import { useAuth } from "../contexts/AuthProvider";
import { useState } from "react";
import SessionsComponets from "../components/SessionsComponets";
const Dashboard = () => {
  const [sessionsIndex, setSessions] = useState();
  const { indexSessions,token } = useAuth();
  
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
  }, [token, indexSessions]);

  return (
    <>
    
   
    {sessionsIndex === undefined && <p>Caricamento...</p>}
    {sessionsIndex === null && <p>Errore nel caricamento delle sessioni</p>}
    {sessionsIndex &&  
      <SessionsComponets sessions={sessionsIndex.sessions} />
    }
    
    </>
  )
}

export default Dashboard