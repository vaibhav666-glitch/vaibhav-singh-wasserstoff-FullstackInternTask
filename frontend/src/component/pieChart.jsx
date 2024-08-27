import * as d3 from "d3";
import '../index.css';
import { useEffect, useRef, useState } from "react";
import axios from "axios";

const getdata= async ()=>{
  const response =await axios.get('http://localhost:3200/api/energy/')
  return response
}



    
   
    export default async function PieChart() {
        
       const [data,setData]=useState([])

       useEffect (async()=>{
        const r=await getdata();
        setData(r.data)
       })
        const svgRef = useRef();
        const [dimensions, setDimensions] = useState({ width: 800, height: 800, radius: 400 });
        const [filteredData, setFilteredData] = useState([]);
        const [value,setValue]=useState("intensity");
        const [details,setDetails]=useState({})
        const [currentIndex,setCurrentIndex]=useState(0);
        const[dataChunk,setDataChunk]=useState(data.slice(0,10));
        const [filters, setFilters] = useState({
          end_year: '',
          topic: '',
          sector: '',
          region: '',
          pestle: '',
          source: '',
          country: ''
        });
      

        
        
      
        useEffect(() => {
          const svg = d3.select(svgRef.current);
          const { width, height, radius } = dimensions;
      
          const color = d3.scaleOrdinal(d3.schemeCategory10);
      
          const pie = d3.pie().value(d => d[value]);
          const arc = d3.arc().innerRadius(0).outerRadius(radius);
      
          svg.selectAll('*').remove();
      
          const g = svg
            .attr('width', width)
            .attr('height', height)
            .append('g')
            .attr('transform', `translate(${width / 2},${height / 2})`)
            
            const pies = g.selectAll('.arc')
            .data(pie(dataChunk))
            .enter()
            .append('g')
            .attr('class', 'arc');

        pies.append("path")
            .attr("d", arc)
            .attr("fill", d => color(d.data.title))
            .on("mouseover", function(event, d) {
                d3.select(this).style("opacity", 0.7);
                tooltip.style("display", null)
                    .html(`Intensity:${d.data.intensity}<br/>Likelihood: ${d.data.likelihood}<br/>Relevance: ${d.data.relevance}<br/>Start Year: ${d.data.start_year}<br/>End Year: ${d.data.end_year}<br/>Country: ${d.data.country}<br/>Topics: ${d.data.topic}<br/>Region: ${d.data.region}<br/>`);
            })
            .on("mousemove", function(event) {
                tooltip.style("top",` ${event.pageY - 10}px`)
                    .style("left",` ${event.pageX + 10}px`);
            })
            .on("mouseout", function() {
                d3.select(this).style("opacity", 1);
                tooltip.style("display", "none");
            })
            .on('click',function(event, d){
                console.log(d.data);
                setDetails(d.data);
            })

       

        const tooltip = d3.select("body").append("div")
            .attr("class", "tooltip")
            .style("position", "absolute")
            .style("display", "none")
            .style("background", "rgba(0, 0, 0, 0.8)")
            .style("color", "white")
            .style("padding", "5px")
            .style("border-radius", "5px")
            .style("pointer-events", "none");
      
        }, [dataChunk,dimensions,value]);
      
        useEffect(() => {
          // Apply filters
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
          console.log(dataChunk.length);
          setDataChunk(filtered.slice(0,dataChunk.length))
          setCurrentIndex(10);
        }, [filters]);
      
        const handleFilterChange = (e) => {
          const { name, value } = e.target;
          setFilters({
            ...filters,
            [name]: value
          });
        };
        const changeSize=(val)=>{
            setDimensions(prev=>{
                const newSize=Math.max(500,prev.width+val);
                return{width:newSize,height:newSize,radius:newSize/2}
            })
        }
        const changeValue=(event)=>{
           // console.log(event.target.value);
            setValue(event.target.value)
        }
        const changeData=(val)=>{
            //console.log(filteredData)
            console.log(dataChunk.length)
            let data
            if(val==11)
            {
                const newIndex=currentIndex+10;  
                console.log(newIndex)              
                data=filteredData.slice(currentIndex,newIndex);
            }
            else{
                data=filteredData.slice(0,val);  
            } 
            
       
        setDataChunk(data);
        
        }
      
        return (
          <div className="flex flex-col items-center ">
            <div className=" m-10   ml-auto flex space-x-2">
                <button onClick={()=>changeSize(-50)} className="px-5 py-1 bg-red-500 text-white rounded">-</button>
                <button onClick={()=>changeSize(50)} className="px-5 py-1 bg-green-500 text-white rounded">+</button>
                <select onChange={changeValue} className="px-5 py-1 bg-blue-800 text-white rounded">
                    <option value="intensity">Intensity</option>
                    <option value="likelihood">Likelihood</option>
                    <option value="relevance">Relevance</option>
                </select>
            </div>
            <div>
                <svg ref={svgRef} className=" rounded-full mr-96 relative" style={{ boxShadow: '0 25px 50px -12px rgb(0 0 0 / 82%)' }}></svg>
                <ul className="absolute top-[45%] left-[75%] ">
                    <li className="py-1">
                        <h1 className="px-5 py-1 bg-red-500 text-white rounded">Highest {value}: </h1>
                    </li>
                    <li className="py-1">
                    <h1 className="px-5 py-1 bg-red-500 text-white rounded">Lowest {value}:</h1>
                    </li>
                </ul>
            </div>

            <div className="m-10  space-x-2"> 
                
            <button onClick={()=>changeData(10)} className=" m-1 px-7 py-3 bg-blue-600 text-white rounded">10</button>
            <button onClick={()=>changeData(100)} className=" m-1 px-7 py-3 bg-blue-600 text-white rounded">100</button>
            <button onClick={()=>changeData(500)} className=" m-1 px-7 py-3 bg-blue-600 text-white rounded">500</button>
            <button onClick={()=>changeData(1000)} className=" m-1 px-7 py-3 bg-blue-600 text-white rounded">1000</button>
               
           
           
           <button onClick={()=>changeData(11)} className=" px-9 py-6 bg-green-600 text-white rounded">Next</button>
           
            
            </div>
            
            <div className="filters mt-4">
              <input
                type="text"
                name="end_year"
                value={filters.end_year}
                onChange={handleFilterChange}
                placeholder="End Year"
                className="p-2 m-1 border"
              />
              <input
                type="text"
                name="topic"
                value={filters.topic}
                onChange={handleFilterChange}
                placeholder="Topic"
                className="p-2 m-1 border"
              />
              <input
                type="text"
                name="sector"
                value={filters.sector}
                onChange={handleFilterChange}
                placeholder="Sector"
                className="p-2 m-1 border"
              />
              <input
                type="text"
                name="region"
                value={filters.region}
                onChange={handleFilterChange}
                placeholder="Region"
                className="p-2 m-1 border"
              />
              <input
                type="text"
                name="pestle"
                value={filters.pestle}
                onChange={handleFilterChange}
                placeholder="PESTLE"
                className="p-2 m-1 border"
              />
              <input
                type="text"
                name="source"
                value={filters.source}
                onChange={handleFilterChange}
                placeholder="Source"
                className="p-2 m-1 border"
              />
              <input
                type="text"
                name="country"
                value={filters.country}
                onChange={handleFilterChange}
                placeholder="Country"
                className="p-2 m-1 border"
              />
            </div>
            <div className="p-6 max-w-lg mx-auto bg-white rounded-xl shadow-md space-y-4">
  <h1 className="text-xl font-bold mb-4 ">{details.title}</h1>
  <ul className="space-y-2">
    <li>
      <span className="font-semibold">Intensity:</span> {details.intensity}
    </li>
    <li>
      <span className="font-semibold">Sector:</span> Energy
    </li>
    <li>
      <span className="font-semibold">Topic:</span> Oil
    </li>
    <li>
      <span className="font-semibold">Insight:</span> Annual Energy Outlook
    </li>
    <li>
      <span className="font-semibold">URL:</span> 
      <a href="http://www.eia.gov/outlooks/aeo/pdf/0383(2017).pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
        http://www.eia.gov/outlooks/aeo/pdf/0383(2017).pdf
      </a>
    </li>
    <li>
      <span className="font-semibold">Region:</span> Northern America
    </li>
    <li>
      <span className="font-semibold">Country:</span> United States of America
    </li>
    <li>
      <span className="font-semibold">Relevance:</span> 2
    </li>
    <li>
      <span className="font-semibold">PESTLE:</span> Industries
    </li>
    <li>
      <span className="font-semibold">Source:</span> EIA
    </li>
    <li>
      <span className="font-semibold">Likelihood:</span> 3
    </li>
  </ul>
  <div className="mt-4">
    <h2 className="text-lg font-semibold">Published:</h2>
    <p className="text-gray-600">January 09, 2017 00:00:00</p>
  </div>
  <div>
    <h2 className="text-lg font-semibold">Added:</h2>
    <p className="text-gray-600">January 20, 2017 03:51:24</p>
  </div>
</div>

          </div>
        );
      }