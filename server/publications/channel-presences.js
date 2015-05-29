Meteor.publish('channelPresences', function (channelId) {
  check(channelId, String);
  return Presences.find({
    userId: { $exists: true },
    state: { typingInChannel: channelId }
  }, {
    fields: {
      userId: true,
      state: true
    }
  });
});
