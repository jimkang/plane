var getTaskTransform = require('./get-task-transform');
var getColor = require('./get-color');

function updateTaskSelection({ tasksToUpdate, accessor }) {
  tasksToUpdate.attr('id', accessor());
  tasksToUpdate.select('text').text(accessor('name'));
  tasksToUpdate.select('circle').attr('fill', getColor);
  tasksToUpdate.attr('transform', getTaskTransform);
}

module.exports = updateTaskSelection;
