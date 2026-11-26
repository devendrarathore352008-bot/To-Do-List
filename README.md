# TaskMate — Interactive To-Do List Web Application

A lightweight, responsive, browser-based To-Do List web application built with **HTML5**, **CSS3**, and **Vanilla JavaScript (ES6+)**. TaskMate helps users organize daily tasks, assign priority levels, set target due dates, and filter tasks in real time without requiring an account or active internet connection after loading.

> Developed as a **Project-Based Learning (PBL)** project for **Web Development & Technology (BCA-102)** at **ITM University, Gwalior**.

---

## Live Demo & Repository

- **GitHub Repository:** [devendrarathore352008-bot/To-Do-List](https://github.com/devendrarathore352008-bot/To-Do-List)
- **Live App (GitHub Pages):** `https://devendrarathore352008-bot.github.io/To-Do-List/`

---

## Key Features

- **Task Management (CRUD):** Add new tasks with a title, priority level (`High`, `Medium`, `Low`), and optional due date; edit task titles inline via prompt; or delete individual tasks anytime.
- **Live Summary Counters:** Header status cards automatically update **Total**, **Active**, and **Completed** task counts on every action.
- **Multi-Criteria Filtering & Search:**
  - **Status Filter:** Switch between `All`, `Active`, and `Completed` tasks.
  - **Priority Filter:** Filter tasks by `All Priorities`, `High`, `Medium`, or `Low`.
  - **Keyword Search:** Real-time case-insensitive search across task titles.
- **Bulk Cleanup:** Remove all completed tasks in a single click using **Clear Completed**.
- **Client-Side Persistence:** Uses the Web Storage API (`localStorage`) under key `taskmate_todos_v1` so tasks remain saved across browser reloads.
- **Responsive Layout:** Built with CSS Flexbox, CSS Grid, and `@media` queries (`800px`, `650px`, and `600px` breakpoints) for desktop, tablet, and mobile screens.

---

## Tech Stack

| Technology | Role in Project |
| :--- | :--- |
| **HTML5** | Semantic layout (`header`, `main`, `aside`, `section`, `footer`) and accessible forms |
| **CSS3** | Custom properties (`:root`), Flexbox, CSS Grid, priority badges, and responsive breakpoints |
| **JavaScript (ES6+)** | DOM manipulation, event delegation, multi-criteria filtering, and counter updates |
| **Web Storage API (`localStorage`)** | JSON serialization for offline task persistence across browser sessions |
| **Git & GitHub** | Version control, collaborative commits, and repository hosting |

---

## Project Structure


To-Do-List/
├── index.html        # Semantic HTML layout (header, filter sidebar, task panel, footer)
├── style.css         # Theme variables, Flexbox/Grid styling, and responsive media queries
├── javascript.js     # State management, CRUD operations, filtering, and localStorage sync
└── README.md         # Project documentation

---


## Authors

- **Prachi Verma** — Co-Author | BCA 1st Semester, Section "A" (Roll No: `BCAN1CA26036`), ITM University, Gwalior | GitHub: [@Prachi02Verma](https://github.com/Prachi02Verma)
  - Contributed extensively to **CSS** styling and layout refinements, **HTML** edits and updates (including the footer section), and collaborative work on **JavaScript** functionality.

- **Devendra Rathore** — Co-Author | BCA 1st Semester, Section "A" (Roll No: `BCAN1CA26059`), ITM University, Gwalior
  - Worked on project structure, HTML/CSS/JS foundation, joint JavaScript logic (`addTodo`, `toggleTodo`, `editTodo`, `deleteTodo`, filtering, and `localStorage` persistence), and GitHub repository setup.
