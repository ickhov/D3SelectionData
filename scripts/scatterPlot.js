// this is where your implementation for your scatter plot should go
function ScatterPlot(svg, data, updateFlowDiagram) {

    var margins = {
        top: 30,
        bottom: 30,
        left: 30,
        right: 30
    };

    this.svg = svg;

    // grab the bounding box of the container
    var boundingBox = svg.node().getBoundingClientRect();

    //  grab the width and height of our containing SVG
    var svgHeight = boundingBox.height;
    var svgWidth = boundingBox.width;

    // this is where your code should go to generate the flow diagram from the random data
    var x = d3.scaleLinear().range([0, svgWidth]);
    var y = d3.scaleLinear().range([svgHeight, 0]);

    var xAxis = this.svg.append("g")
      .attr("transform", "translate(" + margins.bottom + "," + (svgHeight - margins.bottom) + ")");

    var yAxis = this.svg.append("g")
      .attr("transform", "translate(" + margins.bottom + "," +  (-margins.bottom) + ")");

    var key = function(d) { return d.id; }

    this.draw = function(newData) {
      x.domain(d3.extent(newData, function(d) { return d.v0; }));
      y.domain(d3.extent(newData, function(d) { return d.v1; }));

      // Add the X Axis
      xAxis.call(d3.axisBottom(x));

        // Add the Y Axis
      yAxis.call(d3.axisLeft(y));

      var dots = this.svg.selectAll(".myDots")
        .data(newData, key);

      var entering = dots
        .enter()
        .append("circle")
        .classed("myDots", true);

      var update = function(selection, color) {
        selection
          .transition()
          .attr("transform", "translate(" + margins.bottom + "," +  (-margins.bottom) + ")")
          .attr("r", 5)
          .attr("cx", function(d) { return x(d.v0); })
          .attr("cy", function(d) { return y(d.v1); })
          .attr("fill", color);
      }

      update(entering, "green");
      update(dots, "orange");
      dots.exit().remove();
    }

    this.draw(data);
}
