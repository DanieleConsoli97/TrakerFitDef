
import { useAuth } from "../contexts/AuthProvider";


const Dashboard = () => {
  const { logOutAction } = useAuth();
  return (
    <>
      

      <div>Dashboard</div>
      <button onClick={logOutAction} >ciao</button>
    </>
  )
}

export default Dashboard