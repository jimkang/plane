var ndjson = require('ndjson');
var request = require('basic-browser-request');
var handleError = require('handle-error-web');
var LoadTasksData = require('../load-tasks-data');
var sb = require('standard-bail')();

function GetTasksFlow({ token, flowsForIds, file }) {
  return getTasksFlow;

  function getTasksFlow() {
    var loadTasksData = LoadTasksData({
      gitRepoOwner: 'jimkang',
      token,
      repo: 'eisenvectors-data',
      branch: 'gh-pages',
      request,
      githubFilePath: file
    });
    loadTasksData(sb(parseText, handleError));

    function parseText(taskDataText) {
      var ndjsonParsingStream = ndjson.parse();
      ndjsonParsingStream.on('data', collectTask);
      ndjsonParsingStream.write(taskDataText);
      ndjsonParsingStream.end();
    }
  }

  function collectTask(task) {
    // TODO: Throttling?
    flowsForIds['showTasks']({
      incomingTasks: [task]
    });
  }
}

module.exports = GetTasksFlow;
