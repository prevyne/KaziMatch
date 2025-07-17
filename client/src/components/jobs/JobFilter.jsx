import React, { useState, useEffect } from 'react';

const JobFilter = ({ onFilterChange }) => {
    const [filters, setFilters] = useState({ keyword: '', location: '', jobType: '' });

    useEffect(() => {
        // Debounce text inputs to avoid rapid API calls
        const handler = setTimeout(() => {
            onFilterChange(filters);
        }, 500); // 500ms delay

        return () => clearTimeout(handler);
    }, [filters.keyword, filters.location]);
    
    // Handle immediate change for dropdown
    useEffect(() => {
        onFilterChange(filters);
    }, [filters.jobType])


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div style={styles.filterContainer}>
            <input
                type="text"
                name="keyword"
                value={filters.keyword}
                onChange={handleChange}
                placeholder="Job title or keyword"
                style={styles.input}
            />
            <input
                type="text"
                name="location"
                value={filters.location}
                onChange={handleChange}
                placeholder="Location (e.g., Nairobi)"
                style={styles.input}
            />
            <select name="jobType" value={filters.jobType} onChange={handleChange} style={styles.select}>
                <option value="">All Job Types</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
            </select>
        </div>
    );
};

const styles = {
    filterContainer: { display: 'flex', gap: '15px', marginBottom: '30px', padding: '20px', background: '#f8f9fa', borderRadius: '8px' },
    input: { flex: 1, padding: '12px', border: '1px solid #ccc', borderRadius: '4px' },
    select: { flex: 1, padding: '12px', border: '1px solid #ccc', borderRadius: '4px' }
};

export default JobFilter;