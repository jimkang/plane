var renderEditTask = require('../dom/render-edit-task');
var randomId = require('idmaker').randomId;

function EditTaskFlow({ flowsForIds }) {
  return editTaskFlow;

  function editTaskFlow({ task, shouldShowForm }) {
    renderEditTask({ task, onValueChange, onNewTask, shouldShowForm });

    function onValueChange({ fieldName, value, task }) {
      // TODO: Do this update in a tasks store.
      task[fieldName] = value;
      console.log('task update', task);
      flowsForIds['showTasks']({
        updateOnlyThisTask: task
      });
    }

    function onNewTask() {
      var newTask = {
        id: randomId(8),
        importance: 0,
        urgency: 0,
        name: 'New task'
      };
      flowsForIds['showTasks']({
        incomingTasks: [newTask]
      });
      flowsForIds['editTask']({
        task: newTask
      });
    }
  }
}

module.exports = EditTaskFlow;
