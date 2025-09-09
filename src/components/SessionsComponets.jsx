import CardSessions from './CardSessions.jsx';

const SessionsComponets = ({ sessions }) => {
  return (
    <div className="h-full">
      <CardSessions sessions={sessions} />
    </div>
  );
};

export default SessionsComponets;