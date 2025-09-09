import CardSessions from './CardSessions.jsx';

const SessionsComponets = ({ sessions }) => {
  return (
    <div className="h-[calc(100vh)] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      <CardSessions sessions={sessions} />
    </div>
  );
};

export default SessionsComponets;