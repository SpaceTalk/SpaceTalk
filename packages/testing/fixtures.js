var resetDatabase = function () {
  console.log("clear");
  // safety check
  if (!process.env.IS_MIRROR) {
    throw new Meteor.Error(
      'NOT_ALLOWED',
      'velocityReset is not allowed outside of a mirror. Something has gone wrong.'
    );
  }

  var db = MongoInternals.defaultRemoteCollectionDriver().mongo.db;
  var collections = Meteor.wrapAsync(db.collections, db)();
  var appCollections = _.reject(collections, function (col) {
    return col.collectionName.indexOf('velocity') === 0 ||
      col.collectionName === 'system.indexes' ||
      col.collectionName === 'users';
  });

  _.each(appCollections, function (appCollection) {
    console.log('remove ' + appCollection.collectionName);
    Meteor.wrapAsync(appCollection.remove, appCollection)();
  });
};

var resetTestingEnvironment = function () {
  if (process.env.IS_MIRROR) {
    resetDatabase();
  } else {
    throw new Meteor.Error(
      'NOT_ALLOWED',
      'resetTestingEnvironment can only be executed in a Velocity mirror.'
    );
  }
};

var createUser = function (userData) {
  var user = Meteor.users.findOne({username: userData.username});

  if (!user) {
    var userId = Accounts.createUser(userData);
    user = Meteor.users.findOne(userId);
  }

  return user;
};

var createDefaultUser = function () {
  return createUser({
    email: 'test@spacetalk.com',
    password: 'test',
    username: 'test'
  });
};

var createTeam = function (team) {
  var teamId = Teams.insert(team);
  Channels.insert({
    name: 'general',
    teamId: teamId
  });

  return Teams.findOne(teamId);
}

var createDefaultTeam = function () {
  var team = {
    name: 'test'
  };

  return createTeam(team);
}

Meteor.methods({
  resetTestingusersEnvironment: resetTestingEnvironment,
  'fixtures//create': createUser,
  'fixtures/users/createDefault': createDefaultUser,
  'fixtures/teams/create': createTeam,
  'fixtures/teams/createDefault': createDefaultTeam
});
