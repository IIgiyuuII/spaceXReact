import * as d3 from "d3";
import geoData from "../geo.json";
import {useRef, useEffect} from "react";

function Map({ launchpads, hoveredPadId }) {

    const containerRef = useRef(null);

    const width = 1000;
    const height = 600;
    const margin = { top: 20, right: 20, bottom: 20, left: 100 };

    useEffect(() => {
        if (!launchpads || launchpads.length === 0) return;

       
        d3.select(containerRef.current).selectAll("*").remove();

        const svg = d3.select(containerRef.current)
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom);

        const g = svg.append("g")
            .attr("transform", `translate(${margin.left}, ${margin.top})`);

        const projection = d3.geoMercator()
            .scale(70)
            .center([0, 20])
            .translate([width / 2 - margin.left, height / 2 - margin.top]);

        // Мировая карта
        g.selectAll("path")
            .data(geoData.features)
            .enter()
            .append("path")
            .attr("d", d3.geoPath().projection(projection))
            .attr("fill", "#bcd9ff")
            .attr("stroke", "#fff")
            .attr("stroke-width", 0.7)
            .style("opacity", 0.9);

        // ТОЧКИ launchpads
        g.selectAll("circle")
            .data(launchpads)
            .enter()
            .append("circle")
            .attr("cx", d => projection([d.longitude, d.latitude])[0])
            .attr("cy", d => projection([d.longitude, d.latitude])[1])
            .attr("r", 6)
            .attr("fill", d => {
                // Подсвечиваем точку если она hovered
                if (hoveredPadId === d.id) {
                    return "#ffeb3b"; // Желтый цвет для подсветки
                }
                return d.status === "active" ? "#4caf50" : "#e74c3c";
            })
            .attr("stroke", d => hoveredPadId === d.id ? "#000" : "#000")
            .attr("stroke-width", d => hoveredPadId === d.id ? 2 : 1)
            .attr("class", d => `launchpad-point ${hoveredPadId === d.id ? "hovered" : ""}`);

        // Зум
        const zoom = d3.zoom()
            .scaleExtent([1, 8])
            .on("zoom", (event) => {
                g.attr("transform", event.transform);
            });

        svg.call(zoom);

    }, [launchpads, hoveredPadId]); // Добавляем hoveredPadId в зависимости

    return <div ref={containerRef} className="mapContainer map"></div>;
}

export { Map };