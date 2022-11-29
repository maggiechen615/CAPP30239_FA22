d3.json('category.json').then((data) => {
    const height = 500,
      width = 400,
      innerRadius = 125,
      outerRadius = 175, 
      labelRadius = 200;
  
    const arcs = d3.pie().value(d => d.count)(data);
    const arc = d3.arc().innerRadius(innerRadius).outerRadius(outerRadius);
    const arcLabel = d3.arc().innerRadius(labelRadius).outerRadius(labelRadius);
  
    const svg = d3.select("#ring")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [-width /1.8, -height / 2, width, height])
      .attr("style", "max-width: 100%; height: auto; height: intrinsic;");
  
    svg.append("g")
      .attr("stroke", "white")
      .attr("stroke-width", 2)
      .attr("stroke-linejoin", "round")
      .selectAll("path")
      .data(arcs)
      .join("path")
      .attr("fill", (d, i) => ["#8c96c6","#c2a5cf","#f7f7f7","#a6dba0","#008837"][i])
      .attr("d", arc);
  
    svg.append("g")
      .attr("font-size", 12)
      .attr("text-anchor", "middle")
      .selectAll("text")
      .data(arcs)
      .join("text")
      .attr("transform", d => `translate(${arcLabel.centroid(d)})`)
      .selectAll("tspan")
      .data(d => {
        return [d.data.category, d.data.count];
      })
      .join("tspan")
      .attr("x", 0)
      .attr("y", (d, i) => `${i * 2}em`)
      .attr("font-weight", (d, i) => i ? null : "bold")
      .text(d => d);
  
    svg.append("text")
      .attr("font-weight", "bold")
      .attr("text-anchor", "middle")
      .attr("alignment-baseline", "middle")
      .text("Counts of categories")
      .style("font-size", 15);
  });
