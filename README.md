# Task Tracker — React To-Do App

A clean, modern To-Do List application built with **React + Vite** as part of the Internshala React Module 3 Assignment.

## Features

- ✅ Add new tasks
- ✔️ Mark tasks as completed / uncompleted
- ✏️ Edit existing tasks (click Edit button or double-click a task)
- 🗑️ Delete tasks
- 🔍 Filter by All / Active / Completed
- 🧹 Clear all completed tasks at once
- 📊 Live progress bar in the header

## Project Structure

```
src/
├── components/
│   ├── Header.jsx          # App header with stats & progress bar
│   ├── Header.module.css
│   ├── ToDoList.jsx        # Renders the list using .map()
│   ├── ToDoList.module.css
│   ├── ToDoItem.jsx        # Individual task with toggle/edit/delete
│   └── ToDoItem.module.css
├── App.jsx                 # Root component — all state lives here
├── App.module.css
├── index.css               # Global styles & CSS variables
└── main.jsx                # React entry point
```

## Getting Started

### Prerequisites

- Node.js v16 or higher
- npm or yarn

### Installation & Running Locally

```bash
# 1. Clone the repository
git clone https://github.com/luffy-code-pirate/Task-Tracker.git
cd todo-app

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
npm run preview
```

## Tech Stack

- **React 18** — functional components, hooks (`useState`, `useMemo`)
- **Vite 4** — fast dev server & bundler
- **CSS Modules** — scoped component styles
- **Google Fonts** — Syne + DM Sans
