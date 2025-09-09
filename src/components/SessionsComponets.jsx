import CardSessions from './CardSessions.jsx';

const SessionsComponets = ({ sessions }) => {
  return (
    <div className="h-[calc(100vh-310px)] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      <CardSessions sessions={sessions} />
    </div>
  );
};

export default SessionsComponets;