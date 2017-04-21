/*
    Vertical Treeview

    Used to show the tree of malaria parasites.

    Some help was found online at:
    http://bl.ocks.org/d3noob/8326869
*/

(function(cs171) {

    var translate = cs171.translate;

    var margin = {
        top: 0,
        right: 40,
        bottom: 40,
        left: 40
    };

    var levelHeight = 170;
    var leftAdjust = -80;
    var outerWidth = 1000;
    var outerHeight = 3 * levelHeight;
    var width = outerWidth - margin.left - margin.right;
    var height = outerHeight - margin.top - margin.bottom;

    var svg = d3.select("#mosquito-chart").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", translate(margin.left - leftAdjust, margin.top));

    cs171.treeChart = function(parasites) {
        var treeData = parasites;
        var i = 0;
        var tree = d3.layout.tree()
            .size([width, height]);

        var diagonal = d3.svg.diagonal()
            .projection(function(d) {
                return [d.x, d.y];
            });

        root = treeData[0];

        updateTreeChart(root);

        function updateTreeChart() {
            var nodes = tree.nodes(root).reverse();
            var links = tree.links(nodes);

            nodes.forEach(function(d) {
                d.y = d.depth * levelHeight;
            });

            // Uses a counter to keep track of nodes without ID
            // PS: Not sure why this is necessary, because the data
            // seems to have `id` everywhere.
            var node = svg.selectAll("g.node")
                .data(nodes, function(d) {
                    return d.id || (d.id = ++i);
                });

            var nodeEnter = node.enter().append("g")
                .attr("class", "node")
                .attr("transform", function(d) {
                    return "translate(" + d.x + "," + d.y + ")";
                });

          // Append images
          var images = nodeEnter.append("svg:image")
                .attr("xlink:href", function(d) { return d.img;})
                .attr("x", function(d) { return -40;})
                .attr("height", 80)
                .attr("width", 80);

            nodeEnter.append("text")
                .attr("y", function(d) {

                    // The last row of labels needs "positive" padding, that
                    // is to say padding towards the bottom. When the node
                    // has no children -- it's at the bottom of that subtree.
                    // In this case I want the labels to show under the
                    // images of the parasites.

                    return d.children ? -10 : 100;
                })
                .attr("text-anchor", function(d) {
                    return d.children ? "middle" : "middle";
                })
                .text(function(d) {
                    return (d.depth > 0) ? d.name : '';
                });

            var link = svg.selectAll("path.link")
                .data(links, function(d) {
                    return d.target.id;
                });

            link.enter().insert("path", "g")
                .attr("class", "link")
                .attr("d", diagonal);
        }
    };

})(window.d3.cs171);