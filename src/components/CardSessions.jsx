import { Card, CardBody } from "@heroui/react";
import { Link } from "react-router-dom";

export default function CardSessions({ sessions }) {
  return (
    <div className="space-y-2 sm:space-y-3">
      {sessions?.map((session, index) => (
        <Card 
          key={index} 
          className="w-full hover:shadow-lg transition-shadow duration-200"
        >
          <Link 
            to={`/session/${session.id}`} 
            className="block w-full"
          >
            <CardBody className="p-3 sm:p-4">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-1 sm:space-y-0">
                <h2 className="text-sm sm:text-base font-semibold text-foreground">
                  Sessione: {session.id}
                </h2>
                <p className="text-xs sm:text-sm text-default-500">
                  Inizio: {session.data_sessione}
                </p>
              </div>
            </CardBody>
          </Link>
        </Card>
      ))}
      
      {/* Messaggio quando non ci sono sessioni */}
      {sessions?.length === 0 && (
        <div className="text-center py-8">
          <p className="text-default-500 text-sm sm:text-base">
            Nessuna sessione disponibile
          </p>
        </div>
      )}
    </div>
  );
}