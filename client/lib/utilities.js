currentRouteId = function () {
  return FlowRouter.getParam('_id');
};

currentTeam = function () {
  var search = FlowRouter.getParam('team');
  // Search teams by id or slug
  return Teams.findOne( { $or: [ { _id: search }, { slug: search } ]});
};

currentChannel = function () {
  var search = FlowRouter.getParam('channel');
  // Search cnannel by id or slug
  return Channels.findOne( { $or: [ { _id: search }, { slug: search } ]});
};

currentChannelId = function () {
  var channel = currentChannel();
  return channel ? channel._id : null;
};

currentTeamId = function () {
  var team = currentTeam();
  return team ? team._id : null;
};

isSubReady = function (subName) {
  return FlowRouter.subsReady(subName);
};