
import { useEffect } from "react";
import { useState } from "react";
import SessionsComponets from "../components/SessionsComponets";
import { useAuth } from "../contexts/AuthProvider";
const Dashboard = () => {
  const { sessionIndex } = useAuth();
  console.log(sessionIndex)

  return (
    <>
    
    {sessionIndex === undefined && <p>Caricamento...</p>}
    {sessionIndex === null && <p>Errore nel caricamento delle sessioni</p>}
    {sessionIndex &&  
      <SessionsComponets sessions={sessionIndex?.sessions} />
    }
    
    </>
  )
}

export default Dashboard