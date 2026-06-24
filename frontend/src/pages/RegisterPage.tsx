// frontend/src/pages/RegisterPage.tsx

import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { authAPI } from '../services/api'

export default function RegisterPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await authAPI.register({ name, email, password })
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('user', JSON.stringify(res.data.user))
      navigate('/dashboard')
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.title}>Create Account</h2>
        <p style={styles.subtitle}>Start your psychological wellness journey</p>

        {error && <div style={styles.error}>{error}</div>}

        <div style={styles.inputGroup}>
          <label style={styles.label}>Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} style={styles.input} placeholder="Your name" required />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} style={styles.input} placeholder="your@email.com" required />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={styles.input} placeholder="Min 6 characters" required minLength={6} />
        </div>

        <button type="submit" disabled={loading} style={styles.button}>
          {loading ? 'Creating account...' : '✨ Create Account'}
        </button>

        <p style={styles.footer}>
          Already have an account? <Link to="/login" style={styles.link}>Sign In</Link>
        </p>
      </form>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  container: { minHeight: 'calc(100vh - 60px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 },
  form: { background: '#1a1a2e', padding: '40px 32px', borderRadius: 16, width: '100%', maxWidth: 420, border: '1px solid #2d2d4a' },
  title: { fontSize: 28, fontWeight: 700, marginBottom: 8, color: '#fff' },
  subtitle: { fontSize: 14, color: '#6c6c8a', marginBottom: 28 },
  error: { background: 'rgba(225, 112, 85, 0.15)', color: '#e17055', padding: '10px 16px', borderRadius: 8, marginBottom: 16, fontSize: 14 },
  inputGroup: { marginBottom: 20 },
  label: { display: 'block', fontSize: 14, color: '#b0b0c8', marginBottom: 6, fontWeight: 500 },
  input: { width: '100%', padding: '12px 16px', background: '#0a0a1a', border: '1px solid #2d2d4a', borderRadius: 10, color: '#fff', fontSize: 15 },
  button: { width: '100%', padding: '14px', background: 'linear-gradient(135deg, #6c5ce7, #a29bfe)', color: '#fff', borderRadius: 10, fontSize: 16, fontWeight: 700, marginTop: 8 },
  footer: { textAlign: 'center', marginTop: 20, color: '#6c6c8a', fontSize: 14 },
  link: { color: '#00cec9', fontWeight: 600 },
}