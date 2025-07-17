import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getJobById } from '../api/jobApi.js';
import { applyForJob } from '../api/applicationApi.js';
import { useAuth } from '../context/AuthContext.jsx';
import Spinner from '../components/common/Spinner.jsx';

const JobDetailsPage = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [applyStatus, setApplyStatus] = useState({ loading: false, error: '', success: false });

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await getJobById(id);
        setJob(response.data);
      } catch (err) {
        setError('Job not found.');
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id]);

  const handleApply = async () => {
    setApplyStatus({ loading: true, error: '', success: false });
    try {
      const token = 'YOUR_AUTH_TOKEN_HERE';
      await applyForJob(id, token);
      setApplyStatus({ loading: false, error: '', success: true });
    } catch (err) {
      setApplyStatus({ loading: false, error: err.response?.data?.message || 'Failed to apply.', success: false });
    }
  };

  if (loading) return <Spinner />;
  if (error) return <p style={styles.error}>{error}</p>;
  if (!job) return <p>Job not found.</p>;

  return (
    <div style={styles.container}>
      <header style={styles.header}><h1 style={styles.title}>{job.title}</h1><h2 style={styles.company}>{job.company} - {job.location}</h2></header>
      {user?.role === 'seeker' && (
        <div style={styles.applySection}>
          <button onClick={handleApply} disabled={applyStatus.loading || applyStatus.success} style={applyStatus.success ? styles.appliedButton : styles.applyButton}>{applyStatus.loading ? 'Applying...' : applyStatus.success ? '✓ Applied' : 'Apply Now'}</button>
          {applyStatus.error && <p style={styles.applyError}>{applyStatus.error}</p>}
        </div>
      )}
      <div style={styles.detailsGrid}>
        <div style={styles.mainContent}>
          <h3>Job Description</h3><p style={styles.description}>{job.description}</p>
          <h3>Requirements</h3><ul style={styles.requirementsList}>{job.requirements.map((req, index) => <li key={index}>{req}</li>)}</ul>
        </div>
        <aside style={styles.sidebar}><div style={styles.sidebarCard}><h4>Job Type</h4><p>{job.jobType}</p><h4>Salary</h4><p>{job.salary.min && job.salary.max ? `KES ${job.salary.min} - ${job.salary.max}` : 'Not Disclosed'}</p></div></aside>
      </div>
    </div>
  );
};

const styles = {
    container: { maxWidth: '1000px', margin: '0 auto' }, header: { borderBottom: '1px solid #eee', paddingBottom: '20px', marginBottom: '20px' }, title: { fontSize: '2.5rem', margin: 0 }, company: { fontSize: '1.2rem', fontWeight: 'normal', color: '#555', margin: '5px 0 0 0' }, applySection: { margin: '20px 0', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px' }, applyButton: { padding: '12px 25px', fontSize: '1rem', cursor: 'pointer', backgroundColor: '#0984e3', color: 'white', border: 'none', borderRadius: '5px' }, appliedButton: { padding: '12px 25px', fontSize: '1rem', cursor: 'not-allowed', backgroundColor: '#2ecc71', color: 'white', border: 'none', borderRadius: '5px' }, applyError: { color: 'red', marginTop: '10px' }, detailsGrid: { display: 'flex', gap: '30px' }, mainContent: { flex: 3 }, description: { lineHeight: '1.8' }, requirementsList: { paddingLeft: '20px' }, sidebar: { flex: 1 }, sidebarCard: { background: '#f8f9fa', padding: '20px', borderRadius: '8px' }, error: { color: 'red', textAlign: 'center', fontSize: '1.2rem' }
};

export default JobDetailsPage;