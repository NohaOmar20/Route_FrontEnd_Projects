var Status;
(function (Status) {
    Status[Status["toDo"] = 0] = "toDo";
    Status[Status["inProgress"] = 1] = "inProgress";
    Status[Status["Completed"] = 2] = "Completed";
})(Status || (Status = {}));
// add-task-btn modal-overlay  task-title task-priority task-due-date task-description submit-btn
let addtaskbtn = document.querySelector("#addTaskBtn");
let modaloverlay = document.querySelector("#modal-overlay");
let tasktitle = document.querySelector("#task-title");
let taskpriority = document.querySelector("#task-priority");
let taskduedate = document.querySelector("#task-due-date");
let taskdescription = document.querySelector("#task-description");
let submitbtn = document.querySelector("#submit-btn");
let toDoCol = document.querySelector("#tasksTodo");
let inProgressCol = document.querySelector("#tasksInProgress");
let completedCol = document.querySelector("#tasksCompleted");
let allTasks = loadDate();
// Show the modal when the add task button is clicked
addtaskbtn?.addEventListener("click", () => {
    modaloverlay?.classList.remove("hidden");
});
// Create a card element for a task
function createCard(task) {
    const card = document.createElement("div");
    card.innerHTML = `
    <div class="group bg-white rounded-xl p-4 shadow-sm border border-slate-100 hover:shadow-md hover:border-slate-200 transition-all duration-200 ring-2 ring-red-100 border-red-200">
        <!-- Top Bar & Title setup -->
        <div class="flex items-center justify-between mb-3">
          <div class="flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-slate-300"></span>
            <span class="text-[10px] font-medium text-slate-400 uppercase tracking-wider">#${task.id.toString().slice(-3)}</span>
          </div>
        </div>

        <h3 class="font-semibold text-slate-800 mb-2 leading-snug">${task.title}</h3>

        <div class="flex flex-wrap items-center gap-2 mb-4">
          <span class="bg-amber-50 text-amber-600 text-[10px] font-semibold px-2 py-1 rounded-full flex items-center gap-1.5 uppercase tracking-wide">
            <span class="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
            ${task.priority}
          </span>
        </div>

        <!-- Action Buttons -->
        <div class="flex flex-wrap gap-2">
          ${task.status === Status.toDo ? `
            <button class="status-btn text-[11px] px-3 py-2 rounded-lg font-semibold bg-amber-100 text-amber-700" 
                    data-task-id="${task.id}" data-target-status="${Status.inProgress}">
              <i class="fa-solid fa-play pointer-events-none"></i> Start
            </button>
            <button class="status-btn text-[11px] px-3 py-2 rounded-lg font-semibold bg-emerald-100 text-emerald-700"
                    data-task-id="${task.id}" data-target-status="${Status.Completed}">
              <i class="fa-solid fa-check pointer-events-none"></i> Complete
            </button>
          ` : ""}

          ${task.status === Status.inProgress ? `
            <button class="status-btn text-[11px] px-3 py-2 rounded-lg font-semibold bg-amber-100 text-amber-700"
                    data-task-id="${task.id}" data-target-status="${Status.toDo}">
              <i class="fa-solid fa-rotate-left pointer-events-none"></i> To Do
            </button>
            <button class="status-btn text-[11px] px-3 py-2 rounded-lg font-semibold bg-emerald-100 text-emerald-700" 
                    data-task-id="${task.id}" data-target-status="${Status.Completed}">
              <i class="fa-solid fa-check pointer-events-none"></i> Complete
            </button>
          ` : ""}

          ${task.status === Status.Completed ? `
            <button class="status-btn text-[11px] px-3 py-2 rounded-lg font-semibold bg-amber-100 text-amber-700"
                    data-task-id="${task.id}" data-target-status="${Status.toDo}">
              <i class="fa-solid fa-rotate-left pointer-events-none"></i> To Do
            </button>
          ` : ""}
        </div>
      </div>
    `;
    const statusBtns = card.querySelectorAll(".status-btn");
    statusBtns.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            const targetBtn = e.currentTarget;
            const taskId = Number(targetBtn.dataset.taskId);
            const targetStatus = Number(targetBtn.dataset.targetStatus);
            changeStatus(taskId, targetStatus);
        });
    });
    return card;
}
function changeStatus(id, status) {
    const task = allTasks.find((t) => t.id === id);
    if (task) {
        task.status = status;
        saveData(); // Triggers localStorage update and re-renders columns
    }
}
// when click submit button, create a new task and add it to the allTasks array
submitbtn?.addEventListener("click", (e) => {
    e.preventDefault();
    // creat object of type ITask
    const task = {
        id: Date.now(),
        title: tasktitle.value,
        date: taskduedate.value,
        description: taskdescription.value,
        priority: taskpriority.value,
        status: 0,
    };
    console.log("Submit button clicked");
    allTasks.push(task);
    saveData();
    console.log(allTasks);
    closeModal();
});
function closeModal() {
    modaloverlay?.classList.add("hidden");
}
// load data from local storage
function loadDate() {
    return localStorage.getItem("tasks") ? JSON.parse(localStorage.getItem("tasks") || "[]") : [];
}
// save data to local storage and render tasks
function saveData() {
    localStorage.setItem("tasks", JSON.stringify(allTasks));
    renderTasks();
}
// Template HTML for the empty state message
const emptyStateHTML = `
<div class="flex flex-col items-center justify-center py-12 text-slate-400">
    <i class="fa-regular fa-folder-open text-4xl mb-3 opacity-50"></i>
    <p class="text-sm">No tasks yet</p>
    <p class="text-xs mt-1">Click + to add one</p>
  </div>
`;
// render tasks in the toDoCol from the allTasks array (createcard function is used to create the card element for each task)
function renderTasks() {
    // Clear all columns once before rendering
    if (toDoCol)
        toDoCol.innerHTML = "";
    if (inProgressCol)
        inProgressCol.innerHTML = "";
    if (completedCol)
        completedCol.innerHTML = "";
    // track task counts for each column
    let todoCount = 0;
    let inProgressCount = 0;
    let completedCount = 0;
    allTasks.forEach((task) => {
        const currentCard = createCard(task);
        if (task.status === Status.toDo) {
            toDoCol?.appendChild(currentCard);
            todoCount++;
        }
        else if (task.status === Status.inProgress) {
            inProgressCol?.appendChild(currentCard);
            inProgressCount++;
        }
        else if (task.status === Status.Completed) {
            completedCol?.appendChild(currentCard);
            completedCount++;
        }
    });
    // if the column is empty, display the empty state message
    if (todoCount === 0 && toDoCol) {
        toDoCol.innerHTML = emptyStateHTML;
    }
    if (inProgressCount === 0 && inProgressCol) {
        inProgressCol.innerHTML = emptyStateHTML;
    }
    if (completedCount === 0 && completedCol) {
        completedCol.innerHTML = emptyStateHTML;
    }
    // call the update function to update the task counts in the column headers
    updateTaskCounts(todoCount, inProgressCount, completedCount);
}
function updateTaskCounts(todoCount, inProgressCount, completedCount) {
    const todoCountEl = document.querySelector("#todoCount");
    const inProgressCountEl = document.querySelector("#inProgressCount");
    const completedCountEl = document.querySelector("#completedCount");
    if (todoCountEl)
        todoCountEl.textContent = `${todoCount} ${todoCount === 1 ? "task" : "tasks"}`;
    if (inProgressCountEl)
        inProgressCountEl.textContent = `${inProgressCount} ${inProgressCount === 1 ? "task" : "tasks"}`;
    if (completedCountEl)
        completedCountEl.textContent = `${completedCount} ${completedCount === 1 ? "task" : "tasks"}`;
}
renderTasks();
export {};
// titleError dateError
//# sourceMappingURL=main.js.map