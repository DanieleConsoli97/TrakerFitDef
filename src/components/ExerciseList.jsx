
import { Card, CardBody, Button } from "@heroui/react";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

const ExerciseList = ({ exercises }) => {
  if (!exercises || exercises.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Icon icon="lucide:dumbbell" className="w-12 h-12 text-default-300 mx-auto mb-4" />
        <p className="text-default-500 text-lg">Nessun esercizio disponibile</p>
        <p className="text-default-400 text-sm mt-2">Aggiungi esercizi per iniziare</p>
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
    <div className="h-[calc(100vh-520px)] overflow-y-auto">
      <div className="space-y-4">
        {exercises.map((exercise) => (
          <Card key={exercise.id} className="bg-content1 border border-default-200 hover:shadow-md transition-shadow duration-200">
            <CardBody className="p-6">
              <div className="flex justify-between items-start">
                <div className="flex items-start gap-4 flex-1">
                  <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 rounded-xl flex items-center justify-center">
                    <Icon 
                      icon={getGroupIcon(exercise.gruppo_muscolare)} 
                      className="w-6 h-6 text-blue-600 dark:text-blue-400" 
                    />
                  </div>
                  
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl font-semibold text-default-800">{exercise.nome}</h3>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400">
                        {exercise.gruppo_muscolare}
                      </span>
                    </div>

                    {exercise.descrizione && (
                      <p className="text-sm text-default-600 mt-2">
                        {exercise.descrizione}
                      </p>
                    )}
                  </div>
                </div>
                
                <Button
                  as={Link}
                  to={`/exercise/${exercise.id}`}
                  variant="flat"
                  size="sm"
                  startContent={<Icon icon="lucide:eye" className="w-4 h-4" />}
                  className="ml-4"
                >
                  Dettagli
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