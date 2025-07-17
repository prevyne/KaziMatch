import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getMyJobs } from '../api/jobApi.js';
import Spinner from '../components/common/Spinner.jsx';

const EmployerDashboardPage = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const token = 'YOUR_AUTH_TOKEN_HERE';
                const response = await getMyJobs(token);
                setJobs(response.data);
            } catch (err) {
                setError('Failed to load your jobs.');
            } finally {
                setLoading(false);
            }
        };
        fetchJobs();
    }, []);

    if (loading) return <Spinner />;
    if (error) return <p style={styles.error}>{error}</p>;

    return (
        <div>
            <div style={styles.header}><h1 style={styles.title}>Employer Dashboard</h1><Link to="/jobs/new" style={styles.postJobButton}>Post a New Job</Link></div>
            <div style={styles.jobListContainer}>
                <div style={styles.jobListHeader}><span style={styles.headerCell}>Job Title</span><span style={styles.headerCell}>Status</span><span style={styles.headerCell}>Applicants</span><span style={styles.headerCell}>Actions</span></div>
                {jobs.length > 0 ? (
                    jobs.map(job => (
                        <div key={job._id} style={styles.jobRow}>
                            <span style={styles.cell}>{job.title}</span>
                            <span style={styles.cell}><span style={job.isActive ? styles.activeBadge : styles.inactiveBadge}>{job.isActive ? 'Active' : 'Inactive'}</span></span>
                            <span style={styles.cell}>{job.applicantCount}</span>
                            <span style={styles.cell}><Link to={`/dashboard/jobs/${job._id}/applicants`} style={styles.actionLink}>View Applicants</Link></span>
                        </div>
                    ))
                ) : (<p style={styles.noJobsText}>You have not posted any jobs yet.</p>)}
            </div>
        </div>
    );
};

const styles = {
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }, title: { margin: 0 }, postJobButton: { padding: '10px 15px', textDecoration: 'none', backgroundColor: '#0984e3', color: 'white', borderRadius: '5px' }, jobListContainer: { background: '#fff', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }, jobListHeader: { display: 'grid', gridTemplateColumns: '3fr 1fr 1fr 1fr', padding: '15px', borderBottom: '2px solid #f0f0f0', fontWeight: 'bold' }, headerCell: { color: '#2c3e50' }, jobRow: { display: 'grid', gridTemplateColumns: '3fr 1fr 1fr 1fr', padding: '15px', borderBottom: '1px solid #f0f0f0', alignItems: 'center' }, cell: { color: '#34495e' }, actionLink: { color: '#0984e3', textDecoration: 'none' }, activeBadge: { background: '#2ecc71', color: 'white', padding: '4px 8px', borderRadius: '10px', fontSize: '12px' }, inactiveBadge: { background: '#95a5a6', color: 'white', padding: '4px 8px', borderRadius: '10px', fontSize: '12px' }, noJobsText: { padding: '20px', textAlign: 'center' }, error: { color: 'red' }
};

export default EmployerDashboardPage;