var ndjson = require('ndjson');
var request = require('basic-browser-request');
var handleError = require('handle-error-web');
var renderTasks = require('../dom/render-tasks');
var saveTasksFlow = require('./save-tasks-flow');

const ghPagesBaseURL = 'http://jimkang.com';
// const gitRepoOwner = 'jimkang';
const repo = 'eisenvectors-data';
const githubFilePath = 'life.ndjson';

function getTasksFlow({ token }) {
  // var saveYAMLData = SaveYAMLData({
  //   gitRepoOwner,
  //   repo,
  //   token,
  //   githubFilePath
  // });
  var tasks = [];
  var ndjsonParsingStream = ndjson.parse();
  ndjsonParsingStream.on('data', collectTask);

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
    tasks.push(task);
    // TODO: Throttling?
    renderTasks({ taskData: tasks, onStartSave });
  }

  function onStartSave({ tasks }) {
    saveTasksFlow({ tasks, token });
  }

  // function modifyData(data) {
  //   console.log('Loaded YAML data:', data);
  //   data.push({
  //     text: 'The secret code to enter the tower is: ' + ~~(Math.random * 1000),
  //     topics: ['secrets', 'tower']
  //   });
  //   saveYAMLData(data, sb(logSaveResult));
  // }

  // function logSaveResult() {
  //   console.log(
  //     'Saved data! Check out:',
  //     ghPagesBaseURL + '/' + repo + '/' + githubFilePath
  //   );
  // }
}

module.exports = getTasksFlow;
