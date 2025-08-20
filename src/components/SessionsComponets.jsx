import { ScrollShadow } from "@heroui/react";
import CardSessions from './CardSessions.jsx';

const SessionsComponets = ({ sessions }) => {
  console.log(sessions);
  
  return (
    < div className="flex items-center bg-background p-2 sm:p-4 rounded-2xl w-full h-full min-h-0">
      <div className="w-full h-full min-h-0">
        <ScrollShadow 
          className="h-full rounded-xl border-2 border-default-200 p-2 sm:p-4 bg-content1"
          hideScrollBar
        >
          <CardSessions sessions={sessions} />
        </ScrollShadow>
      </div>
    </div>
  
  );
};

export default SessionsComponets;