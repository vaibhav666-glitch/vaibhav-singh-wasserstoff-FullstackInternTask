import * as d3 from "d3";
import '../index.css';
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import data from "../jsonFile/jsondata.json";

export default function PieChart() {

    const svgRef = useRef();
    const [dimensions, setDimensions] = useState({ width: 800, height: 800, radius: 400 });
    //make mboile responsiveness
    const handleResize=()=>{
      const screenWidth=window.innerWidth;
      const screenHeight=window.innerHeight;

      const newWidth=screenWidth<800?screenWidth-200:800;
      const newHeight=screenWidth<800?newWidth:800;
      const newRadius=newWidth/2;
      setDimensions({width:newWidth,height:newHeight,radius:newRadius});
    };

    const [filteredData, setFilteredData] = useState([]);
    const [value, setValue] = useState("intensity");
    const [details, setDetails] = useState({});
    const [highest,setHighest]=useState();
    const [lowest,setLowest]=useState();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [dataChunk, setDataChunk] = useState(data.slice(0, 10));
    const [filters, setFilters] = useState({
        end_year: '',
        topic: '',
        sector: '',
        region: '',
        pestle: '',
        source: '',
        country: ''
    });

            // adjust screen size 
            useEffect(()=>{
              handleResize();
              window.addEventListener('resize', handleResize);
              return () => window.removeEventListener('resize', handleResize);
            },[]);

    useEffect(() => {
      setDetails(dataChunk[0]);
          const max=dataChunk.map(d=>d[value]);
             setHighest(Math.max(...max));
             setLowest(Math.min(...max));
//creating svg
        const svg = d3.select(svgRef.current);
        const { width, height, radius } = dimensions;
//setting random color
        const color = d3.scaleOrdinal(d3.schemeCategory10);
//setting segment value
        const pie = d3.pie().value(d => d[value]);
        const arc = d3.arc().innerRadius(0).outerRadius(radius);
//removing previous data from pie
        svg.selectAll('*').remove();

        const g = svg
            .attr('width', width)
            .attr('height', height)
            .append('g')
            .attr('transform', `translate(${width / 2},${height / 2})`);
//creting group of elements which are arcs 
        const pies = g.selectAll('.arc')
            .data(pie(dataChunk))
            .enter()
            .append('g')
            .attr('class', 'arc');
//creating segments
        pies.append("path")
            .attr("d", arc)
            .attr("fill", d => color(d.data.title))
            .on("mouseover", function(event, d) {
                d3.select(this).style("opacity", 0.7);
                tooltip.style("display", null)
                    .html(`Intensity: ${d.data.intensity}<br/>Likelihood: ${d.data.likelihood}<br/>Relevance: ${d.data.relevance}<br/>Start Year: ${d.data.start_year}<br/>End Year: ${d.data.end_year}<br/>Country: ${d.data.country}<br/>Topics: ${d.data.topic}<br/>Region: ${d.data.region}`);
            })
            .on("mousemove", function(event) {
                tooltip.style("top", `${event.pageY - 10}px`)
                    .style("left", `${event.pageX + 10}px`);
            })
            .on("mouseout", function() {
                d3.select(this).style("opacity", 1);
                tooltip.style("display", "none");
            })
            .on('click', function(event, d) {
                setDetails(d.data);
            });
//hover effect
let tooltip=d3.select(".tooltip")
if(tooltip.empty()){
tooltip = d3.select("body").append("div")
.attr("class", "tooltip")
.style("position", "absolute")
.style("display", "none")
.style("background", "rgba(0, 0, 0, 0.8)")
.style("color", "white")
.style("padding", "5px")
.style("border-radius", "5px")
.style("pointer-events", "none");
}

    }, [dataChunk, dimensions, value]);

    useEffect(() => {
        const filtered = data.filter(item => {
            return (
                (filters.end_year === '' || item.end_year.toString() === filters.end_year) &&
                (filters.topic === '' || item.topic === filters.topic) &&
                (filters.sector === '' || item.sector === filters.sector) &&
                (filters.region === '' || item.region === filters.region) &&
                (filters.pestle === '' || item.pestle === filters.pestle) &&
                (filters.source === '' || item.source === filters.source) &&
                (filters.country === '' || item.country === filters.country)
            );
        });
        setFilteredData(filtered);
        setDataChunk(filtered.slice(0, dataChunk.length));
        setCurrentIndex(10);
    }, [filters]);
//set Filter
    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters({
            ...filters,
            [name]: value
        });
    };
//set Zoom out zin feature
    const changeSize = (val) => {
        setDimensions(prev => {
            const newSize = Math.max(500, prev.width + val);
            return { width: newSize, height: newSize, radius: newSize / 2 };
        });
    };
