// Session.jsx
import { useParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";

const SessionDetails = () => {
  
  const { id } = useParams();
  const { sessionsIndex } = useAuth();

  // Mostra messaggi di stato
  if (!sessionsIndex) {
    return <p>Caricamento...</p>;
  }

  // Cerca la sessione con quell'ID
  const session = sessionsIndex.sessions?.find(s => String(s.id) === id);

  // Se non trovata
  if (!session) {
    return <p>Sessione non trovata</p>;
  }

  // Se trovata, mostra i dettagli
  return (
    <>
    <div className="p-4">
      <h1 className="text-2xl font-bold">Dettaglio Sessione</h1>
      <div className="mt-4 space-y-2">
        <p><strong>ID:</strong> {session.id}</p>
        <p><strong>Data:</strong> {session.data_sessione}</p>
        {/* Aggiungi altri campi della sessione qui */}
      </div>
    </div>
    {/* aggiunta esercizio alla sessione */}
  </>
);
};

export default SessionDetails;
