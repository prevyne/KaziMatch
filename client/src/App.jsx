import React from 'react';
 import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
 import { AuthProvider } from './context/AuthContext.jsx';
 import Navbar from './components/layout/Navbar.jsx';
 import Footer from './components/layout/Footer.jsx';
 import PrivateRoute from './components/common/PrivateRoute.jsx';
 
 // Import all pages with .jsx extension
 import HomePage from './pages/HomePage.jsx';
 import JobsPage from './pages/JobsPage.jsx';
 import JobDetailsPage from './pages/JobDetailsPage.jsx';
 import LoginPage from './pages/LoginPage.jsx';
 import RegisterPage from './pages/RegisterPage.jsx';
 import PostJobPage from './pages/PostJobPage.jsx';
 import EmployerDashboardPage from './pages/EmployerDashboardPage.jsx';
 import ApplicantsPage from './pages/ApplicantsPage.jsx';
 import SeekerDashboardPage from './pages/SeekerDashboardPage.jsx';
 import NotFoundPage from './pages/NotFoundPage.jsx';

 const App = () => {
   // The rest of the component remains the same
   return (
     <AuthProvider>
       <Router>
         <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
           <Navbar />
           <main style={{ flex: 1, padding: '20px' }}>
             <Routes>
               <Route path="/" element={<HomePage />} />
               <Route path="/login" element={<LoginPage />} />
               <Route path="/register" element={<RegisterPage />} />
               <Route path="/jobs" element={<JobsPage />} />
               <Route path="/jobs/:id" element={<JobDetailsPage />} />
               <Route path="/jobs/new" element={<PrivateRoute><PostJobPage /></PrivateRoute>} />
               <Route path="/dashboard/seeker" element={<PrivateRoute><SeekerDashboardPage /></PrivateRoute>} />
               <Route path="/dashboard/employer" element={<PrivateRoute><EmployerDashboardPage /></PrivateRoute>} />
               <Route path="/dashboard/jobs/:id/applicants" element={<PrivateRoute><ApplicantsPage /></PrivateRoute>} />
               <Route path="*" element={<NotFoundPage />} />
             </Routes>
           </main>
           <Footer />
         </div>
       </Router>
     </AuthProvider>
   );
 };

 export default App;