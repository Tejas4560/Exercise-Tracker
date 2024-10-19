// Listen for the form submission event
document.getElementById('workout-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const exercise = document.getElementById('exercise').value;
    const duration = document.getElementById('duration').value;
    const calories = document.getElementById('calories').value;

    // Create a workout object to store the data
    const workout = {
        exercise: exercise,
        duration: parseInt(duration, 10),
        calories: parseInt(calories, 10),
        date: new Date().toLocaleDateString()
    };

    // Get any existing workouts from local storage (or create an empty array)
    let workouts = JSON.parse(localStorage.getItem('workouts')) || [];

    // Add the new workout to the list
    workouts.push(workout);

    // Save the updated list back to local storage
    localStorage.setItem('workouts', JSON.stringify(workouts));

    // Confirm the workout was saved
    alert('Workout logged successfully!');

    // Clear the form
    document.getElementById('workout-form').reset();

    // Display the workouts again after logging a new one
    displayWorkouts();
});

// Function to display the workouts
function displayWorkouts() {
    // Get the workout list from local storage
    let workouts = JSON.parse(localStorage.getItem('workouts')) || [];

    // Find the div where we want to display the categorized workouts
    const workoutListDiv = document.getElementById('workout-list');

    // Clear the previous content
    workoutListDiv.innerHTML = '';

    // Create objects to store categorized workouts and totals
    const categorizedWorkouts = {
        running: [],
        walking: [],
        cycling: [],
        other: []
    };

    // Total counters for each category
    const totals = {
        running: { duration: 0, calories: 0 },
        walking: { duration: 0, calories: 0 },
        cycling: { duration: 0, calories: 0 },
        other: { duration: 0, calories: 0 }
    };

    // Categorize workouts
    workouts.forEach((workout, index) => {
        switch (workout.exercise.toLowerCase()) {
            case 'running':
                categorizedWorkouts.running.push({ ...workout, index });
                totals.running.duration += workout.duration;
                totals.running.calories += workout.calories;
                break;
            case 'walking':
                categorizedWorkouts.walking.push({ ...workout, index });
                totals.walking.duration += workout.duration;
                totals.walking.calories += workout.calories;
                break;
            case 'cycling':
                categorizedWorkouts.cycling.push({ ...workout, index });
                totals.cycling.duration += workout.duration;
                totals.cycling.calories += workout.calories;
                break;
            default:
                categorizedWorkouts.other.push({ ...workout, index });
                totals.other.duration += workout.duration;
                totals.other.calories += workout.calories;
                break;
        }
    });

    // Display each category
    displayCategory('Running', categorizedWorkouts.running, totals.running.duration, totals.running.calories);
    displayCategory('Walking', categorizedWorkouts.walking, totals.walking.duration, totals.walking.calories);
    displayCategory('Cycling', categorizedWorkouts.cycling, totals.cycling.duration, totals.cycling.calories);
    displayCategory('Other', categorizedWorkouts.other, totals.other.duration, totals.other.calories);
}

// Function to handle deleting a workout
function deleteWorkout(index) {
    // Get the current workouts
    let workouts = JSON.parse(localStorage.getItem('workouts')) || [];
    
    // Remove workout from the array
    workouts.splice(index, 1);

    // Update local storage
    localStorage.setItem('workouts', JSON.stringify(workouts));

    // Refresh the workouts display
    displayWorkouts();
}

// Function to display workouts in a specific category
function displayCategory(categoryName, categoryWorkouts, totalDuration, totalCalories) {
    const categoryDiv = document.createElement('div');
    categoryDiv.classList.add('category'); // Add a class for styling
    categoryDiv.innerHTML = `<h3>${categoryName.charAt(0).toUpperCase() + categoryName.slice(1)}</h3>`;

    if (categoryWorkouts.length > 0) {
        categoryWorkouts.forEach(workout => {
            const workoutItem = document.createElement('div');
            workoutItem.classList.add('workout-item'); // Add a class for styling
            workoutItem.innerHTML = `
                <p>Exercise: ${workout.exercise}</p>
                <p>Duration: ${workout.duration} minutes</p>
                <p>Calories Burned: ${workout.calories}</p>
                <p>Date: ${workout.date}</p>
                <button class="delete-btn" onclick="deleteWorkout(${workout.index})">Delete</button>
            `;
            categoryDiv.appendChild(workoutItem);
        });

        // Add totals for this category
        categoryDiv.innerHTML += `
            <p><strong>Total Duration:</strong> ${totalDuration} minutes</p>
            <p><strong>Total Calories Burned:</strong> ${totalCalories}</p>
            <hr>
        `;
    } else {
        categoryDiv.innerHTML += '<p>No workouts logged in this category.</p><hr>';
    }

    workoutListDiv.appendChild(categoryDiv);
}

// Initial display of workouts
displayWorkouts();
