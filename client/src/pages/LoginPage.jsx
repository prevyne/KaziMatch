import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { loginUser } from '../api/authApi.js';
import styles from './LoginPage.module.css';

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { user, login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate(user.role === 'seeker' ? '/dashboard/seeker' : '/dashboard/employer');
    }
  }, [user, navigate]);

  const { email, password } = formData;
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const userData = await loginUser({ email, password });
      login(userData);
      navigate(userData.role === 'seeker' ? '/dashboard/seeker' : '/dashboard/employer');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2 className={styles.title}>Login to Your Account</h2>
        {error && <p className={styles.error}>{error}</p>}
        
        <input type="email" name="email" value={email} onChange={handleChange} placeholder="Email Address" className={styles.input} required />
        <input type="password" name="password" value={password} onChange={handleChange} placeholder="Password" className={styles.input} required />

        <button type="submit" className={styles.button} disabled={loading}>
          {loading ? 'Logging In...' : 'Login'}
        </button>

        <p className={styles.redirectText}>
          Don't have an account? <Link to="/register" className={styles.link}>Register</Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;