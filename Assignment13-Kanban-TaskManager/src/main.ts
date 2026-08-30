type Priority = "Low" | "Medium" | "High";
enum Status {
    "toDo",
    "inProgress",
    "Completed"
}
interface ITask {
    id: number;
    title: string;
    date: string;
    description: string;
    priority: Priority;
    status: Status;
}


// add-task-btn modal-overlay  task-title task-priority task-due-date task-description submit-btn
let addtaskbtn = document.querySelector("#addTaskBtn") as HTMLButtonElement;
let modaloverlay = document.querySelector("#modal-overlay") as HTMLDivElement;
let tasktitle = document.querySelector("#task-title") as HTMLInputElement;
let taskpriority = document.querySelector("#task-priority") as HTMLSelectElement;
let taskduedate = document.querySelector("#task-due-date") as HTMLInputElement;
let taskdescription = document.querySelector("#task-description") as HTMLTextAreaElement;
let submitbtn = document.querySelector("#submit-btn") as HTMLButtonElement;
let toDoCol = document.querySelector("#tasksTodo") as HTMLElement;
let inProgressCol = document.querySelector("#tasksInProgress") as HTMLElement;
let completedCol = document.querySelector("#tasksCompleted") as HTMLElement;

let allTasks: ITask[] = loadDate();
// Show the modal when the add task button is clicked
addtaskbtn?.addEventListener("click", () => {
    modaloverlay?.classList.remove("hidden");
});

// Create a card element for a task
function createCard(task: ITask): HTMLElement {
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
        btn.addEventListener("click", (e: Event) => {
            const targetBtn = e.currentTarget as HTMLButtonElement;
            const taskId = Number(targetBtn.dataset.taskId);
            const targetStatus = Number(targetBtn.dataset.targetStatus) as Status;
            changeStatus(taskId, targetStatus);
        });
    });

    return card;
}

function changeStatus(id: number, status: Status) {
    const task = allTasks.find((t) => t.id === id);
    if (task) {
        task.status = status;
        saveData(); // Triggers localStorage update and re-renders columns
    }
}
// when click submit button, create a new task and add it to the allTasks array
submitbtn?.addEventListener("click", (e: Event) => {
    e.preventDefault();
    // creat object of type ITask
    const task: ITask = {
        id: Date.now(),
        title: tasktitle.value,
        date: taskduedate.value,
        description: taskdescription.value,
        priority: taskpriority.value as Priority,
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
function loadDate(): ITask[] {
    return localStorage.getItem("tasks") ? JSON.parse(localStorage.getItem("tasks") || "[]") : [];

}
// save data to local storage and render tasks
function saveData() {
    localStorage.setItem("tasks", JSON.stringify(allTasks));
    renderTasks();
}

// render tasks in the toDoCol from the allTasks array (createcard function is used to create the card element for each task)
function renderTasks() {
    // Clear all columns once before rendering
    if (toDoCol) toDoCol.innerHTML = "";
    if (inProgressCol) inProgressCol.innerHTML = "";
    if (completedCol) completedCol.innerHTML = "";

    allTasks.forEach((task) => {
        const currentCard = createCard(task);

        if (task.status === Status.toDo) {
            toDoCol?.appendChild(currentCard);
        } else if (task.status === Status.inProgress) {
            inProgressCol?.appendChild(currentCard);
        } else if (task.status === Status.Completed) {
            completedCol?.appendChild(currentCard);
        }
    });
}

renderTasks();