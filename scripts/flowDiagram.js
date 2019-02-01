// this is where your implementation for your flow diagram should go
function FlowDiagram(svg, data) {
    this.svg = svg;

    // grab the bounding box of the container
    var boundingBox = svg.node().getBoundingClientRect();

    //  grab the width and height of our containing SVG
    var svgHeight = boundingBox.height;
    var svgWidth = boundingBox.width;

    var xPos = ["enter", "update", "exit"];

    // this is where your code should go to generate the flow diagram from the random data
    var bandScale = d3.scaleBand()
      .domain(xPos)
      .range([0, svgWidth]);

    var key = function(d) { return d.id; }

    var prevExit = undefined;

    this.draw = function(newData) {
      if (prevExit != undefined)
        prevExit.remove();
      // y position for texts
      var pos = 0;

      // reference the texts for new enter
      var texts = this.svg.selectAll(".myText")
        .data(newData, key);

      // variable for "enter" and "update" data
      var entering = texts
        .enter()
        .append("text")
        .classed("myText", true);

      // update function
      var update = function(selection, type, color) {
        selection
          .transition()
          .attr("x", bandScale(type))
          .attr("fill", color)
          .attr("y", function() {
            pos = pos + 15;
            return pos;
          })
          .text(function(d) {return d.name;});
      }

      update(entering, xPos[0], "green");
      pos = 0;
      update(texts, xPos[1], "orange");
      pos = 0;
      update(texts.exit(), xPos[2], "red");
      prevExit = texts.exit();
      pos = 0;
    }

    this.draw(data);

}
