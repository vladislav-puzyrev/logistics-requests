import { Typography } from '@material-ui/core'
import React from 'react'
import { Link } from 'react-router-dom'
import classes from './MainTemplate.module.css'

export const MainTemplate: React.FC = ({ children }) => {
  return (
    <div className={classes.wrapper}>
      <header className={classes.header}>
        <Typography>
          <Link to='/' style={{ color: 'black' }}>
            YetiCrab тестовое задание <span role='img' aria-label='Улыбка'>😀</span>
          </Link>
        </Typography>
      </header>
      <main className={classes.main}>
        {children}
      </main>
      <footer className={classes.footer}>
        <Typography>YetiCrab тестовое задание</Typography>
      </footer>
    </div>
  )
}
