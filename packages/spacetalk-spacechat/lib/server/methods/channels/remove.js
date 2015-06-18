if(SpaceOptions.removeableChannels) {
  Meteor.methods({
    'spacechat.channels.remove': function (channelId) {
      check(channelId, String);

      // XXX TODO - Need to check if the user can remove the channel
      if (!this.userId) {
        throw new Meteor.Error(401, 'Unauthorized access');
      }

      // Check channel exists
      if (!SpaceChat.Channels.findOne(channelId)) {
        throw new Meteor.Error(404, 'Channel does not exist');
      }

      SpaceChat.Messages.remove({ channelId: channelId });
      SpaceChat.Channels.remove({ _id: channelId });
    }
  });
}
