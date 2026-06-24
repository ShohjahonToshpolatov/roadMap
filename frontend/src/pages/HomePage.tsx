// frontend/src/pages/HomePage.tsx

import { Link } from 'react-router-dom'

export default function HomePage() {
  return (
    <div style={styles.hero}>
      <div style={styles.content}>
        <div style={styles.badge}>🧙 MindWizard AI</div>
        <h1 style={styles.title}>
          Your <span style={styles.gradient}>Magical</span> Psychological
          <br /> Roadmap to Wellness
        </h1>
        <p style={styles.subtitle}>
          Discover yourself through AI-powered psychological assessments,
          personalized roadmaps, and guided self-improvement journeys.
        </p>
        <div style={styles.buttons}>
          <Link to="/register" style={styles.primaryBtn}>
            ✨ Get Started Free
          </Link>
          <Link to="/quizzes" style={styles.secondaryBtn}>
            Explore Quizzes
          </Link>
        </div>
        <div style={styles.stats}>
          <div style={styles.statItem}>
            <span style={styles.statNumber}>5+</span>
            <span style={styles.statLabel}>Psychological Tests</span>
          </div>
          <div style={styles.statItem}>
            <span style={styles.statNumber}>5</span>
            <span style={styles.statLabel}>Roadmap Steps</span>
          </div>
          <div style={styles.statItem}>
            <span style={styles.statNumber}>100%</span>
            <span style={styles.statLabel}>Free & Private</span>
          </div>
        </div>
      </div>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  hero: {
    minHeight: 'calc(100vh - 60px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px 20px',
  },
  content: {
    maxWidth: 800,
    textAlign: 'center' as const,
  },
  badge: {
    display: 'inline-block',
    background: 'rgba(108, 92, 231, 0.15)',
    color: '#6c5ce7',
    padding: '8px 24px',
    borderRadius: 20,
    fontSize: 14,
    fontWeight: 600,
    marginBottom: 24,
  },
  title: {
    fontSize: 48,
    fontWeight: 800,
    lineHeight: 1.2,
    marginBottom: 20,
    color: '#fff',
  },
  gradient: {
    background: 'linear-gradient(135deg, #6c5ce7, #00cec9)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  subtitle: {
    fontSize: 18,
    color: '#b0b0c8',
    lineHeight: 1.7,
    marginBottom: 36,
    maxWidth: 600,
    margin: '0 auto 36px',
  },
  buttons: {
    display: 'flex',
    gap: 16,
    justifyContent: 'center',
    marginBottom: 60,
    flexWrap: 'wrap' as const,
  },
  primaryBtn: {
    background: 'linear-gradient(135deg, #6c5ce7, #a29bfe)',
    color: '#fff',
    padding: '16px 36px',
    borderRadius: 12,
    fontSize: 16,
    fontWeight: 700,
    textDecoration: 'none',
    transition: 'transform 0.3s ease',
  },
  secondaryBtn: {
    background: 'transparent',
    color: '#00cec9',
    border: '2px solid #00cec9',
    padding: '14px 36px',
    borderRadius: 12,
    fontSize: 16,
    fontWeight: 600,
    textDecoration: 'none',
  },
  stats: {
    display: 'flex',
    gap: 48,
    justifyContent: 'center',
    flexWrap: 'wrap' as const,
  },
  statItem: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    gap: 4,
  },
  statNumber: {
    fontSize: 32,
    fontWeight: 800,
    color: '#00cec9',
  },
  statLabel: {
    fontSize: 14,
    color: '#6c6c8a',
  },
}