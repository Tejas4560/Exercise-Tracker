// Get the workout list from local storage
let workouts = JSON.parse(localStorage.getItem('workouts')) || [];

// Find the div where we want to display the categorized workouts
const workoutListDiv = document.getElementById('workout-list');

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
            totals.running.duration += Number(workout.duration);
            totals.running.calories += Number(workout.calories);
            break;
        case 'walking':
            categorizedWorkouts.walking.push({ ...workout, index });
            totals.walking.duration += Number(workout.duration);
            totals.walking.calories += Number(workout.calories);
            break;
        case 'cycling':
            categorizedWorkouts.cycling.push({ ...workout, index });
            totals.cycling.duration += Number(workout.duration);
            totals.cycling.calories += Number(workout.calories);
            break;
        default:
            categorizedWorkouts.other.push({ ...workout, index });
            totals.other.duration += Number(workout.duration);
            totals.other.calories += Number(workout.calories);
            break;
    }
});

// Function to handle deleting a workout
function deleteWorkout(index) {
    // Remove workout from the array
    workouts.splice(index, 1);

    // Update local storage
    localStorage.setItem('workouts', JSON.stringify(workouts));

    // Refresh the page to reflect the changes
    window.location.reload();
}

// Function to display workouts in a specific category
function displayCategory(categoryName, categoryWorkouts, totalDuration, totalCalories) {
    const categoryDiv = document.createElement('div');
    categoryDiv.className = 'category'; // Add a class for styling
    categoryDiv.innerHTML = `<h3>${categoryName.charAt(0).toUpperCase() + categoryName.slice(1)}</h3>`;

    if (categoryWorkouts.length > 0) {
        categoryWorkouts.forEach(workout => {
            const workoutItem = document.createElement('div');
            workoutItem.className = 'workout-item'; // Add a class for styling
            workoutItem.innerHTML = `
                <p><strong>Exercise:</strong> ${workout.exercise}</p>
                <p><strong>Duration:</strong> ${workout.duration} minutes</p>
                <p><strong>Calories Burned:</strong> ${workout.calories}</p>
                <p><strong>Date:</strong> ${workout.date}</p>
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

// Display each category
displayCategory('Running', categorizedWorkouts.running, totals.running.duration, totals.running.calories);
displayCategory('Walking', categorizedWorkouts.walking, totals.walking.duration, totals.walking.calories);
displayCategory('Cycling', categorizedWorkouts.cycling, totals.cycling.duration, totals.cycling.calories);
displayCategory('Other', categorizedWorkouts.other, totals.other.duration, totals.other.calories);
