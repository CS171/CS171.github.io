// Tree map for malaria parasites
// citation: http://bl.ocks.org/d3noob/8375092  <-- reference

// Create SVG drawing space
var margin = {top: 100, right: 20, bottom: 20, left: 20},
    w = 700 - margin.right - margin.left,
    h = 700 - margin.top - margin.bottom;

var svgChart = d3.select("#tree-area").append("svg")
    .attr("width", w + margin.right + margin.left)
    .attr("height", h + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Declare variables
var i = 0,
    duration = 750,
    root;

// Create tree layout
var tree = d3.layout.tree()
    .size([h, w]);

// Create the top down tree structure
var diagonal = d3.svg.diagonal()
    .projection(function(d) { return [d.x, d.y]; });

// Read the data file
d3.json("data/malaria-parasites.json", function(error, flare) {
    if (error) throw error;

    // Set the root node
    root = flare[0];
    root.x0 = 0;
    root.y0 = h / 2;

    // Uncomment the following code segment to collapse all the nodes by default
    // I choose to expand full tree structure, it is good idea to collapse for large data set
    /*
     function collapse(d) {
     if (d.children) {
     d._children = d.children;
     d._children.forEach(collapse);
     d.children = null;
     }
     }

     root.children.forEach(collapse);
     */

    // Update the tree layout
    update(root);

});

function update(source) {

    // Compute the new tree layout.
    var nodes = tree.nodes(root).reverse(),
        links = tree.links(nodes);

    // Normalize for fixed-depth.
    nodes.forEach(function(d) { d.y = d.depth * 250; });

    // Update the nodes…
    var node = svgChart.selectAll("g.node")
        .data(nodes, function(d) { return d.id || (d.id = ++i); });

    // Enter any new nodes at the parent's previous position.
    var nodeEnter = node.enter().append("g")
        .attr("class", "node")
        .attr("transform", function(d) { return "translate(" + source.x0 + "," + source.y0 + ")"; })
        .on("click", click);

    nodeEnter.append("circle")
        .attr("r", 1e-6)
        .style("fill", function(d) { return d._children ? "#FF9B08" : "#fff"; });

    // based on the tree direction text display can be at the top or side of each node
    /*
     nodeEnter.append("text")
     .attr("x", function(d) { return d.children || d._children ? -13 : 13; })
     .attr("dy", ".45em")
     .attr("text-anchor", function(d) { return d.children || d._children ? "end" : "start"; })
     .text(function(d) { return d.name; })
     .style("fill-opacity", 1e-6);
     */

    nodeEnter.append("text")
        .attr("y", function(d) { return d.children || d._children ? -18 : 18; })
        .attr("dy", ".35em")
        .attr("text-anchor", "middle")
        .text(function(d) { return d.name; })
        .style("fill-opacity", 1e-6);

    // Transition nodes to their new position.
    var nodeUpdate = node.transition()
        .duration(duration)
        .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

    nodeUpdate.select("circle")
        .attr("r", 10)
        .style("fill", function(d) { return d._children ? "#FF9B08" : "#fff"; });

    nodeUpdate.select("text")
        .style("fill-opacity", 1);

    // Transition exiting nodes to the parent's new position.
    var nodeExit = node.exit().transition()
        .duration(duration)
        .attr("transform", function(d) { return "translate(" + source.x + "," + source.y + ")"; })
        .remove();

    nodeExit.select("circle")
        .attr("r", 1e-6);

    nodeExit.select("text")
        .style("fill-opacity", 1e-6);

    // Update the links…
    var link = svgChart.selectAll("path.link")
        .data(links, function(d) { return d.target.id; });

    // Enter any new links at the parent's previous position.
    link.enter().insert("path", "g")
        .attr("class", "link")
        .attr("d", function(d) {
            var o = {x: source.x0, y: source.y0};
            return diagonal({source: o, target: o});
        });

    // Transition links to their new position.
    link.transition()
        .duration(duration)
        .attr("d", diagonal);

    // Transition exiting nodes to the parent's new position.
    link.exit().transition()
        .duration(duration)
        .attr("d", function(d) {
            var o = {x: source.x, y: source.y};
            return diagonal({source: o, target: o});
        })
        .remove();

    // Stash the old positions for transition.
    nodes.forEach(function(d) {
        d.x0 = d.x;
        d.y0 = d.y;
    });

}

// Toggle children on click.
function click(d) {
    if (d.children) {
        d._children = d.children;
        d.children = null;
    } else {
        d.children = d._children;
        d._children = null;
    }
    update(d);
}