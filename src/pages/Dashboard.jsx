import { useAuth } from "../contexts/AuthProvider";
import SessionsComponets from "../components/SessionsComponets";

const Dashboard = () => {
  const { sessionsIndex } = useAuth();
  
  return (
    <div className="p-2 sm:p-4">
      {/* Grid responsive: 1 colonna su mobile, 2 colonne su tablet+, 2x2 su desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 lg:grid-rows-2 lg:h-[calc(100vh-6rem)]">
        
        {/* Sezione 1 - Lista Workout */}
        <div className="flex flex-col bg-violet-900 rounded-lg p-3 sm:p-4 min-h-[300px] overflow-hidden">
          <h1 className="text-xl sm:text-2xl font-bold text-center mb-3 sm:mb-4 text-white flex-shrink-0">
            Lista Workout 💪
          </h1>
          <div className="flex-1 min-h-0">
            {sessionsIndex === undefined && (
              <p className="text-center text-violet-200">Caricamento...</p>
            )}
            {sessionsIndex === null && (
              <p className="text-center text-red-300">Errore nel caricamento delle sessioni</p>
            )}
            {sessionsIndex && (
              <SessionsComponets sessions={sessionsIndex.sessions} />
            )}
          </div>
        </div>
        
        {/* Sezione 2 - In alto a destra / seconda su mobile */}
        <div className="flex flex-col bg-violet-900 rounded-lg p-3 sm:p-4 min-h-[200px] lg:min-h-0">
          <h2 className="text-lg sm:text-xl font-bold text-center mb-3 sm:mb-4 text-white">
            Sezione 2
          </h2>
          <div className="flex-1 text-violet-200">
            {/* Contenuto futuro */}
            <p className="text-center">Contenuto in arrivo...</p>
          </div>
        </div>
        
        {/* Sezione 3 - In basso a sinistra / terza su mobile */}
        <div className="flex flex-col bg-violet-900 rounded-lg p-3 sm:p-4 min-h-[200px] lg:min-h-0">
          <h2 className="text-lg sm:text-xl font-bold text-center mb-3 sm:mb-4 text-white">
            Sezione 3
          </h2>
          <div className="flex-1 text-violet-200">
            {/* Contenuto futuro */}
            <p className="text-center">Contenuto in arrivo...</p>
          </div>
        </div>
        
        {/* Sezione 4 - In basso a destra / ultima su mobile */}
        <div className="flex flex-col bg-violet-900 rounded-lg p-3 sm:p-4 min-h-[200px] lg:min-h-0">
          <h2 className="text-lg sm:text-xl font-bold text-center mb-3 sm:mb-4 text-white">
            Sezione 4
          </h2>
          <div className="flex-1 text-violet-200">
            {/* Contenuto futuro */}
            <p className="text-center">Contenuto in arrivo...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;