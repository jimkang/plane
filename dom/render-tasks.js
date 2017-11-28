var d3 = require('d3-selection');
var updateTaskSelection = require('./update-task-selection');

var taskRoot = d3.select('#board .tasks');
var saveButton = d3.select('#save-button');

function renderTasks({ taskData, onStartSave, accessor, onTaskClick }) {
  saveButton.on('click.save-all', null);
  saveButton.on('click.save-all', onSaveClick);

  var tasks = taskRoot.selectAll('.task').data(taskData, accessor());

  tasks.exit().remove();

  var newTasks = tasks
    .enter()
    .append('g')
    .classed('task', true);
  newTasks.append('circle').attr('r', '10');
  newTasks.append('text');
  newTasks.on('click', onTaskClick);

  var tasksToUpdate = newTasks.merge(tasks);
  updateTaskSelection({ tasksToUpdate, accessor });

  function onSaveClick() {
    onStartSave({ tasks: taskRoot.selectAll('.task').data() });
  }
}

module.exports = renderTasks;
