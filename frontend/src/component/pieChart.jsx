import * as d3 from "d3";
import '../index.css'
import { useEffect,useRef } from "react";

export default function PieChart(){
    const svgRef=useRef();
const data=[{
    name:"chrome",
    description:"it a google browser",
    value:"30",
},
{
    name:"Brave",
    description:"it a google browser",
    value:"60",
},
{
    name:"safari",
    description:"it a google browser",
    value:"10",
},
{
    name:"firefox",
    description:"it a google browser",
    value:"50",
},
{
    name:"edge",
    description:"it a google browser",
    value:"70",
},
{
    name:"tor",
    description:"it a google browser",
    value:"20",
}

]

useEffect(()=>{
    const svg= d3.select(svgRef.current);
   const width=400
   const  height=400
    const radius=Math.min(width,height)/2;
    
    
    
    const color = d3.scaleOrdinal(d3.schemeCategory10);
    const pie=d3.pie().value(d=>d.value);
    
    const arc=d3.arc().outerRadius(radius).innerRadius(0);

    svg.attr("width", width).attr("height", height);

    const g= svg.append('g').attr('transform', `translate(${width/2},${height/2})`);
    const pies=g.selectAll('.arc').data(pie(data)).enter().append('g').attr('class','arc');
   
    pies.append("path")
            .attr("d", arc)
            .attr("fill", d => color(d.data.name))
            .on("mouseover", function(event, d) {
                d3.select(this).style("opacity", 0.7);
                tooltip.style("display", null)
                    .html(`<strong>${d.data.name}</strong><br/>Value: ${d.data.value}<br/>${d.data.description}`);
            })
            .on("mousemove", function(event) {
                tooltip.style("top", `${event.pageY - 10}px`)
                    .style("left", `${event.pageX + 10}px`);
            })
            .on("mouseout", function() {
                d3.select(this).style("opacity", 1);
                tooltip.style("display", "none");
            });

        pies.append("text")
            .attr("transform", d => `translate(${arc.centroid(d)})`)
            .attr("dy", "0.35em")
            .style("text-anchor", "middle");
            

        const tooltip = d3.select("body").append("div")
            .attr("class", "tooltip")
            .style("position", "absolute")
            .style("display", "none")
            .style("background", "rgba(0, 0, 0, 0.8)")
            .style("color", "white")
            .style("padding", "5px")
            .style("border-radius", "5px")
            .style("pointer-events", "none");

    }, [data]);
    


return(
    <>
    <div className="relative h-screen">
    <svg ref={svgRef}className="bg-gray-200 absolute left-[10%] top-[5%]"></svg>
    </div>
    
    </>
)
}