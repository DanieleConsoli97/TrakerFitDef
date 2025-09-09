import { useState } from "react";
import { Button, Input, Card, CardBody } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useAuth } from "../contexts/AuthProvider";

const AddSetToExercise = ({ sessionId, workoutExerciseId, onSetAdded }) => {
  const { addSetToWorkoutExercise } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    serie_num: 1,
    ripetizioni: 10,
    peso: 20
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: parseFloat(value) || 0
    }));
  };

  const handleAddSet = async () => {
    try {
      setLoading(true);
      setError(null);

      // Validate inputs
      if (formData.ripetizioni <= 0 || formData.peso <= 0) {
        setError("Ripetizioni e peso devono essere maggiori di 0");
        return;
      }

      await addSetToWorkoutExercise(sessionId, workoutExerciseId, formData);
      
      // Reset form to next set
      setFormData(prev => ({
        ...prev,
        serie_num: prev.serie_num + 1
      }));
      
      // Notify parent component
      if (onSetAdded) {
        onSetAdded();
      }

    } catch (err) {
      console.error("Errore nell'aggiunta del set:", err);
      setError("Errore durante l'aggiunta del set. Riprova.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="bg-default-50 dark:bg-default-100/20 border border-default-200">
      <CardBody className="p-4">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-center gap-2">
            <Icon icon="lucide:plus-circle" className="w-5 h-5 text-primary" />
            <h4 className="text-sm font-semibold text-default-700">Aggiungi Set</h4>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-danger-50 dark:bg-danger-100/20 rounded-lg p-2 border border-danger-200">
              <div className="flex items-center gap-2">
                <Icon icon="lucide:alert-circle" className="w-4 h-4 text-danger-600" />
                <span className="text-xs text-danger-700 dark:text-danger-600">{error}</span>
              </div>
            </div>
          )}

          {/* Form Inputs */}
          <div className="grid grid-cols-3 gap-3">
            <Input
              type="number"
              label="Serie"
              value={formData.serie_num.toString()}
              onValueChange={(value) => handleInputChange('serie_num', value)}
              min={1}
              isDisabled={loading}
              size="sm"
              startContent={<Icon icon="lucide:hash" className="w-4 h-4 text-default-400" />}
            />
            
            <Input
              type="number"
              label="Ripetizioni"
              value={formData.ripetizioni.toString()}
              onValueChange={(value) => handleInputChange('ripetizioni', value)}
              min={1}
              isDisabled={loading}
              size="sm"
              startContent={<Icon icon="lucide:repeat" className="w-4 h-4 text-default-400" />}
            />
            
            <Input
              type="number"
              label="Peso (kg)"
              value={formData.peso.toString()}
              onValueChange={(value) => handleInputChange('peso', value)}
              min={0}
              step={0.5}
              isDisabled={loading}
              size="sm"
              startContent={<Icon icon="lucide:weight" className="w-4 h-4 text-default-400" />}
            />
          </div>

          {/* Add Button */}
          <Button
            color="primary"
            size="sm"
            onPress={handleAddSet}
            isLoading={loading}
            isDisabled={loading}
            startContent={!loading && <Icon icon="lucide:plus" className="w-4 h-4" />}
            className="w-full"
          >
            {loading ? "Aggiungendo..." : `Aggiungi Set ${formData.serie_num}`}
          </Button>

          {/* Quick Tips */}
          <div className="text-xs text-default-500 space-y-1">
            <div className="flex items-center gap-1">
              <Icon icon="lucide:info" className="w-3 h-3" />
              <span>Il numero serie si incrementa automaticamente</span>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default AddSetToExercise;