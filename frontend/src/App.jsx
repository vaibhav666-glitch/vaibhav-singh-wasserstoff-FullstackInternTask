import React from 'react';
import PieChart from './component/pieChart.jsx';
const App = () => {
    return (
        <div className="w-full h-screen p-4">
            <nav className="flex justify-between bg-gray-800 p-4">
                <div className="text-white">Pie chart to Demonstrate Intensity , Likelihood and Relevance of Energy sectors</div>
            </nav>
            <PieChart/>
        </div>
    );
};

export default App;
