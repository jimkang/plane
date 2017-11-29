var SaveTasksData = require('../save-tasks-data');
var handleError = require('handle-error-web');
var sb = require('standard-bail')();

function SaveTasksFlow({ token, file }) {
  return saveTasksFlow;

  function saveTasksFlow({ tasks }) {
    var saveTasksData = SaveTasksData({
      gitRepoOwner: 'jimkang',
      repo: 'eisenvectors-data',
      token,
      githubFilePath: file
    });
    saveTasksData(tasks, sb(renderSaveResult, handleError));
  }

  function renderSaveResult(body) {
    console.log('Save result:', body);
  }
  // TODO: Render saved message.
}

module.exports = SaveTasksFlow;
