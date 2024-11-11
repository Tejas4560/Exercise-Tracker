
document.getElementById('workout-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const exercise = document.getElementById('exercise').value;
    const duration = document.getElementById('duration').value;
    const calories = document.getElementById('calories').value;

    
    const workout = {
        exercise: exercise,
        duration: parseInt(duration, 10),
        calories: parseInt(calories, 10),
        date: new Date().toLocaleDateString()
    };

    
    let workouts = JSON.parse(localStorage.getItem('workouts')) || [];

    
    workouts.push(workout);

    
    localStorage.setItem('workouts', JSON.stringify(workouts));

   
    alert('Workout logged successfully!');

    
    document.getElementById('workout-form').reset();

   
});

