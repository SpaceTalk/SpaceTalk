Meteor.methods({
  'spacechat.channels.pinMessage': function (channelId, messageId) {

    check(channelId, String);
    check(messageId, String);

    // Check user authenticated
    if (!this.userId) {
      throw new Meteor.Error(401, 'Unauthorized access');
    }

    // Check channel exists
    if (!SpaceChat.Channels.findOne({ _id: channelId })) {
      throw new Meteor.Error(404, 'Channel does not exist');
    }

    // Check message exists
    if (!SpaceChat.Messages.findOne({ _id: messageId })) {
      throw new Meteor.Error(404, 'Message does not exist');
    }

    // Using Channels.direct to get around an issue with Collection Hooks
    // not allowing updates without a $set
    return SpaceChat.Channels.direct.update(channelId,
      {
        $addToSet: {
          pinnedMessageIds: messageId
        }
      }
    );
  }
});
