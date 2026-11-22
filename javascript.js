const STORAGE_KEY = "taskmate_todos_v1";

// Form and task list elements
const todoForm = document.getElementById("todo-form");
const taskInput = document.getElementById("task-input");
const priorityInput = document.getElementById("priority-input");
const dueDateInput = document.getElementById("due-date-input");
const todoList = document.getElementById("todo-list");
const emptyState = document.getElementById("empty-state");

// Header counter elements
const totalCount = document.getElementById("total-count");
const activeCount = document.getElementById("active-count");
const completedCount = document.getElementById("completed-count");

// Sidebar filter and action elements
const filterButtons = document.querySelectorAll(".filter-btn");
const priorityFilter = document.getElementById("priority-filter");
const searchInput = document.getElementById("search-input");
const clearCompletedBtn = document.getElementById("clear-completed-btn");

// App state
let todos = [];
let currentStatusFilter = "all";
let currentPriorityFilter = "all";
let currentSearchText = "";

function saveTodos() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

function loadTodos() {
  const savedData = localStorage.getItem(STORAGE_KEY);
  if (!savedData) {
    return [];
  }

  try {
    const parsed = JSON.parse(savedData);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error("Failed to parse saved tasks:", error);
    return [];
  }
}

function getFilteredTodos() {
  return todos.filter((todo) => {
    const matchesStatus =
      currentStatusFilter === "all" ||
      (currentStatusFilter === "active" && !todo.completed) ||
      (currentStatusFilter === "completed" && todo.completed);

    const matchesPriority =
      currentPriorityFilter === "all" || todo.priority === currentPriorityFilter;

    const searchTerm = currentSearchText.trim().toLowerCase();
    const matchesSearch =
      searchTerm === "" || todo.title.toLowerCase().includes(searchTerm);

    return matchesStatus && matchesPriority && matchesSearch;
  });
}

function updateCounts() {
  const total = todos.length;
  const completed = todos.filter((todo) => todo.completed).length;
  const active = total - completed;

  totalCount.textContent = total;
  activeCount.textContent = active;
  completedCount.textContent = completed;
}

function formatPriorityLabel(priority) {
  if (priority === "high") return "High";
  if (priority === "medium") return "Medium";
  return "Low";
}

function render() {
  updateCounts();

  const filteredTodos = getFilteredTodos();
  todoList.innerHTML = "";

  if (filteredTodos.length === 0) {
    emptyState.style.display = "block";
    return;
  }

  emptyState.style.display = "none";

  filteredTodos.forEach((todo) => {
    const li = document.createElement("li");
    li.className = todo.completed ? "todo-item is-completed" : "todo-item";
    li.dataset.id = todo.id;

    const mainDiv = document.createElement("div");
    mainDiv.className = "todo-main";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "todo-checkbox";
    checkbox.checked = todo.completed;
    checkbox.setAttribute("aria-label", `Mark "${todo.title}" as completed`);

    const titleSpan = document.createElement("span");
    titleSpan.className = "todo-title";
    titleSpan.textContent = todo.title;

    const badgeSpan = document.createElement("span");
    badgeSpan.className = `priority-badge priority-${todo.priority}`;
    badgeSpan.textContent = formatPriorityLabel(todo.priority);

    mainDiv.appendChild(checkbox);
    mainDiv.appendChild(titleSpan);
    mainDiv.appendChild(badgeSpan);

    if (todo.dueDate) {
      const dateSpan = document.createElement("span");
      dateSpan.className = "todo-date";
      dateSpan.textContent = `Due: ${todo.dueDate}`;
      mainDiv.appendChild(dateSpan);
    }

    const actionsDiv = document.createElement("div");
    actionsDiv.className = "todo-actions";

    const editBtn = document.createElement("button");
    editBtn.type = "button";
    editBtn.className = "edit-btn";
    editBtn.textContent = "Edit";

    const deleteBtn = document.createElement("button");
    deleteBtn.type = "button";
    deleteBtn.className = "delete-btn";
    deleteBtn.textContent = "Delete";

    actionsDiv.appendChild(editBtn);
    actionsDiv.appendChild(deleteBtn);

    li.appendChild(mainDiv);
    li.appendChild(actionsDiv);
    todoList.appendChild(li);
  });
}

function addTodo(title, priority, dueDate) {
  const cleanedTitle = title.trim();
  if (!cleanedTitle) {
    return;
  }

  const newTodo = {
    id: Date.now().toString(),
    title: cleanedTitle,
    priority: priority,
    dueDate: dueDate,
    completed: false,
  };

  todos.push(newTodo);
  saveTodos();
  render();
}

function toggleTodo(id) {
  todos = todos.map((todo) => {
    if (todo.id === id) {
      return { ...todo, completed: !todo.completed };
    }
    return todo;
  });

  saveTodos();
  render();
}

function editTodo(id) {
  const targetTodo = todos.find((todo) => todo.id === id);
  if (!targetTodo) {
    return;
  }

  const updatedTitle = prompt("Edit task:", targetTodo.title);
  if (updatedTitle === null) {
    return;
  }

  const cleanedTitle = updatedTitle.trim();
  if (!cleanedTitle) {
    alert("Task name cannot be empty.");
    return;
  }

  targetTodo.title = cleanedTitle;
  saveTodos();
  render();
}

function deleteTodo(id) {
  todos = todos.filter((todo) => todo.id !== id);
  saveTodos();
  render();
}

function clearCompletedTodos() {
  todos = todos.filter((todo) => !todo.completed);
  saveTodos();
  render();
}

// Add a new task when the form is submitted
todoForm.addEventListener("submit", (event) => {
  event.preventDefault();

  addTodo(taskInput.value, priorityInput.value, dueDateInput.value);

  todoForm.reset();
  priorityInput.value = "high";
  taskInput.focus();
});

// Handle checkbox toggle, Edit button, and Delete button inside the task list
todoList.addEventListener("change", (event) => {
  if (event.target.classList.contains("todo-checkbox")) {
    const todoItem = event.target.closest(".todo-item");
    if (todoItem) {
      toggleTodo(todoItem.dataset.id);
    }
  }
});

todoList.addEventListener("click", (event) => {
  const todoItem = event.target.closest(".todo-item");
  if (!todoItem) {
    return;
  }

  const todoId = todoItem.dataset.id;

  if (event.target.classList.contains("edit-btn")) {
    editTodo(todoId);
  } else if (event.target.classList.contains("delete-btn")) {
    deleteTodo(todoId);
  }
});

// Handle status filter buttons (All, Active, Completed)
filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    currentStatusFilter = button.dataset.filter;

    filterButtons.forEach((btn) => btn.classList.remove("is-active"));
    button.classList.add("is-active");

    render();
  });
});

// Handle priority dropdown filter
priorityFilter.addEventListener("change", () => {
  currentPriorityFilter = priorityFilter.value;
  render();
});

// Handle live keyword search
searchInput.addEventListener("input", () => {
  currentSearchText = searchInput.value;
  render();
});

// Clear all completed tasks
clearCompletedBtn.addEventListener("click", () => {
  clearCompletedTodos();
});

// Initialize app on page load
todos = loadTodos();
render();