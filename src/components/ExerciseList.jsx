
import { Card, CardBody, ScrollShadow } from "@heroui/react";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";


const ExerciseList = ({ exercises }) => {
  console.log(exercises)
  return (

    <ScrollShadow className="h-[400px]">

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {exercises.map((exercise) => (
          <Link key={exercise.id} to={`/exercise/${exercise.id}`}>
            <Card key={exercise.id} className="border border-content2 shadow-sm">
              <CardBody>
                <h3 className="text-lg font-semibold mb-2">{exercise.nome}</h3>
                <div className="flex items-center text-default-500">
                  <Icon icon="lucide:dumbbell" className="mr-2" />
                  <span>{exercise.gruppo_muscolare}</span>
                </div>
              </CardBody>
            </Card>
          </Link>
        ))}
      </div>

    </ScrollShadow>
  );
}

export default ExerciseList