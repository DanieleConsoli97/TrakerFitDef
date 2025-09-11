import { useAuth } from "../contexts/AuthProvider";
import { useMemo } from "react";
import { Button, Card, CardBody, CardHeader, CardFooter, Image, Progress, Chip } from "@heroui/react";
import dayjs from 'dayjs';
import { useGlobalContext } from "../contexts/GlobalContext";
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Icon } from "@iconify/react";
import imageExercise from "../assets/exer.png";
import imageMassimale from "../assets/ProgettoMassimale.png";
import imageSessione from "../assets/ProgettoSessioni.png";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { sessionsIndex, exercisesIndex, maxesIndex, addSetToWorkoutExercise, addExerciseToSession, addNewSession, fetchSessions } = useAuth();
  const { pageSession, setPageSession } = useGlobalContext();

  // Calcolo statistiche dai dati reali
  const dashboardStats = useMemo(() => {
    const totalSessions = sessionsIndex?.sessions?.length || 0;
    const totalExercises = exercisesIndex?.exercises?.length || 0;
    const totalMaxes = maxesIndex?.length || 0;
    
    // Calcolo sessioni ultime 7 giorni
    const recentSessions = sessionsIndex?.sessions?.filter(session => {
      const sessionDate = dayjs(session.data_sessione);
      return sessionDate.isAfter(dayjs().subtract(7, 'days'));
    }) || [];
    
    // Gruppo muscolare più allenato
    const muscleGroupCount = {};
    recentSessions.forEach(session => {
      if (session.exercises) {
        session.exercises.forEach(exercise => {
          const group = exercise.gruppo_muscolare || 'Altro';
          muscleGroupCount[group] = (muscleGroupCount[group] || 0) + 1;
        });
      }
    });
    
    const topMuscleGroup = Object.entries(muscleGroupCount).sort(([,a], [,b]) => b - a)[0];
    
    return {
      totalSessions,
      totalExercises, 
      totalMaxes,
      recentSessions: recentSessions.length,
      topMuscleGroup: topMuscleGroup ? topMuscleGroup[0] : 'Nessuno'
    };
  }, [sessionsIndex, exercisesIndex, maxesIndex]);

  // Dati per grafico attività settimanale
  const weeklyActivityData = useMemo(() => {
    if (!sessionsIndex?.sessions) return [];
    
    const last7Days = Array.from({length: 7}, (_, i) => {
      const date = dayjs().subtract(6-i, 'days');
      return {
        date: date.format('DD/MM'),
        fullDate: date.format('YYYY-MM-DD'),
        sessions: 0,
        exercises: 0
      };
    });
    
    sessionsIndex.sessions.forEach(session => {
      const sessionDate = dayjs(session.data_sessione).format('YYYY-MM-DD');
      const dayData = last7Days.find(day => day.fullDate === sessionDate);
      if (dayData) {
        dayData.sessions++;
        dayData.exercises += session.exercises?.length || 0;
      }
    });
    
    return last7Days;
  }, [sessionsIndex]);

  // Dati per grafico esercizi più utilizzati
  const topExercisesData = useMemo(() => {
    if (!sessionsIndex?.sessions) return [];
    
    const exerciseCount = {};
    sessionsIndex.sessions.forEach(session => {
      if (session.exercises) {
        session.exercises.forEach(exercise => {
          const name = exercise.nome_esercizio || exercise.nome || 'Sconosciuto';
          exerciseCount[name] = (exerciseCount[name] || 0) + 1;
        });
      }
    });
    
    return Object.entries(exerciseCount)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([name, count]) => ({ name, count, fill: `hsl(${Math.random() * 360}, 70%, 50%)` }));
  }, [sessionsIndex]);

  // Dati per grafico andamento massimali
  const maxesProgressData = useMemo(() => {
    if (!maxesIndex) return [];
    
    return maxesIndex
      .sort((a, b) => new Date(a.data_registrata) - new Date(b.data_registrata))
      .slice(-10) // Ultimi 10 record
      .map(max => ({
        date: dayjs(max.data_registrata).format('DD/MM'),
        peso: max.peso_massimale,
        esercizio: max.nome_esercizio
      }));
  }, [maxesIndex]);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  return (
    <div className="space-y-6 p-6 max-w-7xl mx-auto">
      {/* Header con saluto e statistiche principali */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">Ciao, Atleta! 💪</h1>
            <p className="text-blue-100">Ecco il tuo riepilogo fitness di oggi</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">{dashboardStats.recentSessions}</div>
            <div className="text-sm text-blue-100">Sessioni (7gg)</div>
          </div>
        </div>
        
        {/* Stats Cards Inline */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white/10 backdrop-blur rounded-lg p-3">
            <div className="text-2xl font-bold">{dashboardStats.totalSessions}</div>
            <div className="text-xs text-blue-100">Sessioni Totali</div>
          </div>
          <div className="bg-white/10 backdrop-blur rounded-lg p-3">
            <div className="text-2xl font-bold">{dashboardStats.totalExercises}</div>
            <div className="text-xs text-blue-100">Esercizi</div>
          </div>
          <div className="bg-white/10 backdrop-blur rounded-lg p-3">
            <div className="text-2xl font-bold">{dashboardStats.totalMaxes}</div>
            <div className="text-xs text-blue-100">Massimali</div>
          </div>
          <div className="bg-white/10 backdrop-blur rounded-lg p-3">
            <div className="text-lg font-bold">{dashboardStats.topMuscleGroup}</div>
            <div className="text-xs text-blue-100">Gruppo Top</div>
          </div>
        </div>
      </div>

      {/* Grafici principali */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Grafico attività settimanale */}
        <Card className="p-6">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-2">
              <Icon icon="lucide:activity" className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-semibold">Attività degli ultimi 7 giorni</h3>
            </div>
          </CardHeader>
          <CardBody>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={weeklyActivityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="sessions" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
              </AreaChart>
            </ResponsiveContainer>
          </CardBody>
        </Card>

        {/* Grafico esercizi più utilizzati */}
        <Card className="p-6">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-2">
              <Icon icon="lucide:bar-chart-3" className="w-5 h-5 text-green-600" />
              <h3 className="text-lg font-semibold">Esercizi più utilizzati</h3>
            </div>
          </CardHeader>
          <CardBody>
            {topExercisesData.length > 0 ? (
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={topExercisesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" angle={-45} textAnchor="end" height={60} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#10b981" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-48 text-gray-500">
                <div className="text-center">
                  <Icon icon="lucide:bar-chart-3" className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>Nessun dato disponibile</p>
                </div>
              </div>
            )}
          </CardBody>
        </Card>
      </div>

      {/* Seconda riga di grafici */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Andamento massimali */}
        <Card className="p-6">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-2">
              <Icon icon="lucide:trending-up" className="w-5 h-5 text-orange-600" />
              <h3 className="text-lg font-semibold">Progressi Massimali</h3>
            </div>
          </CardHeader>
          <CardBody>
            {maxesProgressData.length > 0 ? (
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={maxesProgressData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value, name, props) => [
                      `${value} kg`, 
                      props.payload.esercizio
                    ]}
                  />
                  <Line type="monotone" dataKey="peso" stroke="#f97316" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-48 text-gray-500">
                <div className="text-center">
                  <Icon icon="lucide:trending-up" className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>Nessun massimale registrato</p>
                </div>
              </div>
            )}
          </CardBody>
        </Card>

        {/* Azioni rapide */}
        <Card className="p-6">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-2">
              <Icon icon="lucide:zap" className="w-5 h-5 text-purple-600" />
              <h3 className="text-lg font-semibold">Azioni Rapide</h3>
            </div>
          </CardHeader>
          <CardBody>
            <div className="grid grid-cols-1 gap-3">
              <Link to="/sessions">
                <Button 
                  className="w-full justify-start" 
                  color="primary" 
                  variant="flat"
                  startContent={<Icon icon="lucide:plus" className="w-4 h-4" />}
                >
                  Nuova Sessione
                </Button>
              </Link>
              <Link to="/maxes">
                <Button 
                  className="w-full justify-start" 
                  color="success" 
                  variant="flat"
                  startContent={<Icon icon="lucide:trophy" className="w-4 h-4" />}
                >
                  Aggiungi Massimale
                </Button>
              </Link>
              <Link to="/esercizi">
                <Button 
                  className="w-full justify-start" 
                  color="secondary" 
                  variant="flat"
                  startContent={<Icon icon="lucide:search" className="w-4 h-4" />}
                >
                  Cerca Esercizi
                </Button>
              </Link>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Card di navigazione classiche (ridotte) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card isFooterBlurred className="border-none aspect-[16/9]" radius="lg">
          <Image alt="Esercizi" className="object-cover object-top" src={imageExercise} />
          <Link to={"/esercizi"}>
            <CardFooter className="absolute bottom-1 left-1 w-[calc(100%_-_8px)] py-2 rounded-large border border-white/20 before:bg-white/10 before:rounded-xl shadow-small z-10 justify-center">
              <p className="text-tiny text-white/80 text-center">Lista Esercizi</p>
            </CardFooter>
          </Link>
        </Card>
        
        <Card isFooterBlurred className="border-none aspect-[16/9]" radius="lg">
          <Image alt="Sessioni" className="object-cover object-top" src={imageSessione} />
          <Link to={"/sessions"}>
            <CardFooter className="justify-center before:bg-white/10 border-white/20 border-1 overflow-hidden py-2 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
              <p className="text-tiny text-white/80">Lista Sessioni</p>
            </CardFooter>
          </Link>
        </Card>
        
        <Card isFooterBlurred className="border-none aspect-[16/9]" radius="lg">
          <Image alt="Massimali" className="object-cover object-top" height={"100%"} src={imageMassimale} width={"100%"} />
          <Link to={"/maxes"}>
            <CardFooter className="justify-center before:bg-white/10 border-white/20 border-1 overflow-hidden py-2 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
              <p className="text-tiny text-white/80">Lista Massimali</p>
            </CardFooter>
          </Link>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;