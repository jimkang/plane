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
    // Ending linebreak is needed for the last line to be parsed.
    var tasksString = data.map(JSON.stringify).join('\n') + '\n';
    githubFile.update({ filePath: githubFilePath, content: tasksString }, done);
  }
}

module.exports = SaveTasksData;
