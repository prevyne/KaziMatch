import React from 'react';
import styles from './ApplicantCard.module.css';

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
    <div className={styles.card}>
      <div className={styles.scoreContainer}>
        <span className={styles.score}>{matchAnalysis ? matchAnalysis.score : 'N/A'}%</span>
        <span className={styles.scoreLabel}>Match</span>
      </div>
      <div className={styles.infoContainer}>
        <h3 className={styles.name}>{seeker.name}</h3>
        <p className={styles.headline}>{seeker.profile?.headline || 'No headline provided'}</p>
        <p className={styles.summary}>{matchAnalysis ? matchAnalysis.summary : 'Analysis is pending...'}</p>
      </div>
      <div className={styles.actionsContainer}>
        <select value={status} onChange={handleStatusSelect} className={styles.select}>
            {statuses.map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
        </select>
        <button onClick={handleDeleteClick} className={styles.deleteButton}>×</button>
      </div>
    </div>
  );
};

export default ApplicantCard;