Meteor.methods({
  'spacechat.channels.unpinMessage': function(channelId, messageId) {

    check(channelId, String);
    check(messageId, String);

    var channel = SpaceChat.Channels.findOne(channelId),
        message = SpaceChat.Messages.findOne(messageId);

    // Check user authenticated
    if (!this.userId) {
      throw new Meteor.Error(401, 'Unauthorized access');
    }

    // Check channel exists
    if (!channel) {
      throw new Meteor.Error(404, 'Channel does not exist');
    }

    // Check message exists
    if (!message) {
      throw new Meteor.Error(404, 'Message does not exist');
    }

    // Using Channels.direct to get around an issue with Collection Hooks
    // not allowing updates without a $set
    return SpaceChat.Channels.direct.update(channelId,
      {
        $pull: {
          pinnedMessageIds: messageId
        }
      }
    );
  }
});
