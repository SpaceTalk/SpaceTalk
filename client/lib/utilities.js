currentRouteId = function () {
  return FlowRouter.getParam('_id');
};

currentTeam = function () {
  var search = currentTeamSlug();
  // Search teams by id or slug
  return Teams.findOne({ $or: [{ _id: search }, { slug: search }] });
};

currentChannel = function () {
  var search = currentChannelSlug();
  var channel = null;


  if (isDirectChannel()) {
    var user = Meteor.users.findOne({ username: nameOfDirectChannel() });
    if (user)
      channel = Channels.findOne({ direct: true, allowedUsers: { $all: [Meteor.userId(), user._id] } });
  } else {
    // Search cnannel by id or slug
    channel = Channels.findOne({ $or: [{ _id: search }, { slug: search }] });
  }

  return channel;
};

currentChannelId = function () {
  var channel = currentChannel();
  return channel ? channel._id : null;
};

/**
 * Returns true if the channel is a direct user-to-user channel
 */
isDirectChannel = function () {
  // We check this by checking if the current channel slug starts with a '@'
  return !!(currentChannelSlug() && currentChannelSlug().charAt(0) === '@');

};

/**
 * Removes the first character of a string and returns the result
 * @returns {string} The currentChannelSlug with the first character removed
 */
nameOfDirectChannel = function () {
  return currentChannelSlug().substring(1);
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

