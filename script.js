const workoutName = document.getElementById("workout-name");
const workoutType = document.getElementById("workout-type");
const createWorkoutBtn = document.getElementById("create-workout");
const addExcerciseContainer = document.querySelector(".excercise__container");
const addExcerciseBtn = document.querySelector(".add__excercise--btn");
const deleteWorkoutBtn = document.querySelector(".delete__workout--btn");
const deleteExcerciseBtn = document.querySelector(".delete__excercise--btn");
const allWorkoutsContainer = document.querySelector(".all__workouts");

const allWorkouts = [];

const createWorkout = () => {
  if (workoutName.value === "" || workoutType.value === "") {
    alert("Please fill in all fields");
    return;
  } else {
    const workout = {
      name: workoutName.value,
      type: workoutType.value,
      excercises: [],
    };

    allWorkouts.push(workout);
    workoutName.value = "";
    workoutType.value = "";
    renderWorkouts();
  }
};

createWorkoutBtn.addEventListener("click", createWorkout);

const renderWorkouts = () => {
  allWorkoutsContainer.innerHTML = "";

  allWorkouts.forEach((workout) => {
    let workoutHTML = `
      <div class="workout__list">
        <div class="workout__list--title">
          <h2>${workout.name}</h2>
          <p>${workout.type}</p>
        </div>
    `;

    if (workout.excercises.length > 0) {
      workoutHTML += workout.excercises
        .map((exercise) => {
          let exerciseHTML = `
            <div class="workout__excercise--container">
              <h3>${exercise.name}</h3>
              <div class="excercise__group">
          `;

          for (let i = 0; i < exercise.sets; i++) {
            exerciseHTML += `
              <div class="excercise__info">
                <p>Set # ${i + 1}</p>
                <div class="input__div">
                    <p>Weight:</p>
                    <input value="${exercise.weight}"></input>
                </div>
                <div class="input__div">
                    <p>Reps:</p>
                    <input value="${exercise.reps}"></input>
                </div>
              </div>
            `;
          }

          exerciseHTML += `
              </div>
              <button class="delete__excercise--btn">Delete</button>
            </div>
          `;

          return exerciseHTML;
        })
        .join("");
    }

    workoutHTML += `
      <div class="btns__section">
        <button class="add__excercise--btn">Add Exercise</button>
        <button class="delete__workout--btn">Delete Workout</button>
      </div>
    </div>
    `;

    allWorkoutsContainer.innerHTML += workoutHTML;
  });
};

// Need to implement the add excercise function in order to add this to the corresponding workout.
//  Thinking that i need to add an id to the workout object to easily track it.
addExcerciseBtn.addEventListener("click", (element) => {});
