var handleError = require('handle-error-web');
var renderEditTask = require('../dom/render-edit-task');

function editTaskFlow({ token, task }) {
  renderEditTask({ task, onValueChange });

  function onValueChange({ fieldName, value, task }) {
    task[fieldName] = value;
    console.log('task update', task);
  }
}

module.exports = editTaskFlow;
