var d3 = require('d3-selection');
var taskRoot = d3.select('#board .tasks');
var accessor = require('accessor')();
var saveButton = d3.select('#save-button');

function renderTasks({ taskData, onStartSave }) {
  saveButton.on('click', onSaveClick);

  var tasks = taskRoot.selectAll('.task').data(taskData, accessor());

  tasks.exit().remove();

  var newTasks = tasks
    .enter()
    .append('g')
    .classed('task', true);
  newTasks.append('circle').attr('r', '3');
  newTasks.append('text');

  var tasksToUpdate = newTasks.merge(tasks);
  tasksToUpdate.select('text').text(accessor('name'));
  tasksToUpdate.attr('transform', getTaskTransform);

  function onSaveClick() {
    onStartSave({ tasks: taskRoot.selectAll('.task').data() });
  }
}

function getTaskTransform(task) {
  return 'translate(' + (task.u * 50 + 500) + ', ' + (-task.i * 50 + 500) + ')';
}

module.exports = renderTasks;
