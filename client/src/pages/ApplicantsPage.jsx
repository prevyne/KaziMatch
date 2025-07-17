import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getApplicantsForJob } from '../api/applicationApi.js';
import ApplicantCard from '../components/dashboard/ApplicantCard.jsx';
import Spinner from '../components/common/Spinner.jsx';

const ApplicantsPage = () => {
    const { id: jobId } = useParams();
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchApplicants = async () => {
            try {
                const token = 'YOUR_AUTH_TOKEN_HERE';
                const response = await getApplicantsForJob(jobId, token);
                setApplications(response.data);
            } catch (err) {
                setError('Could not load applicants for this job.');
            } finally {
                setLoading(false);
            }
        };
        fetchApplicants();
    }, [jobId]);

    if (loading) return <Spinner />;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;

    return (
        <div>
            <h1 style={{ marginBottom: '30px' }}>Applicants</h1>
            {applications.length > 0 ? (
                applications.map(app => <ApplicantCard key={app._id} application={app} />)
            ) : (<p>There are no applicants for this job yet.</p>)}
        </div>
    );
};

export default ApplicantsPage;