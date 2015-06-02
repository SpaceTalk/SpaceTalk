/* globals
 deferAfterFlush: true,
 resetTestingEnvironment: true,
 createDefaultTeam: true,
 createDefaultUser: true,
 loginWithDefaultUser: true,
 waitForRouter: true,
 goToRoute: true,
 goToDefaultTeamPage: true
 */

// You can call this helper functions with:
// `beforeEach(<Helper function name>);`
// E.g. `beforeEach(createDefaultOrganization);`

var createMethodResultHandler = function (done, hook) {
  return function (error, result) {
    if (error) {
      console.error(error);
    }
    if (hook) {
      hook(error, result);
    }
    done(error, result);
  };
};

deferAfterFlush = function (callback) {
  Tracker.afterFlush(function () {
    Meteor.defer(callback);
  });
};

resetTestingEnvironment = function (done) {
  Meteor.call('resetTestingEnvironment', createMethodResultHandler(done));
};

createDefaultTeam = function (done) {
  var self = this;

  Meteor.call(
    'fixtures/teams/createDefault',
    createMethodResultHandler(done, function (error, team) {
      self.team = team;
    })
  );
};

createDefaultUser = function (done) {
  var self = this;

  Meteor.call(
    'fixtures/users/createDefault',
    createMethodResultHandler(done, function (error, user) {
      self.user = user;
    })
  );
};

loginWithDefaultUser = function (done) {
  Meteor.loginWithPassword(
    'test',
    'test',
    createMethodResultHandler(done)
  );
};

waitForRouter = function (done) {
  Tracker.autorun(function (computation) {
    if (FlowRouter.subsReady()) {
      computation.stop();
      deferAfterFlush(done);
    }
  });
};

goToRoute = function (pathDef, params, queryParams) {
  return function (done) {
    queryParams = queryParams || {};
    queryParams.jasmine = true;
    FlowRouter.go(pathDef, params, queryParams);
    waitForRouter(done);
  };
};

goToDefaultTeamPage = function (done) {
  return goToRoute('/teams/test')(done);
};

waitABit = function(callback) {
  setTimeout(function() {
    Meteor.defer(callback);
  }, 100);
};

goToHomePage = function (done) {
  return goToRoute('home')(done);
};

goToDefaultChannel = function (done) {
  return goToRoute('/teams/test/channels/general')(done);
};

waitForChannelSubs = function (channelSlug, callback) {
  Tracker.autorun(function (computation) {
    if(Channels.findOne({ slug: channelSlug })) {
      computation.stop();
      callback();
    }
  });
};

getCurrentRouteName = function () {
  return FlowRouter.current().route.name;
};

logout = function (done) {
  Meteor.logout(function () {
    deferAfterFlush(done);
  });
};
