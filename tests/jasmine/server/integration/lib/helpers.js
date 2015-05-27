/* globals
 resetTestingEnvironment: true,
 createDefaultTeam: true,
 createDefaultUser: true,
 */

resetTestingEnvironment = function () {
  Meteor.call('resetTestingEnvironment');
};

createDefaultTeam = function () {
  var self = this;

  self.team = Meteor.call('fixtures/teams/createDefault');
};

createDefaultUser = function () {
  var self = this;

  self.user = Meteor.call('fixtures/users/createDefault');
};
