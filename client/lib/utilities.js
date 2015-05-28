currentRouteId = function () {
  return FlowRouter.getParam('_id');
};

currentTeam = function () {
  var search = currentTeamSlug();
  // Search teams by id or slug
  return Teams.findOne( { $or: [ { _id: search }, { slug: search } ]});
};

currentChannel = function () {
  var search = currentChannelSlug();
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

currentTeamSlug = function () {
  return FlowRouter.getParam('team');
};

currentChannelSlug = function () {
  return FlowRouter.getParam('channel');
};

isSubReady = function (subName) {
  return FlowRouter.subsReady(subName);
};

isEnter = function (e) {
  return e.keyCode === 13;
};

