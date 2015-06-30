Meteor.methods({
  'channels.unpinMessage': function(channelId, messageId) {

    check(channelId, String);
    check(messageId, String);

    var channel = Channels.findOne(channelId),
        message = Messages.findOne(messageId);
    
    // Check user authenticated
    if (!this.userId) {
      throw new Meteor.Error('unauthorized-access');
    }

    // Check channel exists
    if (!channel) {
      throw new Meteor.Error('channel-not-found');
    }

    // Check message exists
    if (!message) {
      throw new Meteor.Error('message-not-found');
    }

    // Using Channels.direct to get around an issue with Collection Hooks
    // not allowing updates without a $set
    return Channels.direct.update(channelId,
      {
        $pull: {
          pinnedMessageIds: messageId
        }
      }
    ); 
  }
});
