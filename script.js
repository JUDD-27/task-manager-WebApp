// Object to store task details and manage tasks
const taskForm = document.querySelector('#taskForm');
const taskName = document.querySelector('#taskName');
const taskDescription = document.querySelector('#taskDescription');
const taskPriority = document.querySelector('#taskPriority');
const importantTask = document.querySelector('#importantTask');
const completedTasks = document.querySelector('#completedTasks');
const completedInput = document.querySelector('#completedInput');



// Task variables for individual tasks

const highTasks = document.querySelector('#highTasks');
const mediumTasks = document.querySelector('#mediumTasks');
const lowTasks = document.querySelector('#lowTasks');

// Array to store tasks
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}


// Function displaying the tasks 

function renderTasks() {

    highTasks.innerHTML = "<h2>High</h2>";
    mediumTasks.innerHTML = "<h2>Medium</h2>";
    lowTasks.innerHTML = "<h2>Low</h2>";
    completedTasks.innerHTML = "<h2>Completed Task</h2>";


    tasks.forEach(function(task) {

        const formattedDate = new Date(task.date).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric"
        });
        const importantClass = task.isImportant ? "important-task" : "";

    if (task.isCompleted) {
        completedTasks.innerHTML += `
            <div class="task-card completed ${importantClass}">
                <h3>${task.name}</h3>
                <p class="task-date">${formattedDate}</p>
                <div class="task-buttons">
                    <button class="restore-btn" data-id="${task.id}">Restore</button>
                    <button id="btn-delete" data-id="${task.id}">Delete</button>
                </div>
            </div>
        `;
    }
    else if (task.priority === "High") {
        highTasks.innerHTML += `
            <div class="task-card ${importantClass}">
                <h3>${task.name}</h3>
                <p>${task.description}</p>
                <p class="task-date"> ${formattedDate}</p>
                <div class="task-buttons">
                    <button class="btn-done" data-id="${task.id}">Complete</button>
                    <button id="btn-delete" data-id="${task.id}">Delete</button>
                </div>
            </div>
        `;
    } else if (task.priority === "Medium") {
        mediumTasks.innerHTML += `
            <div class="task-card ${importantClass}">
                <h3>${task.name}</h3>
                <p>${task.description}</p>
                <p class="task-date"> ${formattedDate}</p>
                <div class="task-buttons">
                    <button class="btn-done" data-id="${task.id}">Complete</button>
                    <button id="btn-delete" data-id="${task.id}">Delete</button>
                </div>
            </div>
        `;
    } else if (task.priority === "Low") {
        lowTasks.innerHTML += `
            <div class="task-card ${importantClass}">
                <h3>${task.name}</h3>
                <p>${task.description}</p>
                <p class="task-date"> ${formattedDate}</p>
                <div class="task-buttons">
                    <button class="btn-done" data-id="${task.id}">Complete</button>
                    <button id="btn-delete" data-id="${task.id}">Delete</button>
                </div>
            </div>
        `;
    }

  
});

}

/* -Function to mark task as complete */
function toggleComplete(id) {
    tasks.forEach(function(task) {
        if (task.id === id) {
            task.isCompleted = true;
        }


    });



    saveTasks();

    console.log(JSON.stringify(tasks));
    renderTasks();
}

/* - Function to delete a task from the list */
function deleteTask(id) {
    tasks = tasks.filter(function(task) {
        return task.id !== id;
    });
    saveTasks();
   console.log(JSON.stringify(tasks));
    renderTasks();
}

/* - Function to restore a completed task back to its original priority section */
function restoreTask(id) {
    tasks.forEach(function(task) {
        if (task.id === id) {
            task.isCompleted = false;
        }
    });

    saveTasks();
    console.log(JSON.stringify(tasks));
    renderTasks();
}

/*
 - Event listener for form submission to add a new task
 - Event listener for delete button to remove a task
 - Event listener for complete button to toggle task completion
 - Event listener for restore button to restore a completed task

*/


taskForm.addEventListener('submit', function(event) {
    event.preventDefault();

    console.log('Task Name:', taskName.value);
    console.log('Task Priority:', taskPriority.value);
    console.log('Important:', importantTask.checked);
    console.log('Completed:', completedInput.checked);

    // Validate task name some it doesn't add empty tasks
    if (taskName.value.trim() === '') {
            alert('Please enter a task name.');
            return;
        }
    if (taskPriority.value === '') {
            alert('Please select a priority.');
            return;
        }


     // task object to store the task details   
    const task = {
        id: Date.now(),
        name: taskName.value.trim(),// Trim whitespace from the task name
        description: taskDescription.value.trim(),
        priority: taskPriority.value,
        isImportant: importantTask.checked,
        isCompleted: completedInput.checked,
        date: new Date()
    };
    

  

    tasks.push(task);
    saveTasks();
    console.log(JSON.stringify(tasks));
    renderTasks();
    taskForm.reset();


});

document.querySelector('#taskmanager').addEventListener('click', function(event) {
    if (event.target.id === 'btn-delete') {
        const taskId = Number(event.target.dataset.id);
        deleteTask(taskId);
    } else if (event.target.classList.contains('btn-done')) {
        const taskId = Number(event.target.dataset.id);
        toggleComplete(taskId);
    } else if (event.target.classList.contains('restore-btn')) {
        const taskId = Number(event.target.dataset.id);
        restoreTask(taskId);
    }
});

renderTasks();
