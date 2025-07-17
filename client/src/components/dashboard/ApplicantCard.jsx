import React from 'react';

const ApplicantCard = ({ application }) => {
  const { seeker, matchAnalysis } = application;

  if (!seeker) return null;

  const score = matchAnalysis ? matchAnalysis.score : 'N/A';
  const summary = matchAnalysis ? matchAnalysis.summary : 'AI analysis is pending...';

  return (
    <div style={styles.card}>
      <div style={styles.scoreContainer}>
        <span style={styles.score}>{score}{score !== 'N/A' && '%'}</span>
        <span style={styles.scoreLabel}>Match</span>
      </div>
      <div style={styles.infoContainer}>
        <h3 style={styles.name}>{seeker.name}</h3>
        <p style={styles.headline}>{seeker.profile?.headline || 'No headline provided'}</p>
        <p style={styles.summary}>{summary}</p>
      </div>
    </div>
  );
};

// Styles
const styles = {
    card: { display: 'flex', alignItems: 'center', gap: '20px', padding: '20px', background: '#fff', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', marginBottom: '15px' },
    scoreContainer: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#e6f4ff', border: '2px solid #0984e3', borderRadius: '50%', width: '90px', height: '90px', flexShrink: 0 },
    score: { fontSize: '24px', fontWeight: 'bold', color: '#0984e3' },
    scoreLabel: { fontSize: '12px', color: '#0984e3' },
    infoContainer: { flex: 1 },
    name: { margin: '0 0 5px 0' },
    headline: { margin: '0 0 10px 0', fontStyle: 'italic', color: '#555' },
    summary: { margin: 0, fontSize: '14px', color: '#333' }
};

export default ApplicantCard;