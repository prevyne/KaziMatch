import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { getMyApplications } from '../api/applicationApi.js';
import { getAllJobs } from '../api/jobApi.js';
import JobCard from '../components/jobs/JobCard.jsx';
import Spinner from '../components/common/Spinner.jsx';
import styles from './SeekerDashboardPage.module.css'; // <-- Import CSS Module

const SeekerDashboardPage = () => {
  const { user } = useAuth();
  const [applications, setApplications] = useState([]);
  const [topJobs, setTopJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      try {
        const [appsResponse, jobsResponse] = await Promise.all([
          getMyApplications(),
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
    fetchData();
  }, [user]);

  if (loading) return <Spinner />;
  if (error) return <p className={styles.error}>{error}</p>;

  return (
    <div>
      <div className={styles.header}>
        <h1 className={styles.title}>Welcome, {user?.name}!</h1>
        <Link to="/profile/edit" className={styles.editProfileButton}>Edit Profile</Link>
      </div>
      
      <div className={styles.dashboardGrid}>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>My Applications</h2>
          <div className={styles.listContainer}>
            {applications.length > 0 ? (
              applications.map(app => (
                <div key={app._id} className={styles.applicationRow}>
                  <div>
                    <Link to={`/jobs/${app.job._id}`} className={styles.jobLink}>{app.job.title}</Link>
                    <p className={styles.companyText}>{app.job.company}</p>
                  </div>
                  <span className={styles.statusBadge}>{app.status}</span>
                </div>
              ))
            ) : (<p>You have not applied to any jobs yet.</p>)}
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>My Top Matched Jobs</h2>
          {topJobs.length > 0 ? (
            topJobs.map(job => <JobCard key={job._id} job={job} />)
          ) : (<p>We are still searching for your perfect match!</p>)}
        </section>
      </div>
    </div>
  );
};

export default SeekerDashboardPage;