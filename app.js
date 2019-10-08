var RouteState = require('route-state');
var handleError = require('handle-error-web');
var redirectToAuth = require('./redirect-to-auth');
var qs = require('qs');
var findGitHubToken = require('./find-github-token');
var sb = require('standard-bail')();
var GetTasksFlow = require('./flows/get-tasks-flow');
var EditTaskFlow = require('./flows/edit-task-flow');
var SaveTasksFlow = require('./flows/save-tasks-flow');
var ShowTasksFlow = require('./flows/show-tasks-flow');
var config = require('./config');
var accessor = require('accessor')();

var flowsForIds = {};

var routeState = RouteState({
  followRoute,
  windowObject: window
});

(function go() {
  window.onerror = reportTopLevelError;
  routeState.routeFromHash();
})();

function followRoute(routeDict) {
  if (routeDict.token) {
    if (routeDict.state) {
      var thawedDict = unpackRoute(routeDict.state);
      routeState.overwriteRouteEntirely(thawedDict);
    } else {
      followRouteUsingToken(routeDict);
    }
  } else {
    let queryDict = qs.parse(window.location.search.slice(1));
    if (queryDict.code) {
      findGitHubToken(
        {
          code: queryDict.code,
          codeExchangeURL: config.github.codeExchangeURL,
          appName: config.github.appName
        },
        sb(addTokenToRoute, handleError)
      );
    } else {
      redirectToAuth({
        routeDict,
        clientId: config.github.clientId,
        scopes: ['repo']
      });
    }
  }
}

function followRouteUsingToken(routeDict) {
  flowsForIds['getTasks'] = GetTasksFlow({
    token: routeDict.token,
    flowsForIds,
    file: routeDict.file
  });
  flowsForIds['editTask'] = EditTaskFlow({ flowsForIds });
  flowsForIds['showTasks'] = ShowTasksFlow({
    accessor,
    flowsForIds,
    hideDone: routeDict.hideDone,
    routeState
  });
  flowsForIds['saveTasks'] = SaveTasksFlow({
    token: routeDict.token,
    file: routeDict.file
  });

  flowsForIds['getTasks']();
  flowsForIds['editTask']({});
}

function addTokenToRoute(token) {
  routeState.addToRoute({ token });
}

function unpackRoute(encodedStateFromRedirect) {
  return qs.parse(decodeURIComponent(encodedStateFromRedirect));
}

function reportTopLevelError(msg, url, lineNo, columnNo, error) {
  handleError(error);
}
