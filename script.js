document.addEventListener("DOMContentLoaded", () => {
  const createWorkoutContainer = document.querySelector(".create__workout");
  const createWorkoutButton = document.getElementById("create-workout");
  const addExerciseContainer = document.querySelector(".excercise__container");
  const addExerciseButton = document.getElementById("add__excercise--btn");
  const allWorkoutsContainer = document.querySelector(".all__workouts");

  // Ensure the add exercise container is hidden initially
  addExerciseContainer.style.display = "none";

  let workouts = JSON.parse(localStorage.getItem("workouts")) || [];
  let currentWorkout = null;

  // Save workouts to local storage
  const saveWorkouts = () => {
    localStorage.setItem("workouts", JSON.stringify(workouts));
  };

  // Show/hide elements
  const showElement = (element) => (element.style.display = "block");
  const hideElement = (element) => (element.style.display = "none");

  // Create new workout
  createWorkoutButton.addEventListener("click", () => {
    const workoutName = document.getElementById("workout-name").value.trim();
    const workoutType = document.getElementById("workout-type").value.trim();

    if (!workoutName || !workoutType) {
      alert("Please enter both a workout name and type.");
      return;
    }

    // Create a new workout object
    currentWorkout = {
      id: Date.now(),
      name: workoutName,
      type: workoutType,
      exercises: [],
    };

    workouts.push(currentWorkout);
    saveWorkouts();

    // Hide "Create Workout" section and show "Add Exercise" section
    hideElement(createWorkoutContainer);
    showElement(addExerciseContainer);
  });

  // Add new exercise
  addExerciseButton.addEventListener("click", () => {
    if (!currentWorkout) {
      alert("Please create a workout first.");
      return;
    }

    // Corrected input selections
    const exerciseName = document.getElementById("exercise-name").value.trim();
    const sets = document.getElementById("exercise-sets").value.trim();
    const weight = document.getElementById("exercise-weight").value.trim();
    const reps = document.getElementById("exercise-reps").value.trim();

    if (!exerciseName || !sets || !weight || !reps) {
      alert("Please fill in all exercise fields.");
      return;
    }

    const newExercise = {
      id: Date.now(),
      name: exerciseName,
      sets: sets,
      weight: weight,
      reps: reps,
    };

    // Find the last added workout and add exercise
    workouts[workouts.length - 1].exercises.push(newExercise);

    console.log(workouts);
    // Clear input fields
    document.getElementById("exercise-name").value = "";
    document.getElementById("exercise-sets").value = "";
    document.getElementById("exercise-weight").value = "";
    document.getElementById("exercise-reps").value = "";

    saveWorkouts();

    // Refresh UI
    renderWorkouts();
  });

  // Render workouts in the "All Workouts" section
  function renderWorkouts() {
    allWorkoutsContainer.innerHTML = "";

    if (workouts.length === 0) {
      allWorkoutsContainer.innerHTML = "<p>No workouts added yet.</p>";
      return;
    }

    workouts.forEach((workout, workoutIndex) => {
      const workoutDiv = document.createElement("div");
      workoutDiv.classList.add("workout__list");

      workoutDiv.innerHTML = `
                <div class="workout__list--title">
                    <h2>${workout.name}</h2>
                    <p>${workout.type}</p>
                </div>
                <div class="workout__excercise--container">
                    ${workout.exercises
                      .map(
                        (exercise, index) => `
                            <h3>${exercise.name}</h3>
                            <div class="excercise__group">
                                <div class="excercise__info">
                                    <p>Set # ${index + 1}</p>
                                    <div class="input__div">
                                        <p>Weight:</p>
                                        <input value="${
                                          exercise.weight
                                        } lbs" disabled>
                                    </div>
                                    <div class="input__div">
                                        <p>Reps:</p>
                                        <input value="${
                                          exercise.reps
                                        }" disabled>
                                    </div>
                                </div>
                            </div>
                            <button class="delete__excercise--btn" data-workout-index="${workoutIndex}" data-exercise-index="${index}">Delete Exercise</button>
                        `
                      )
                      .join("")}
                    <button class="delete__workout--btn" data-workout-index="${workoutIndex}">Delete Workout</button>
                </div>
            `;

      allWorkoutsContainer.appendChild(workoutDiv);
    });

    // Delete exercise button event listeners
    document.querySelectorAll(".delete__excercise--btn").forEach((button) => {
      button.addEventListener("click", (event) => {
        const workoutIndex = event.target.getAttribute("data-workout-index");
        const exerciseIndex = event.target.getAttribute("data-exercise-index");
        workouts[workoutIndex].exercises.splice(exerciseIndex, 1);
        saveWorkouts();
        renderWorkouts();
      });
    });

    // Delete workout button event listeners
    document.querySelectorAll(".delete__workout--btn").forEach((button) => {
      button.addEventListener("click", (event) => {
        const workoutIndex = event.target.getAttribute("data-workout-index");
        workouts.splice(workoutIndex, 1);
        saveWorkouts();
        renderWorkouts();

        // Show the "Create Workout" section again if there are no workouts left
        if (workouts.length === 0) {
          showElement(createWorkoutContainer);
          hideElement(addExerciseContainer);
        }
      });
    });
  }

  // Load workouts from local storage on page load
  renderWorkouts();
});
