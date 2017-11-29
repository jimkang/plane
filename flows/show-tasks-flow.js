var renderTasks = require('../dom/render-tasks');
var renderUpdateToSingleTask = require('../dom/render-update-to-single-task');

// TODO: Don't store this in a flow.
var tasks = [];

// Unfortunately tricky dual-mode thing going on here: If updateOnlyTask
// is there, it updates that tasks cache and asks just that one to be rendered.
// If not, it renders all of the tasks.
function ShowTasksFlow({ accessor, flowsForIds }) {
  return showTasksFlow;

  function showTasksFlow({ updateOnlyThisTask, incomingTasks }) {
    if (incomingTasks) {
      tasks = tasks.concat(incomingTasks);
    }
    var updateTaskIndex = -1;

    if (updateOnlyThisTask) {
      tasks.some(taskIndexMatches);
      if (updateTaskIndex > -1) {
        tasks[updateTaskIndex] = updateOnlyThisTask;
        renderUpdateToSingleTask({ task: updateOnlyThisTask, accessor });
      }
    } else {
      renderTasks({ taskData: tasks, onStartSave, accessor, onTaskClick });
    }

    function taskIndexMatches(task, i) {
      if (task.id === updateOnlyThisTask.id) {
        updateTaskIndex = i;
        return true;
      }
    }
  }

  function onStartSave({ tasks }) {
    flowsForIds['saveTasks']({ tasks });
  }

  function onTaskClick(task) {
    flowsForIds['editTask']({
      task,
      shouldShowForm: true
    });
  }
}

module.exports = ShowTasksFlow;
