import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { registerUser } from '../api/authApi.js';
import styles from './RegisterPage.module.css';

const RegisterPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '', role: 'seeker' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { user, login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate(user.role === 'seeker' ? '/dashboard/seeker' : '/dashboard/employer');
    }
  }, [user, navigate]);

  const { name, email, password, confirmPassword, role } = formData;
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const userData = await registerUser({ name, email, password, role });
      login(userData);
      navigate(userData.role === 'seeker' ? '/dashboard/seeker' : '/dashboard/employer');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2 className={styles.title}>Create Your Account</h2>
        {error && <p className={styles.error}>{error}</p>}
        
        <input type="text" name="name" value={name} onChange={handleChange} placeholder="Full Name" className={styles.input} required />
        <input type="email" name="email" value={email} onChange={handleChange} placeholder="Email Address" className={styles.input} required />
        <input type="password" name="password" value={password} onChange={handleChange} placeholder="Password" className={styles.input} required />
        <input type="password" name="confirmPassword" value={confirmPassword} onChange={handleChange} placeholder="Confirm Password" className={styles.input} required />

        <div className={styles.roleSelector}>
          <label className={styles.roleLabel}>
            <input type="radio" name="role" value="seeker" checked={role === 'seeker'} onChange={handleChange} />
            I am a Job Seeker
          </label>
          <label className={styles.roleLabel}>
            <input type="radio" name="role" value="employer" checked={role === 'employer'} onChange={handleChange} />
            I am an Employer
          </label>
        </div>

        <button type="submit" className={styles.button} disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>

        <p className={styles.redirectText}>
          Already have an account? <Link to="/login" className={styles.link}>Login</Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;