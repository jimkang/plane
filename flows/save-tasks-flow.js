var SaveTasksData = require('../save-tasks-data');
var renderSaveResult = require('../dom/render-save-result');

function SaveTasksFlow({ token, file }) {
  return saveTasksFlow;

  function saveTasksFlow({ tasks }) {
    var saveTasksData = SaveTasksData({
      gitRepoOwner: 'jimkang',
      repo: 'plane-data',
      token,
      githubFilePath: file
    });
    saveTasksData(tasks, renderSaveResult);
  }
}

module.exports = SaveTasksFlow;
