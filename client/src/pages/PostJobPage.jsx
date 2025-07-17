import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createJob } from '../api/jobApi.js';

const PostJobPage = () => {
    const [formData, setFormData] = useState({
        title: '',
        company: '',
        location: '',
        description: '',
        requirements: '', // Handled as comma-separated string
        jobType: 'Full-time',
        salary: { min: '', max: '' },
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSalaryChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            salary: { ...prev.salary, [name]: value }
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const jobData = {
                ...formData,
                // Convert requirements string to an array
                requirements: formData.requirements.split(',').map(req => req.trim()).filter(req => req),
            };
            const token = 'YOUR_AUTH_TOKEN_HERE'; // From AuthContext in real app
            await createJob(jobData, token);
            navigate('/dashboard/employer'); // Redirect to dashboard on success
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to post job.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            <form onSubmit={handleSubmit} style={styles.form}>
                <h2 style={styles.title}>Post a New Job Opportunity</h2>
                {error && <p style={styles.error}>{error}</p>}

                <input name="title" placeholder="Job Title" onChange={handleChange} style={styles.input} required />
                <input name="company" placeholder="Company Name" onChange={handleChange} style={styles.input} required />
                <input name="location" placeholder="Location (e.g., Nairobi, Kenya)" onChange={handleChange} style={styles.input} required />
                <textarea name="description" placeholder="Job Description" onChange={handleChange} style={styles.textarea} required />
                <textarea name="requirements" placeholder="Requirements (comma-separated)" onChange={handleChange} style={styles.textarea} required />
                
                <select name="jobType" onChange={handleChange} style={styles.input}>
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Internship">Internship</option>
                </select>

                <div style={styles.salaryContainer}>
                    <input name="min" type="number" placeholder="Min Salary (KES)" onChange={handleSalaryChange} style={styles.input} />
                    <input name="max" type="number" placeholder="Max Salary (KES)" onChange={handleSalaryChange} style={styles.input} />
                </div>

                <button type="submit" style={styles.button} disabled={loading}>
                    {loading ? 'Posting...' : 'Post Job'}
                </button>
            </form>
        </div>
    );
};

// Styles (reusing from login/register pages)
const styles = {
    container: { display: 'flex', justifyContent: 'center', alignItems: 'center' },
    form: { width: '100%', maxWidth: '600px', padding: '30px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)', borderRadius: '8px', background: '#fff' },
    title: { textAlign: 'center', marginBottom: '20px', color: '#2c3e50' },
    error: { color: 'red', textAlign: 'center', marginBottom: '10px' },
    input: { width: '100%', padding: '12px', marginBottom: '15px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' },
    textarea: { width: '100%', padding: '12px', marginBottom: '15px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box', minHeight: '100px' },
    salaryContainer: { display: 'flex', gap: '15px' },
    button: { width: '100%', padding: '12px', backgroundColor: '#0984e3', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px' },
};

export default PostJobPage;