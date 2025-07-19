import React from 'react';
import { Link } from 'react-router-dom';
import styles from './HomePage.module.css';

const HomePage = () => {
  return (
    <div>
      {/* Hero Section */}
      <header className={styles.hero}>
        <h1 className={styles.heroTitle}>Find Your Perfect Match.</h1>
        <p className={styles.heroSubtitle}>
          Let our AI guide you to the career opportunity you were meant for.
        </p>
        <Link to="/jobs" className={styles.ctaButton}>
          Browse Jobs
        </Link>
      </header>

      {/* Features Section */}
      <section className={styles.features}>
        <h2 className={styles.featuresTitle}>Why KaziMatch?</h2>
        <div className={styles.featuresGrid}>
          <div className={styles.featureCard}>
            <h3 className={styles.featureCardTitle}>AI-Powered Matching</h3>
            <p>Our intelligent system analyzes your profile to find jobs where you'll truly shine.</p>
          </div>
          <div className={styles.featureCard}>
            <h3 className={styles.featureCardTitle}>Streamlined Applications</h3>
            <p>See a unique "Match Score" for every job, so you can focus on the best fits.</p>
          </div>
          <div className={styles.featureCard}>
            <h3 className={styles.featureCardTitle}>Data-Driven Insights</h3>
            <p>Employers see ranked candidates, saving hundreds of hours in screening.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;