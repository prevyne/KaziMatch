import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { getMyJobs } from '../api/jobApi.js';
import Spinner from '../components/common/Spinner.jsx';
import styles from './EmployerDashboardPage.module.css'; // <-- Import CSS Module

const EmployerDashboardPage = () => {
    const { user } = useAuth();
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await getMyJobs();
                setJobs(response.data);
            } catch (err) {
                setError('Failed to load your jobs.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        if (user) {
            fetchJobs();
        }
    }, [user]);

    if (loading) return <Spinner />;
    if (error) return <p className={styles.error}>{error}</p>;

    return (
        <div>
            <div className={styles.header}>
                <h1 className={styles.title}>Employer Dashboard</h1>
                <Link to="/jobs/new" className={styles.postJobButton}>Post a New Job</Link>
            </div>

            <div className={styles.jobListContainer}>
                <div className={styles.jobListHeader}>
                    <span className={styles.headerCell}>Job Title</span>
                    <span className={styles.headerCell}>Status</span>
                    <span className={styles.headerCell}>Applicants</span>
                    <span className={styles.headerCell}>Actions</span>
                </div>
                {jobs.length > 0 ? (
                    jobs.map(job => (
                        <div key={job._id} className={styles.jobRow}>
                            <span className={styles.cell}>{job.title}</span>
                            <span className={styles.cell}>
                                <span className={job.isActive ? styles.activeBadge : styles.inactiveBadge}>
                                    {job.isActive ? 'Active' : 'Inactive'}
                                </span>
                            </span>
                            <span className={styles.cell}>{job.applicantCount}</span>
                            <span className={styles.cell}>
                                <Link to={`/dashboard/jobs/${job._id}/applicants`} className={styles.actionLink}>View Applicants</Link>
                            </span>
                        </div>
                    ))
                ) : (
                    <p className={styles.noJobsText}>You have not posted any jobs yet.</p>
                )}
            </div>
        </div>
    );
};

export default EmployerDashboardPage;