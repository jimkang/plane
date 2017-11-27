var renderEditTask = require('../dom/render-edit-task');
var randomId = require('idmaker').randomId;

function editTaskFlow({
  token,
  task,
  accessor,
  shouldShowForm,
  showTasksFlow,
  saveTasksFlow
}) {
  renderEditTask({ task, onValueChange, onNewTask, shouldShowForm });

  function onValueChange({ fieldName, value, task }) {
    // TODO: Do this update in a tasks store.
    task[fieldName] = value;
    console.log('task update', task);
    showTasksFlow({
      token: token,
      updateOnlyThisTask: task,
      accessor,
      editTaskFlow,
      saveTasksFlow
    });
  }

  function onNewTask() {
    var newTask = {
      id: randomId(8),
      importance: 0,
      urgency: 0,
      name: 'New task'
    };
    showTasksFlow({
      incomingTasks: [newTask],
      token,
      accessor,
      editTaskFlow,
      saveTasksFlow
    });
    editTaskFlow({
      token,
      task: newTask,
      accessor,
      showTasksFlow,
      saveTasksFlow
    });
  }
}

module.exports = editTaskFlow;
