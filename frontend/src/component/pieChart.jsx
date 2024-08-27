import * as d3 from "d3";
import '../index.css';
import { useEffect, useRef, useState } from "react";


    
   
    export default function PieChart() {
        const data = [
       
      
            {
                "end_year": 2036,
                "intensity": 18,
                "sector": "Energy",
                "topic": "oil",
                "insight": "Seaways turns elsewhere for submersible support",
                "url": "http://www.imeche.org/news/news-article/seaways-turns-elsewhere-for-submersible-support",
                "region": "",
                "start_year": 2016,
                "impact": 3,
                "added": "July, 06 2016 04:00:02",
                "published": "July, 04 2016 00:00:00",
                "country": "",
                "relevance": 3,
                "pestle": "Industries",
                "source": "Imeche",
                "title": "Decommissioning more than 400 oil platforms in the North Sea could cost up to £70 billion over the next 20 years.",
                "likelihood": 2
            },
            {
                "end_year": "",
                "intensity": 2,
                "sector": "",
                "topic": "",
                "insight": "Our Planet: The Environmental Dimension of the 2030 Agenda",
                "url": "http://apps.unep.org/publications/index.php?option=com_pub&task=download&file=012101_en",
                "region": "Central America",
                "start_year": "",
                "impact": "",
                "added": "July, 06 2016 03:51:54",
                "published": "May, 13 2016 00:00:00",
                "country": "Belize",
                "relevance": 1,
                "pestle": "",
                "source": "UNEP",
                "title": "The Belize barrier reef is under threat from overfishing.",
                "likelihood": 2
            },
            {
                "end_year": "",
                "intensity": 2,
                "sector": "",
                "topic": "",
                "insight": "Our Planet: The Environmental Dimension of the 2030 Agenda",
                "url": "http://apps.unep.org/publications/index.php?option=com_pub&task=download&file=012101_en",
                "region": "World",
                "start_year": "",
                "impact": "",
                "added": "July, 06 2016 03:51:53",
                "published": "May, 13 2016 00:00:00",
                "country": "",
                "relevance": 1,
                "pestle": "",
                "source": "UNEP",
                "title": "Almost half of all natural World Heritage sites are threatened by harmful industrial activities and operations.",
                "likelihood": 2
            },
            {
                "end_year": "",
                "intensity": 2,
                "sector": "Energy",
                "topic": "oil",
                "insight": "Britain's Plummeting Pound Is Bad News for America",
                "url": "http://foreignpolicy.com/2016/07/05/britains-plummeting-pound-is-bad-news-for-america/",
                "region": "",
                "start_year": "",
                "impact": "",
                "added": "July, 06 2016 01:54:35",
                "published": "July, 05 2016 00:00:00",
                "country": "",
                "relevance": 1,
                "pestle": "Industries",
                "source": "Foreign Policy",
                "title": "The continued fallout from Brexit could keep oil prices lower for longer.",
                "likelihood": 2
            },
            {
                "end_year": "",
                "intensity": 4,
                "sector": "Energy",
                "topic": "oil",
                "insight": "U.S. has more untapped oil than Saudi Arabia or Russia",
                "url": "http://money.cnn.com/2016/07/05/investing/us-untapped-oil/index.html",
                "region": "Northern America",
                "start_year": "",
                "impact": "",
                "added": "July, 06 2016 01:26:08",
                "published": "July, 05 2016 00:00:00",
                "country": "United States of America",
                "relevance": 2,
                "pestle": "Industries",
                "source": "CNNMoney",
                "title": "The U.S. could shoulder even more of the weight of global oil production in the future.",
                "likelihood": 2
            },
            {
                "end_year": "",
                "intensity": "",
                "sector": "Energy",
                "topic": "oil",
                "insight": "Nomura's Kwan Sees Big Data Among Game Changers in Oil, Gas Industry",
                "url": "http://www.rigzone.com/news/oil_gas/a/145268/Nomuras_Kwan_Sees_Big_Data_Among_Game_Changers_in_Oil_Gas_Industry/?all=HG2",
                "region": "",
                "start_year": 2016,
                "impact": "",
                "added": "July, 05 2016 02:16:13",
                "published": "June, 28 2016 00:00:00",
                "country": "",
                "relevance": 5,
                "pestle": "Environmental",
                "source": "Rigzone",
                "title": "Exploration in deepwater and ultra-deepwater is not expected anytime soon despite signs that oil prices could reach $70 per barrel by end of 2016.",
                "likelihood": ""
            },
            {
                "end_year": "",
                "intensity": 2,
                "sector": "Energy",
                "topic": "gas",
                "insight": "Nomura's Kwan Sees Big Data Among Game Changers in Oil, Gas Industry",
                "url": "http://www.rigzone.com/news/oil_gas/a/145268/Nomuras_Kwan_Sees_Big_Data_Among_Game_Changers_in_Oil_Gas_Industry/?all=HG2",
                "region": "",
                "start_year": "",
                "impact": "",
                "added": "July, 05 2016 02:16:13",
                "published": "June, 28 2016 00:00:00",
                "country": "",
                "relevance": 1,
                "pestle": "Social",
                "source": "Rigzone",
                "title": "Robots are being deployed in refineries and natural gas pipelines to investigate problems, toxic spills, oil spills or managing risk in hazardous areas.",
                "likelihood": 2
            },
            {
                "end_year": "",
                "intensity": 2,
                "sector": "",
                "topic": "",
                "insight": "Biogas buses are the green solution for cities",
                "url": "http://euinmyregion.blogactiv.eu/2016/07/04/biogas-buses-are-the-green-solution-for-cities/",
                "region": "Eastern Europe",
                "start_year": "",
                "impact": "",
                "added": "July, 05 2016 00:55:08",
                "published": "July, 04 2016 00:00:00",
                "country": "Poland",
                "relevance": 1,
                "pestle": "",
                "source": "Europe in My Region",
                "title": "Combustion of methane in buses could significantly improve air quality (especially in Poland).",
                "likelihood": 2
            },
            {
                "end_year": "",
                "intensity": 2,
                "sector": "Energy",
                "topic": "oil",
                "insight": "Supergelators Could Make for More Effective Oil Spill Cleanup",
                "url": "http://insights.globalspec.com/article/2880/supergelators-could-make-for-more-effective-oil-spill-cleanup?from_rss=1",
                "region": "",
                "start_year": "",
                "impact": "",
                "added": "July, 04 2016 02:06:29",
                "published": "June, 30 2016 00:00:00",
                "country": "",
                "relevance": 1,
                "pestle": "Environmental",
                "source": "IHS Engineering 360",
                "title": "Newly developed supergelators could help clean oil spills more efficiently and avoid the secondary pollution associated with some alternative cleanup methods.",
                "likelihood": 2
            },
            {
                "end_year": "",
                "intensity": 3,
                "sector": "Energy",
                "topic": "oil",
                "insight": "Advances in energy-storage technology, burgeoning electric car market driving lithium and graphite uptake",
                "url": "http://www.engineeringnews.co.za/article/advances-in-energy-storage-technology-burgeoning-electric-car-market-driving-lithium-and-graphite-uptake-2016-07-01",
                "region": "",
                "start_year": "",
                "impact": "",
                "added": "July, 04 2016 01:36:39",
                "published": "July, 01 2016 00:00:00",
                "country": "",
                "relevance": 1,
                "pestle": "Economic",
                "source": "Engineering News",
                "title": "The low price of oil is leading to questions about the projected high demand for EV sales.",
                "likelihood": 3
            },
            {
                "end_year": "",
                "intensity": 2,
                "sector": "Financial services",
                "topic": "oil",
                "insight": "Global oil demand to slow in 2016: IEA",
                "url": "http://www.cnbc.com/2015/07/10/global-oil-demand-to-slow-in-2016-iea.html",
                "region": "",
                "start_year": "",
                "impact": "",
                "added": "July, 03 2016 06:00:29",
                "published": "July, 10 2015 00:00:00",
                "country": "",
                "relevance": 1,
                "pestle": "Economic",
                "source": "CNBC ",
                "title": "A possible Greek exit from European Monetary Union (euro zone) could dampen not only Greek oil product demand, but also potentially curb deliveries across the continent if macro-economic activity were to weaken.",
                "likelihood": 2
            },
            {
                "end_year": 2016,
                "intensity": "",
                "sector": "Manufacturing",
                "topic": "growth",
                "insight": "IEA Says Oil Prices May Fall Even Further Before Supply Fades in 2016",
                "url": "http://www.bloomberg.com/news/articles/2015-07-10/iea-says-oil-price-may-fall-further-before-supply-fades-in-2016",
                "region": "Northern America",
                "start_year": "",
                "impact": "",
                "added": "July, 03 2016 06:00:25",
                "published": "July, 10 2015 00:00:00",
                "country": "United States of America",
                "relevance": 4,
                "pestle": "Economic",
                "source": "Bloomberg Business",
                "title": "U.S. production growth will slow to 300,000 barrels day next year from 900,000 a day in 2015.",
                "likelihood": ""
            },
            {
                "end_year": "",
                "intensity": 16,
                "sector": "",
                "topic": "growth",
                "insight": "IEA Says Oil Prices May Fall Even Further Before Supply Fades in 2016",
                "url": "http://www.bloomberg.com/news/articles/2015-07-10/iea-says-oil-price-may-fall-further-before-supply-fades-in-2016",
                "region": "",
                "start_year": 2016,
                "impact": "",
                "added": "July, 03 2016 06:00:25",
                "published": "July, 10 2015 00:00:00",
                "country": "",
                "relevance": 4,
                "pestle": "Economic",
                "source": "Bloomberg Business",
                "title": "Non-OPEC supply growth is expected to grind to a halt in 2016.",
                "likelihood": 4
            },
            {
                "end_year": 2016,
                "intensity": 3,
                "sector": "Retail",
                "topic": "export",
                "insight": "IEA Says Oil Prices May Fall Even Further Before Supply Fades in 2016",
                "url": "http://www.bloomberg.com/news/articles/2015-07-10/iea-says-oil-price-may-fall-further-before-supply-fades-in-2016",
                "region": "",
                "start_year": "",
                "impact": "",
                "added": "July, 03 2016 06:00:23",
                "published": "July, 10 2015 00:00:00",
                "country": "",
                "relevance": 1,
                "pestle": "Economic",
                "source": "Bloomberg Business",
                "title": "There will be no overall production growth outside the Organization of Petroleum Exporting Countries next year for the first time since 2008.",
                "likelihood": 3
            },
            {
                "end_year": "",
                "intensity": 2,
                "sector": "",
                "topic": "",
                "insight": "Greenhouse gas",
                "url": "https://en.wikipedia.org/wiki/Greenhouse_gas",
                "region": "World",
                "start_year": "",
                "impact": "",
                "added": "July, 03 2016 05:28:48",
                "published": "July, 03 2016 00:00:00",
                "country": "",
                "relevance": 1,
                "pestle": "",
                "source": "Wikipedia",
                "title": "Earth's surface temperature could exceed historical values as early as 2047.",
                "likelihood": 2
            }
        ]
        const svgRef = useRef();
        const [dimensions, setDimensions] = useState({ width: 800, height: 800, radius: 400 });
        const [filteredData, setFilteredData] = useState([]);
        const [value,setValue]=useState("intensity");
        const [details,setDetails]=useState({})
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
            .data(pie(filteredData))
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
      
        }, [filteredData, dimensions,value]);
      
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
                
            <button onClick={()=>changeData()} className=" m-1 px-7 py-3 bg-blue-600 text-white rounded">10</button>
            <button onClick={()=>changeData()} className=" m-1 px-7 py-3 bg-blue-600 text-white rounded">100</button>
            <button onClick={()=>changeData()} className=" m-1 px-7 py-3 bg-blue-600 text-white rounded">500</button>
            <button onClick={()=>changeData()} className=" m-1 px-7 py-3 bg-blue-600 text-white rounded">1000</button>
               
           
           
           <button onClick={()=>changeData()} className=" px-9 py-6 bg-green-600 text-white rounded">Next</button>
           
            
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