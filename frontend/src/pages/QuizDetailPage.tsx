// frontend/src/pages/QuizDetailPage.tsx

import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { quizAPI, questionAPI, roadmapAPI } from '../services/api'

interface Question {
  id: string
  questionText: string
  options: string[]
  topic: string
}

interface Quiz {
  id: string
  title: string
  category: string
  description: string
  questions: Question[]
}

export default function QuizDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [quiz, setQuiz] = useState<Quiz | null>(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(true)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const res = await quizAPI.getOne(id!)
        setQuiz(res.data)
      } catch (err) {
        console.error('Failed to fetch quiz:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchQuiz()
  }, [id])

  const handleAnswer = (questionId: string, answer: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }))
  }

  const handleNext = () => {
    if (quiz && currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1)
    }
  }

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1)
    }
  }

  const handleSubmit = async () => {
    if (!quiz) return
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/login')
      return
    }

    try {
      await roadmapAPI.create({ category: quiz.category })
      setSubmitted(true)
    } catch (err) {
      console.error('Failed to create roadmap:', err)
    }
  }

  if (loading) return <div style={styles.loading}>Loading quiz...</div>
  if (!quiz) return <div style={styles.loading}>Quiz not found</div>

  if (submitted) {
    return (
      <div style={styles.container}>
        <div style={styles.resultCard}>
          <div style={styles.resultIcon}>🎉</div>
          <h2 style={styles.resultTitle}>Quiz Completed!</h2>
          <p style={styles.resultDesc}>
            Your personalized psychological roadmap has been created based on your responses.
          </p>
          <button onClick={() => navigate('/dashboard')} style={styles.resultBtn}>
            View My Dashboard
          </button>
        </div>
      </div>
    )
  }

  const question = quiz.questions[currentQuestion]
  const progress = ((currentQuestion + 1) / quiz.questions.length) * 100

  return (
    <div style={styles.container}>
      <div style={styles.quizCard}>
        <div style={styles.header}>
          <h1 style={styles.quizTitle}>{quiz.title}</h1>
          <span style={styles.category}>{quiz.category}</span>
        </div>

        <div style={styles.progressBar}>
          <div style={{ ...styles.progressFill, width: `${progress}%` }} />
        </div>
        <div style={styles.progressText}>
          Question {currentQuestion + 1} of {quiz.questions.length}
        </div>

        <div style={styles.questionSection}>
          <h3 style={styles.questionText}>{question.questionText}</h3>
          <div style={styles.options}>
            {question.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(question.id, option)}
                style={{
                  ...styles.option,
                  ...(answers[question.id] === option ? styles.optionSelected : {}),
                }}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <div style={styles.navButtons}>
          <button onClick={handlePrev} disabled={currentQuestion === 0} style={styles.navBtn}>
            Previous
          </button>
          {currentQuestion === quiz.questions.length - 1 ? (
            <button onClick={handleSubmit} style={styles.submitBtn}>
              Submit & Create Roadmap
            </button>
          ) : (
            <button onClick={handleNext} style={styles.navBtn}>
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  container: { maxWidth: 700, margin: '0 auto', padding: '40px 20px' },
  loading: { textAlign: 'center', padding: 60, color: '#6c6c8a', fontSize: 18 },
  quizCard: { background: '#1a1a2e', borderRadius: 16, padding: '36px 32px', border: '1px solid #2d2d4a' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 },
  quizTitle: { fontSize: 24, fontWeight: 700 },
  category: { background: 'rgba(108, 92, 231, 0.15)', color: '#6c5ce7', padding: '4px 14px', borderRadius: 6, fontSize: 12, fontWeight: 600, textTransform: 'capitalize' },
  progressBar: { height: 6, background: '#2d2d4a', borderRadius: 3, marginBottom: 8 },
  progressFill: { height: '100%', background: 'linear-gradient(90deg, #6c5ce7, #00cec9)', borderRadius: 3, transition: 'width 0.3s ease' },
  progressText: { fontSize: 13, color: '#6c6c8a', marginBottom: 28, textAlign: 'right' },
  questionSection: { marginBottom: 32 },
  questionText: { fontSize: 20, fontWeight: 600, marginBottom: 24, lineHeight: 1.5 },
  options: { display: 'flex', flexDirection: 'column', gap: 12 },
  option: {
    width: '100%',
    padding: '14px 20px',
    background: '#0a0a1a',
    border: '1px solid #2d2d4a',
    borderRadius: 10,
    color: '#fff',
    fontSize: 15,
    textAlign: 'left' as const,
  },
  optionSelected: { borderColor: '#6c5ce7', background: 'rgba(108, 92, 231, 0.1)' },
  navButtons: { display: 'flex', justifyContent: 'space-between', gap: 12 },
  navBtn: { padding: '12px 28px', background: '#2d2d4a', color: '#fff', borderRadius: 10, fontSize: 14, fontWeight: 600 },
  submitBtn: { padding: '12px 28px', background: 'linear-gradient(135deg, #6c5ce7, #a29bfe)', color: '#fff', borderRadius: 10, fontSize: 14, fontWeight: 700 },
  resultCard: { background: '#1a1a2e', borderRadius: 16, padding: '48px 32px', border: '1px solid #2d2d4a', textAlign: 'center' as const },
  resultIcon: { fontSize: 64, marginBottom: 20 },
  resultTitle: { fontSize: 28, fontWeight: 700, marginBottom: 12 },
  resultDesc: { fontSize: 16, color: '#b0b0c8', marginBottom: 28, lineHeight: 1.6 },
  resultBtn: { padding: '14px 36px', background: 'linear-gradient(135deg, #6c5ce7, #a29bfe)', color: '#fff', borderRadius: 12, fontSize: 16, fontWeight: 700 },
}