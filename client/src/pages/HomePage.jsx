import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div>
      {/* Hero Section */}
      <header style={styles.hero}>
        <h1 style={styles.heroTitle}>Find Your Perfect Match.</h1>
        <p style={styles.heroSubtitle}>
          Let our AI guide you to the career opportunity you were meant for.
        </p>
        <Link to="/jobs" style={styles.ctaButton}>
          Browse Jobs
        </Link>
      </header>

      {/* Features Section */}
      <section style={styles.features}>
        <h2 style={styles.featuresTitle}>Why KaziMatch?</h2>
        <div style={styles.featuresGrid}>
          <div style={styles.featureCard}>
            <h3 style={styles.featureCardTitle}>AI-Powered Matching</h3>
            <p>Our intelligent system analyzes your profile to find jobs where you'll truly shine.</p>
          </div>
          <div style={styles.featureCard}>
            <h3 style={styles.featureCardTitle}>Personalized Score</h3>
            <p>See a unique "Match Score" for every job, so you can focus on the best fits.</p>
          </div>
          <div style={styles.featureCard}>
            <h3 style={styles.featureCardTitle}>Streamlined Applications</h3>
            <p>Apply to top opportunities with just a few clicks. No more tedious forms.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

// Basic styles for the homepage
const styles = {
  hero: {
    textAlign: 'center',
    padding: '80px 20px',
    backgroundColor: '#e6f4ff',
    borderRadius: '8px',
  },
  heroTitle: {
    fontSize: '3rem',
    color: '#2c3e50',
    margin: '0 0 10px 0',
  },
  heroSubtitle: {
    fontSize: '1.2rem',
    color: '#34495e',
    marginBottom: '30px',
  },
  ctaButton: {
    display: 'inline-block',
    padding: '15px 30px',
    fontSize: '1rem',
    color: 'white',
    backgroundColor: '#0984e3',
    textDecoration: 'none',
    borderRadius: '5px',
    fontWeight: 'bold',
  },
  features: {
    padding: '60px 20px',
    textAlign: 'center',
  },
  featuresTitle: {
    fontSize: '2.5rem',
    color: '#2c3e50',
    marginBottom: '40px',
  },
  featuresGrid: {
    display: 'flex',
    justifyContent: 'center',
    gap: '30px',
    flexWrap: 'wrap',
  },
  featureCard: {
    backgroundColor: '#f8f9fa',
    padding: '30px',
    borderRadius: '8px',
    width: '300px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
  },
  featureCardTitle: {
    fontSize: '1.5rem',
    color: '#34495e',
    marginBottom: '15px',
  },
};

export default HomePage;