import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx'; 
import { registerUser } from '../api/authApi.js';

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
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.title}>Create Your Account</h2>
        {error && <p style={styles.error}>{error}</p>}
        <input type="text" name="name" value={name} onChange={handleChange} placeholder="Full Name" style={styles.input} required />
        <input type="email" name="email" value={email} onChange={handleChange} placeholder="Email Address" style={styles.input} required />
        <input type="password" name="password" value={password} onChange={handleChange} placeholder="Password" style={styles.input} required />
        <input type="password" name="confirmPassword" value={confirmPassword} onChange={handleChange} placeholder="Confirm Password" style={styles.input} required />
        <div style={styles.roleSelector}>
          <label style={styles.roleLabel}><input type="radio" name="role" value="seeker" checked={role === 'seeker'} onChange={handleChange}/>I am a Job Seeker</label>
          <label style={styles.roleLabel}><input type="radio" name="role" value="employer" checked={role === 'employer'} onChange={handleChange}/>I am an Employer</label>
        </div>
        <button type="submit" style={styles.button} disabled={loading}>{loading ? 'Registering...' : 'Register'}</button>
        <p style={styles.redirectText}>Already have an account? <Link to="/login" style={styles.link}>Login</Link></p>
      </form>
    </div>
  );
};

// Styles
const styles = {
  container: { display: 'flex', justifyContent: 'center', alignItems: 'center' },
  form: { width: '100%', maxWidth: '400px', padding: '30px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)', borderRadius: '8px' },
  title: { textAlign: 'center', marginBottom: '20px', color: '#2c3e50' },
  error: { color: 'red', textAlign: 'center', marginBottom: '10px' },
  input: { width: '100%', padding: '12px', marginBottom: '15px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' },
  roleSelector: { display: 'flex', justifyContent: 'space-around', margin: '20px 0' },
  roleLabel: { display: 'flex', alignItems: 'center', gap: '8px' },
  button: { width: '100%', padding: '12px', backgroundColor: '#0984e3', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px' },
  redirectText: { textAlign: 'center', marginTop: '20px' },
  link: { color: '#0984e3', textDecoration: 'none' }
};

export default RegisterPage;