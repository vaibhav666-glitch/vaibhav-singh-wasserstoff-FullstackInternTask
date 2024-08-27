import React, { useState } from 'react';
import BarChart from './barGraph.jsx';
import data from '..jsonFile/jsonFile'; // Your JSON data

const App = () => {
    const [filters, setFilters] = useState({});

    const handleFilterChange = (filterType, value) => {
        setFilters({
            ...filters,
            [filterType]: value,
        });
    };

    return (
        <div className="w-full h-screen p-4">
            <nav className="flex justify-between bg-gray-800 p-4">
                <div className="text-white">Bar Chart Filters</div>
                <div className="flex space-x-4">
                    <select onChange={(e) => handleFilterChange('endYear', e.target.value)} className="bg-gray-700 text-white p-2">
                        <option value="">End Year</option>
                        <option value="2036">2036</option>
                        {/* Add more options */}
                    </select>
                    <select onChange={(e) => handleFilterChange('topic', e.target.value)} className="bg-gray-700 text-white p-2">
                        <option value="">Topic</option>
                        <option value="oil">Oil</option>
                        {/* Add more options */}
                    </select>
                    {/* Add more filters */}
                </div>
            </nav>
            <BarChart data={data} selectedFilters={filters} />
        </div>
    );
};

export default App;
