var renderEditTask = require('../dom/render-edit-task');
var showTasksFlow = require('./show-tasks-flow');
var randomId = require('idmaker').randomId;

function editTaskFlow({ token, task, accessor }) {
  renderEditTask({ task, onValueChange, onNewTask });

  function onValueChange({ fieldName, value, task }) {
    task[fieldName] = value;
    console.log('task update', task);
    showTasksFlow({
      token: token,
      updateOnlyThisTask: task,
      accessor
    });
  }

  function onNewTask() {
    var newTask = {
      id: randomId(8),
      importance: 0,
      urgency: 0,
      name: 'New task'
    };
    showTasksFlow({ incomingTasks: [newTask], token, accessor });
    editTaskFlow({ token, task: newTask, accessor });
  }
}

module.exports = editTaskFlow;
