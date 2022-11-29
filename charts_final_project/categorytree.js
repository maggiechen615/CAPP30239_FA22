let data1 = 
{
  "name": "Food Category",
  "children": [
    { "name": "Sausages, Hotdogs & Brats" },
    { "name": "Frozen Patties & Burgers" },
    {
      "name": "Other Meats",
      "children": [
        { "name": "112.0 serving_size counts: 1768" },
        { "name": "151.0 serving_size counts: 100" }
      ]
    },
    { "name": "Poultry, Chicken & Turkey" }
  ]
};

let margin1 = { top: 70, right: 0, bottom: 0, left: 150 },
  width1 = 860 - margin1.left - margin1.right,
  height1 = 600 - margin1.top - margin1.bottom;

let svg1 = d3.select("#tree").append("svg")
  .attr("width", width1 + margin1.left + margin1.right) //OH take-away: js needs the keyword 'width' here
  .attr("height", height1 + margin1.top + margin1.bottom);

let g = svg1.append("g")
  .attr("transform", `translate(${margin1.left},${margin1.top})`);

let treeGraph = d3.tree()
  .size([width1/2, height1/2+100]);

let nodeData = d3.hierarchy(data1);

console.log(nodeData)

let nodes = treeGraph(nodeData);

console.log(nodes.links())

let link = g.selectAll('.link')
  .data(nodes.links())
  .join('path')
  .attr("fill", "#cccccc")
  .attr('d', d3.linkHorizontal()
    .x(d => d.y)
    .y(d => d.x)
  )
  .attr('class', 'link');

let node = g.selectAll('.node')
  .data(nodes.descendants())
  .join('g')
  .attr('transform', d => `translate(${d.y},${d.x})`);

node.append('circle')
  .attr('r', 5)
  .attr("fill", "#8c96c6")

node.append('text')
  .text(d => d.data.name)
  .attr('x', 5)
  .attr('dy', '.10em');