var d3 = require('d3-selection');
var updateTaskSelection = require('./update-task-selection');

var taskRoot = d3.select('#board .tasks');
var saveButton = d3.select('#save-button');
var hideDoneCheckbox = d3.select('#hide-done-checkbox');

function renderTasks({
  taskData,
  onStartSave,
  accessor,
  onTaskClick,
  hideDone,
  onHideDone
}) {
  saveButton.on('click.save-all', null);
  saveButton.on('click.save-all', onSaveClick);

  hideDoneCheckbox.on('click.hide-done', null);
  hideDoneCheckbox.on('click.hide-done', onHideDoneClicked);
  hideDoneCheckbox.attr('checked', hideDone ? true : null);

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
  updateTaskSelection({ tasksToUpdate, accessor, hideDone });

  function onSaveClick() {
    onStartSave({ tasks: taskRoot.selectAll('.task').data() });
  }

  function onHideDoneClicked() {
    onHideDone(this.checked);
  }
}

module.exports = renderTasks;
