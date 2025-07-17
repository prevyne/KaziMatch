import React from 'react';
import { Link } from 'react-router-dom';

const JobCard = ({ job }) => {
  // The backend will add a 'matchScore' field for authenticated seekers
  const { _id, title, company, location, description, matchScore } = job;

  return (
    <div style={styles.card}>
      {matchScore && (
        <div style={styles.scoreBadge}>
          {matchScore}% Match
        </div>
      )}
      <h3 style={styles.title}>{title}</h3>
      <h4 style={styles.company}>{company} - {location}</h4>
      <p style={styles.description}>
        {description.substring(0, 150)}...
      </p>
      <Link to={`/jobs/${_id}`} style={styles.detailsButton}>
        View Details
      </Link>
    </div>
  );
};

// Styles
const styles = {
  card: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '20px',
    marginBottom: '20px',
    position: 'relative',
    backgroundColor: 'white',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
  },
  scoreBadge: {
    position: 'absolute',
    top: '15px',
    right: '15px',
    background: '#0984e3',
    color: 'white',
    padding: '5px 10px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: 'bold',
  },
  title: {
    margin: '0 0 5px 0',
    color: '#2c3e50',
  },
  company: {
    margin: '0 0 15px 0',
    color: '#7f8c8d',
    fontWeight: 'normal',
  },
  description: {
    color: '#34495e',
    lineHeight: '1.6',
  },
  detailsButton: {
    display: 'inline-block',
    marginTop: '15px',
    padding: '10px 15px',
    color: 'white',
    backgroundColor: '#34495e',
    textDecoration: 'none',
    borderRadius: '5px',
  },
};

export default JobCard;