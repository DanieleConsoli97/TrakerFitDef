import { useAuth } from "../contexts/AuthProvider";

import ExerciseList from "../components/ExerciseList";
import { useRef } from "react";
import { Button } from "@heroui/react";
import dayjs from 'dayjs';
import { useGlobalContext } from "../contexts/GlobalContext";
import { Card, CardFooter, Image } from "@heroui/react";
import imageExercise from "../assets/exer.png";
import imageMassimale from "../assets/ProgettoMassimale.png";
import imageSessione from "../assets/ProgettoSessioni.png";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { sessionsIndex, exercisesIndex, addSetToWorkoutExercise, addExerciseToSession, addNewSession, fetchSessions } = useAuth();
  const { pageSession, setPageSession } = useGlobalContext();

  return (
    <div className="md:container space-y-6 md:p-6 p-2">
      {/* Header con saluto e streak */}
      <div className="bg-gradient-to-r from-blue-600 to-orange-500 rounded-2xl p-6 text-white">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold mb-1">Ciao, Atleta! 💪</h2>
            <p className="text-blue-100 mb-4">Sei in ottima forma oggi!</p>
            <div className="flex items-center space-x-4">

            </div>
          </div>
          <div className="text-right">

            <div className="text-sm text-blue-100">Allenamenti</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card
          isFooterBlurred
          className="border-none aspect-[16/9]"
          radius="lg"
        >
          <Image
            alt="Woman listening to music"
            className="object-cover object-top"
            src={imageExercise}
          />
          <Link to={"/esercizi"}>
            <CardFooter
              className="absolute bottom-1 left-1 w-[calc(100%_-_8px)]
              py-2 rounded-large border border-white/20
            before:bg-white/10 before:rounded-xl
              shadow-small z-10
                justify-center " // centratura testo
            >
              <p className="text-tiny text-white/80 text-center ">
                Lista Esercizi
              </p>
            </CardFooter>
          </Link>
        </Card>
        <Card isFooterBlurred className="border-none aspect-[16/9]" radius="lg">
          <Image
            alt="Woman listing to music"
            className="object-cover object-top"

            src={imageSessione}

          />
          <Link to={"/sessions"}>
            <CardFooter className="justify-center  before:bg-white/10 border-white/20 border-1 overflow-hidden py-2 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
              <p className="text-tiny text-white/80">Lista Sessioni</p>
            </CardFooter>
          </Link>
        </Card>
        <Card isFooterBlurred className="border-none aspect-[16/9]" radius="lg">
          <Image
            alt="Woman listing to music"
            className=" object-cover object-top "
            height={"100%"}
            src={imageMassimale}
            width={"100%"}
          />
          <Link to={"/maxes"}>
            <CardFooter className="justify-center  before:bg-white/10 border-white/20 border-1 overflow-hidden py-2 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
              <p className="text-tiny text-white/80"> Lista Massimali</p>
            </CardFooter>
          </Link>
        </Card>
      </div>
      {/* vari  */}
      {/* aggiunta schede di allenamento  */}

    </div>
  );
};

export default Dashboard;