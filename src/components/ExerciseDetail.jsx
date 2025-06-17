import { useEffect, useState } from "react"

const ExerciseDetail = () => {
    const [exercise, setExercise] = useState(null)

    const fetchExercise = async () => {
        try {

            const response = await fetch("http://localhost:3000/api/exercises")

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }
            const data = await response.json()
            setExercise(data)
        } catch (err) {
            console.log(err)
            setExercise(null)
        }
    }
        useEffect(() => {
            fetchExercise()
        }, [])


        if (!exercise || exercise.length === 0) {
            return <p>Nessun esercizio trovato</p>
        }

        return (

            <div>
                {exercise === null && <p>nessun </p>}
                {exercise === undefined && <p>nessun </p>}
                {exercise.map((e, index) => (
                    <div key={e.exercise_id} style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ccc', borderRadius: '8px' }}>
                    <h3>{e.exercise_name}</h3>
                    <p><strong>Gruppo muscolare:</strong> {e.muscle_group}</p>
                    <p><strong>Categoria:</strong> {e.category}</p>
                    <p><strong>Descrizione:</strong> {e.exercise_description}</p>
                </div>
                ))}
            </div>
        )
    }


export default ExerciseDetail