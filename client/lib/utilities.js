currentRouteId = function () {
  return FlowRouter.getParam('_id');
};

currentTeamId = function() {
  var team = FlowRouter.getParam('team');
  return Teams.findOne(team)._id;
};

currentTeam = function() {
  return Teams.findOne(FlowRouter.getParam('team'));
};

currentChannel = function() {
  return Channels.findOne(FlowRouter.getParam('channel'));
};

currentChannelId = function() {
  return currentChannel() ? currentChannel()._id : null;
};

currentTeamId = function() {
  return currentTeam() ? currentTeamId()._id : null;
};
