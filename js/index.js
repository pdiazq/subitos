var green_to_blue = d3.scale.linear()
  .domain([9, 50])
  .range(["#7AC143", "#00B0DD"])
  .interpolate(d3.interpolateLab);
var color = function(d) { return green_to_blue(d['Length of Day (hours)']); };
var parcoords = d3.parcoords()("#example")
  .color(color)
  .alpha(0.4);
// load csv file and create the chart
d3.csv('planet.csv', function(data) {
  parcoords
    .data(data)
    .render()
    .brushMode("1D-axes");  // enable brushing
  // create data table, row hover highlighting
  var grid = d3.divgrid();
  d3.select("#grid")
    .datum(data.slice(0,10))
    .call(grid)
    .selectAll(".row")
    .on({
      "mouseover": function(d) { parcoords.highlight([d]) },
      "mouseout": parcoords.unhighlight
    });
  // update data table on brush event
  parcoords.on("brush", function(d) {
    d3.select("#grid")
      .datum(d.slice(0,10))
      .call(grid)
      .selectAll(".row")
      .on({
        "mouseover": function(d) { parcoords.highlight([d]) },
        "mouseout": parcoords.unhighlight
      });
  });
});
