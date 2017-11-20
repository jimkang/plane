var GitHubFile = require('github-file');
var request = require('basic-browser-request');

function SaveTasksData({ gitRepoOwner, repo, token, githubFilePath }) {
  var githubFile = GitHubFile({
    branch: 'gh-pages',
    gitRepoOwner,
    gitToken: token,
    repo,
    request
  });

  return saveTasksData;

  function saveTasksData(data, done) {
    var tasksString = data.map(JSON.stringify).join('\n');
    githubFile.update({ filePath: githubFilePath, content: tasksString }, done);
  }
}

module.exports = SaveTasksData;
