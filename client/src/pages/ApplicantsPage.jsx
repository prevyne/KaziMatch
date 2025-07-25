import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getApplicantsForJob, updateApplicationStatus, deleteApplication } from '../api/applicationApi.js';
import ApplicantCard from '../components/dashboard/ApplicantCard.jsx';
import Spinner from '../components/common/Spinner.jsx';
import styles from './ApplicantsPage.module.css'; // <-- Import CSS Module

const ApplicantsPage = () => {
    const { id: jobId } = useParams();
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchApplicants = async () => {
            try {
                const response = await getApplicantsForJob(jobId);
                setApplications(response.data);
            } catch (err) {
                setError('Could not load applicants for this job.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchApplicants();
    }, [jobId]);

    const handleStatusChange = async (applicationId, newStatus) => {
        try {
            await updateApplicationStatus(applicationId, newStatus);
            setApplications(prev => prev.map(app => 
                app._id === applicationId ? { ...app, status: newStatus } : app
            ));
        } catch (err) {
            alert('Failed to update status.');
        }
    };

    const handleDeleteApplication = async (applicationId) => {
        try {
            await deleteApplication(applicationId);
            setApplications(prev => prev.filter(app => app._id !== applicationId));
        } catch (err) {
            alert('Failed to delete application.');
        }
    };

    if (loading) return <Spinner />;
    if (error) return <p className={styles.error}>{error}</p>;

    return (
        <div>
            <h1 className={styles.title}>Applicants</h1>
            {applications.length > 0 ? (
                applications.map(app => 
                    <ApplicantCard 
                        key={app._id} 
                        application={app}
                        onStatusChange={handleStatusChange}
                        onDelete={handleDeleteApplication}
                    />
                )
            ) : (
                <p>There are no applicants for this job yet.</p>
            )}
        </div>
    );
};

export default ApplicantsPage;