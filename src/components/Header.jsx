import React from 'react'
import styles from './Header.module.css'

function Header({ totalTasks, completedTasks }) {
  const progress = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100)

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <span className={styles.logo}>🌟</span>
          <h1 className={styles.title}>Task Tracker</h1>
        </div>

        <div className={styles.stats}>
          <div className={styles.statItem}>
            <span className={styles.statNum}>{totalTasks}</span>
            <span className={styles.statLabel}>Total</span>
          </div>
          <div className={styles.divider} />
          <div className={styles.statItem}>
            <span className={styles.statNum} style={{ color: 'var(--green)' }}>{completedTasks}</span>
            <span className={styles.statLabel}>Done</span>
          </div>
          <div className={styles.divider} />
          <div className={styles.statItem}>
            <span className={styles.statNum} style={{ color: 'var(--accent)' }}>{totalTasks - completedTasks}</span>
            <span className={styles.statLabel}>Left</span>
          </div>
        </div>
      </div>

      {totalTasks > 0 && (
        <div className={styles.progressBar}>
          <div
            className={styles.progressFill}
            style={{ width: `${progress}%` }}
            title={`${progress}% complete`}
          />
        </div>
      )}
    </header>
  )
}

export default Header
