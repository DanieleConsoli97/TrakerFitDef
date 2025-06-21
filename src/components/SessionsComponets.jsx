
import { Card, ScrollShadow } from "@heroui/react";
import  CardSessions from './CardSessions.jsx';

const SessionsComponets = ({sessions}) => {
  console.log(sessions)
  return (
   <div className="flex  items-center  bg-background p-4">
      <div className="w-full max-w-4xl">
        <ScrollShadow 
          className="h-[400px] rounded-xl border-2 border-default-200 p-4 bg-content1"
          hideScrollBar
        >
          <CardSessions sessions={sessions} />
        </ScrollShadow>
      </div>
    </div>
  )
}

export default SessionsComponets