//change pie chart value according to intensity relevance and livelihood
    const changeValue = (event) => {
        setValue(event.target.value);
    };

    const changeData = (val) => {
        let data;
        if (val === 11) {
            const newIndex = currentIndex + 10;
            data = filteredData.slice(currentIndex, newIndex);
            setCurrentIndex(newIndex);
        } else {
            data = filteredData.slice(0, val);
            setCurrentIndex(val);
        }
        setDataChunk(data);
    };

    return (
      <div className="flex flex-col items-center bg-gray-900 text-white min-h-screen py-10">
  <div className="mr-3 ml-auto flex space-x-4">
  <button 
      onClick={() => changeSize(-50)} 
      className="px-5 py-2 bg-red-600 hover:bg-red-700 transition-colors text-white rounded-lg shadow-lg"
    >
      -
    </button>
    <button 
      onClick={() => changeSize(50)} 
      className="px-5 py-2 bg-green-600 hover:bg-green-700 transition-colors text-white rounded-lg shadow-lg"
    >
      +
    </button>
    <select 
      onChange={changeValue} 
      className="px-5 py-2 bg-blue-900 hover:bg-blue-800 transition-colors text-white rounded-lg shadow-lg"
    >
      <option value="intensity">Intensity</option>
      <option value="likelihood">Likelihood</option>
      <option value="relevance">Relevance</option>
    </select>
  </div>
  <div>
    <svg 
      ref={svgRef} 
      className="rounded-full shadow-2xl" 
      style={{ boxShadow: '0 30px 60px -15px rgba(0, 0, 0, 0.9)' }} 
    ></svg>
  </div>
  
  <ul className="mt-8 mr-3 ml-auto space-y-2">
    <li className="py-2">
      <h1 className="px-5 py-2 bg-red-600 text-white rounded-lg shadow-lg">
        Highest {value}: {highest}
      </h1>
    </li>
    <li className="py-2">
      <h1 className="px-5 py-2 bg-red-600 text-white rounded-lg shadow-lg">
        Lowest {value}: {lowest}
      </h1>
    </li>
  </ul>

  <div className="m-10 space-x-4">
    <button 
      onClick={() => changeData(10)} 
      className="m-1 px-7 py-3 bg-blue-700 hover:bg-blue-800 transition-colors text-white rounded-lg shadow-lg"
    >
      10
    </button>
    <button 
      onClick={() => changeData(100)} 
      className="m-1 px-7 py-3 bg-blue-700 hover:bg-blue-800 transition-colors text-white rounded-lg shadow-lg"
    >
      100
    </button>
    <button 
      onClick={() => changeData(500)} 
      className="m-1 px-7 py-3 bg-blue-700 hover:bg-blue-800 transition-colors text-white rounded-lg shadow-lg"
    >
      500
    </button>
    <button 
      onClick={() => changeData(1000)} 
      className="m-1 px-7 py-3 bg-blue-700 hover:bg-blue-800 transition-colors text-white rounded-lg shadow-lg"
    >
      1000
    </button>
    <button 
    onClick={()=>changeData(11)}
    className="px-24 m-1 py-5 bg-green-700 hover:bg-green-800 transition-colors text-wy">
    Next</button>
  </div>

             <div className="filters mt-4">
    <input
      type="text"
      name="end_year"
      value={filters.end_year}
      onChange={handleFilterChange}
      placeholder="End Year"
      className="p-3 m-2 border border-gray-700 rounded-2xl bg-gray-800 text-white shadow-inner"
    />
    <input
      type="text"
      name="topic"
      value={filters.topic}
      onChange={handleFilterChange}
      placeholder="Topic"
      className="p-3 m-2 border border-gray-700 rounded-2xl bg-gray-800 text-white shadow-inner"
    />
    <input
      type="text"
      name="sector"
      value={filters.sector}
      onChange={handleFilterChange}
      placeholder="Sector"
      className="p-3 m-2 border border-gray-700 rounded-2xl bg-gray-800 text-white shadow-inner"
    />
    <input
      type="text"
      name="region"
      value={filters.region}
      onChange={handleFilterChange}
      placeholder="Region"
      className="p-3 m-2 border border-gray-700 rounded-2xl bg-gray-800 text-white shadow-inner"
    />
    <input
      type="text"
      name="pestle"
      value={filters.pestle}
      onChange={handleFilterChange}
      placeholder="PESTLE"
      className="p-3 m-2 border border-gray-700 rounded-2xl bg-gray-800 text-white shadow-inner"
    />
    <input
      type="text"
      name="source"
      value={filters.source}
      onChange={handleFilterChange}
      placeholder="Source"
      className="p-3 m-2 border border-gray-700 rounded-2xl bg-gray-800 text-white shadow-inner"
    />
    <input
      type="text"
      name="country"
      value={filters.country}
      onChange={handleFilterChange}
      placeholder="Country"
      className="p-3 m-2 border border-gray-700 rounded-2xl bg-gray-800 text-white shadow-inner"
    />
  </div>

  <div className="p-6 max-w-lg mx-auto bg-gray-800 rounded-xl shadow-2xl space-y-4">
                <h2 className="text-xl font-bold mb-4">Details:</h2>
                {details && (
                  
                  <ul className="space-y-3">
                     <h1 className="text-2xl font-bold mb-4">{details.title}</h1>
                  <li>
                    <span className="font-semibold">Intensity:</span> {details.intensity}
                  </li>
                  <li>
                    <span className="font-semibold">Sector:</span> {details.sector}
                  </li>
                  <li>
                    <span className="font-semibold">Topic:</span> {details.topic}
                  </li>
                  <li>
                    <span className="font-semibold">Insight:</span> {details.insight}
                  </li>
                  <li>
                    <span className="font-semibold">URL:</span> 
                    <a href={details.url} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">
                      {details.url}
                    </a>
                  </li>
                  <li>
                    <span className="font-semibold">Region:</span> {details.region}
                  </li>
                  <li>
                    <span className="font-semibold">Country:</span> {details.country}
                  </li>
                  <li>
                    <span className="font-semibold">Relevance:</span> {details.relevance}
                  </li>
                  <li>
                    <span className="font-semibold">PESTLE:</span> {details.pestle}
                  </li>
                  <li>
                    <span className="font-semibold">Source:</span> {details.source}
                  </li>
                  <li>
                    <span className="font-semibold">Likelihood:</span> {details.likelihood}
                  </li>
                  <div className="mt-4">
                        <h2 className="text-lg font-semibold">Published:</h2>
                        <p className="text-gray-400">{details.published}</p>
                      </div>
                      <div>
                        <h2 className="text-lg font-semibold">Added:</h2>
                        <p className="text-gray-400">{details.added}</p>
                      </div>
                </ul>
                
                )}
            </div>
        </div>
    );
}
