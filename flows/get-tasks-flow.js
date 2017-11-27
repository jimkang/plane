var ndjson = require('ndjson');
var request = require('basic-browser-request');
var handleError = require('handle-error-web');
var LoadTasksData = require('../load-tasks-data');
var sb = require('standard-bail')();

// const gitRepoOwner = 'jimkang';
const githubFilePath = 'life.ndjson';

function getTasksFlow({
  token,
  accessor,
  showTasksFlow,
  editTaskFlow,
  saveTasksFlow
}) {
  var loadTasksData = LoadTasksData({
    gitRepoOwner: 'jimkang',
    token,
    repo: 'eisenvectors-data',
    branch: 'gh-pages',
    request,
    githubFilePath
  });
  loadTasksData(sb(parseText, handleError));

  function parseText(taskDataText) {
    var ndjsonParsingStream = ndjson.parse();
    ndjsonParsingStream.on('data', collectTask);
    ndjsonParsingStream.write(taskDataText);
    ndjsonParsingStream.end();
  }

  function collectTask(task) {
    // TODO: Throttling?
    showTasksFlow({
      incomingTasks: [task],
      token,
      accessor,
      editTaskFlow,
      saveTasksFlow
    });
  }
}

module.exports = getTasksFlow;
