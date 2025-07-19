import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { updateUserProfile } from '../api/userApi';

const EditProfilePage = () => {
    const { user, login } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (user) {
            // Defensively set form data, providing empty defaults
            setFormData({
                name: user.name || '',
                email: user.email || '',
                profile: {
                    headline: user.profile?.headline || '',
                    bio: user.profile?.bio || '',
                    location: user.profile?.location || '',
                    skills: user.profile?.skills || [],
                    experience: user.profile?.experience || [],
                    education: user.profile?.education || [],
                }
            });
        }
    }, [user]);

    const handleBasicChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    const handleProfileChange = (e) => setFormData(prev => ({ ...prev, profile: { ...prev.profile, [e.target.name]: e.target.value } }));
    const handleSkillsChange = (e) => {
        const skillsArray = e.target.value.split(',').map(skill => skill.trim());
        setFormData(prev => ({ ...prev, profile: { ...prev.profile, skills: skillsArray } }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const updatedUser = await updateUserProfile(formData);
            login(updatedUser); // Update the user in the context
            alert('Profile updated successfully!');
            navigate('/dashboard/seeker');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update profile.');
        } finally {
            setLoading(false);
        }
    };

    // Show a loading message until the form data is populated from the user object
    if (!formData) return <p>Loading Profile...</p>;

    return (
        <div style={styles.container}>
            <form onSubmit={handleSubmit} style={styles.form}>
                <h2 style={styles.title}>Edit Your Profile</h2>
                {error && <p style={styles.error}>{error}</p>}
                <h3>Basic Information</h3>
                <input name="name" value={formData.name} placeholder="Full Name" onChange={handleBasicChange} style={styles.input} />
                <input name="email" value={formData.email} placeholder="Email" onChange={handleBasicChange} style={styles.input} />
                <h3>Professional Profile</h3>
                <input name="headline" value={formData.profile.headline} placeholder="Headline (e.g., Senior Full-Stack Developer)" onChange={handleProfileChange} style={styles.input} />
                <textarea name="bio" value={formData.profile.bio} placeholder="Short Bio" onChange={handleProfileChange} style={styles.textarea} />
                <input name="location" value={formData.profile.location} placeholder="Your Location" onChange={handleProfileChange} style={styles.input} />
                <h3>Skills</h3>
                <input name="skills" value={formData.profile.skills.join(', ')} placeholder="Your skills (comma-separated)" onChange={handleSkillsChange} style={styles.input} />
                <button type="submit" style={styles.button} disabled={loading}>
                    {loading ? 'Saving...' : 'Save Changes'}
                </button>
            </form>
        </div>
    );
};

const styles = {
    container: { display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' },
    form: { width: '100%', maxWidth: '700px', padding: '30px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)', borderRadius: '8px', background: '#fff' },
    title: { textAlign: 'center', marginBottom: '30px', color: '#2c3e50' },
    error: { color: 'red', textAlign: 'center', marginBottom: '15px' },
    input: { width: '100%', padding: '12px', marginBottom: '15px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' },
    textarea: { width: '100%', padding: '12px', marginBottom: '15px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box', minHeight: '100px' },
    button: { width: '100%', padding: '15px', marginTop: '10px', backgroundColor: '#0984e3', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px' },
};

export default EditProfilePage;