Template.registerHelper('currentChannel', function () {
  return currentChannel();
});

Template.registerHelper('currentTeam', function () {
  return currentTeam();
});

Template.registerHelper('isSubReady', function (subName) {
  return isSubReady(subName);
});