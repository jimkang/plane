var ndjson = require('ndjson');
var request = require('basic-browser-request');
var handleError = require('handle-error-web');

const ghPagesBaseURL = 'http://jimkang.com';
// const gitRepoOwner = 'jimkang';
const repo = 'eisenvectors-data';
const githubFilePath = 'life.ndjson';

function getTasksFlow({
  token,
  accessor,
  showTasksFlow,
  editTaskFlow,
  saveTasksFlow
}) {
  var ndjsonParsingStream = ndjson.parse();
  ndjsonParsingStream.on('data', collectTask);

  // TODO: Get from git, not GH Pages.
  var reqOpts = {
    url: ghPagesBaseURL + '/' + repo + '/' + githubFilePath,
    method: 'GET',
    onData: writeToStream
  };
  request(reqOpts, handleError);

  function writeToStream(text) {
    ndjsonParsingStream.write(text);
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
