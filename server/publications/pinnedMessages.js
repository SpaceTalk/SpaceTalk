Meteor.publish('channelPinnedMessages', function (search) {
  if (this.userId) {
    // TODO: checking if the user has access to these messages
    const channel = Channels.findOne({ $or: [{ _id: search }, { slug: search }] });
    return Messages.find({
      _id: {$in: channel.pinnedMessageIds} 
    });
  }
  this.ready();
});
