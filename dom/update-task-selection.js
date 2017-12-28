var getTaskTransform = require('./get-task-transform');
var getColor = require('./get-color');

function updateTaskSelection({ tasksToUpdate, accessor, hideDone }) {
  tasksToUpdate.attr('id', accessor());
  tasksToUpdate.select('text').text(accessor('name'));
  tasksToUpdate.select('circle').attr('fill', getColor);
  tasksToUpdate.attr('transform', getTaskTransform);
  if (hideDone === 'yes') {
    tasksToUpdate.attr('opacity', getOpacity);
  }

  function getOpacity(task) {
    if (hideDone === 'yes' && task.isDone) {
      return 0;
    } else {
      return 1;
    }
  }
}

module.exports = updateTaskSelection;
