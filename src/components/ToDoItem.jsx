import React, { useState, useRef, useEffect } from 'react'
import styles from './ToDoItem.module.css'

function ToDoItem({ todo, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(todo.text)
  const inputRef = useRef(null)

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus()
      inputRef.current?.select()
    }
  }, [isEditing])

  const handleEditSave = () => {
    const trimmed = editText.trim()
    if (trimmed && trimmed !== todo.text) {
      onEdit(todo.id, trimmed)
    } else {
      setEditText(todo.text)
    }
    setIsEditing(false)
  }

  const handleEditKeyDown = (e) => {
    if (e.key === 'Enter') handleEditSave()
    if (e.key === 'Escape') {
      setEditText(todo.text)
      setIsEditing(false)
    }
  }

  return (
    <li className={`${styles.item} ${todo.completed ? styles.completed : ''} fade-in`}>
      <button
        className={`${styles.checkbox} ${todo.completed ? styles.checked : ''}`}
        onClick={() => onToggle(todo.id)}
        aria-label={todo.completed ? 'Mark as incomplete' : 'Mark as complete'}
      >
        {todo.completed && (
          <svg viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 5L4.5 8.5L11 1.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </button>

      <div className={styles.content}>
        {isEditing ? (
          <input
            ref={inputRef}
            type="text"
            className={styles.editInput}
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onBlur={handleEditSave}
            onKeyDown={handleEditKeyDown}
            maxLength={200}
          />
        ) : (
          <span
            className={styles.text}
            onDoubleClick={() => !todo.completed && setIsEditing(true)}
            title={todo.completed ? '' : 'Double-click to edit'}
          >
            {todo.text}
          </span>
        )}
        <span className={styles.date}>{todo.createdAt}</span>
      </div>

      <div className={styles.actions}>
        {!todo.completed && !isEditing && (
          <button
            className={`${styles.btn} ${styles.editBtn}`}
            onClick={() => setIsEditing(true)}
            aria-label="Edit task"
            title="Edit"
          >
            <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.5 2.5L13.5 4.5L5 13H3V11L11.5 2.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        )}
        {isEditing && (
          <button
            className={`${styles.btn} ${styles.saveBtn}`}
            onClick={handleEditSave}
            aria-label="Save edit"
            title="Save"
          >
            <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 8L6 12L14 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        )}
        <button
          className={`${styles.btn} ${styles.deleteBtn}`}
          onClick={() => onDelete(todo.id)}
          aria-label="Delete task"
          title="Delete"
        >
          <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 4H14M5 4V3C5 2.44772 5.44772 2 6 2H10C10.5523 2 11 2.44772 11 3V4M6 7V12M10 7V12M3 4L4 13C4 13.5523 4.44772 14 5 14H11C11.5523 14 12 13.5523 12 13L13 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </li>
  )
}

export default ToDoItem
