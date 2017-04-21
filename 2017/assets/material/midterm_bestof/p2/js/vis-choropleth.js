/*
    Choropleth map of Africa

    Help found online through Mike Bostocks examples, e.g

*/
(function(cs171) {
    "use strict";

    var translate = d3.cs171.translate;
    var pluck = d3.cs171.pluck;
    var map = _.map;
    var template = _.template;
    var int =  d3.cs171.int;

    var margin = {
        top: 40,
        right: 40,
        bottom: 40,
        left: 40
    };

    var outerWidth = 750;
    var outerHeight = 800;
    var width = outerWidth - margin.left - margin.right;
    var height = outerHeight - margin.top - margin.bottom;

    var svg = d3.select("#choropleth-chart").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", translate(margin.left, margin.top));

    // Formats a number according to the browser locale, or returns
    // n/a for NaN (not a number) values.
    function formatNumber(n) {
        return Number.isNaN(n) ? "n/a" : n.toLocaleString();
    }

    // Maps the attribute names with labels (to dipslay in the combo box)
    var attributes = {
        cases: "Reported cases",
        risk: "% of population at risk",
        highRisk: "% of population at high risk",
        suspected: "Suspected cases",
        population: "Population"
    };

    $('#attribute-selector').append(Object.keys(attributes).map(function(k) {
        return "<option value='" + k + "'>" + attributes[k] + "</option>";
    }));


    // Returns the value of attribute in the country object. If the attrbute
    // doesn't exist, or the country isn't found in the dataset, returns null.
    var getAttributeValue = function(datasetByCountry, attribute, countryCode) {
        var country = datasetByCountry[countryCode];

        if (country && (Number.isNaN(country[attribute]) === false)) {
            return country[attribute];
        }
        else {
            return null;
        }
    }

    // Main color scale
    var colors = ["#fff7ec","#fee8c8","#fdd49e","#fdbb84","#fc8d59","#ef6548","#d7301f","#b30000","#7f0000"];

    // Returns the country code from topology properites
    function countryCode(d) {
        return d.properties.adm0_a3_is;
    }

    cs171.choroplethChart = function (africa, dataset, datasetByCountry, parasites, attribute) {

        var features = topojson.feature(africa, africa.objects.collection).features;
        var projection = d3.geo.conicConformal().scale(600).translate([120, 320]);
        var attributeValue = getAttributeValue.bind(undefined, datasetByCountry);

        // Main function that renders and updates the chart based on the
        // attribute selected in the combo box.
        function onAttributeChange(attribute) {
            var valueForCountry = attributeValue.bind(undefined, attribute);
            var attributeLabel = attributes[attribute];
            var selectValue = pluck(attribute);
            var path = d3.geo.path().projection(projection);

            var hasValidValue = function(d) {
                return valueForCountry(countryCode(d)) !== null;
            };

            var tip = d3.tip()
                .attr("class", "d3-tip")
                .direction("n")
                .offset(function() {
                    return [this.getBBox().height / 2, 0]
                });

            svg.call(tip);

            tip.html(function(d) {
                var data = datasetByCountry[countryCode(d)];
                var val = valueForCountry(countryCode(d));
                if (data && val !== null) {
                    return "<strong>" + data.country + "</strong><br>"
                        + attributeLabel + ": " + val.toLocaleString();
                }
                else {
                    return "No data available"
                }
            });

            var values = dataset.map(selectValue);
            var min = d3.min(values);
            var max = d3.max(values);
            var colorscale = d3.scale.quantile()
                .domain([min, max])
                .range(d3.range(9));

            svg.append("g")
                .selectAll("path")
                .data(features)
                .enter().append("path")
                .attr("stroke", "black")
                .attr("stroke-width", 1)
                .attr("stroke-dasharray", "1, 4")
                .attr("fill", function(d) {
                    var val = valueForCountry(countryCode(d));
                    var color = colors[colorscale(val)];
                    return val === null ? "#eee" : color;
                })
                .attr("d", path)
                .on('mouseenter', tip.show)
                .on('mouseout', tip.hide);

            // Legend
            var legendSize = 30;

            var quantiles = colorscale.quantiles();
            quantiles = [0].concat(quantiles);

            svg.selectAll("g.legend").remove();

            var legend = svg.selectAll("g.legend")
                .data(quantiles, function(n){ return n; })

            legend = legend.enter().append("g")
                .attr("transform", function(d, i) {
                    return translate(0, (i * legendSize) + 400);
                })
                .attr("class", "legend");

            legend.append("rect")
                .attr("width", legendSize)
                .attr("height", legendSize)
                .attr("fill", function(d, i) {
                    return colors[i];
                });

            legend.append("text")
                .attr("class", "legend-label")
                .attr("x", legendSize + 10)
                .attr("text-anchor", "start")
                .attr("alignment-baseline", "middle")
                .attr("y", legendSize / 2)
                .text(function(d, i) {
                    var from = Math.round(quantiles[i]).toLocaleString()
                    var to = Math.round(i === 8 ? max : quantiles[i+1]).toLocaleString();
                    return from + " - " + to;
                })

        }

        // Initial rendering for the default selected attribute (cases)
        onAttributeChange(attribute);

        // Update the visualization when the combo selection changes
        $('#attribute-selector').on("change", function(e) {
            onAttributeChange($(e.target).val());
        });
    }

})(window.d3.cs171);