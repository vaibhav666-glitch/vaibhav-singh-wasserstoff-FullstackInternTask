import React from 'react';
import PieChart from './component/pieChart.jsx';
const App = () => {
    return (
        <div className="w-full h-screen p-4">
            <nav className="flex justify-between bg-gray-800 p-4">
                <div className="text-white">Line Chart with Zoom and Data Set Options</div>
            </nav>
            <PieChart/>
        </div>
    );
};

export default App;
