
import { useParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";
const ExerciseDetail = () => {
    const { id } = useParams();
    const { exercisesIndex } = useAuth();
    // Mostra messaggi di stato
    if (!exercisesIndex) {
        return <p>Caricamento...</p>;
    }
    // Cerca la sessione con quell'ID
    const exercise = exercisesIndex.exercises?.find(s => String(s.id) === id);

    return (

        <div>
            {exercise === null && <p>nessun esercizio trovato </p>}
            {exercise === undefined && <p> caricamento </p>}

            {<div key={exercise.id} style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ccc', borderRadius: '8px' }}>
                <h3>{exercise.nome}</h3>
                <p><strong>Gruppo muscolare:</strong> {exercise.gruppo_muscolare}</p>
                <p><strong>Categoria:</strong> {exercise.categoria_id}</p>
            </div>
            }
        </div>
    )
}


export default ExerciseDetail