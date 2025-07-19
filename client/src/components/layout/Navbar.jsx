import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import styles from './Navbar.module.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    // Use `className` instead of `style`
    <nav className={styles.navbar}>
      <Link to="/" className={styles.brand}>KaziMatch</Link>
      <div className={styles.navLinks}>
        <Link to="/jobs" className={styles.navLink}>Jobs</Link>
        {user ? (
          <>
            <Link 
              to={user.role === 'seeker' ? '/dashboard/seeker' : '/dashboard/employer'} 
              className={styles.navLink}
            >
              Dashboard
            </Link>
            <button onClick={handleLogout} className={styles.button}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className={styles.navLink}>Login</Link>
            <Link to="/register" className={styles.navLink}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;