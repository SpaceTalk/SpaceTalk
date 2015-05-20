Template.registerHelper('currentChannel', function () {
  return currentChannel();
});

Template.registerHelper('currentTeam', function () {
  return currentTeam();
});

Template.registerHelper('currentUser', function() {
  return Meteor.user();
});

Template.registerHelper('redirectTo', function(route) {
  FlowRouter.go(route);
});