import React from 'react';

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <p>&copy; {new Date().getFullYear()} KaziMatch. All Rights Reserved.</p>
      <p>Rongai, Nakuru County, Kenya</p>
    </footer>
  );
};

const styles = {
  footer: {
    background: '#f8f9fa',
    color: '#6c757d',
    textAlign: 'center',
    padding: '1rem',
    borderTop: '1px solid #dee2e6',
    marginTop: 'auto',
  }
};

export default Footer;