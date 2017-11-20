var SaveTasksData = require('../save-tasks-data');
var handleError = require('handle-error-web');
var sb = require('standard-bail')();

function saveTasksFlow({ tasks, token }) {
  var saveTasksData = SaveTasksData({
    gitRepoOwner: 'jimkang',
    repo: 'eisenvectors-data',
    token,
    githubFilePath: 'life.ndjson'
  });
  saveTasksData(tasks, sb(renderSaveResult, handleError));

  function renderSaveResult(body) {
    console.log('Save result:', body);
  }
  // TODO: Render saved message.
}

module.exports = saveTasksFlow;
