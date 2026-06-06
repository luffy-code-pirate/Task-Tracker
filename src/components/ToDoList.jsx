import React from 'react'
import ToDoItem from './ToDoItem'
import styles from './ToDoList.module.css'

function ToDoList({ todos, onToggle, onDelete, onEdit, filter }) {
  if (todos.length === 0) {
    return (
      <div className={styles.empty}>
        <span className={styles.emptyIcon}>
          {filter === 'completed' ? '🎉' : filter === 'active' ? '⚡' : '✦'}
        </span>
        <p className={styles.emptyText}>
          {filter === 'completed'
            ? 'No completed tasks yet'
            : filter === 'active'
            ? 'No active tasks — you\'re all caught up!'
            : 'No tasks yet. Add one above!'}
        </p>
      </div>
    )
  }

  return (
    <ul className={styles.list}>
      {todos.map((todo) => (
        <ToDoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </ul>
  )
}

export default ToDoList
