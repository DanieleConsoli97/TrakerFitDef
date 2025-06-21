
import { Card, CardBody } from "@heroui/react";


export default  function  CardSessions  ({sessions}) {
  return (
    <div className="space-y-4">
      {sessions?.map((session) => (
        <Card key={sessions.id} className="w-full">
          <CardBody>
            <h2>Sessione: {session.id}</h2>
            <p>Inizio: {session.data_sessione}</p>
          </CardBody>
        </Card>
      ))}
    </div>
  );
};