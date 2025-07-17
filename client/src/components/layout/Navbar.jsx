import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <nav style={styles.navbar}>
      <Link to="/" style={styles.brand}>KaziMatch</Link>
      <div style={styles.navLinks}>
        <Link to="/jobs" style={styles.navLink}>Jobs</Link>
        {user ? (
          <>
            <Link 
              to={user.role === 'seeker' ? '/dashboard/seeker' : '/dashboard/employer'} 
              style={styles.navLink}
            >
              Dashboard
            </Link>
            <button onClick={handleLogout} style={styles.button}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" style={styles.navLink}>Login</Link>
            <Link to="/register" style={styles.navLink}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

const styles = {
  navbar: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#2c3e50', color: 'white', padding: '0 2rem', height: '60px' },
  brand: { color: 'white', textDecoration: 'none', fontSize: '1.5rem', fontWeight: 'bold' },
  navLinks: { display: 'flex', alignItems: 'center' },
  navLink: { color: 'white', textDecoration: 'none', margin: '0 1rem' },
  button: { background: 'none', border: 'none', color: 'white', cursor: 'pointer', fontSize: '1rem', margin: '0 1rem' }
};

export default Navbar;