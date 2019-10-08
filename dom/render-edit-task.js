var d3 = require('d3-selection');
var addButton = d3.select('#add-button');
var accessor = require('accessor')();

var taskForm = d3.select('#task-form');
var slidersRoot = taskForm.select('#sliders-root');
var taskNameField = taskForm.select('.task-name-field');
var doneCheckbox = taskForm.select('.done-check-box');
var doneDate = taskForm.select('.done-date');

// var textFieldNames = ['name'];
var sliderFieldNames = ['importance', 'urgency'];

function renderEditTask({
  task,
  onValueChange,
  onNewTask,
  shouldShowForm = false
}) {
  addButton.on('click.add-task', null);
  addButton.on('click.add-task', onAddClick);
  taskNameField.on('change.task-name', null);
  taskNameField.on('change.task-name', onNameChange);

  if (task) {
    taskNameField.node().value = task.name;
  }

  doneCheckbox.on('click.is-done-task', null);
  doneCheckbox.on('click.is-done-task', onDoneCheckboxClick);
  if (task) {
    doneCheckbox.attr('checked', task.isDone ? true : null);
  }

  doneDate.on('change.task-done-date', null);
  doneDate.on('change.task-done-date', onDoneDateChange);
  if (task) {
    doneDate.attr('value', task.dateDone ? task.dateDone : null);
  }

  // TODO: concat custom field names to sliderFieldNames;
  var fields = slidersRoot
    .selectAll('.form-pair')
    .data(sliderFieldNames, accessor('identity'));
  fields.exit().remove();
  var newFields = fields
    .enter()
    .append('div')
    .classed('form-pair', true);
  newFields.append('label');
  newFields
    .append('div')
    .classed('value-container', true)
    .append('input')
    .classed('slider', true)
    .attr('type', 'range')
    .attr('min', -100)
    .attr('max', 100);

  newFields.append('span').classed('value-text', true);

  var fieldsToUpdate = newFields.merge(fields);
  fieldsToUpdate.select('label').text(getFieldLabel);
  fieldsToUpdate.select('.value-text').text(getFieldValue);

  var slidersToUpdate = fieldsToUpdate.select('.slider');
  slidersToUpdate.attr('value', getFieldValue).on('change.slider', null);
  slidersToUpdate.on('change.slider', onSliderChange);

  if (shouldShowForm) {
    showTaskForm();
  }

  function getFieldValue(fieldName) {
    return task ? +task[fieldName] : '';
  }

  function onSliderChange(fieldName) {
    d3.select(this.parentNode.parentNode)
      .select('.value-text')
      .text(this.value);
    onValueChange({ fieldName, value: this.value, task });
  }

  function onNameChange() {
    onValueChange({
      fieldName: 'name',
      value: taskNameField.node().value,
      task
    });
  }

  function onDoneCheckboxClick() {
    onValueChange({
      fieldName: 'isDone',
      value: this.checked,
      task
    });
  }

  function onDoneDateChange() {
    onValueChange({
      fieldName: 'dateDone',
      value: doneDate.node().value,
      task
    });
  }

  function onAddClick() {
    onNewTask();
    showTaskForm();
  }
}

function getFieldLabel(fieldName) {
  return fieldName.charAt(0).toUpperCase() + fieldName.slice(1) + ':';
}

function showTaskForm() {
  taskForm.classed('hidden', false);
}

module.exports = renderEditTask;
