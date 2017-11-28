var colors = require('./colors.json');
var probable = require('probable');

var displayColorsForIds = {};

// Gets a random color for each id, but always returns the same color for
// each id.
function getColor(task) {
  var color;
  if (task.isDone) {
    color = 'gray';
  } else {
    color = displayColorsForIds[task.id];
    if (!color) {
      color = probable.pickFromArray(colors);
      displayColorsForIds[task.id] = color;
    }
  }
  return color;
}

module.exports = getColor;
