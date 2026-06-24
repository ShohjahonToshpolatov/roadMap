// frontend/src/components/Navbar.tsx

import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Navbar() {
  const [user, setUser] = useState<any>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const stored = localStorage.getItem('user')
    if (stored) {
      setUser(JSON.parse(stored))
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
    navigate('/login')
  }

  return (
    <nav style={styles.nav}>
      <div style={styles.container}>
        <Link to="/" style={styles.logo}>
          🧙 MindWizard AI
        </Link>
        <div style={styles.links}>
          <Link to="/quizzes" style={styles.link}>Quizzes</Link>
          {user ? (
            <>
              <Link to="/dashboard" style={styles.link}>Dashboard</Link>
              <span style={styles.userName}>{user.name}</span>
              <button onClick={handleLogout} style={styles.logoutBtn}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" style={styles.link}>Login</Link>
              <Link to="/register" style={styles.registerBtn}>Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

const styles: Record<string, React.CSSProperties> = {
  nav: {
    background: '#1a1a2e',
    borderBottom: '1px solid #2d2d4a',
    padding: '0 20px',
    position: 'sticky',
    top: 0,
    zIndex: 100,
  },
  container: {
    maxWidth: 1200,
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 60,
  },
  logo: {
    fontSize: 22,
    fontWeight: 700,
    color: '#6c5ce7',
    textDecoration: 'none',
  },
  links: {
    display: 'flex',
    alignItems: 'center',
    gap: 20,
  },
  link: {
    color: '#b0b0c8',
    textDecoration: 'none',
    fontSize: 15,
    fontWeight: 500,
  },
  userName: {
    color: '#00cec9',
    fontSize: 14,
  },
  logoutBtn: {
    background: 'transparent',
    color: '#e17055',
    border: '1px solid #e17055',
    padding: '6px 16px',
    borderRadius: 8,
    fontSize: 13,
  },
  registerBtn: {
    background: '#6c5ce7',
    color: '#fff',
    padding: '8px 20px',
    borderRadius: 8,
    textDecoration: 'none',
    fontSize: 14,
    fontWeight: 600,
  },
}