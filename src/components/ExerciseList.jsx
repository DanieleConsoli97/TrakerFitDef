
import { Card, CardBody, Button } from "@heroui/react";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

const ExerciseList = ({ exercises }) => {
  if (!exercises || exercises.length === 0) {
    return (
      <div className="text-center text-default-500 p-4">
        Nessun esercizio disponibile
      </div>
    );
  }

  const getGroupIcon = (group) => {
    const icons = {
      'Gambe': 'fluent-emoji:leg',
      'Petto': 'fluent-emoji:flexed-biceps',
      'Schiena': 'fluent-emoji:person-rowing-boat',
      'Spalle': 'fluent-emoji:person-lifting-weights',
      'Braccia': 'fluent-emoji:flexed-biceps',
      'Core': 'fluent-emoji:person-doing-cartwheel'
    };
    return icons[group] || 'lucide:dumbbell';
  };


  return (
    <div className="h-[calc(100vh-282px)] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      <div className="space-y-4">
        {exercises.map((exercise) => (
          <Card key={exercise.id} className="border border-content2 shadow-sm hover:shadow-md transition-shadow">
            <CardBody className="p-4">
              <div className="flex justify-between items-start">
                <div className="flex items-start gap-3 flex-1">
                  <div className="text-2xl">
                    <Icon icon={getGroupIcon(exercise.gruppo_muscolare)} />
                  </div>
                  
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-semibold">{exercise.nome}</h3>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="text-sm text-default-500">
                        <span>{exercise.gruppo_muscolare}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <Button
                  as={Link}
                  to={`/exercise/${exercise.id}`}
                  isIconOnly
                  variant="light"
                  size="sm"
                >
                  <Icon icon="lucide:eye" className="text-lg" />
                </Button>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default ExerciseList