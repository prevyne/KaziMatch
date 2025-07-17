import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { loginUser } from '../api/authApi.js';

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
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.title}>Login to Your Account</h2>
        {error && <p style={styles.error}>{error}</p>}
        <input type="email" name="email" value={email} onChange={handleChange} placeholder="Email Address" style={styles.input} required />
        <input type="password" name="password" value={password} onChange={handleChange} placeholder="Password" style={styles.input} required />
        <button type="submit" style={styles.button} disabled={loading}>{loading ? 'Logging In...' : 'Login'}</button>
        <p style={styles.redirectText}>Don't have an account? <Link to="/register" style={styles.link}>Register</Link></p>
      </form>
    </div>
  );
};

const styles = {
  container: { display: 'flex', justifyContent: 'center', alignItems: 'center' },
  form: { width: '100%', maxWidth: '400px', padding: '30px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)', borderRadius: '8px' },
  title: { textAlign: 'center', marginBottom: '20px', color: '#2c3e50' },
  error: { color: 'red', textAlign: 'center', marginBottom: '10px' },
  input: { width: '100%', padding: '12px', marginBottom: '15px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' },
  button: { width: '100%', padding: '12px', backgroundColor: '#0984e3', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px' },
  redirectText: { textAlign: 'center', marginTop: '20px' },
  link: { color: '#0984e3', textDecoration: 'none' }
};

export default LoginPage;