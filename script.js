// Object to store task details and manage tasks
const taskForm = document.querySelector('#taskForm');
const taskName = document.querySelector('#taskName');
const taskDescription = document.querySelector('#taskDescription');
const taskPriority = document.querySelector('#taskPriority');
const importantTask = document.querySelector('#importantTask');
const completedTask = document.querySelector('#completedTask');


// Task variables represent individual tasks

const highTasks = document.querySelector('#highTasks');
const mediumTasks = document.querySelector('#mediumTasks');
const lowTasks = document.querySelector('#lowTasks');

// Array to store tasks
let tasks = [];

function renderTasks() {

   highTasks.innerHTML = "<h2>High</h2>";
    tasks.forEach(function(task) {
    if (task.priority === "High") {
        highTasks.innerHTML += `
            <div class="task-card">
                <p>${task.name}</p>
                <p>${task.description}</p>
            </div>
        `;
     
    }
});

}


taskForm.addEventListener('submit', function(event) {
    event.preventDefault();

    console.log('Task Name:', taskName.value);
    console.log('Task Priority:', taskPriority.value);
    console.log('Important:', importantTask.checked);
    console.log('Completed:', completedTask.checked);

    // Validate task name some it doesn't add empty tasks
    if (taskName.value.trim() === '') {
            alert('Please enter a task name.');
            return;
        }

     // task object to store the task details   
    const task = {
        id: Date.now(),
        name: taskName.value.trim(),// Trim whitespace from the task name
        description: taskDescription.value.trim(),
        priority: taskPriority.value,
        isImportant: importantTask.checked,
        isCompleted: completedTask.checked,
        date: new Date()
    };

  

    tasks.push(task);
    console.log(JSON.stringify(tasks));
    renderTasks();
    taskForm.reset();


});