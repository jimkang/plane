var GitHubFile = require('github-file');
var request = require('basic-browser-request');
var sb = require('standard-bail')();

function LoadTasksData({ gitRepoOwner, repo, token, githubFilePath }) {
  var githubFile = GitHubFile({
    gitRepoOwner,
    gitToken: token,
    repo,
    request
  });

  return loadTasksData;

  function loadTasksData(done) {
    // TODO: Consider making this call to GitHub directly and stream.
    // Ending linebreak is needed for the last line to be parsed.
    githubFile.get(githubFilePath, sb(passContent, done));

    function passContent(body) {
      done(null, body.content);
    }
  }
}

module.exports = LoadTasksData;
