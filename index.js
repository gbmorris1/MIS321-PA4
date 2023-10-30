let myExercise = JSON.parse(localStorage.getItem('myExercise')) || [];
let nextExerciseId = myExercise.length > 0 ? Math.max(...myExercise.map(e => e.id)) + 1 : 1;
async function fetchExercises() {
    const response = await fetch('http://localhost:3000/exercises');
    if (response.ok) { // Check if HTTP status code is 200-299
        const data = await response.json();
        if (Array.isArray(data)) {
            myExercise = data.filter(exercise => !exercise.deleted);
        } else {
            console.error("Data received is not an array:", data);
        }
    } else {
        console.error("Error fetching exercises:", response.status, response.statusText);
    }
}

function formatDate(isoDateString) {
    const [year, month, day] = isoDateString.split('T')[0].split('-');
    return `${month}-${day}-${year}`;
}

const isoDate = "2023-10-04T05:00:00.000Z";
console.log(formatDate(isoDate)); // Outputs: "10-04-2023"

async function handleOnLoad() {
    await fetchExercises();
    myExercise.sort((a, b) => new Date(b.Date) - new Date(a.Date));

    let html = `
        <form class="form" onsubmit="return false">
            <div class="form-group">
                <label for="exerciseType">Exercise Type:</label>
                <input type="text" id="activityType" name="exercise">
            </div>
            <div class="form-group">
                <label for="distance">Distance:</label>
                <input type="text" id="distanceMiles" name="distance">
            </div>
            <div class="form-group">
                <label for="date">Date:</label>
                <input type="date" id="dateCompleted" name="date">
            </div>
            <button onclick="handleExerciseAdd()" class="btn btn-danger">Add Exercise</button>
        </form>

        <table class="table">
            <thead>
                <tr>
                    <th scope="col">ID#</th>
                    <th scope="col">Activity Type</th>
                    <th scope="col">Distance(miles)</th>
                    <th scope="col" onclick="sortTableByDate()">Date Completed</th>
                    <th scope="col">Pin</th>
                    <th scope="col">Delete</th>
                </tr>
            </thead>
            <tbody id="exerciseTableBody">`;

    myExercise.forEach(function (exercise, index) {
        let rowNumber = index + 1;
        html += `
            <tr>
                <th scope="row">${exercise.id}</th>
                <td>${exercise.activityType}</td>
                <td>${exercise.distanceMiles || 0}</td>
                <td>${formatDate(exercise.dateCompleted)}</td>
                <td><button class="btn ${exercise.pinned ? 'btn-primary' : 'btn-danger'}" onclick="handleExercisePin(${exercise.id})">${exercise.pinned ? 'Pinned' : 'Pin'}</button></td>
                <td><button class="btn btn-secondary" onclick="handleExerciseDelete(${exercise.id})">Delete</button></td>
            </tr>`;
    });

    html += `</tbody></table>`;

    document.getElementById("app").innerHTML = html;
}

async function handleExerciseDelete(id) {
    const exercise = myExercise.find(ex => ex.id === id);
    if (exercise) {
        exercise.deleted = true;

        await fetch(`http://localhost:3000/exercises/${id}/delete`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(exercise)
        });

        await handleOnLoad();
    }
}


async function handleExercisePin(id) {
    const exercise = myExercise.find(ex => ex.id === id);

    if (exercise) {
        exercise.Pinned = !exercise.Pinned;
        await fetch(`http://localhost:3000/exercises/${id}/pin`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({pinned: exercise.Pinned})
        });

        await handleOnLoad();
    }
}



async function handleExerciseAdd() {
    let activityType = document.getElementById('activityType').value;
    let distanceMiles = document.getElementById('distanceMiles').value;
    let dateCompleted = document.getElementById('dateCompleted').value;

    const exercise = {
        activityType: activityType,
        distanceMiles: distanceMiles,
        dateCompleted: dateCompleted,
        Pinned: false
    };

    await fetch('http://localhost:3000/exercises', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(exercise)
    });

    await handleOnLoad();
}

function sortTableByDate() {
    myExercise.reverse();
    handleOnLoad();
}

handleOnLoad();