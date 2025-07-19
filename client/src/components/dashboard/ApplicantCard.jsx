import React from 'react';

const ApplicantCard = ({ application, onStatusChange, onDelete }) => {
  const { _id, seeker, matchAnalysis, status } = application;
  const statuses = ['applied', 'viewed', 'interviewing', 'offered', 'rejected'];

  if (!seeker) return null;

  const handleStatusSelect = (e) => {
    onStatusChange(_id, e.target.value);
  };

  const handleDeleteClick = () => {
    if (window.confirm('Are you sure you want to delete this application?')) {
        onDelete(_id);
    }
  };

  return (
    <div style={styles.card}>
      <div style={styles.scoreContainer}>
        <span style={styles.score}>{matchAnalysis ? matchAnalysis.score : 'N/A'}%</span>
        <span style={styles.scoreLabel}>Match</span>
      </div>
      <div style={styles.infoContainer}>
        <h3 style={styles.name}>{seeker.name}</h3>
        <p style={styles.headline}>{seeker.profile?.headline || 'No headline provided'}</p>
        <p style={styles.summary}>{matchAnalysis ? matchAnalysis.summary : 'Analysis is pending...'}</p>
      </div>
      <div style={styles.actionsContainer}>
        <select value={status} onChange={handleStatusSelect} style={styles.select}>
            {statuses.map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
        </select>
        <button onClick={handleDeleteClick} style={styles.deleteButton}>×</button>
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
    summary: { margin: 0, fontSize: '14px', color: '#333' },
    actionsContainer: { display: 'flex', alignItems: 'center', gap: '10px' },
    select: { padding: '8px', borderRadius: '4px', border: '1px solid #ccc' },
    deleteButton: { background: '#e74c3c', color: 'white', border: 'none', borderRadius: '50%', width: '30px', height: '30px', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px' }
};

export default ApplicantCard;