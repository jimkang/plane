var getTaskTransform = require('./get-task-transform');

function updateTaskSelection({ tasksToUpdate, accessor }) {
  tasksToUpdate.attr('id', accessor());
  tasksToUpdate.select('text').text(accessor('name'));
  tasksToUpdate.attr('transform', getTaskTransform);
}

module.exports = updateTaskSelection;
