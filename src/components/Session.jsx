// Session.jsx
import { useLocation } from "react-router-dom";

const Session = () => {
  
  const location = useLocation();
  console.log(location.state); // Controlla cosa contiene lo stato passato
  const { session } = location.state || {}; // Recupera i dati della sessione

  if (!session) return <div>Sessione non trovata</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Dettaglio Sessione</h1>
      <div className="mt-4 space-y-2">
        <p><strong>ID:</strong> {session.id}</p>
        <p><strong>Data:</strong> {session.data_sessione}</p>
        {/* Aggiungi altri campi della sessione qui */}
      </div>
    </div>
  );
}

export default Session;