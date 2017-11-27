var d3 = require('d3-selection');
var taskRoot = d3.select('#board .tasks');
var updateTaskSelection = require('./update-task-selection');

function renderUpdateToSingleTask({ task, accessor }) {
  var taskToUpdate = taskRoot.select('#' + task.id).datum(task);
  updateTaskSelection({ tasksToUpdate: taskToUpdate, accessor });
}

module.exports = renderUpdateToSingleTask;
