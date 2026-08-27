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
let toDoCol = document.querySelector("#tasks-todo") as HTMLElement;
let allTasks: ITask[] = loadDate();
// Show the modal when the add task button is clicked
addtaskbtn?.addEventListener("click", () => {
    modaloverlay?.classList.remove("hidden");
});

// Create a card element for a task
function createCard(task: ITask) : HTMLElement {
    const card = document.createElement("div");
    card.innerHTML=`
    <div class="group bg-white rounded-xl p-4 shadow-sm border border-slate-100 hover:shadow-md hover:border-slate-200 transition-all duration-200 ring-2 ring-red-100 border-red-200 " data-task-id="task-1787386048904-x9j6tmz">
        <!-- Top Bar -->
        <div class="flex items-center justify-between mb-3">
          <div class="flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-slate-300"></span>
            <span class="text-[10px] font-medium text-slate-400 uppercase tracking-wider">#003</span>
          </div>
          <div class="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button class="edit-btn text-slate-400 hover:text-indigo-500 hover:bg-indigo-50 w-7 h-7 rounded-lg flex items-center justify-center transition-colors" data-task-id="task-1787386048904-x9j6tmz" title="Edit task" fdprocessedid="jmjl0e">
              <i class="fa-solid fa-pen text-xs pointer-events-none"></i>
            </button>
            <button class="delete-btn text-slate-400 hover:text-red-500 hover:bg-red-50 w-7 h-7 rounded-lg flex items-center justify-center transition-colors" data-task-id="task-1787386048904-x9j6tmz" title="Delete task" fdprocessedid="nze62d">
              <i class="fa-solid fa-trash-can text-xs pointer-events-none"></i>
            </button>
          </div>
        </div>

        <!-- Title -->
        <h3 class="font-semibold text-slate-800 mb-2 leading-snug ">
            ${task.title}
        </h3>

        <!-- Description -->
        

        <!-- Tags Row -->
        <div class="flex flex-wrap items-center gap-2 mb-4">
          <!-- Priority Badge -->
          <span class="bg-amber-50 text-amber-600 text-[10px] font-semibold px-2 py-1 rounded-full flex items-center gap-1.5 uppercase tracking-wide">
            <span class="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
            ${task.priority}
          </span>
          
          
            <span class="bg-red-100 text-red-600 text-[10px] font-semibold px-2 py-1 rounded-full uppercase tracking-wide flex items-center gap-1">
              <i class="fa-solid fa-triangle-exclamation"></i>
              Overdue
            </span>
          
          
          
          
          
        </div>

        <!-- Meta Info -->
        <div class="flex items-center gap-3 text-xs text-slate-400 pb-3 mb-3 border-b border-slate-100">
          
            <div class="flex items-center gap-1.5 text-red-500">
              <i class="fa-regular fa-calendar"></i>
              <span>Aug 27</span>
            </div>
          
          <div class="flex items-center gap-1.5" title="Created 8/22/2026, 11:07:28 AM">
            <i class="fa-regular fa-clock"></i>
            <span>5d ago</span>
          </div>
        </div>
        
        <!-- Action Buttons -->
        <div class="flex flex-wrap gap-2">
          
        <button class="status-btn text-[11px] px-3 py-2 rounded-lg font-semibold transition-all duration-200 flex items-center gap-1.5 hover:scale-105 active:scale-95 bg-amber-100 text-amber-700 hover:bg-amber-200" data-task-id="${task.id}" data-status="${task.status}" fdprocessedid="r9wkbq">
          <i class="fa-solid fa-play pointer-events-none"></i> <span class="pointer-events-none">Start</span>
        </button>
      
        <button class="status-btn text-[11px] px-3 py-2 rounded-lg font-semibold transition-all duration-200 flex items-center gap-1.5 hover:scale-105 active:scale-95 bg-emerald-100 text-emerald-700 hover:bg-emerald-200" data-task-id="${task.id}" data-status="${task.status}" fdprocessedid="23250e">
          <i class="fa-solid fa-check pointer-events-none"></i> <span class="pointer-events-none">Complete</span>
        </button>
      
        </div>
      </div>
    `;
    return card;

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

});

// function closeModal() {}
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
    allTasks.forEach((task) => {
       let currentCard = createCard(task);
        toDoCol?.appendChild(createCard(task));
    });
    
}

renderTasks();