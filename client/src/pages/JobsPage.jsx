import React, { useState, useEffect, useCallback } from 'react';
import { getAllJobs } from '../api/jobApi.js';
import JobCard from '../components/jobs/JobCard.jsx';
import JobFilter from '../components/jobs/JobFilter.jsx';
import Spinner from '../components/common/Spinner.jsx';

const JobsPage = () => {
  const [jobs, setJobs] = useState([]);
  const [filters, setFilters] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchJobs = useCallback(async (currentFilters) => {
    setLoading(true);
    try {
      const activeFilters = Object.fromEntries(
        Object.entries(currentFilters).filter(([_, v]) => v !== '')
      );
      // The call is now simpler. The browser handles the auth cookie.
      const response = await getAllJobs(activeFilters);
      setJobs(response.data);
    } catch (err) {
      setError('Failed to load jobs. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchJobs(filters);
  }, [filters, fetchJobs]);

  return (
    <div>
      <h1 style={{ marginBottom: '10px' }}>Explore Opportunities</h1>
      <p style={{ marginBottom: '30px', color: '#555' }}>Find your next career move from our curated list of jobs.</p>
      
      <JobFilter onFilterChange={setFilters} />

      {loading ? (
        <Spinner />
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <div>
          {jobs.length > 0 ? (
            jobs.map(job => <JobCard key={job._id} job={job} />)
          ) : (
            <p>No jobs match your criteria. Please try different filters.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default JobsPage;