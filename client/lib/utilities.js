currentRouteId = function () {
  return FlowRouter.getParam('_id');
};

currentTeam = function() {
  const search = FlowRouter.getParam('team');
  // Search teams by id or slug
  return Teams.findOne( { $or: [ { _id: search }, { slug: search } ]});
};

currentChannel = function() {
  const search = FlowRouter.getParam('channel');
  // Search cnannel by id or slug
  return Channels.findOne( { $or: [ { _id: search }, { slug: search } ]});
};

currentChannelId = function() {
  const channel = currentChannel();
  return channel ? channel._id : null;
};

currentTeamId = function() {
  const team = currentTeam();
  return team ? team._id : null;
};
