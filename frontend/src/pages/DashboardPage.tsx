// frontend/src/pages/DashboardPage.tsx

import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { roadmapAPI, authAPI } from '../services/api'

interface Roadmap {
  id: string
  category: string
  stepsData: { step: number; title: string; description: string; completed: boolean }[]
  createdAt: string
}

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)
  const [roadmaps, setRoadmaps] = useState<Roadmap[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const stored = localStorage.getItem('user')
    if (stored) setUser(JSON.parse(stored))
    fetchRoadmaps()
  }, [])

  const fetchRoadmaps = async () => {
    try {
      const res = await roadmapAPI.getMy()
      setRoadmaps(res.data)
    } catch (err) {
      console.error('Failed to fetch roadmaps:', err)
    } finally {
      setLoading(false)
    }
  }

  const categoryEmoji: Record<string, string> = {
    anxiety: '😰',
    depression: '😔',
    stress: '😤',
    mindfulness: '🧘',
    'emotional-intelligence': '💡',
  }

  const completedSteps = (steps: { completed: boolean }[]) => steps.filter((s) => s.completed).length

  if (loading) return <div style={styles.loading}>Loading dashboard...</div>

  return (
    <div style={styles.container}>
      <div style={styles.welcome}>
        <h1 style={styles.title}>Welcome, {user?.name || 'User'} 👋</h1>
        <p style={styles.subtitle}>Your psychological wellness journey at a glance</p>
      </div>

      {roadmaps.length === 0 ? (
        <div style={styles.empty}>
          <div style={styles.emptyIcon}>🧙</div>
          <h3 style={styles.emptyTitle}>No Roadmaps Yet</h3>
          <p style={styles.emptyDesc}>Take a psychological assessment quiz to create your personalized roadmap.</p>
          <Link to="/quizzes" style={styles.emptyBtn}>Take a Quiz</Link>
        </div>
      ) : (
        <div style={styles.grid}>
          {roadmaps.map((roadmap) => {
            const total = roadmap.stepsData.length
            const completed = completedSteps(roadmap.stepsData)
            const progress = total > 0 ? Math.round((completed / total) * 100) : 0

            return (
              <Link to={`/roadmaps/${roadmap.id}`} key={roadmap.id} style={styles.card}>
                <div style={styles.cardHeader}>
                  <span style={styles.cardIcon}>{categoryEmoji[roadmap.category] || '🧠'}</span>
                  <span style={styles.category}>{roadmap.category}</span>
                </div>
                <h3 style={styles.cardTitle}>Roadmap: {roadmap.category}</h3>
                <div style={styles.progressBar}>
                  <div style={{ ...styles.progressFill, width: `${progress}%` }} />
                </div>
                <div style={styles.progressInfo}>
                  <span>{completed}/{total} steps completed</span>
                  <span style={styles.progressPercent}>{progress}%</span>
                </div>
                <div style={styles.cardDate}>
                  Created: {new Date(roadmap.createdAt).toLocaleDateString()}
                </div>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  container: { maxWidth: 1000, margin: '0 auto', padding: '40px 20px' },
  loading: { textAlign: 'center', padding: 60, color: '#6c6c8a', fontSize: 18 },
  welcome: { marginBottom: 40 },
  title: { fontSize: 32, fontWeight: 800, marginBottom: 8 },
  subtitle: { fontSize: 16, color: '#6c6c8a' },
  empty: { background: '#1a1a2e', borderRadius: 16, padding: '60px 32px', border: '1px solid #2d2d4a', textAlign: 'center' as const },
  emptyIcon: { fontSize: 64, marginBottom: 16 },
  emptyTitle: { fontSize: 22, fontWeight: 700, marginBottom: 8 },
  emptyDesc: { fontSize: 15, color: '#b0b0c8', marginBottom: 24, lineHeight: 1.6 },
  emptyBtn: { display: 'inline-block', padding: '12px 32px', background: 'linear-gradient(135deg, #6c5ce7, #a29bfe)', color: '#fff', borderRadius: 10, fontSize: 15, fontWeight: 700, textDecoration: 'none' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 20 },
  card: { background: '#1a1a2e', borderRadius: 16, padding: '24px', border: '1px solid #2d2d4a', textDecoration: 'none', color: '#fff', transition: 'all 0.3s ease' },
  cardHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  cardIcon: { fontSize: 32 },
  category: { background: 'rgba(108, 92, 231, 0.15)', color: '#6c5ce7', padding: '4px 12px', borderRadius: 6, fontSize: 12, fontWeight: 600, textTransform: 'capitalize' },
  cardTitle: { fontSize: 18, fontWeight: 700, marginBottom: 16 },
  progressBar: { height: 6, background: '#2d2d4a', borderRadius: 3, marginBottom: 8 },
  progressFill: { height: '100%', background: 'linear-gradient(90deg, #6c5ce7, #00cec9)', borderRadius: 3, transition: 'width 0.3s ease' },
  progressInfo: { display: 'flex', justifyContent: 'space-between', fontSize: 13, color: '#6c6c8a', marginBottom: 12 },
  progressPercent: { fontWeight: 700, color: '#00cec9' },
  cardDate: { fontSize: 12, color: '#6c6c8a' },
}