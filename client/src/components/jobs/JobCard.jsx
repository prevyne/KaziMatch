import React from 'react';
import { Link } from 'react-router-dom';
import styles from './JobCard.module.css';

const JobCard = ({ job }) => {
  const { _id, title, company, location, description, matchScore } = job;

  return (
    <div className={styles.card}>
      {matchScore && (
        <div className={styles.scoreBadge}>
          {matchScore}% Match
        </div>
      )}
      <h3 className={styles.title}>{title}</h3>
      <h4 className={styles.company}>{company} - {location}</h4>
      <p className={styles.description}>
        {description.substring(0, 150)}...
      </p>
      <Link to={`/jobs/${_id}`} className={styles.detailsButton}>
        View Details
      </Link>
    </div>
  );
};

export default JobCard;