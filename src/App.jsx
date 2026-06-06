import React, { useState, useMemo } from 'react'
import Header from './components/Header'
import ToDoList from './components/ToDoList'
import styles from './App.module.css'

let nextId = 4

const initialTodos = [
  { id: 1, text: 'Set up the Vite + React project', completed: true, createdAt: 'Jun 4, 2026' },
  { id: 2, text: 'Build all required components', completed: true, createdAt: 'Jun 4, 2026' },
  { id: 3, text: 'Push at least 5 commits to GitHub', completed: false, createdAt: 'Jun 4, 2026' },
]

function App() {
  const [todos, setTodos] = useState(initialTodos)
  const [inputText, setInputText] = useState('')
  const [filter, setFilter] = useState('all')

  // Derived stats
  const completedCount = useMemo(() => todos.filter(t => t.completed).length, [todos])

  // Filtered list
  const filteredTodos = useMemo(() => {
    if (filter === 'active') return todos.filter(t => !t.completed)
    if (filter === 'completed') return todos.filter(t => t.completed)
    return todos
  }, [todos, filter])

  // Add a new todo
  const handleAdd = () => {
    const trimmed = inputText.trim()
    if (!trimmed) return

    const now = new Date()
    const dateStr = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

    const newTodo = {
      id: nextId++,
      text: trimmed,
      completed: false,
      createdAt: dateStr,
    }

    setTodos(prev => [newTodo, ...prev])
    setInputText('')
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleAdd()
  }

  // Toggle completion
  const handleToggle = (id) => {
    setTodos(prev =>
      prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t)
    )
  }

  // Delete a todo
  const handleDelete = (id) => {
    setTodos(prev => prev.filter(t => t.id !== id))
  }

  // Edit a todo
  const handleEdit = (id, newText) => {
    setTodos(prev =>
      prev.map(t => t.id === id ? { ...t, text: newText } : t)
    )
  }

  // Clear all completed
  const handleClearCompleted = () => {
    setTodos(prev => prev.filter(t => !t.completed))
  }

  return (
    <div className={styles.app}>
      <Header totalTasks={todos.length} completedTasks={completedCount} />

      <main className={styles.main}>
        {/* Add Task Input */}
        <section className={styles.addSection}>
          <div className={styles.inputWrapper}>
            <span className={styles.addIcon}>+</span>
            <input
              type="text"
              className={styles.input}
              placeholder="Add a new task…"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              maxLength={200}
              aria-label="New task input"
            />
            <button
              className={styles.addBtn}
              onClick={handleAdd}
              disabled={!inputText.trim()}
              aria-label="Add task"
            >
              Add
            </button>
          </div>
        </section>

        {/* Filter Tabs */}
        <section className={styles.filterSection}>
          <div className={styles.filters}>
            {['all', 'active', 'completed'].map(f => (
              <button
                key={f}
                className={`${styles.filterBtn} ${filter === f ? styles.active : ''}`}
                onClick={() => setFilter(f)}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
                <span className={styles.filterCount}>
                  {f === 'all' ? todos.length
                    : f === 'active' ? todos.length - completedCount
                    : completedCount}
                </span>
              </button>
            ))}
          </div>

          {completedCount > 0 && (
            <button className={styles.clearBtn} onClick={handleClearCompleted}>
              Clear completed
            </button>
          )}
        </section>

        {/* Task List */}
        <section className={styles.listSection}>
          <ToDoList
            todos={filteredTodos}
            onToggle={handleToggle}
            onDelete={handleDelete}
            onEdit={handleEdit}
            filter={filter}
          />
        </section>

        {todos.length > 0 && (
          <p className={styles.hint}>
            Double-click any task to edit it inline
          </p>
        )}
      </main>
    </div>
  )
}

export default App
