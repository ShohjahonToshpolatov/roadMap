// frontend/src/pages/QuizListPage.tsx

import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { quizAPI } from '../services/api'

interface Quiz {
  id: string
  title: string
  category: string
  description: string
  _count: { questions: number }
}

export default function QuizListPage() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const res = await quizAPI.getAll()
        setQuizzes(res.data)
      } catch (err) {
        console.error('Failed to fetch quizzes:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchQuizzes()
  }, [])

  const categoryEmoji: Record<string, string> = {
    anxiety: '😰',
    depression: '😔',
    stress: '😤',
    mindfulness: '🧘',
    'emotional-intelligence': '💡',
  }

  if (loading) return <div style={styles.loading}>Loading quizzes...</div>

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Psychological Assessments</h1>
      <p style={styles.subtitle}>Choose a quiz to evaluate your mental wellness</p>
      <div style={styles.grid}>
        {quizzes.map((quiz) => (
          <Link to={`/quizzes/${quiz.id}`} key={quiz.id} style={styles.card}>
            <div style={styles.cardIcon}>{categoryEmoji[quiz.category] || '🧠'}</div>
            <h3 style={styles.cardTitle}>{quiz.title}</h3>
            <p style={styles.cardDesc}>{quiz.description}</p>
            <div style={styles.cardFooter}>
              <span style={styles.category}>{quiz.category}</span>
              <span style={styles.questions}>{quiz._count?.questions || 0} questions</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  container: { maxWidth: 1000, margin: '0 auto', padding: '40px 20px' },
  loading: { textAlign: 'center', padding: 60, color: '#6c6c8a', fontSize: 18 },
  title: { fontSize: 36, fontWeight: 800, marginBottom: 8, textAlign: 'center' },
  subtitle: { fontSize: 16, color: '#6c6c8a', marginBottom: 40, textAlign: 'center' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 },
  card: {
    background: '#1a1a2e',
    borderRadius: 16,
    padding: '28px 24px',
    border: '1px solid #2d2d4a',
    textDecoration: 'none',
    color: '#fff',
    transition: 'all 0.3s ease',
  },
  cardIcon: { fontSize: 40, marginBottom: 16 },
  cardTitle: { fontSize: 18, fontWeight: 700, marginBottom: 8 },
  cardDesc: { fontSize: 14, color: '#b0b0c8', lineHeight: 1.6, marginBottom: 16 },
  cardFooter: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  category: { background: 'rgba(108, 92, 231, 0.15)', color: '#6c5ce7', padding: '4px 12px', borderRadius: 6, fontSize: 12, fontWeight: 600, textTransform: 'capitalize' },
  questions: { fontSize: 13, color: '#6c6c8a' },
}