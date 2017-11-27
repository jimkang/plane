var scale = require('d3-scale');

const boardWidth = 1000;
const boardHeight = 1000;

var xScale = scale
  .scaleLinear()
  .domain([-100, 100])
  .range([0, boardWidth]);

var yScale = scale
  .scaleLinear()
  .domain([-100, 100])
  .range([boardHeight, 0]);

// TODO: Make dimensions flexible.
function getTaskTransform(task) {
  return (
    'translate(' + xScale(task.urgency) + ', ' + yScale(task.importance) + ')'
  );
}

module.exports = getTaskTransform;
