currentChannel = function () {
  var search = currentChannelSlug();
  var channel = null;

  if (isDirectChannel()) {
    var user = Meteor.users.findOne({ username: nameOfDirectChannel() });
    if (user)
      channel = Channels.findOne({ direct: true, allowedUsers: { $all: [ Meteor.userId(), user._id ] } });
  } else {
    // Search cnannel by id or slug
    channel = Channels.findOne({ $or: [{ _id: search }, { slug: search }] });
  }

  return channel;
};

currentChannelSlug = function () {
  return FlowRouter.getParam('channel');
};
