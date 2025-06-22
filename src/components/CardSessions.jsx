
import { Card, CardBody } from "@heroui/react";
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';
import { Link } from "react-router-dom";



export default function CardSessions({ sessions }) {

  return (
    <div className="space-y-4">
      {sessions?.map((session, index) => (
        <Card key={index} className="w-full">
          {<Link to={`/session/${session.id}`} className="flex flex-col">
            <CardBody>
              <h2>Sessione: {session.id}</h2>
              <p>Inizio: {session.data_sessione}</p>
            </CardBody>
          </Link>}

        </Card>
      ))}
    </div>
  );
};