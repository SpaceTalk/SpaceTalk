Meteor.methods({
  'channels.remove': function (channelId) {
    check(channelId, String);

    // XXX TODO - Need to check if the user can remove the channel
    if (!this.userId) {
      throw new Meteor.Error('unauthorized-access');
    }

    // Check channel exists
    if (!Channels.findOne(channelId)) {
      throw new Meteor.Error('channel-not-found');
    }
    
    Messages.remove({ channelId: channelId });
    Channels.remove({ _id: channelId });
  }
});
