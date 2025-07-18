import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { getMyApplications } from '../api/applicationApi.js';
import { getAllJobs } from '../api/jobApi.js';
import JobCard from '../components/jobs/JobCard.jsx';
import Spinner from '../components/common/Spinner.jsx';

const SeekerDashboardPage = () => {
  const { user } = useAuth();
  const [applications, setApplications] = useState([]);
  const [topJobs, setTopJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [appsResponse, jobsResponse] = await Promise.all([
          getMyApplications(), // No token needed
          getAllJobs()
        ]);
        setApplications(appsResponse.data);
        setTopJobs(jobsResponse.data.slice(0, 5));
      } catch (err) {
        setError('Failed to load dashboard data.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (user) {
      fetchData();
    }
  }, [user]);

  if (loading) return <Spinner />;
  if (error) return <p style={{color: 'red'}}>{error}</p>;

  return (
    <div>
      <div style={styles.header}>
        <h1 style={styles.title}>Welcome, {user?.name}!</h1>
        <Link to="/profile/edit" style={styles.editProfileButton}>Edit Profile</Link>
      </div>
      
      <div style={styles.dashboardGrid}>
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>My Applications</h2>
          <div style={styles.tableContainer}>
            {applications.length > 0 ? (
              applications.map(app => (
                <div key={app._id} style={styles.applicationRow}>
                  <div>
                    <Link to={`/jobs/${app.job._id}`} style={styles.jobLink}>{app.job.title}</Link>
                    <p style={styles.companyText}>{app.job.company}</p>
                  </div>
                  <span style={styles.statusBadge}>{app.status}</span>
                </div>
              ))
            ) : (<p>You have not applied to any jobs yet.</p>)}
          </div>
        </section>
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>My Top Matched Jobs</h2>
          {topJobs.length > 0 ? (
            topJobs.map(job => <JobCard key={job._id} job={job} />)
          ) : (<p>We are still searching for your perfect match!</p>)}
        </section>
      </div>
    </div>
  );
};

const styles = {
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' },
    title: { fontSize: '2rem', margin: 0 },
    editProfileButton: { padding: '10px 15px', textDecoration: 'none', backgroundColor: '#34495e', color: 'white', borderRadius: '5px' },
    error: { color: 'red' },
    dashboardGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '30px' },
    section: { backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '8px' },
    sectionTitle: { marginTop: 0, borderBottom: '2px solid #eee', paddingBottom: '10px' },
    tableContainer: { display: 'flex', flexDirection: 'column', gap: '15px' },
    applicationRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', backgroundColor: 'white', borderRadius: '5px' },
    jobLink: { textDecoration: 'none', color: '#0984e3', fontWeight: 'bold' },
    companyText: { margin: '5px 0 0 0', fontSize: '14px', color: '#555' },
    statusBadge: { textTransform: 'capitalize', padding: '5px 10px', borderRadius: '12px', color: 'white', backgroundColor: '#34495e', fontSize: '12px' }
};

export default SeekerDashboardPage;