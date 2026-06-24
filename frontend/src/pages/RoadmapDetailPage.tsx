// frontend/src/pages/RoadmapDetailPage.tsx

import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { roadmapAPI } from '../services/api'

interface Step {
  step: number
  title: string
  description: string
  completed: boolean
}

interface Roadmap {
  id: string
  category: string
  stepsData: Step[]
  createdAt: string
}

export default function RoadmapDetailPage() {
  const { id } = useParams<{ id: string }>()
  const [roadmap, setRoadmap] = useState<Roadmap | null>(null)
  const [steps, setSteps] = useState<Step[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRoadmap = async () => {
      try {
        const res = await roadmapAPI.getOne(id!)
        setRoadmap(res.data)
        setSteps(res.data.stepsData)
      } catch (err) {
        console.error('Failed to fetch roadmap:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchRoadmap()
  }, [id])

  const toggleStep = async (stepIndex: number) => {
    const updatedSteps = steps.map((s, idx) =>
      idx === stepIndex ? { ...s, completed: !s.completed } : s
    )
    setSteps(updatedSteps)

    try {
      await roadmapAPI.updateSteps(id!, updatedSteps)
    } catch (err) {
      console.error('Failed to update steps:', err)
    }
  }

  const categoryEmoji: Record<string, string> = {
    anxiety: '😰',
    depression: '😔',
    stress: '😤',
    mindfulness: '🧘',
    'emotional-intelligence': '💡',
  }

  if (loading) return <div style={styles.loading}>Loading roadmap...</div>
  if (!roadmap) return <div style={styles.loading}>Roadmap not found</div>

  const completed = steps.filter((s) => s.completed).length
  const progress = Math.round((completed / steps.length) * 100)

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div>
          <span style={styles.icon}>{categoryEmoji[roadmap.category] || '🧠'}</span>
          <h1 style={styles.title}>Roadmap: {roadmap.category}</h1>
        </div>
        <span style={styles.category}>{roadmap.category}</span>
      </div>

      <div style={styles.progressSection}>
        <div style={styles.progressBar}>
          <div style={{ ...styles.progressFill, width: `${progress}%` }} />
        </div>
        <div style={styles.progressInfo}>
          <span>{completed} of {steps.length} steps completed</span>
          <span style={styles.progressPercent}>{progress}%</span>
        </div>
      </div>

      <div style={styles.timeline}>
        {steps.map((step, idx) => (
          <div key={idx} style={styles.stepCard}>
            <div style={styles.stepHeader}>
              <div style={styles.stepNumber}>
                {step.completed ? '✅' : `0${step.step}`}
              </div>
              <button
                onClick={() => toggleStep(idx)}
                style={{
                  ...styles.toggleBtn,
                  ...(step.completed ? styles.toggleBtnActive : {}),
                }}
              >
                {step.completed ? 'Completed' : 'Mark Complete'}
              </button>
            </div>
            <h3 style={styles.stepTitle}>{step.title}</h3>
            <p style={styles.stepDesc}>{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  container: { maxWidth: 700, margin: '0 auto', padding: '40px 20px' },
  loading: { textAlign: 'center', padding: 60, color: '#6c6c8a', fontSize: 18 },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 },
  icon: { fontSize: 40, marginRight: 12 },
  title: { fontSize: 28, fontWeight: 700, marginTop: 8 },
  category: { background: 'rgba(108, 92, 231, 0.15)', color: '#6c5ce7', padding: '4px 14px', borderRadius: 6, fontSize: 12, fontWeight: 600, textTransform: 'capitalize' },
  progressSection: { background: '#1a1a2e', borderRadius: 16, padding: '24px', border: '1px solid #2d2d4a', marginBottom: 28 },
  progressBar: { height: 8, background: '#2d2d4a', borderRadius: 4, marginBottom: 12 },
  progressFill: { height: '100%', background: 'linear-gradient(90deg, #6c5ce7, #00cec9)', borderRadius: 4, transition: 'width 0.5s ease' },
  progressInfo: { display: 'flex', justifyContent: 'space-between', fontSize: 14, color: '#b0b0c8' },
  progressPercent: { fontWeight: 700, color: '#00cec9', fontSize: 18 },
  timeline: { display: 'flex', flexDirection: 'column', gap: 16 },
  stepCard: { background: '#1a1a2e', borderRadius: 12, padding: '20px 24px', border: '1px solid #2d2d4a' },
  stepHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  stepNumber: { fontSize: 24, fontWeight: 700, color: '#6c5ce7' },
  toggleBtn: { padding: '8px 20px', background: 'transparent', color: '#00cec9', border: '1px solid #00cec9', borderRadius: 8, fontSize: 13, fontWeight: 600 },
  toggleBtnActive: { background: '#00cec9', color: '#0a0a1a', border: '1px solid #00cec9' },
  stepTitle: { fontSize: 18, fontWeight: 600, marginBottom: 6 },
  stepDesc: { fontSize: 14, color: '#b0b0c8', lineHeight: 1.6 },
}