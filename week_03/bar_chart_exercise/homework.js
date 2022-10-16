d3.csv("library_visits_jan22.csv").then(data => {
    for (let d of data) {
        d.num = +d.num //convert num to a number
    };

    const height = 800,
    width = 1200,
    margin = ({top: 25, right: 30, bottom: 50, left: 5});

    //chart is a CSS selector string that acts as a container and contains joined SVG elements
    let svg =
        d3.select("#chart").append("svg").attr("viewBox", [0,0,width, height]);


    /*get axis ready*/
    let x = d3.scaleBand() //scaleband divides range evenly between elements of the domain
        .domain(data.map(d => d.branch)) 
        .range([margin.left, width-margin.right]) 
        .padding(0.1);
    
    let y = d3.scaleLinear()
        .domain([0, d3.max(data, d=>d.num)]).nice() //loop through values, get max as upper limit of domain
        .range([height - margin.bottom, margin.top]);
    
    //build xAxis and yAxis through g to group SVG shapes
    const xAxis = g =>g 
        .attr("transform", `translate(0, ${height - margin.bottom+10})`) //apply transform as attribute of g
        .call(d3.axisBottom(x));
    
     const yAxis = g =>g /*create a group*/
        .attr("transform", `translate(${margin.left-10}, 0)`)
        .call(d3.axisLeft(y));
    
    //append a 'g' element to svg
    svg.append("g").style("font", "27px times").call(xAxis)
    svg.append("g").style("font", "27px times").call(yAxis) 


    /*plot bar chart*/
    let bar = svg.selectAll(".bar")
        .append("g")
        .data(data)
        .join("g")
        .attr("class", "bar");
    
    bar.append("rect")
        //attempt to change bar color depending on value
        .attr("fill", function(d) {
            if (d.num < 1500) {
                return 'lightgray';
            } else if (d.num >= 1500) {
                return 'steelblue'
            }
        })
        .attr("x", d => x(d.branch))
        .attr("width", x.bandwidth())
        .attr("y", d => y(d.num))
        .attr("height", d => y(0) - y(d.num))

})